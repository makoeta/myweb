# myweb

> Personal portfolio of Max König — software developer & student building web apps, IoT and AI projects.

![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82?logo=nuxt&logoColor=white)
![Vue](https://img.shields.io/badge/Vue-3-4FC08D?logo=vuedotjs&logoColor=white)
![Nuxt UI](https://img.shields.io/badge/Nuxt%20UI-4-00DC82?logo=nuxt&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-r185-000000?logo=threedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build    # Node server build (.output/)
npm run generate # fully static site
npm run preview
```

## Content

Site content lives as markdown under `content/`:

- `content/projects/personal/*.md` — personal projects
- `content/projects/student/*.md` — student projects
- `content/career/*.md` — work experience

A built-in CMS at **`/admin`** lets you create, edit, delete entries and upload images
(to `public/uploads/`) without hand-editing files. Changes are written straight to the
markdown files, so they show up in git like normal content.

> The admin password is read from runtime config — set it before deploying:
>
> ```bash
> NUXT_ADMIN_PASSWORD=your-strong-password
> NUXT_ADMIN_SECRET=some-random-string   # signs the session cookie
> ```
>
> The CMS writes files on the server, so it needs a Node deployment
> (`npm run build` + `node .output/server`) or local `npm run dev` — not a static
> (`npm run generate`) host.
