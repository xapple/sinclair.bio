# `www.sinclair` version 0.0.1

This is the website at `https://sinclair.bio`.

It is made with the following build technology: [Astro](https://docs.astro.build).

### Running locally

This project uses [Node.js](https://nodejs.org) (22 or newer) and the
[pnpm](https://pnpm.io) package manager. On macOS, install both with
[Homebrew](https://brew.sh):

    $ brew install node pnpm

Then, from the root of the repository, install the node dependencies:

    $ pnpm install

And finally launch the development server:

    $ pnpm dev

The site will be live at <http://localhost:4321>, with hot-reloading on file changes.

Other useful commands:

| Command        | Action                                          |
| -------------- | ----------------------------------------------- |
| `pnpm build`   | Type-check and build the static site to `dist/` |
| `pnpm preview` | Serve the production build locally              |
| `pnpm check`   | Run the Astro/TypeScript type-checker           |

### Deploying to Cloudflare Pages

To setup the CL hosting to automatically follow the latest commit on the main branch, do the following:

1. **Create the project** — CF dashboard → Workers & Pages → Create → Pages → Connect to Git → Pick this repo.
 
2. **Build settings**:
   - Framework preset: **Astro**
   - Build command: `pnpm build`
   - Build output: `dist`
   - Root directory: (leave blank)
   - Environment variable: `NODE_VERSION=22`

3. **First deploy** runs automatically. CF auto-detects `functions/` at the repo root — no extra config needed. The function at `functions/index.ts` intercepts `/` and 302s to `/en/` or `/fr/` based on the `Accept-Language` header.

4. **Custom domain** — Pages project → Custom domains → add `sinclair.bio`. CF will configure DNS automatically if `sinclair.bio` is already on Cloudflare DNS; otherwise it provides the CNAME target.

### Testing

To run the tests suite, you will need [uv](https://docs.astral.sh/uv), which
fetches Python and the test dependencies for you. The tests live in the `test/`
directory and use [pytest](https://docs.pytest.org). Run the suite from the
root of the repository:

    $ uv run --with pytest pytest test/