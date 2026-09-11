# Edituno Studio v2.2.1 Stability

## Stability fixes

- Reworked the mobile timeline so it scrolls only horizontally and never bounces vertically.
- Timeline audio, element and overlay drags now commit in place instead of rebuilding the full editor after every pointer release.
- Prevented the click generated after a touch drag from reopening a tool sheet and moving the workspace.
- Preserved the exact horizontal timeline viewport across structural edits and rerenders.
- Rebuilt desktop side panels as bounded scroll containers so video and audio controls cannot escape their columns.
- Aligned the JavaScript and CSS mobile breakpoint at 979px to prevent mixed mobile/desktop layouts.
- Retained draggable sheets, Fluent Emoji, compositing layers and 4K export from v2.2.0.
