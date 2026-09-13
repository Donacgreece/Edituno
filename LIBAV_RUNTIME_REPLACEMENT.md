# Replacing the LibAV / FFmpeg audio runtime

Edituno first-party code is licensed separately from the LibAV.js / FFmpeg WebAssembly audio runtime.

The production runtime is distributed as separate files under `vendor/libav/` and is not embedded in Edituno's first-party JavaScript bundle.

## Default runtime

- libav.js: 6.10.9.0
- pinned upstream commit: `c80e885c3461f7bb7ea565c9631b34243ae0dbf1`
- FFmpeg: 9.0
- variant: `edituno-audio-cli`
- build recipe: `tools/build-libav-audio.sh`
- variant configuration: `tools/libav-edituno-audio-config.json`

The corresponding source is distributed with the production application under `third-party-source/`.

## Using a compatible modified runtime

A compatible rebuilt runtime can replace the files in `vendor/libav/` while keeping the same LibAV.js API and filenames.

For development or a separately deployed compatible runtime, Edituno also supports setting this global before the editor requests the audio engine:

```html
<script>
window.EDITUNO_LIBAV_BASE = '/my-compatible-libav-runtime/'
</script>
```

The directory must expose the compatible runtime entry and its WebAssembly target using the same version/variant filenames expected by Edituno.

The LibAV runtime is lazy-loaded only when the Safari/WebKit audio export path needs it. Replacing or modifying the runtime does not require relicensing Edituno first-party source under the LGPL, and Edituno's PolyForm terms are not intended to restrict rights granted under the third-party runtime's upstream licenses.

This document records the project's technical component boundary and replacement mechanism. It is not legal advice.
