# Edituno

![Edituno social preview](./public/og/edituno-share.png)

**Edituno** is a free local video editor built as an installable PWA. It lets you cut video, add captions, effects, transitions, music and overlays, then export directly on your device without upload and without watermark.

## Product links

- Current website: https://donacgreece.github.io/Edituno/
- Planned custom domain: https://edituno.com/
- Social preview image: https://donacgreece.github.io/Edituno/og/edituno-share.png
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

- Canonical URL targeting the current GitHub Pages deployment until `edituno.com` is connected
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
- Current production URL: `https://donacgreece.github.io/Edituno/og/edituno-share.png`
- Planned domain URL: `https://edituno.com/og/edituno-share.png`

## Deployment notes

The repository ships with a GitHub Pages workflow. The release package also includes a PowerShell deployment helper for the existing one-command workflow.

## Release

Current packaged release: **v2.2.8**

## Third-party and legal notes

See:

- `OPEN_SOURCE_STACK.md`
- `THIRD_PARTY_NOTICES.md`
- `RELEASE_NOTES.md`

## Automatic domain awareness

Edituno does not hardcode the production hostname anymore. The GitHub Pages workflow resolves the active Pages custom domain before every build and injects that URL into the canonical tag, Open Graph metadata, Twitter card image, structured data, `robots.txt`, `sitemap.xml` and `llms.txt`.

Until a custom domain is configured, the build uses `https://donacgreece.github.io/Edituno/`. After `edituno.com` is configured as the GitHub Pages custom domain, scheduled deployment checks automatically detect it and rebuild the discovery metadata without any source-code change.

The social preview image is stored at `public/og/edituno-share.png`, while its public absolute URL is generated at build time from the active domain.

## Install, About and Support

Edituno includes a smart PWA installation flow that detects iPhone/iPad, Android, Windows, Mac and other desktop environments. Supported browsers use the native installation prompt. iOS users receive visual Add to Home Screen steps. Once installation is confirmed, Edituno remembers the installed state and stops presenting the install offer in that browser.

The in-app About page explains the local-first model and includes optional project support through PayPal:

- https://www.paypal.com/paypalme/DimitrisGalatsanos


## Installation experience

- Android and Windows use the native PWA install prompt when the browser exposes it.
- Apple devices show the platform-specific manual steps when a direct browser install prompt is not available.
- Installed status is shown only inside the Installation entry instead of occupying separate home or About UI.
- The desktop home rail uses a direct Support link to the optional PayPal page.
- The About page remains fully scrollable on mobile so all product and support information is accessible.
- The About page exposes one clear PayPal support action in the dedicated Support section, avoiding duplicate donation buttons.
