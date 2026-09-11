# Edituno

Edituno is a mobile-first, local-first video editor PWA for creators.

## Production architecture

The canonical application source is TypeScript in `src/app.ts`. The production site in `dist/` is prebuilt and self-contained so GitHub Pages can deploy without npm, Vite, React, a CDN, or any runtime dependency.

The production `dist/index.html` contains the compiled application JavaScript and CSS inline. This deliberately removes the two failure points that affected the earlier prototype: a cached external stylesheet and a cached external JavaScript bundle.

## Included in v1.1.1

- Mobile-first light UI using Vivid Azure `#2455F5` and Cloud Violet `#F7DCFF`
- Exact official Edituno icon supplied for the brand
- Greek and English UI
- Installable PWA and Apple startup images
- Local projects in IndexedDB
- Local media blobs, no account and no upload required
- Video, image and audio import
- Multi-clip timeline
- Split, duplicate, reorder and delete
- Trim, speed and clip volume
- Scale, rotation, X/Y offset, opacity, cover/contain and mirroring
- Brightness, exposure, contrast, saturation, temperature, hue, blur, grayscale and sepia
- Vignette and film grain
- Filter presets: Original, Vivid, Warm, Cool, Mono, Film, Dream, Crisp, Cinematic, Retro and Soft
- Motion effects: Zoom, Zoom out, Pan left, Pan right and Shake
- Fade and Flash transitions with adjustable duration
- Titles, captions and sticker text
- Text positioning, weight, color, background, stroke and animation
- SRT subtitle import
- Background soundtrack, volume and loop
- 16:9, 9:16, 1:1 and 4:5 canvas formats
- Undo and redo
- Autosave
- 720p and 1080p export
- 24, 30 and 60 fps export
- MP4 when supported by the browser, WebM fallback
- Web Share support on compatible mobile browsers
- No watermark

## Source and build

The prebuilt `dist/` directory is committed, so production deployment does not depend on a build runner.

For development:

```bash
npm install
npm run build
```

The build performs:

1. TypeScript compilation to `.build/app.js`
2. Inlining the compiled JavaScript and CSS into `dist/index.html`
3. Copying PWA assets from `public/` to `dist/`

## Deployment

GitHub Pages deploys the committed `dist/` directory using `.github/workflows/deploy-pages.yml`.

## Browser notes

Modern Chromium-based browsers provide the broadest local video export support. Safari/iOS support depends on the codecs exposed by the browser. Edituno chooses the best MediaRecorder output format available at runtime.

Large 4K source files remain limited by device memory and browser media capabilities because Edituno intentionally processes media locally.

## Privacy

Project metadata and imported media stay in the browser's local storage. Edituno v1.1.1 does not send project media to an Edituno backend.
