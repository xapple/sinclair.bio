# Cloudflare Pages — Infrastructure as Code

OpenTofu config that provisions the Cloudflare Pages project for `sinclair.bio`,
git-connected to this repository so Cloudflare builds and deploys automatically
on every push to `main`.

It manages five resources:

- `cloudflare_pages_project.site` — the Pages project + build settings.
- `cloudflare_pages_domain.apex` — the `sinclair.bio` custom domain.
- `cloudflare_dns_record.apex` — the apex CNAME (proxied, flattened) pointing at
  the project's `*.pages.dev` origin.
- `cloudflare_dns_record.www` — a proxied `www` CNAME so the edge can handle it.
- `cloudflare_ruleset.redirect_www` — a single redirect that 301s `www.sinclair.bio`
  to the apex (preserving path + query). `www` never reaches Pages.

## Prerequisites

1. **The GitHub repo must exist and be pushed.** The `source` block points at a
   real repository (`<owner>/sinclair.bio`).

2. **Authorize GitHub in the Cloudflare dashboard — once.** This is an OAuth step
   that tofu cannot perform: Workers & Pages → Create → Pages → Connect to Git →
   authorize / install the **Cloudflare Pages** GitHub App on the repo. Stop
   there — do **not** finish creating the project in the UI; tofu creates it.
   (You only need the account-level GitHub authorization to exist.)

3. **A Cloudflare API token**, exported in your shell (never written to a file):

       export CLOUDFLARE_API_TOKEN=...

   Token scopes:
   - **Account → Cloudflare Pages → Edit**
   - **Zone → DNS → Edit** (for the `sinclair.bio` zone)
   - **Zone → Single Redirect → Edit** (for the `www` → apex redirect rule)

4. **Your `account_id` and `zone_id`** — both on the Cloudflare dashboard
   overview pages. Put them in `terraform.tfvars` (see below).

## Usage

    cp terraform.tfvars.example terraform.tfvars
    # edit terraform.tfvars: account_id, zone_id, github_owner

    tofu init
    tofu plan      # expect: 5 resources to add
    tofu apply

After apply:

    tofu output pages_dev_url     # https://sinclair-bio.pages.dev

The custom domain takes a few minutes to go **active**. Then `https://sinclair.bio/`
serves the site (and 302-redirects to `/en/` or `/fr/` via the Pages Function in
`functions/`).

## Notes

- **Don't edit the `source` block after creation** — a change there can force the
  whole project to be replaced. Treat the git link as create-once.
- **State** (`terraform.tfstate`) and **`terraform.tfvars`** are gitignored: the
  state holds your IDs and is the source of truth, so keep it local. The
  committed `.terraform.lock.hcl` pins provider checksums.

## Teardown

    tofu destroy

Removes the Pages project, the custom domain, and the apex DNS record. (The
GitHub ↔ Cloudflare authorization persists — revoke it in the dashboard if you
want it gone.)