# Edituno

Edituno is a mobile-first, local-first PWA video editor.

## Product principles

- Light, minimal interface using Vivid Azure `#2455F5` and Cloud Violet `#F7DCFF`
- Mobile-first editor with safe-area support and native-style bottom sheets
- No account required
- No watermark
- Media files remain local to the browser/device
- PWA installation with Apple touch icon and iOS startup images
- Greek and English UI

## Editing features

- Import video, image and audio files
- Sequential multi-clip timeline
- Trim, split, duplicate, reorder and delete clips
- Speed and volume controls
- Scale, position, rotation, opacity, contain/cover and mirror controls
- Brightness, contrast, saturation, hue, blur, grayscale and sepia adjustments
- Filter presets: Original, Vivid, Warm, Cool, Mono, Film, Dream and Crisp
- Motion presets: zoom, zoom out, pan left, pan right and shake
- Fade and flash transitions
- Titles, captions and sticker-style text layers
- Text position, color, size, weight, background and animation controls
- SRT subtitle import
- Background soundtrack with volume and loop controls
- 16:9, 9:16, 1:1 and 4:5 canvases
- Undo/redo history
- Local IndexedDB autosave
- 720p or 1080p export at 24, 30 or 60 fps
- MP4 when supported by MediaRecorder, WebM fallback otherwise
- Web Share support on compatible mobile browsers

## Deployment

This release is intentionally static and dependency-free. There is no Node build step required for production. GitHub Pages deploys the repository root directly using `.github/workflows/deploy-pages.yml`.

In GitHub repository settings, set **Pages > Build and deployment > Source** to **GitHub Actions**.

The public URL for this repository is expected to be:

`https://donacgreece.github.io/Edituno/`

## Browser support

Modern Chromium, Safari and Firefox browsers are targeted. Browser codec support determines whether export is MP4 or WebM. Real-time local rendering can take approximately the project duration and can consume significant battery on mobile devices.

## Privacy note

Project metadata and imported media are stored locally in IndexedDB. Edituno does not include a media upload backend in this release.
