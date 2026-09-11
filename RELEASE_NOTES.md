# Edituno v1.1.1

Hotfix focused on startup reliability.

## Fixed

- Removed the redundant first splash screen.
- Kept only the clean “Starting editor…” startup shell.
- Fixed a production build bug where JavaScript `$$` identifiers were corrupted while being injected into HTML.
- Added build-time JavaScript syntax validation.
- Added generated-bundle validation so the same corruption cannot ship again.
- Updated PWA cache version to v1.1.1.
- Kept the official Edituno icon unchanged.

## Root cause

The build script used `String.replace(search, replacementString)` to inject compiled JavaScript into the HTML template. In JavaScript replacement strings, `$$` has special meaning and becomes a single `$`. The source helper named `$$` was therefore changed into `$` in production, producing two `const $` declarations and a parse error before the app could start.

The build now uses function replacers, which preserve JavaScript source literally.
