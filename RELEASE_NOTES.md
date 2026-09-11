# Edituno v1.4.0 Mobile Excellence

This release is focused on the product's core differentiator: a clear, touch-first editing experience that behaves predictably on phones while preserving a full desktop editor.

## Mobile home

- Mobile no longer enters the editor automatically.
- New app dashboard with New Project, Import Media, Continue Editing, formats and recent projects.
- Fixed bottom navigation for Home, Create, Projects and Settings.
- Consistent 44px minimum touch targets and safe-area support.

## Settings reliability

- Fixed the event-propagation bug that made controls inside Settings appear dead.
- Language switching now updates immediately and shows a visible selected state.
- Close, Done, toggle, export default, preview and storage controls work through the same delegated event system.
- Settings are full-screen on mobile and modal on desktop.

## Editor UX

- Mobile header always exposes Home, Settings and Export without overflowing.
- 16:9 preview is measured against the actual available viewport and cannot escape the screen.
- Mobile tool dock has uniform geometry and centered icons.
- Transition control replaced with a centered cross-transition icon and larger hit target.
- Bottom sheets stay inside the viewport and remain scrollable.
- Removed the global touch-end click suppression that could swallow taps.
- Double-tap/pinch zoom prevention remains through viewport and gesture handling.

## Typography and visual system

- Lighter native system type hierarchy based on SF Pro / Segoe UI Variable.
- Reduced unnecessary bold weights.
- Unified radii, hit areas, pressed states and selected states.

## Regression checks

Build validation now rejects:

- mobile auto-entry into the editor
- inline propagation blockers inside modals
- missing mobile home UI
- missing settings language UI
- missing multitrack/audio runtime code

Automated browser checks were run at 320×568, 360×800, 390×844, 430×932, 768×1024 and 1440×900.
