# Edituno

**Create without limits.**

Edituno is a local-first, installable browser video editor built for creators. Media is processed on the user's device and is not uploaded to an Edituno server.

## v0.1.0

The first market-ready foundation includes:

- PWA installation and offline app shell
- English and Greek interface
- Local project storage with IndexedDB
- Video, image and audio import
- Sequential multi-clip timeline
- Trim controls
- Clip speed, volume, scale, rotation, opacity and fit controls
- 16:9, 9:16, 1:1 and 4:5 canvases
- Text, title and caption overlays
- Background soundtrack with volume and loop controls
- 720p and 1080p local export
- 24, 30 and 60 fps export options
- MP4 export when supported by the browser, with WebM fallback
- No watermark
- No account required

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## GitHub Pages

A GitHub Actions workflow is included in `.github/workflows/deploy-pages.yml`. In the repository settings, choose **GitHub Actions** as the Pages source. Every push to `main` then builds and deploys Edituno automatically.

## Browser notes

Edituno uses modern browser APIs including Canvas, MediaRecorder, IndexedDB and Service Workers. Chromium-based desktop browsers currently provide the best editing and export experience. Export is intentionally local and currently runs in real time for maximum compatibility.

## Privacy

Imported media is stored locally in the browser using IndexedDB. Edituno v0.1.0 does not upload project media to a backend.

## Roadmap

The architecture is prepared for a richer non-destructive timeline, transitions, keyframes, WebCodecs accelerated rendering, automatic captions, waveform editing and rhythm-aware tools.

Copyright © 2026 Edituno. All rights reserved.
