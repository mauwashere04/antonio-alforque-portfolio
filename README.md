# Antonio Alforque portfolio

Personal portfolio for Antonio Alforque: a Next.js 15 App Router site, exported as static files.

## Stack

- TypeScript, no Tailwind. Styles live in `app/globals.css`.
- `next/font` with Newsreader (display) and Public Sans (UI).
- `output: "export"` and `images.unoptimized: true` in `next.config.ts`.

## Scripts

```
npm install
npm run dev
npm run build    # writes the static site to out/
```

## Deploy

Mau links this repo to the existing Vercel project for https://antonioalforque.vercel.app/. The site is a static export, so Vercel serves the `out/` folder.

## Pages

- `/` is the home page. Captures are under `public/captures/` (full size, plus `thumbs/`).
- `/inquire` is a 5-step client-side flow: Who, Need, Budget, Contact, Pick a time. Step 5 embeds the live GoHighLevel Strategy Call booking widget (slug `tul-id-strategy-call`). Contact details are never added to the widget URL.
- `app/not-found.tsx`, `app/sitemap.ts` and `public/robots.txt` cover the 404 page and search crawlers.

## Design source

`C:\dev\grok-bot-assets\handoff\2026-11-06\antonio-portfolio-mocks\v5.1\` (approved v5.1 mock: `NOTES.md`, `home.html`, `inquire.html`, `shared.css`).

## Git

This folder has no `.git`. Mau owns `git init`, commits and push.
