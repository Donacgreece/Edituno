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
  'function settingsModal()'
]
for (const marker of requiredRuntimeMarkers) {
  if (!js.includes(marker) && !html.includes(marker)) throw new Error(`Production validation failed: ${marker} missing`)
}
if (!template.includes('maximum-scale=1') || !template.includes('user-scalable=no')) {
  throw new Error('Mobile viewport lock is missing')
}
if (!css.includes('.timeline-audio') || !css.includes('.desktop-sidebar')) {
  throw new Error('Responsive multitrack CSS validation failed')
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
console.log(`Built Edituno v1.3.0 -> ${dist}`)
