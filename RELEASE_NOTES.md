# Edituno v1.1.0 Production

This release replaces the temporary single-JavaScript prototype with a TypeScript source project and a hardened GitHub Pages production bundle.

## Startup reliability

The visible app shell now renders before IndexedDB or service-worker work begins. The production JavaScript and CSS are embedded directly into `dist/index.html`, so stale or missing external bundle files cannot leave the app on a blank page after the splash screen.

A fatal startup fallback is also embedded in the HTML. If a runtime error occurs before the editor can render, the user sees a reload action instead of an empty page.

## PWA

The service worker now handles navigation and PWA assets only. It no longer intercepts application CSS or JavaScript because those are part of the HTML itself.

## Brand

The 512px app icon is byte-for-byte the official icon supplied for Edituno. The same artwork is used for the in-app logo and Apple startup screens.
