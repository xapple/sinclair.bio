# `www.sinclair` version 0.0.1

This is the website at `https://sinclair.bio`.

It is made with the following build technology: [Astro](https://docs.astro.build).

### Running locally

Install requirements:

    $ brew XXXX

Run this from the root of the repository:

    $ pnpm dev

### Deploying to Cloudflare Pages

1. **Create the project** — CF dashboard → Workers & Pages → Create → Pages → Connect to Git → pick this repo.
 
2. **Build settings**:
   - Framework preset: **Astro**
   - Build command: `pnpm build`
   - Build output: `dist`
   - Root directory: (leave blank)
   - Environment variable: `NODE_VERSION=22`
3. **First deploy** runs automatically. CF auto-detects `functions/` at the repo root — no extra config needed. The function at `functions/index.ts` intercepts `/` and 302s to `/en/` or `/fr/` based on the `Accept-Language` header.

4. **Custom domain** — Pages project → Custom domains → add `sinclair.bio`. CF will configure DNS automatically if `sinclair.bio` is already on Cloudflare DNS; otherwise it provides the CNAME target.

## Tests

#### Verifying the locale redirect (after deploy)

    $ curl -sI -H "Accept-Language: fr-CH,fr;q=0.9,en;q=0.8" https://sinclair.bio/ | grep -i location
    # → location: https://sinclair.bio/fr/

    $ curl -sI -H "Accept-Language: en-US" https://sinclair.bio/ | grep -i location
    # → location: https://sinclair.bio/en/

## Interesting templates:

A big list of free astro template:

* https://getastrothemes.com/free-astro-themes-templates/

First round of selected templates:

* https://github.com/danielunited/codefolio
* https://github.com/manuelernestog/astrofy
* https://github.com/EFEELE/NeonMint
* https://github.com/rishikesh2003/my-portfolio

Second round of templates:

* https://agentsofchaos.baulab.info
* https://astro.build/themes/details/career-portfolio-data-driven-astro-ssg/

Other nice designs:

* https://www.raycast.com

Icon libraries:

* https://phosphoricons.com/
* https://iconoir.com
* https://heroicons.com
* https://tabler.io/icons
* https://lucide.dev/icons
* https://icons.getbootstrap.com/