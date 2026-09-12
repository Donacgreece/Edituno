import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const fallbackSiteUrl = 'https://donacgreece.github.io/Edituno/'
function normalizeSiteUrl(value) {
  const raw = String(value || fallbackSiteUrl).trim()
  const parsed = new URL(raw)
  if (parsed.protocol !== 'https:' && parsed.hostname !== 'localhost') throw new Error('EDITUNO_SITE_URL must use HTTPS')
  parsed.hash = ''
  parsed.search = ''
  if (!parsed.pathname.endsWith('/')) parsed.pathname += '/'
  return parsed.toString()
}
const siteUrl = normalizeSiteUrl(process.env.EDITUNO_SITE_URL || fallbackSiteUrl)
const shareUrl = new URL('og/edituno-share.png', siteUrl).toString()
function renderSiteTokens(value) {
  return value
    .replaceAll('__EDITUNO_SITE_URL__', siteUrl)
    .replaceAll('__EDITUNO_SHARE_URL__', shareUrl)
}
const packageMeta = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
const template = fs.readFileSync(path.join(root, 'src', 'index.template.html'), 'utf8')
const css = fs.readFileSync(path.join(root, 'src', 'styles.css'), 'utf8')
const js = fs.readFileSync(path.join(root, '.build', 'app.js'), 'utf8')

// Fail the build if the compiled application is not valid classic-script JavaScript.
// This catches startup-breaking issues before they can reach GitHub Pages.
new Function(js)

if (packageMeta.license !== 'PolyForm-Noncommercial-1.0.0') throw new Error('Edituno SPDX license metadata is missing or incorrect')
for (const file of ['LICENSE.md', 'LICENSE_SCOPE.md', 'NOTICE', 'THIRD_PARTY_NOTICES.md']) {
  if (!fs.existsSync(path.join(root, file))) throw new Error(`Required legal file missing: ${file}`)
}

const dist = path.join(root, 'dist')
fs.rmSync(dist, { recursive: true, force: true })
fs.mkdirSync(dist, { recursive: true })

const html = renderSiteTokens(template)
  .replace('__EDITUNO_CSS__', () => css)
  .replace('__EDITUNO_JS__', () => js)

if (!js.includes('const $$ =')) {
  throw new Error('Compiled application validation failed: $$ helper missing')
}
if (!html.includes('const $$ =')) {
  throw new Error('Generated bundle validation failed: literal $$ was corrupted during HTML assembly')
}

