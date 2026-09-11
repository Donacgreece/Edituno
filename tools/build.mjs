import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const template = fs.readFileSync(path.join(root, 'src', 'index.template.html'), 'utf8')
const css = fs.readFileSync(path.join(root, 'src', 'styles.css'), 'utf8')
const js = fs.readFileSync(path.join(root, '.build', 'app.js'), 'utf8')

// Fail the build if the compiled application is not valid classic-script JavaScript.
// This catches startup-breaking issues before they can reach GitHub Pages.
new Function(js)

const dist = path.join(root, 'dist')
fs.rmSync(dist, { recursive: true, force: true })
fs.mkdirSync(dist, { recursive: true })

const html = template
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
  'mediaImportContext'
]
for (const marker of requiredRuntimeMarkers) {
  if (!js.includes(marker) && !html.includes(marker)) throw new Error(`Production validation failed: ${marker} missing`)
}
if (!template.includes('maximum-scale=1') || !template.includes('user-scalable=no')) {
  throw new Error('Mobile viewport lock is missing')
}
if (!css.includes('.timeline-audio') || !css.includes('.asset-browser') || !css.includes('.studio-home')) {
  throw new Error('Responsive multitrack/mobile-home CSS validation failed')
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
console.log(`Built Edituno v2.0.2 -> ${dist}`)
