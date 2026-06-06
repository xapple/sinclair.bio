terraform {
  # OpenTofu (also compatible with Terraform >= 1.6).
  required_version = ">= 1.6"

  required_providers {
    cloudflare = {
      source = "cloudflare/cloudflare"
      # v5.14+ restored the ability to CREATE a git-connected Pages project via
      # the `source` block (it was read-only in early v5). Pinned to 5.x;
      # `tofu init` resolves the latest 5.x and writes .terraform.lock.hcl.
      version = "~> 5.14"
    }
  }
}

# The provider reads credentials from the environment, so nothing secret is
# stored in these files or in version control:
#
#   export CLOUDFLARE_API_TOKEN=...   (Account: Pages:Edit, Zone: DNS:Edit)
#
provider "cloudflare" {}

# --------------------------------- Variables --------------------------------- #

variable "account_id" {
  type        = string
  description = "Cloudflare account ID (dashboard > any domain > Overview)."
}

variable "zone_id" {
  type        = string
  description = "Cloudflare zone ID for sinclair.bio (dashboard > sinclair.bio > Overview)."
}

variable "github_owner" {
  type        = string
  description = "GitHub user/org that owns the repository."
}

variable "repo_name" {
  type        = string
  description = "GitHub repository name (dots allowed)."
  default     = "sinclair.bio"
}

variable "project_name" {
  type        = string
  description = "Cloudflare Pages project name (lowercase, alphanumeric + hyphens, no dots)."
  default     = "sinclair-bio"
}

variable "domain" {
  type        = string
  description = "Custom apex domain to attach to the Pages project."
  default     = "sinclair.bio"
}

variable "production_branch" {
  type        = string
  description = "Branch that triggers production deployments."
  default     = "main"
}

variable "node_version" {
  type        = string
  description = "Node.js version for the Cloudflare Pages build."
  default     = "22"
}

# --------------------------------- Resources --------------------------------- #

# Cloudflare Pages project, git-connected to the GitHub repo. Cloudflare builds
# and deploys automatically on every push to the production branch.
#
# PREREQUISITE that tofu cannot do for you: the GitHub account must already be
# authorized in the Cloudflare dashboard (Workers & Pages > Create > Connect to
# Git > authorize the Cloudflare Pages GitHub App). See README.md.
resource "cloudflare_pages_project" "site" {
  account_id        = var.account_id
  name              = var.project_name
  production_branch = var.production_branch

  build_config = {
    build_command   = "pnpm build"
    destination_dir = "dist"
    root_dir        = ""
  }

  source = {
    type = "github"
    config = {
      owner               = var.github_owner
      repo_name           = var.repo_name
      production_branch   = var.production_branch
      pr_comments_enabled = true
    }
  }

  deployment_configs = {
    production = {
      env_vars = {
        NODE_VERSION = {
          type  = "plain_text"
          value = var.node_version
        }
        # Enable the optional "Personal" portfolio section in production:
        INCLUDE_PERSONAL = { type = "plain_text", value = "true" }
      }
    }
  }
}

# Attach the custom apex domain to the project.
resource "cloudflare_pages_domain" "apex" {
  account_id   = var.account_id
  project_name = cloudflare_pages_project.site.name
  name         = var.domain
}

# Apex DNS record pointing at the project's *.pages.dev origin. Cloudflare
# flattens the apex CNAME automatically when the record is proxied.
resource "cloudflare_dns_record" "apex" {
  zone_id = var.zone_id
  name    = var.domain
  type    = "CNAME"
  content = "${cloudflare_pages_project.site.name}.pages.dev"
  proxied = true
  ttl     = 1 # 1 = automatic; required when proxied.
}

# www -> apex. A proxied record so the request reaches Cloudflare's edge, where the
# single-redirect rule below 301s it to the apex. www never reaches Pages, and
# Universal SSL already covers *.sinclair.bio, so HTTPS on www works with no extra
# certificate or Pages custom-domain attachment.
resource "cloudflare_dns_record" "www" {
  zone_id = var.zone_id
  name    = "www.${var.domain}"
  type    = "CNAME"
  content = var.domain
  proxied = true
  ttl     = 1 # 1 = automatic; required when proxied.
}

# Single Redirect: 301 https://www.<domain>/<path> -> https://<domain>/<path>,
# preserving the path and query string. Runs in the dynamic-redirect phase.
resource "cloudflare_ruleset" "redirect_www" {
  zone_id = var.zone_id
  name    = "Redirect www to apex"
  kind    = "zone"
  phase   = "http_request_dynamic_redirect"

  rules = [{
    ref         = "redirect_www_to_apex"
    description = "301 www.${var.domain} to the apex domain"
    expression  = "(http.host eq \"www.${var.domain}\")"
    action      = "redirect"
    action_parameters = {
      from_value = {
        status_code           = 301
        preserve_query_string = true
        target_url = {
          expression = "concat(\"https://${var.domain}\", http.request.uri.path)"
        }
      }
    }
  }]
}

# ---------------------------------- Outputs ---------------------------------- #

output "pages_dev_url" {
  description = "The project's *.pages.dev URL."
  value       = "https://${cloudflare_pages_project.site.subdomain}"
}

output "project_name" {
  description = "Cloudflare Pages project name."
  value       = cloudflare_pages_project.site.name
}

output "custom_domain" {
  description = "Custom domain attached to the project."
  value       = cloudflare_pages_domain.apex.name
}