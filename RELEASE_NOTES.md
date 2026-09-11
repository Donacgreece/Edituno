# Edituno v1.0 Live

This release replaces the initial dark desktop-oriented prototype with a mobile-first light PWA.

## UX

- New light visual system based on Vivid Azure `#2455F5` and Cloud Violet `#F7DCFF`
- Mobile-first dashboard and editor
- Native-style bottom navigation and bottom sheets
- 44px+ touch targets and iPhone safe-area support
- Minimal product UI, without decorative fake-editor hero mockups
- Responsive desktop workspace with media and property panels
- Greek and English from first launch

## PWA

- Standalone manifest
- Offline application shell
- Apple touch icon
- iPhone startup images / splash screens
- Light status bar and white launch background
- Install flow for Chromium and instructions for iOS Add to Home Screen
- Persistent-storage request in Settings

## Editing

- Video, image and audio import
- Local IndexedDB project and media storage
- Timeline with sequential clips and timed text layers
- Trim, split, duplicate, move and delete
- Speed, volume, opacity, rotation, scale, pan, contain/cover and mirror
- Brightness, contrast, saturation, hue, blur, grayscale and sepia
- Eight visual filter presets
- Zoom, zoom-out, pan and shake motion effects
- Fade and flash transitions
- Titles, captions and sticker text
- Text animations and styling
- SRT subtitle import
- Soundtrack selection, volume and looping
- Undo and redo
- Autosave
- 16:9, 9:16, 1:1 and 4:5 canvases

## Export

- Local canvas rendering
- 720p and 1080p
- 24, 30 and 60 fps
- MP4 where the browser exposes a compatible MediaRecorder encoder
- WebM fallback
- Local file save
- Web Share on supported mobile browsers
- No watermark

## Deployment

The production app is now static and dependency-free. GitHub Pages no longer requires npm, Vite, a package lock or a Node build job.
