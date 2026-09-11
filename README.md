# Edituno v1.3.0 Pro

Edituno is a mobile-first, local-first PWA video editor for creators.

## Production architecture

The canonical application source lives in `src/app.ts` and `src/styles.css`. The prebuilt `dist/` folder is deployed directly to GitHub Pages. Media and project data stay on the user's device through IndexedDB, with a session fallback when storage is unavailable.

## v1.3 highlights

- Responsive editor from 320px mobile screens through ultrawide desktop
- Desktop landing page and project library
- Scrollable desktop media and inspector panels
- Functional settings for language, preview quality, timeline snapping, waveform visibility and export defaults
- Multi-track timeline with video, audio and text lanes
- Multiple audio clips with independent position, trim, speed, volume, mute, fade-in and fade-out
- Audio waveform generation for imported music
- Drag audio clips directly on the timeline
- Drag-to-reorder visual clips on desktop
- Local audio mixing in preview and export
- Filters, motion effects, adjustments and transitions
- Text, titles, captions, stickers and SRT import
- Undo/redo, autosave, 720p/1080p export and 24/30/60fps options
- PWA splash screens, offline app shell and mobile zoom lock

## Build

```bash
npm install
npm run build
```

## Deploy

GitHub Pages publishes the checked-in `dist/` directory through `.github/workflows/deploy-pages.yml`.
