# Edituno v1.2.0 Studio

A mobile-first, local video editor PWA. TypeScript is the canonical source and `dist/` is the prebuilt GitHub Pages release.

## Product behavior

- Mobile launches directly into the editor and resumes the most recent project.
- Desktop opens a minimal product landing/project hub before the editor.
- One unified splash experience is used. Apple startup images match the in-app splash.
- Pinch and double-tap page zoom are disabled inside the mobile app shell.
- Video, image and audio media remain local in IndexedDB.

## Editing

Multi-clip timeline, trim, split, duplicate, reorder, speed, volume, transforms, text/captions, SRT import, soundtrack, effects, color adjustments, motion presets, transitions, undo/redo, autosave and local export.

## Development

```powershell
npm.cmd install
npm.cmd run build
```

The repository includes a prebuilt `dist/`, so GitHub Pages deployment does not depend on npm.
