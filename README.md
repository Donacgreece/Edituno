# Edituno

![Edituno social preview](./public/og/edituno-share.png)

**Edituno** is a free local video editor built as an installable PWA. It lets you cut video, add captions, effects, transitions, music and overlays, then export directly on your device without upload and without watermark.

## Product links

- Website: https://edituno.com/
- Social preview image: https://edituno.com/og/edituno-share.png
- Repository: https://github.com/Donacgreece/Edituno

## What Edituno does

- Local on-device editing for privacy and speed
- Video, image, audio, text and element layers
- Captions and SRT subtitle import
- Filters, motion presets, adjustments and transitions
- Mobile-first editing flow with a professional desktop workspace
- 720p, 1080p and 4K export when supported by the browser and device
- Greek and English interface
- Installable PWA with offline support

## SEO and discoverability package

This release includes a complete foundation for Google, link sharing and AI discovery:

- Canonical URL targeting `https://edituno.com/`
- Improved title and meta description
- Open Graph and Twitter card tags
- Dedicated social share image at `public/og/edituno-share.png`
- Structured data using `schema.org/SoftwareApplication`
- `robots.txt`
- `sitemap.xml`
- `llms.txt`

## Tech stack

- TypeScript
- Vanilla UI runtime
- Progressive Web App architecture
- Local browser storage
- GitHub Pages deployment flow

## Quick start

```bash
npm install
npm run build
```

Serve the production build locally:

```bash
npm run serve
```

## Project structure

```text
src/                      Source application and HTML template
public/                   Static assets copied to dist/
public/og/                Social preview assets
public/icons/             PWA icons
public/splash/            iOS splash screens
dist/                     Production bundle
.github/workflows/        GitHub Pages deployment workflow
tools/build.mjs           Production builder
```

## Social preview asset

The social thumbnail used by Open Graph and Twitter is stored here:

- Repo path: `public/og/edituno-share.png`
- Production URL: `https://edituno.com/og/edituno-share.png`

## Deployment notes

The repository ships with a GitHub Pages workflow. The release package also includes a PowerShell deployment helper for the existing one-command workflow.

## Release

Current packaged release: **v2.2.4**

## Third-party and legal notes

See:

- `OPEN_SOURCE_STACK.md`
- `THIRD_PARTY_NOTICES.md`
- `RELEASE_NOTES.md`
