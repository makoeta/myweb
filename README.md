# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Content & CMS

The site content lives as markdown files under `content/`:

- `content/projects/personal/*.md` — personal projects
- `content/projects/student/*.md` — student projects
- `content/career/*.md` — work experience

There is a built-in CMS at **`/admin`** to manage these without editing files by hand.
It lets you create, edit and delete projects and work experience, and upload images
(stored in `public/uploads/`). Changes are written straight to the markdown files, so
they show up in git and can be committed/deployed like normal content.

### Admin password

The CMS is protected by a password. It is read from runtime config and can be set via
environment variables (defaults to `changeme` in development — **change it before deploying**):

```bash
NUXT_ADMIN_PASSWORD=your-strong-password
NUXT_ADMIN_SECRET=some-random-string   # used to sign the session cookie
```

> Note: the CMS writes files on the server, so it works with a Node deployment
> (`npm run build` + `node .output/server`) or locally in `npm run dev`. It is not
> available on a fully static (`npm run generate`) host, since there is no server to
> write files. Edit locally and redeploy in that case.