const requiredRuntimeMarkers = [
  'function audioClipPanel()',
  'function bindTimelineInteractions()',
  'function bindAssetDragInteractions()',
  'function openMediaPicker(',
  'function scheduleAudioTracks(',
  'data-bind-audio',
  'function settingsModal()',
  'function mobileProjectCard(',
  'studio-home',
  'language-segment',
  'editor-topbar',
  'function projectActionsModal()',
  'function confirmationModal()',
  'function preferredAudioInsertTime()',
  'mediaImportContext',
  'function addAssetToOverlay(',
  'function bindPreviewInteractions()',
  'function selectedTransformTarget()',
  'timeline-overlay-row',
  'canvas-ratio-grid',
  'transition-card',
  'preset-card',
  'function bindBottomSheetGesture()',
  'FLUENT_TREE_API',
  'desktop-tool-menu',
  '4K · 2160p',
  'edituno-share.png',
  'application/ld+json',
  'application/ld+json',
  'function aboutPage()',
  'function installEnvironment()',
  'PAYPAL_SUPPORT_URL',
  'appinstalled',
  'function applyTheme(',
  "data-action=\"set-theme\"",
  "theme:'system'",
  "autoSave: true",
  'data-key="autoSave"',
  'theme-option-check'
]
for (const marker of requiredRuntimeMarkers) {
  if (!js.includes(marker) && !html.includes(marker)) throw new Error(`Production validation failed: ${marker} missing`)
}
if (js.includes("<button data-action=\"about\">${svgIcon('circle',18)}<span>${el?'Σχετικά':'About'}</span></button>")) {
  throw new Error('Desktop rail must not contain a duplicate About button')
}
if (js.includes('editor-brand desktop-editor-only')) {
  throw new Error('Editor header must not contain the desktop logo')
}
if (!js.includes('const padX = (parseFloat(style.paddingLeft) || 0) + (parseFloat(style.paddingRight) || 0)')) {
  throw new Error('Expanded preview sizing logic is missing')
}
if (!css.includes('.preview-zone{min-height:0;display:grid;place-items:center;padding:6px;')) {
  throw new Error('Desktop preview padding optimization is missing')
}
if (!css.includes('.preview-zone{padding:3px;min-height:0}')) {
  throw new Error('Mobile preview padding optimization is missing')
}
if (!template.includes('maximum-scale=1') || !template.includes('user-scalable=no')) {
  throw new Error('Mobile viewport lock is missing')
}
if (!css.includes('.timeline-audio') || !css.includes('.asset-browser') || !css.includes('.studio-home')) {
  throw new Error('Responsive multitrack/mobile-home CSS validation failed')
}
if (!css.includes('html[data-theme="light"]') || !css.includes('.theme-segment')) {
  throw new Error('Adaptive light theme CSS is missing')
}
if (!template.includes('prefers-color-scheme: light')) {
  throw new Error('Theme bootstrap is missing from the document head')
}
if (!css.includes('.theme-option-label') || !css.includes('.theme-option-check')) {
  throw new Error('Theme selector spacing CSS is missing')
}
if (!js.includes("data-key=\"autoSave\"") || !js.includes('autoSave: true')) {
  throw new Error('Autosave preference setting is missing')
}
if (!js.includes('function autoReframeSelected()') || !js.includes('smartcrop-2.0.5') || !js.includes('data-action="smart-reframe"')) {
  throw new Error('Phase 2 Auto Reframe implementation is missing')
}
if (!js.includes('function analyzeSelectedAudio()') || !js.includes('meyda-5.6.3') || !js.includes('data-action="smart-cut-beats"')) {
  throw new Error('Phase 2 Smart Audio implementation is missing')
}
if (!template.includes('vendor/smartcrop.js') || !template.includes('vendor/meyda.min.js')) {
  throw new Error('Phase 2 smart vendor scripts are missing from the document')
}
if (!js.includes('function bindKonvaCanvasEditor()') || !js.includes('new Konva.Transformer') || !js.includes('data-konva-direct-manipulation')) {
  throw new Error('Phase 3 Konva direct manipulation implementation is missing')
}
if (!js.includes('function exportProjectWebCodecs(') || !js.includes('function renderOfflineProjectAudio(') || !js.includes('new VideoFrameCtor(')) {
  throw new Error('Deterministic WebCodecs export engine is missing')
}
if (!js.includes('function prewarmExportAudioContext()') || !js.includes('function projectExpectsAudio(') || !js.includes('function renderMediaClockSegment(')) {
  throw new Error('Mobile audio export reliability layer is missing')
}
if (!js.includes('function decodeMp4AudioWithWebCodecs(') || !js.includes('function normalizedAacEncoderMetadata(') || !js.includes('vendor/mp4box.all.mjs')) {
  throw new Error('Safari MP4 audio decode and AAC metadata repair layer is missing')
}
if (!js.includes('function prepareSourceAacPassthrough(') || !js.includes('function muxSourceAacPassthrough(') || !js.includes('addAudioChunkRaw')) {
  throw new Error('iPhone source AAC passthrough export path is missing')
}
if (!js.includes('function exportProjectAppleMediabunny(') || !js.includes('MediabunnyAacEncoder') || !js.includes("A.registerAacEncoder()")) {
  throw new Error('Apple WASM AAC export engine is missing')
}
if (!js.includes('function exportProjectAppleMovPcm(') || !js.includes("new M.MovOutputFormat") || !js.includes("codec: 'pcm-s16'") || !js.includes("type: 'video/quicktime'")) {
  throw new Error('Apple MOV/PCM compatibility export engine is missing')
}
if (!js.includes('function validateApplePcmMov(') || !js.includes("blobChunkContainsAscii(blob, 'sowt')")) {
  throw new Error('Apple PCM MOV structural validation is missing')
}
if (!template.includes('vendor/mediabunny.min.cjs') || !template.includes('vendor/mediabunny-aac-encoder.min.js')) {
  throw new Error('Mediabunny browser runtimes are missing from the document')
}
if (!js.includes('function validateExportAudioEnergy(') || !js.includes("throw new Error('export-silent-audio')")) {
  throw new Error('Audible export validation is missing')
}
if (!js.includes("throw new Error('offline-audio-decode')") || !js.includes("validateExportBlob(blob, projectExpectsAudio(project))")) {
  throw new Error('Silent-audio export prevention is missing')
}
if (!js.includes("codec: 'mp4a.40.2'") || !js.includes("codec: 'avc'")) {
  throw new Error('Deterministic AVC/AAC export codec configuration is missing')
}
if (!js.includes('function seekExportFrameExact(') || !js.includes('function drawDeterministicOverlays(')) {
  throw new Error('Deterministic frame seeking/rendering path is missing')
}
if (!js.includes('function exportProjectRealtimeFallback(') || !js.includes('function exportCanvasStream(')) {
  throw new Error('Realtime compatibility export fallback is missing')
}
if (!template.includes('vendor/mp4-muxer.js')) {
  throw new Error('mp4-muxer browser bundle is missing from the document')
}
if (!template.includes('vendor/konva.min.js')) {
  throw new Error('Konva browser bundle is missing from the document')
}
if (!css.includes('.konva-editor-layer') || !css.includes('.konva-editor-hint')) {
  throw new Error('Phase 3 Konva editor CSS is missing')
}
if (js.includes("isMobileViewport() && launch.get('home')!=='1'")) {
  throw new Error('Mobile must not auto-enter the editor')
}
if (js.includes('onclick=\"event.stopPropagation()\"')) {
  throw new Error('Inline modal propagation blockers are forbidden')
}
fs.writeFileSync(path.join(dist, 'index.html'), html)

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true })
  for (const item of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, item.name)
    const dst = path.join(to, item.name)
    if (item.isDirectory()) copyDir(src, dst)
    else fs.copyFileSync(src, dst)
  }
}

