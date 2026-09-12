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

Current packaged release: **v2.5.0**

## License

Edituno's original first-party code and documentation are source-available under the **PolyForm Noncommercial License 1.0.0**.

- SPDX identifier: `PolyForm-Noncommercial-1.0.0`
- Official terms: https://polyformproject.org/licenses/noncommercial/1.0.0
- Commercial use requires separate written permission or a commercial license from the Edituno copyright holder.
- Third-party libraries, icon geometry and artwork are not relicensed by Edituno and remain under their original upstream licenses.

See `LICENSE.md`, `LICENSE_SCOPE.md`, `NOTICE` and `THIRD_PARTY_NOTICES.md` for the complete project licensing scope.

## Third-party and legal notes

See:

- `LICENSE.md`
- `LICENSE_SCOPE.md`
- `NOTICE`
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
- The desktop home rail and Support menu entries open the internal Edituno Support page. PayPal opens only from the dedicated support CTA inside that page.
- The About page remains fully scrollable on mobile so all product and support information is accessible.


## Editor startup stability

v2.2.10 restores the `selectedTransformTarget()` helper used by the preview interaction layer. This fixes the runtime crash that could replace the editor with the startup error screen on desktop and mobile. The production build now explicitly validates that this helper is present before deployment.


## GPU Effects and Shader Transitions

Edituno v2.3.0 adds a real GPU Effects layer powered by MIT-licensed PixiJS 8.20.1 and PixiJS Filters 6.1.5. Bloom, Glitch, CRT, Old Film, RGB Split, Pixelate, Bulge and Dream Blur are applied to both preview and export, with a Canvas fallback for environments where GPU rendering is unavailable.

The Transitions panel also includes six explicitly MIT-licensed shaders from gl-transitions: Cross Zoom, Swirl, Mosaic, Circle Crop, Directional and Dreamy. These run as true two-frame WebGL transitions and gracefully fall back to a dissolve if WebGL is unavailable. See `THIRD_PARTY_NOTICES.md` and `THIRD_PARTY_LICENSES/`.


### Smart editing tools in v2.4.0

Phase 2 adds local, non-cloud smart editing:

- Auto Reframe powered by Smartcrop.js 2.0.5. Image clips use content-aware framing and video clips use a three-frame stability pass before Edituno maps the result to its own scale and offset model.
- Smart Audio powered by Meyda 5.6.3. Edituno extracts local audio features, detects silence regions and beat peaks, estimates BPM, renders timeline guides and can split V1 clips to the detected rhythm.
- All analysis happens on the user's device. Media is not uploaded for these features.


### Direct canvas editing in v2.5.0

Phase 3 adds a Konva-powered manipulation layer without replacing Edituno's renderer:

- Click text, overlays and stickers directly inside the preview to select them.
- Drag selected objects directly on the canvas.
- Resize from four corner handles with locked proportions.
- Rotate with a dedicated rotation handle and 0/90/180/270 degree snapping.
- Snap to center and rule-of-thirds guides while dragging.
- Text now supports persistent scale and rotation in preview and export.
- Existing Inspector controls remain available as a precise fallback.
- The Konva interaction layer hides during playback and does not alter exported pixels by itself.

Konva is pinned to 10.5.0 and remains MIT-licensed. See `THIRD_PARTY_NOTICES.md`.