copyDir(path.join(root, 'public'), dist)
const vendorDir = path.join(dist, 'vendor')
fs.mkdirSync(vendorDir, { recursive: true })
const pixiCandidates = [
  path.join(root,'node_modules','pixi.js','dist','pixi.min.js'),
  path.join(root,'public','vendor','pixi.min.js')
]
const filtersCandidates = [
  path.join(root,'node_modules','pixi-filters','dist','browser','pixi-filters.min.js'),
  path.join(root,'node_modules','pixi-filters','dist','pixi-filters.min.js'),
  path.join(root,'public','vendor','pixi-filters.min.js')
]
function copyVendor(candidates,target,label,minBytes) {
  const source=candidates.find(file=>fs.existsSync(file) && fs.statSync(file).size >= minBytes)
  if(source){fs.copyFileSync(source,target);return source}
  if(process.env.CI)throw new Error(`${label} browser bundle missing or invalid`)
  console.warn(`${label} browser bundle unavailable locally; keeping public/vendor fallback placeholder`)
  return null
}
copyVendor(pixiCandidates,path.join(vendorDir,'pixi.min.js'),'PixiJS 8.20.1',500000)
copyVendor(filtersCandidates,path.join(vendorDir,'pixi-filters.min.js'),'pixi-filters 6.1.5',100000)
const smartcropCandidates = [
  path.join(root,'node_modules','smartcrop','smartcrop.js'),
  path.join(root,'public','vendor','smartcrop.js')
]
const meydaCandidates = [
  path.join(root,'node_modules','meyda','dist','web','meyda.min.js'),
  path.join(root,'public','vendor','meyda.min.js')
]
copyVendor(smartcropCandidates,path.join(vendorDir,'smartcrop.js'),'Smartcrop.js 2.0.5',1)
copyVendor(meydaCandidates,path.join(vendorDir,'meyda.min.js'),'Meyda 5.6.3',1)
const konvaCandidates = [
  path.join(root,'node_modules','konva','konva.min.js'),
  path.join(root,'public','vendor','konva.min.js')
]
copyVendor(konvaCandidates,path.join(vendorDir,'konva.min.js'),'Konva 10.5.0',1)
const mp4MuxerCandidates = [
  path.join(root,'node_modules','mp4-muxer','build','mp4-muxer.js'),
  path.join(root,'public','vendor','mp4-muxer.js')
]
copyVendor(mp4MuxerCandidates,path.join(vendorDir,'mp4-muxer.js'),'mp4-muxer 5.2.2',1)
const mp4boxCandidates = [
  path.join(root,'node_modules','mp4box','dist','mp4box.all.mjs'),
  path.join(root,'public','vendor','mp4box.all.mjs')
]
copyVendor(mp4boxCandidates,path.join(vendorDir,'mp4box.all.mjs'),'mp4box 2.4.1',1)
const mediabunnyCandidates = [
  path.join(root,'node_modules','mediabunny','dist','bundles','mediabunny.min.cjs'),
  path.join(root,'node_modules','mediabunny','dist','bundles','mediabunny.cjs'),
  path.join(root,'public','vendor','mediabunny.min.cjs')
]
const mediabunnyAacCandidates = [
  path.join(root,'node_modules','@mediabunny','aac-encoder','dist','bundles','mediabunny-aac-encoder.min.js'),
  path.join(root,'node_modules','@mediabunny','aac-encoder','dist','bundles','mediabunny-aac-encoder.js'),
  path.join(root,'public','vendor','mediabunny-aac-encoder.min.js')
]
copyVendor(mediabunnyCandidates,path.join(vendorDir,'mediabunny.min.cjs'),'Mediabunny 1.56.2',1)
copyVendor(mediabunnyAacCandidates,path.join(vendorDir,'mediabunny-aac-encoder.min.js'),'Mediabunny AAC encoder 1.56.2',1)
for (const legal of ['LICENSE.md','LICENSE_SCOPE.md','NOTICE','THIRD_PARTY_NOTICES.md','OPEN_SOURCE_STACK.md']) {
  const src=path.join(root,legal); if(fs.existsSync(src))fs.copyFileSync(src,path.join(dist,legal))
}
const thirdPartyLicenses=path.join(root,'THIRD_PARTY_LICENSES');if(fs.existsSync(thirdPartyLicenses))copyDir(thirdPartyLicenses,path.join(dist,'THIRD_PARTY_LICENSES'))
for (const file of ['LICENSE.md', 'LICENSE_SCOPE.md', 'NOTICE', 'THIRD_PARTY_NOTICES.md', 'OPEN_SOURCE_STACK.md']) {
  fs.copyFileSync(path.join(root, file), path.join(dist, file))
}
for (const filename of ['robots.txt', 'sitemap.xml', 'llms.txt']) {
  const target = path.join(dist, filename)
  const rendered = renderSiteTokens(fs.readFileSync(target, 'utf8'))
  fs.writeFileSync(target, rendered)
}
if (!html.includes(siteUrl) || !html.includes(shareUrl)) throw new Error('Dynamic site URL injection failed')
if (!fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8').includes(siteUrl)) throw new Error('Dynamic sitemap URL injection failed')
if (!fs.readFileSync(path.join(dist, 'robots.txt'), 'utf8').includes(new URL('sitemap.xml', siteUrl).toString())) throw new Error('Dynamic robots sitemap URL injection failed')
if (!fs.readFileSync(path.join(dist, 'LICENSE.md'), 'utf8').includes('PolyForm-Noncommercial-1.0.0')) throw new Error('Production license metadata missing')
if (!fs.readFileSync(path.join(dist, 'LICENSE_SCOPE.md'), 'utf8').includes('Third-party material')) throw new Error('Production license scope missing')
if (!fs.readFileSync(path.join(dist, 'NOTICE'), 'utf8').includes('Required Notice:')) throw new Error('Production required notice missing')
if (!fs.readFileSync(path.join(dist, 'THIRD_PARTY_NOTICES.md'), 'utf8').includes('Nothing in the Edituno license relicenses')) throw new Error('Production third-party license separation notice missing')
if (!fs.readFileSync(path.join(dist, 'THIRD_PARTY_NOTICES.md'), 'utf8').includes('## Konva')) throw new Error('Konva third-party notice missing')
if (!fs.existsSync(path.join(dist, 'THIRD_PARTY_LICENSES', 'KONVA-MIT.txt'))) throw new Error('Konva MIT license copy missing')
if (!fs.readFileSync(path.join(dist, 'THIRD_PARTY_NOTICES.md'), 'utf8').includes('## mp4-muxer')) throw new Error('mp4-muxer third-party notice missing')
if (!fs.existsSync(path.join(dist, 'THIRD_PARTY_LICENSES', 'MP4-MUXER-MIT.txt'))) throw new Error('mp4-muxer MIT license copy missing')
if (!fs.readFileSync(path.join(dist, 'THIRD_PARTY_NOTICES.md'), 'utf8').includes('## MP4Box.js')) throw new Error('MP4Box.js third-party notice missing')
if (!fs.existsSync(path.join(dist, 'THIRD_PARTY_LICENSES', 'MP4BOX-BSD-3-CLAUSE.txt'))) throw new Error('MP4Box.js BSD-3-Clause license copy missing')
if (!fs.readFileSync(path.join(dist, 'THIRD_PARTY_NOTICES.md'), 'utf8').includes('## Mediabunny')) throw new Error('Mediabunny third-party notice missing')
if (!fs.existsSync(path.join(dist, 'THIRD_PARTY_LICENSES', 'MEDIABUNNY-MPL-2.0.txt'))) throw new Error('Mediabunny MPL-2.0 license copy missing')
if (!fs.existsSync(path.join(dist, 'THIRD_PARTY_LICENSES', 'FFMPEG-LGPL-2.1.txt'))) throw new Error('FFmpeg LGPL-2.1 license copy missing')
console.log(`Built Edituno v2.7.1 -> ${dist}`)
