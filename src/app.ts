// @ts-nocheck
/* Edituno v2.6.1 Konva Canvas release. TypeScript is canonical; dist is prebuilt for GitHub Pages.
 * Edituno first-party code: SPDX-License-Identifier: PolyForm-Noncommercial-1.0.0
 * Third-party materials retain their original licenses; see THIRD_PARTY_NOTICES.md.
 */
const $ = (s, root = document) => root.querySelector(s)
const $$ = (s, root = document) => [...root.querySelectorAll(s)]
const clamp = (n, min, max) => Math.min(max, Math.max(min, Number(n)))
const uid = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`)
const clone = value => typeof structuredClone === 'function' ? structuredClone(value) : JSON.parse(JSON.stringify(value))
const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))
const fmtBytes = n => !n ? '0 B' : n < 1024*1024 ? `${(n/1024).toFixed(0)} KB` : n < 1024*1024*1024 ? `${(n/1024/1024).toFixed(1)} MB` : `${(n/1024/1024/1024).toFixed(1)} GB`
const fmtTime = value => {
  value = Math.max(0, Number(value) || 0)
  const m = Math.floor(value / 60)
  const s = Math.floor(value % 60)
  const t = Math.floor((value % 1) * 10)
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}.${t}`
}

const EDITUNO_ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAIAAAB7GkOtAAAMT0lEQVR4nO3dy3EcyRWGUVDBFe0YLmUO6YssGF/oziwZYwYZWmoBBQUR76583Jv/OWsuEsGq+1VmNRof/vjy4w6APP/YvQAA9hAAgFACABBKAABCCQBAKAEACCUAAKEEACCUAACEEgCAUAIAEEoAAEIJAEAoAQAIJQAAoQQAIJQAAIQSAIBQAgAQSgAAQgkAQCgBAAglAAChBAAglAAAhBIAgFACABBKAABCCQBAKAEACCUAAKEEACCUAACEEgCAUAIAEEoAAEIJAEAoAQAIJQAAoQQAIJQAAIQSAIBQAgAQSgAAQgkAQCgBAAglAAChBAAglAAAhBIAgFACABBKAABCCQBAKAEACCUAAKEEACCUAACEEgCAUAIAEEoAAEIJAEAoAQAIJQAAoQQAIJQAAIQSAIBQAgAQSgAAQgkAQCgBAAglAAChBAAglAAAhBIAgFACABBKAABCCQBAKAEACCUAAKEEACDUx90LAA7315+f3vLP/vmvn7NXwm8+/PHlx+41AKd549B/jhisIQDAMBfn/mNKMJUAAAMMH/0PycAkAgBcMnX0PyQDwwkAcKNlo/8hGRhIAIB32zL6H5KBIfweAPA+26d/kTUcQACAd6gzeeuspC8BAN6q2syttp52vAMAXld81HolcBs7AOAVxaf/XYcV1iQAwEu6zNYu6yxFAABCCQDwrF6P1b1WW4EAAE/rOE87rnkjAQCe0HeS9l35egIA/K77DO2+/mUEACCUAAD/54zH5zN+itkEACCUAAD/c9KD80k/yyQCABBKAID/Ou+R+byfaCwBAAglAMDd3bkPy6f+XEN83L0A6vr+zZ1ziM9ffV0+TxAA7u7M+tM9+f+rCviLYLkMfX7599+7VzCZPxn2JDuALIY+8IsARDD3gccE4GTmPvACATiT0Q+8ykvgo5j73OD4N8D3vAd+zA7gEEY/8F4C0J7RD9zGV0H0ZvoDN7MD6MroBy4SgH6MfmAIR0DNmP7AKHYAbRj9wFh2AD2Y/sBwAtCA6Q/M4AioNKMfmEcA6qow/f3NkANUuJCoyXcBFbXlpjXuQzy+uo7/OiBfBPQkO4CKVk5/Qz/Qw/90+4NkAlDOmhvS3Ofe/ZXw158ykEgAClkw+s194BcBqGL29Df6gd94CVzCvOlv7vNGB58CeQP8HDuA/SZNf6MfeJnfBD6T6Q+8yhHQZsMf/41+bnbkKZDznxc4Atpp7PQ3+oF3cQS0jelPNec9LJ/3E40lAHuY/sB23gFsMHD6G/0Md8ybAI//r7IDaMz0B64QgNVGPf6b/kxyxoPzGT/FbAKwlOkP1CEA65j+dNH98bn7+pcRgE4+f/1p+rNG3xnad+XrCcAi/uwG7XScpB3XvJEArDBk+nv2Z71e87TXaisQgB5Mf2A4AZju+uO/6c9GXR6ru6yzFAGozvRnu/qztf4Ka/JVEHNdfPw3/Sml4LdEGP1X2AFM5JM/HKbatK22nnYEoC6P/xRUZ+bWWUlfAjCLwx9OVWHyVljDAfxFsIpMf4q7n79bXgkY/QMJwBRO/0mwOANG/3ACUI7Hf3pZkAGjfxIBAAaYlAGjfyq/BzDelfMfj/+c4WIJzP017AAKMf05xsMJ/sYYGPrrCcBgXv/Cb0z2svweQBUe/4HFBAAglACM5PwHaEQASnD+A6wnAAChBGCYm89/PP4DWwgAQCgBAAglAJs5/wF2EYAxfAAUaEcAAEIJwE7Of4CNBAAglAAM4AUA0JEAAIQSgG28AAD2EgCAUAIAEEoAAEIJAEAoAbjKZ0CBpgRgDx8BArYTAIBQAgAQSgAAQgkAQCgBAAglAAChBAAglAAAhBIAgFACABBKAABCCQBAKAEACCUAAKEEACCUAACEEgCAUAIAEEoAAEIJAEAoAQAIJQAAoQQAIJQAAIQSAIBQAgAQSgAAQgkAQCgBAAglAAChBAAglAAAhBIAgFACABBKAABCCQBAKAEACCUAAKEEACCUAMBV37992r0EuIUAwADfv32SAdoRABhGA+hFAGAkWwEaEQAYTwZoQQBgFhmgOAGAuTSAsgQAprMVoCYBgEVkgGoEAJaSAeoQANhAA6hAAGAPWwG2EwDYSQbYSABgPxlgCwGAKjSAxQQACrEVYCUBgHJkgDUEAIqSAWYTAChNA5hHAKA6WwEmEQDoQQYYTgCgExlgIAGAfjSAIQQAWrIV4DoBgMZkgCsEANqTAW4jAHAIDeC9BADOYSvAuwgAnEYGeCMBgDPJAK8SADiZBvACAYDD2QrwHAGACDLAYwIAQWSAhwQA4mgA9wQAEtkKcHd393H3AoANPn/9uXsJ7GcHAHFMf+7ZAUAQo5+HBAAiGP08JgBwOKOf53gHACcz/XmBHQCcyejnVQIApzH6eSMBgHMY/byLdwBwCNOf97IDgPaMfm4jANCY0c8VAgAtGf1c5x0A9GP6M4QdAHRi9DOQAEAPRj/DCQBUZ/QziXcAUJrpzzx2AFCU0c9sAgDlGP2sIQBQiNHPSt4BQBWmP4vZAcB+Rj9bCADsZPSzkQDAHkY/23kHABuY/lRgBwBLGf3UIQCwiNFPNQIA0xn91OQdAMxl+lOWHQDMYvRTnADAeEY/LQgAjGT004h3ADCM6U8vdgAwgNFPR3YAcJXpT1MCABBKAABCCQBAKAEACCUAAKEEACCUAACEEgCAUAIAEEoAAEIJAEAoAQAIJQAAoQQAIJQAAIQSAIBQAgAQSgAAQgkAQCgBAAglAAChBAAglAAAhBIAgFACABBKAABCCQBAKAEACCUAAKEEACCUAACEEgCAUAIAEEoAAEIJAEAoAQAIJQAAoQQAIJQAAIQSgD2+f/u0ewlAOgG46vPXn7uXAHALAQAIJQAAoQQAIJQAAIQSgG18EAjYSwAAQgnAAD4JCnQkAAChBGAnrwGAjQQAIJQAjOE1ANCOAGzmFAjYRQAAQgkAQCgBGObm1wBOgYAtBAAglACUYBMArCcAI/kwKNCIAACEEoAqnAIBiwnAYE6BgC4EoBCbAGAlARjvyiZAA4BlBAAglACUYxMArCEAU3gVDNQnABXZBAALCMAsFzcBGgDMJgB1aQAwlQBM5E0AUJkAzOUgCChLAKrTAGASAZju+kGQBgAzCEAPGgAMJwArDHkbrAHAWB93LyDF568/TXBCXL/UfYJuDQHo5P6+cm9QlqecXhwBrTNqcLvHqGnUlekRZxkBWEoDOJXp35EArKYBnMf0b0oAGtMAKnAd9vXhjy8/dq8h0dh7xnMTW7iMu7MD2GPste4RjPVM/wMIwDYaQF+m/xkcAW02fHC7l5jKFXsSAdhvxsO7m4rhXKjncQR0JidCjOWKOpIdQAnz7i5PWFzk4jyYAFQx+wnLzca7uCATCEAhC3bZ7jpe5TrMIQDlrDlsdQfyGxdeIAGoaOULNzdkOBdbMgEoasuHLtyfIVxd3BOAuip88M5NewAXEs8RgNIq3LpwkelflgA0IAM0ZfQX5zeBG3AX0ZHrtj4B6MG9RC+u2BYcATXjOIjijP5G7ACacXdRmeuzFzuArmwFKMXo70gAepMBtjP6+3IE1Jt7j71cga3ZARzCVoDFjP4DCMBRZIAFjP5jCMCZlIDhzP3zCMDJZIAhjP5TCUAEJeAG5v7xBCCLEvAqcz+HAOQSA34x9DMJAHd3YhDJ0EcAeJYqHMOs50kCABDKV0EAhBIAgFACABBKAABCCQBAKAEACCUAAKEEACCUAACEEgCAUAIAEEoAAEIJAEAoAQAIJQAAoQQAIJQAAIQSAIBQAgAQSgAAQgkAQCgBAAglAAChBAAglAAAhBIAgFACABBKAABCCQBAKAEACCUAAKEEACCUAACEEgCAUAIAEEoAAEIJAEAoAQAIJQAAoQQAIJQAAIQSAIBQAgAQSgAAQgkAQCgBAAglAAChBAAglAAAhBIAgFACABBKAABCCQBAKAEACCUAAKEEACCUAACEEgCAUAIAEEoAAEIJAEAoAQAIJQAAoQQAIJQAAIQSAIBQAgAQSgAAQgkAQCgBAAglAAChBAAglAAAhBIAgFACABBKAABCCQBAKAEACCUAAKEEACCUAACEEgCAUAIAEEoAAEIJAEAoAQAIJQAAoQQAIJQAAIQSAIBQAgAQSgAAQgkAQCgBAAglAAChBAAglAAAhBIAgFACABBKAABCCQBAKAEACCUAAKEEACCUAACE+g/T5cMpa6VPkQAAAABJRU5ErkJggg=='


const PAYPAL_SUPPORT_URL = 'https://www.paypal.com/paypalme/DimitrisGalatsanos'
const INSTALL_STATE_KEY = 'edituno-pwa-installed-v1'

function isStandaloneMode() {
  try {
    return window.matchMedia('(display-mode: standalone)').matches ||
      window.matchMedia('(display-mode: fullscreen)').matches ||
      window.navigator.standalone === true ||
      document.referrer.startsWith('android-app://')
  } catch { return false }
}
function storedInstallState() {
  try { return localStorage.getItem(INSTALL_STATE_KEY) === '1' } catch { return false }
}
function markAppInstalled() {
  try { localStorage.setItem(INSTALL_STATE_KEY, '1') } catch {}
}
function isAppInstalled() {
  const installed=isStandaloneMode() || storedInstallState()
  if(installed && !storedInstallState()) markAppInstalled()
  return installed
}
function installEnvironment() {
  const ua=String(navigator.userAgent||'')
  const touchMac=/Macintosh/i.test(ua) && Number(navigator.maxTouchPoints||0)>1
  const ios=/iPhone|iPad|iPod/i.test(ua) || touchMac
  const android=/Android/i.test(ua)
  const windows=/Windows/i.test(ua)
  const mac=!ios && /Macintosh|Mac OS X/i.test(ua)
  const edge=/Edg\//i.test(ua)
  const firefox=/Firefox|FxiOS/i.test(ua)
  const chrome=!edge && /Chrome|CriOS/i.test(ua)
  const safari=!chrome && !edge && /Safari/i.test(ua)
  let platform=ios?'ios':android?'android':windows?'windows':mac?'mac':'desktop'
  let browser=edge?'edge':firefox?'firefox':chrome?'chrome':safari?'safari':'browser'
  return {platform,browser,ios,android,windows,mac,label:platform==='ios'?'iPhone / iPad':platform==='android'?'Android':platform==='windows'?'Windows':platform==='mac'?'Mac':'Desktop'}
}

function safeLanguage() {
  try {
    const saved = localStorage.getItem('edituno-language')
    if (saved === 'el' || saved === 'en') return saved
  } catch {}
  try {
    return navigator.language?.toLowerCase().startsWith('el') ? 'el' : 'en'
  } catch {
    return 'en'
  }
}

function safeSetLanguage(value) {
  try { localStorage.setItem('edituno-language', value) } catch {}
}

const EDITUNO_THEME_KEY='theme'
function normalizeTheme(value){return value==='light'||value==='dark'||value==='system'?value:'system'}
function resolvedTheme(value){
  const pref=normalizeTheme(value)
  if(pref!=='system')return pref
  try{return window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}catch{return'dark'}
}
function applyTheme(value){
  const pref=normalizeTheme(value), theme=resolvedTheme(pref), root=document.documentElement
  root.dataset.theme=theme
  root.dataset.themePreference=pref
  root.style.colorScheme=theme
  const themeMeta=document.querySelector('meta[name="theme-color"]')
  const schemeMeta=document.querySelector('meta[name="color-scheme"]')
  const appleStatusMeta=document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')
  if(themeMeta)themeMeta.setAttribute('content',theme==='light'?'#F4F6FA':'#08090D')
  if(schemeMeta)schemeMeta.setAttribute('content',theme)
  if(appleStatusMeta)appleStatusMeta.setAttribute('content',theme==='light'?'default':'black-translucent')
  return theme
}
function setupSystemThemeWatcher(){
  try{
    const media=window.matchMedia('(prefers-color-scheme: light)')
    const onChange=()=>{if(normalizeTheme(state.preferences.theme)==='system')applyTheme('system')}
    media.addEventListener?.('change',onChange)
  }catch{}
}


function loadPreferences() {
  const defaults={snap:true,defaultQuality:1080,defaultFps:30,previewQuality:'balanced',timelineScale:48,showWaveforms:true,autoSave:true,theme:'system'}
  try { return {...defaults,...JSON.parse(localStorage.getItem('edituno-preferences')||'{}')} } catch { return defaults }
}
function savePreferences() {
  try { localStorage.setItem('edituno-preferences',JSON.stringify(state.preferences)) } catch {}
}
function preferenceLabel(key) {
  const el=state.language==='el'
  const labels={snap:el?'Μαγνήτιση στο timeline':'Timeline snapping',showWaveforms:el?'Waveforms ήχου':'Audio waveforms',autoSave:el?'Αυτόματη αποθήκευση':'Auto save',previewQuality:el?'Ποιότητα preview':'Preview quality',defaultQuality:el?'Προεπιλεγμένη εξαγωγή':'Default export',defaultFps:el?'Προεπιλεγμένα FPS':'Default FPS',timelineScale:el?'Μέγεθος timeline':'Timeline scale'}
  return labels[key]||key
}

const STRINGS = {
  en: {
    create:'Create project', import:'Import media', recent:'Recent projects', noProjects:'No projects yet', home:'Home',
    homeLead:'Create. Cut. Share.', homeBody:'A private studio that feels native on every screen. No upload. No watermark.',
    free:'Free. No watermark. No account.', newProject:'New project', templates:'Start with a format', projects:'Projects', settings:'Settings',
    private:'Local by default', privateSub:'Your media stays on this device.', offline:'Works offline', offlineSub:'Install once and keep editing.', noAccount:'No account', noAccountSub:'Open Edituno and start.',
    open:'Open', delete:'Delete', edit:'Edit', export:'Export', media:'Media', text:'Text', audio:'Audio', effects:'Effects', elements:'Elements', canvas:'Canvas',
    addMedia:'Add media', addTimeline:'Add', soundtrack:'Soundtrack', useSoundtrack:'Use', remove:'Remove', captions:'Captions', importSrt:'Import SRT', fadeIn:'Fade in', fadeOut:'Fade out',
    addTitle:'Add title', addCaption:'Add caption', addSticker:'Add sticker', selectedClip:'Selected clip', clip:'Clip', trim:'Trim', transform:'Transform',
    speed:'Speed', volume:'Volume', opacity:'Opacity', scale:'Scale', rotation:'Rotation', fit:'Fit', cover:'Cover', contain:'Contain', mirror:'Mirror',
    split:'Split', duplicate:'Duplicate', moveLeft:'Left', moveRight:'Right', brightness:'Brightness', contrast:'Contrast', saturation:'Saturation', exposure:'Exposure', temperature:'Temperature', vignette:'Vignette', grain:'Film grain',
    hue:'Hue', blur:'Blur', grayscale:'Grayscale', sepia:'Sepia', filter:'Filter', motion:'Motion', transition:'Transition', duration:'Duration',
    none:'None', fade:'Fade', flash:'Flash', zoom:'Zoom', panLeft:'Pan left', panRight:'Pan right', zoomOut:'Zoom out', shake:'Shake',
    original:'Original', vivid:'Vivid', warm:'Warm', cool:'Cool', mono:'Mono', film:'Film', dream:'Dream', crisp:'Crisp', cinematic:'Cinematic', retro:'Retro', soft:'Soft',
    projectCanvas:'Project canvas', background:'Background', ratio:'Format', undo:'Undo', redo:'Redo', play:'Play', pause:'Pause',
    save:'Saved locally', exportTitle:'Export video', quality:'Quality', frameRate:'Frame rate', startExport:'Start export', exporting:'Exporting',
    exportLocal:'Rendering happens on your device. Keep Edituno open until it finishes.', install:'Install', installTitle:'Install Edituno',
    iosInstall:'On iPhone or iPad, tap Share and then “Add to Home Screen”. Edituno will open like a normal app.',
    chromeInstall:'Install Edituno for a full-screen app experience and offline access.', close:'Close', language:'Language', storage:'Storage',
    persistent:'Keep project files available', requestStorage:'Request persistent storage', clearAll:'Delete all local projects', confirmClear:'Delete every locally saved Edituno project?',
    ready:'Ready', exportDone:'Export complete', exportFailed:'Export failed', emptyTimeline:'Import a video or image to start editing.',
    projectName:'Project name', textContent:'Text', fontSize:'Font size', color:'Color', textBackground:'Text background', animation:'Animation',
    align:'Alignment', start:'Start', end:'End', weight:'Weight', loop:'Loop soundtrack', installApp:'Install app', browserLimit:'Your browser may export WebM instead of MP4.',
    unsupported:'This file format is not supported by this browser.', imported:'Media imported', srtImported:'Subtitles imported', deleted:'Deleted',
    timeline:'Timeline', share:'Share', download:'Save file', cancel:'Cancel', back:'Back', project:'Project', local:'Local editor',
    autoSave:'Autosaved', autoSaveOff:'Autosave off', add:'Add', noAudio:'Import an audio file to use music.', noMedia:'No imported media yet.', rename:'Rename', projectOptions:'Project options', renameProject:'Rename project', saveChanges:'Save', confirmDelete:'Delete project', keepProject:'Keep project', deleteProjectBody:'This removes the project and its local media from this device.', clearAllTitle:'Delete all projects?', clearAllBody:'This permanently removes every local Edituno project and its media from this device.', duplicatedProject:'Project duplicated', fitAudio:'Fit to video', movePlayhead:'Move to playhead', alignClip:'Align to clip', dragTimeline:'Drag to timeline', invert:'Invert', spin:'Spin', bounce:'Bounce', swing:'Swing', driftUp:'Drift up', driftDown:'Drift down', slideUp:'Slide up', slideDown:'Slide down', dipBlack:'Dip to black', dipWhite:'Dip to white',
    selectedText:'Selected text', textStyle:'Text style', position:'Position', apply:'Apply', installHint:'Install Edituno',
    desktopMedia:'Project media', inspector:'Properties', adjust:'Adjust', transitions:'Transitions', projectHub:'Projects', quickEdit:'Edit', dissolve:'Dissolve', slideLeft:'Slide left', slideRight:'Slide right', blurTransition:'Blur', kenBurns:'Ken Burns', pulse:'Pulse', float:'Float', reset:'Reset', timelineZoom:'Timeline zoom', transitionDuration:'Duration', newBlank:'New blank project', resume:'Resume editing', editLocally:'Edit locally. Export anywhere.', chooseProject:'Choose project', mobileReady:'Ready to edit', noUploadShort:'No upload. No watermark.', blurFill:'Blur fill', breath:'Breath', pushTransition:'Push', softZoom:'Soft zoom', fadeAmount:'Fade', shadows:'Shadows'
  },
  el: {
    create:'Δημιουργία project', import:'Εισαγωγή media', recent:'Πρόσφατα projects', noProjects:'Δεν υπάρχουν projects ακόμα', home:'Αρχική',
    homeLead:'Δημιούργησε. Κόψε. Μοιράσου.', homeBody:'Ένα ιδιωτικό studio που νιώθει φυσικό σε κάθε οθόνη. Χωρίς upload. Χωρίς watermark.',
    free:'Δωρεάν. Χωρίς watermark. Χωρίς λογαριασμό.', newProject:'Νέο project', templates:'Ξεκίνα με format', projects:'Projects', settings:'Ρυθμίσεις',
    private:'Τοπικά από προεπιλογή', privateSub:'Τα αρχεία μένουν στη συσκευή σου.', offline:'Λειτουργεί offline', offlineSub:'Εγκατέστησέ το μία φορά και συνέχισε.', noAccount:'Χωρίς λογαριασμό', noAccountSub:'Άνοιξε το Edituno και ξεκίνα.',
    open:'Άνοιγμα', delete:'Διαγραφή', edit:'Επεξεργασία', export:'Export', media:'Media', text:'Κείμενο', audio:'Ήχος', effects:'Εφέ', elements:'Στοιχεία', canvas:'Καμβάς',
    addMedia:'Προσθήκη media', addTimeline:'Προσθήκη', soundtrack:'Μουσική', useSoundtrack:'Χρήση', remove:'Αφαίρεση', captions:'Υπότιτλοι', importSrt:'Εισαγωγή SRT', fadeIn:'Fade in', fadeOut:'Fade out',
    addTitle:'Προσθήκη τίτλου', addCaption:'Προσθήκη caption', addSticker:'Προσθήκη sticker', selectedClip:'Επιλεγμένο clip', clip:'Clip', trim:'Trim', transform:'Μετασχηματισμός',
    speed:'Ταχύτητα', volume:'Ένταση', opacity:'Διαφάνεια', scale:'Μέγεθος', rotation:'Περιστροφή', fit:'Προσαρμογή', cover:'Γέμισμα', contain:'Ολόκληρο', mirror:'Καθρέφτης',
    split:'Κόψιμο', duplicate:'Αντιγραφή', moveLeft:'Αριστερά', moveRight:'Δεξιά', brightness:'Φωτεινότητα', contrast:'Αντίθεση', saturation:'Κορεσμός', exposure:'Έκθεση', temperature:'Θερμοκρασία', vignette:'Vignette', grain:'Film grain',
    hue:'Απόχρωση', blur:'Θόλωμα', grayscale:'Ασπρόμαυρο', sepia:'Σέπια', filter:'Φίλτρο', motion:'Κίνηση', transition:'Μετάβαση', duration:'Διάρκεια',
    none:'Καμία', fade:'Fade', flash:'Flash', zoom:'Zoom', panLeft:'Pan αριστερά', panRight:'Pan δεξιά', zoomOut:'Zoom out', shake:'Shake',
    original:'Original', vivid:'Vivid', warm:'Warm', cool:'Cool', mono:'Mono', film:'Film', dream:'Dream', crisp:'Crisp', cinematic:'Cinematic', retro:'Retro', soft:'Soft',
    projectCanvas:'Καμβάς project', background:'Φόντο', ratio:'Format', undo:'Αναίρεση', redo:'Επανάληψη', play:'Play', pause:'Παύση',
    save:'Αποθηκεύτηκε τοπικά', exportTitle:'Εξαγωγή video', quality:'Ποιότητα', frameRate:'Καρέ ανά δευτερόλεπτο', startExport:'Έναρξη export', exporting:'Γίνεται export',
    exportLocal:'Το rendering γίνεται στη συσκευή σου. Κράτησε ανοιχτό το Edituno μέχρι να ολοκληρωθεί.', install:'Εγκατάσταση', installTitle:'Εγκατάσταση Edituno',
    iosInstall:'Σε iPhone ή iPad πάτησε Κοινοποίηση και μετά «Προσθήκη στην οθόνη αφετηρίας». Το Edituno θα ανοίγει σαν κανονική εφαρμογή.',
    chromeInstall:'Εγκατέστησε το Edituno για full-screen εμπειρία εφαρμογής και offline πρόσβαση.', close:'Κλείσιμο', language:'Γλώσσα', storage:'Αποθήκευση',
    persistent:'Διατήρηση των αρχείων των projects', requestStorage:'Μόνιμη τοπική αποθήκευση', clearAll:'Διαγραφή όλων των τοπικών projects', confirmClear:'Να διαγραφούν όλα τα τοπικά projects του Edituno;',
    ready:'Έτοιμο', exportDone:'Το export ολοκληρώθηκε', exportFailed:'Το export απέτυχε', emptyTimeline:'Κάνε import video ή εικόνα για να ξεκινήσεις.',
    projectName:'Όνομα project', textContent:'Κείμενο', fontSize:'Μέγεθος γραμματοσειράς', color:'Χρώμα', textBackground:'Φόντο κειμένου', animation:'Animation',
    align:'Στοίχιση', start:'Έναρξη', end:'Τέλος', weight:'Πάχος', loop:'Επανάληψη μουσικής', installApp:'Εγκατάσταση εφαρμογής', browserLimit:'Ο browser μπορεί να κάνει export σε WebM αντί MP4.',
    unsupported:'Αυτό το format δεν υποστηρίζεται από τον browser.', imported:'Τα media προστέθηκαν', srtImported:'Οι υπότιτλοι προστέθηκαν', deleted:'Διαγράφηκε',
    timeline:'Timeline', share:'Κοινοποίηση', download:'Αποθήκευση αρχείου', cancel:'Ακύρωση', back:'Πίσω', project:'Project', local:'Τοπικός editor',
    autoSave:'Αυτόματη αποθήκευση', autoSaveOff:'Αυτόματη αποθήκευση κλειστή', add:'Προσθήκη', noAudio:'Κάνε import αρχείο ήχου για μουσική.', noMedia:'Δεν υπάρχουν media ακόμα.', rename:'Μετονομασία', projectOptions:'Επιλογές project', renameProject:'Μετονομασία project', saveChanges:'Αποθήκευση', confirmDelete:'Διαγραφή project', keepProject:'Διατήρηση project', deleteProjectBody:'Το project και τα τοπικά media του θα διαγραφούν από αυτή τη συσκευή.', clearAllTitle:'Διαγραφή όλων των projects;', clearAllBody:'Θα διαγραφούν μόνιμα όλα τα τοπικά projects του Edituno και τα media τους από αυτή τη συσκευή.', duplicatedProject:'Το project αντιγράφηκε',
    fitAudio:'Προσαρμογή στο video', movePlayhead:'Μεταφορά στο playhead', alignClip:'Στοίχιση με clip', dragTimeline:'Σύρε στο timeline', invert:'Αντιστροφή', spin:'Περιστροφή', bounce:'Αναπήδηση', swing:'Αιώρηση', driftUp:'Κίνηση πάνω', driftDown:'Κίνηση κάτω', slideUp:'Slide πάνω', slideDown:'Slide κάτω', dipBlack:'Βύθιση σε μαύρο', dipWhite:'Βύθιση σε λευκό', selectedText:'Επιλεγμένο κείμενο', textStyle:'Στυλ κειμένου', position:'Θέση', apply:'Εφαρμογή', installHint:'Εγκατάσταση Edituno',
    desktopMedia:'Media project', inspector:'Ιδιότητες', adjust:'Ρυθμίσεις', transitions:'Μεταβάσεις', projectHub:'Projects', quickEdit:'Edit', dissolve:'Dissolve', slideLeft:'Slide αριστερά', slideRight:'Slide δεξιά', blurTransition:'Blur', kenBurns:'Ken Burns', pulse:'Pulse', float:'Float', reset:'Επαναφορά', timelineZoom:'Zoom timeline', transitionDuration:'Διάρκεια', newBlank:'Νέο κενό project', resume:'Συνέχεια επεξεργασίας', editLocally:'Επεξεργασία τοπικά. Export παντού.', chooseProject:'Επίλεξε project', mobileReady:'Έτοιμο για επεξεργασία', noUploadShort:'Χωρίς upload. Χωρίς watermark.', blurFill:'Blur fill', breath:'Αναπνοή', pushTransition:'Push', softZoom:'Απαλό zoom', fadeAmount:'Fade', shadows:'Σκιές'
  }
}


const FLUENT_TREE_API='https://api.github.com/repos/microsoft/fluentui-emoji/git/trees/main?recursive=1'
const FLUENT_RAW_ROOT='https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/'
const FLUENT_CACHE_KEY='edituno-fluent-emoji-catalog-v1'
function loadFluentCatalogCache(){
  try { const saved=JSON.parse(localStorage.getItem(FLUENT_CACHE_KEY)||'[]'); return Array.isArray(saved)?saved:[] } catch { return [] }
}
function fluentRawUrl(path){return FLUENT_RAW_ROOT+String(path||'').split('/').map(encodeURIComponent).join('/')}
function fluentStylePath(entry,style='color'){
  if(style==='3d')return entry.d3
  return entry.color
}
async function ensureFluentCatalog(){
  if(state.fluentCatalog?.length||state.fluentLoading)return
  state.fluentLoading=true;state.fluentError=''
  try{
    const response=await fetch(FLUENT_TREE_API,{headers:{Accept:'application/vnd.github+json'}})
    if(!response.ok)throw new Error(`GitHub ${response.status}`)
    const json=await response.json()
    const entries=(json.tree||[]).filter(x=>x.type==='blob'&&/\/Color\/.*_color\.svg$/i.test(x.path)).map(x=>{
      const parts=x.path.split('/'),name=parts[1]||'Emoji',color=x.path
      const file=parts.at(-1)||''
      const d3=color.replace('/Color/','/3D/').replace(/_color\.svg$/i,'_3d.png')
      return {name,color,d3}
    }).sort((a,b)=>a.name.localeCompare(b.name))
    state.fluentCatalog=entries
    try{localStorage.setItem(FLUENT_CACHE_KEY,JSON.stringify(entries))}catch{}
  }catch(error){state.fluentError=String(error?.message||error)}
  finally{state.fluentLoading=false;if(state.view==='editor')renderEditor()}
}
function fluentMatches(){
  const q=String(state.fluentQuery||'').trim().toLowerCase()
  const list=q?state.fluentCatalog.filter(x=>x.name.toLowerCase().includes(q)):state.fluentCatalog
  return list.slice(0,Math.max(30,state.fluentVisible||60))
}
async function addFluentElement(name,path){
  if(!state.project||!path)return
  try{
    toast(state.language==='el'?'Λήψη στοιχείου…':'Downloading element…')
    const response=await fetch(fluentRawUrl(path))
    if(!response.ok)throw new Error(`HTTP ${response.status}`)
    const blob=await response.blob(), ext=path.toLowerCase().endsWith('.png')?'png':'svg'
    const file=new File([blob],`${String(name||'fluent').replace(/[^a-z0-9_-]+/gi,'_')}.${ext}`,{type:blob.type||(ext==='png'?'image/png':'image/svg+xml')})
    const meta=await mediaMetadata(file),id=uid(),asset={id,name:`Fluent · ${name}`,type:'image',mimeType:file.type,duration:Math.max(3,visualDuration()?Math.min(6,visualDuration()):4),width:meta.width,height:meta.height,size:file.size,waveform:null,source:'microsoft-fluent-emoji'}
    await putBlob(id,file);state.project.assets.push(asset);state.urls[id]=URL.createObjectURL(file)
    pushHistory()
    const clip=defaultOverlayClip(asset,state.currentTime,3);clip.scale=.28;clip.fit='contain';clip.volume=0
    state.project.overlays.push(clip);state.project.updatedAt=Date.now();state.selected={type:'overlay',id:clip.id};state.tool='elements';state.sheet=isMobileViewport()?'elements':null
    queueSave();renderEditor();toast(state.language==='el'?'Το στοιχείο προστέθηκε':'Element added','success')
  }catch(error){console.error(error);toast(state.language==='el'?'Δεν ήταν δυνατή η λήψη του στοιχείου':'Could not download element','error')}
}

const state = {
  language: safeLanguage(),
  view: 'home', projects: [], project: null, urls: {}, currentTime: 0, playing: false,
  selected: null, tool: 'media', sheet: null, history: [], future: [], installPrompt: null,
  exportController: null, exportResult: null, exportUrl: null, pxPerSec: 48, currentPreviewAsset: null,
  settingsOpen: false, installOpen: false, projectHubOpen: false, homeMenuOpen: false, adjustKey: 'brightness',
  projectMenuId: null, renameProjectId: null, confirmDialog: null, mediaImportContext: null,
  preferences: loadPreferences(), audioDrag: null, assetDrag:null,
  sheetSnap:'half', timelineScrollLeft:0, sheetScrollTop:0, suppressTimelineClickUntil:0,
  fluentCatalog:loadFluentCatalogCache(), fluentLoading:false, fluentError:'', fluentQuery:'', fluentStyle:'color', fluentVisible:60,
  smartBusy:null, smartProgress:0
}
state.pxPerSec=Number(state.preferences.timelineScale)||48
const tr = key => STRINGS[state.language][key] ?? STRINGS.en[key] ?? key

function isMobileViewport() {
  return window.matchMedia('(max-width: 979px)').matches || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
}


// iOS Safari/PWA keyboard handling.
// The browser can leave the layout viewport scrolled after the software keyboard closes,
// which makes bottom navigation appear detached from the physical bottom edge.
// Edituno keeps the document itself locked and scrolls only its internal surfaces.
const mobileViewport = {
  raf: 0,
  lastStableHeight: 0,
  lastStableWidth: 0,
  keyboardOpen: false,
  settling: false
}

function isEditableElement(el) {
  if (!el || !(el instanceof Element)) return false
  return el.matches('input, textarea, select, [contenteditable="true"]')
}

function syncMobileViewport(forceStable = false) {
  if (!isMobileViewport()) {
    document.body.classList.remove('mobile-app-shell', 'keyboard-open', 'keyboard-transition')
    document.documentElement.style.removeProperty('--app-vh')
    document.documentElement.style.removeProperty('--app-vtop')
    mobileViewport.lastStableHeight = 0
    mobileViewport.lastStableWidth = 0
    mobileViewport.keyboardOpen = false
    return
  }

  const vv = window.visualViewport
  const layoutWidth = Math.max(1, window.innerWidth || document.documentElement.clientWidth || 1)
  const layoutHeight = Math.max(1, window.innerHeight || document.documentElement.clientHeight || 1)
  const visualHeight = Math.max(1, vv?.height || layoutHeight)
  const visualTop = Math.max(0, vv?.offsetTop || 0)
  const keyboardGap = Math.max(0, layoutHeight - visualHeight - visualTop)
  const editable = isEditableElement(document.activeElement)
  const keyboardOpen = editable && keyboardGap > 90

  // Keep the largest known closed-keyboard height for the current orientation.
  // iOS often reports a stale, shorter innerHeight for a few frames after blur.
  // Never overwrite the good height with that transient value.
  const orientationChanged = mobileViewport.lastStableWidth > 0 && Math.abs(layoutWidth - mobileViewport.lastStableWidth) > 70
  if (orientationChanged && !editable) {
    mobileViewport.lastStableHeight = Math.max(layoutHeight, visualHeight)
    mobileViewport.lastStableWidth = layoutWidth
  } else if (!keyboardOpen && !editable) {
    mobileViewport.lastStableHeight = Math.max(mobileViewport.lastStableHeight || 0, layoutHeight, visualHeight)
    mobileViewport.lastStableWidth = layoutWidth
  } else if (!mobileViewport.lastStableHeight) {
    mobileViewport.lastStableHeight = Math.max(layoutHeight, visualHeight)
    mobileViewport.lastStableWidth = layoutWidth
  }

  mobileViewport.keyboardOpen = keyboardOpen && !forceStable

  const stableHeight = mobileViewport.lastStableHeight || Math.max(layoutHeight, visualHeight)
  const height = mobileViewport.keyboardOpen ? visualHeight : stableHeight
  const top = mobileViewport.keyboardOpen ? visualTop : 0

  document.documentElement.style.setProperty('--app-vh', `${Math.round(height)}px`)
  document.documentElement.style.setProperty('--app-vtop', `${Math.round(top)}px`)
  document.body.classList.add('mobile-app-shell')
  document.body.classList.toggle('keyboard-open', mobileViewport.keyboardOpen)
}

function scheduleMobileViewportSync(forceStable = false) {
  cancelAnimationFrame(mobileViewport.raf)
  mobileViewport.raf = requestAnimationFrame(() => syncMobileViewport(forceStable))
}

function resetWindowScrollPosition() {
  try { window.scrollTo(0, 0) } catch {}
  try { document.documentElement.scrollTop = 0 } catch {}
  try { document.body.scrollTop = 0 } catch {}
}

function normalizeViewportAfterKeyboard() {
  // iOS Safari/PWA can keep the page panned after the keyboard animation ends.
  // The stable-height cache prevents a transient short innerHeight from becoming
  // the new app height, while these delayed passes follow the native animation.
  mobileViewport.settling = true
  const settle = () => {
    if (isEditableElement(document.activeElement)) return
    resetWindowScrollPosition()
    scheduleMobileViewportSync(true)
  }
  requestAnimationFrame(settle)
  ;[60, 160, 320, 520, 800].forEach(delay => setTimeout(settle, delay))
  setTimeout(() => { mobileViewport.settling = false }, 900)
}


const DB_NAME = 'edituno-db'
const DB_VERSION = 2
const PROJECTS = 'projects'
const BLOBS = 'blobs'
const memoryStores = { projects:new Map(), blobs:new Map() }
let dbDisabled = false
function memoryKey(store,value,key){ return key ?? (store===PROJECTS ? value?.id : undefined) }
function openDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(PROJECTS)) db.createObjectStore(PROJECTS, { keyPath:'id' })
      if (!db.objectStoreNames.contains(BLOBS)) db.createObjectStore(BLOBS)
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}
async function dbPut(store, value, key) {
  const memKey=memoryKey(store,value,key)
  if(dbDisabled){ if(memKey!==undefined) memoryStores[store].set(memKey,value); return }
  try {
    const db=await openDb()
    await new Promise((resolve,reject)=>{const tx=db.transaction(store,'readwrite');key===undefined?tx.objectStore(store).put(value):tx.objectStore(store).put(value,key);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error)})
    db.close()
  } catch(error) {
    dbDisabled=true; if(memKey!==undefined) memoryStores[store].set(memKey,value); console.warn('Edituno switched to session storage:',error)
  }
}
async function dbGet(store, key) {
  if(dbDisabled)return memoryStores[store].get(key)
  try {
    const db=await openDb();const out=await new Promise((resolve,reject)=>{const req=db.transaction(store,'readonly').objectStore(store).get(key);req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error)});db.close();return out
  } catch(error){dbDisabled=true;console.warn('Edituno switched to session storage:',error);return memoryStores[store].get(key)}
}
async function dbAll(store) {
  if(dbDisabled)return [...memoryStores[store].values()]
  try {
    const db=await openDb();const out=await new Promise((resolve,reject)=>{const req=db.transaction(store,'readonly').objectStore(store).getAll();req.onsuccess=()=>resolve(req.result||[]);req.onerror=()=>reject(req.error)});db.close();return out
  } catch(error){dbDisabled=true;console.warn('Edituno switched to session storage:',error);return [...memoryStores[store].values()]}
}
async function dbDelete(store,key) {
  memoryStores[store].delete(key)
  if(dbDisabled)return
  try { const db=await openDb();await new Promise((resolve,reject)=>{const tx=db.transaction(store,'readwrite');tx.objectStore(store).delete(key);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error)});db.close() }
  catch(error){dbDisabled=true;console.warn('Edituno switched to session storage:',error)}
}

async function saveProject(project) { await dbPut(PROJECTS, project) }
async function listProjects() { return (await dbAll(PROJECTS)).sort((a,b)=>b.updatedAt-a.updatedAt) }
async function getProject(id) { return dbGet(PROJECTS,id) }
async function putBlob(id, blob) { return dbPut(BLOBS,blob,id) }
async function getBlob(id) { return dbGet(BLOBS,id) }
async function deleteProjectFull(id) {
  const p = await getProject(id)
  if (p?.assets) for (const a of p.assets) await dbDelete(BLOBS,a.id)
  await dbDelete(PROJECTS,id)
}

async function duplicateProjectFull(id) {
  const original = await getProject(id)
  if (!original) return null
  const now = Date.now()
  const copy = clone(original)
  copy.id = uid()
  copy.name = `${original.name} ${state.language==='el'?'αντίγραφο':'copy'}`
  copy.createdAt = now
  copy.updatedAt = now
  const assetMap = new Map()
  copy.assets = []
  for (const asset of original.assets || []) {
    const newId = uid()
    assetMap.set(asset.id, newId)
    const blob = await getBlob(asset.id)
    if (blob) await putBlob(newId, blob)
    copy.assets.push({...clone(asset), id:newId})
  }
  copy.clips = (original.clips || []).map(c=>({...clone(c), id:uid(), assetId:assetMap.get(c.assetId)||c.assetId}))
  copy.overlays = (original.overlays || []).map(c=>({...clone(c), id:uid(), assetId:assetMap.get(c.assetId)||c.assetId}))
  copy.elements = (original.elements || []).map(c=>({...clone(c), id:uid()}))
  copy.audioClips = (original.audioClips || []).map(c=>({...clone(c), id:uid(), assetId:assetMap.get(c.assetId)||c.assetId}))
  copy.texts = (original.texts || []).map(t=>({...clone(t), id:uid()}))
  copy.soundtrack = null
  await saveProject(copy)
  return copy.id
}

async function renameProjectFull(id, name) {
  const project = await getProject(id)
  if (!project) return
  const clean = String(name || '').trim().slice(0, 80)
  if (!clean) return
  project.name = clean
  project.updatedAt = Date.now()
  await saveProject(project)
}

let saveTimer
function queueSave() {
  clearTimeout(saveTimer)
  if (!state.project) return
  state.project.updatedAt = Date.now()
  if (!state.preferences.autoSave) {
    const el = $('#save-state'); if (el) el.textContent = tr('autoSaveOff')
    return
  }
  saveTimer = setTimeout(async()=>{
    await saveProject(state.project)
    state.projects = await listProjects()
    const el = $('#save-state'); if (el) el.textContent = tr('autoSave')
  }, 220)
}

const previewVideo = document.createElement('video')
previewVideo.playsInline = true
previewVideo.preload = 'auto'
previewVideo.style.cssText = 'position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;left:-10px;top:-10px'
document.body.append(previewVideo)
const previewAudio = document.createElement('audio')
previewAudio.preload = 'auto'
previewAudio.style.display = 'none'
document.body.append(previewAudio)
const audioPreviewNodes = new Map()
const overlayPreviewNodes = new Map()
const imageCache = new Map()
let rafId = 0
let playStartPerf = 0
let playStartTime = 0

function visualDuration(project = state.project) {
  return (project?.clips || []).reduce((sum,c)=>sum + clipDuration(c),0)
}
function audioClipDuration(c) { return Math.max(.05,(c.sourceEnd-c.sourceStart)/Math.max(.05,c.speed||1)) }
function clipDuration(c) { return Math.max(.05, (c.end-c.start) / Math.max(.05,c.speed || 1)) }
function overlayDuration(c){ return clipDuration(c) }
function projectDuration(project = state.project) {
  const visual=visualDuration(project)
  const overlays=Math.max(0,...(project?.overlays||[]).map(c=>(c.timelineStart||0)+overlayDuration(c)))
  const elements=Math.max(0,...(project?.elements||[]).map(c=>(c.timelineStart||0)+(c.duration||3)))
  const audio=Math.max(0,...(project?.audioClips||[]).map(c=>(c.timelineStart||0)+audioClipDuration(c)))
  const text=Math.max(0,...(project?.texts||[]).map(t=>t.end||0))
  return Math.max(visual,overlays,elements,audio,text)
}
function clipTimeline(project = state.project) {
  let cursor = 0
  return (project?.clips || []).map((clip,index)=>{
    const duration=clipDuration(clip); const row={clip,index,start:cursor,end:cursor+duration,duration}; cursor += duration; return row
  })
}
function activeAt(time, project = state.project) {
  const rows = clipTimeline(project)
  return rows.find((r,i)=> time >= r.start && (time < r.end || (i===rows.length-1 && time<=r.end))) || null
}
function sourceTime(row,time) { return row.clip.start + Math.max(0,time-row.start)*(row.clip.speed||1) }
function activeOverlaysAt(time, project=state.project){
  return (project?.overlays||[]).filter(c=>time>=(c.timelineStart||0)&&time<=((c.timelineStart||0)+overlayDuration(c))).sort((a,b)=>(a.lane||2)-(b.lane||2))
}
function activeElementsAt(time, project=state.project){
  return (project?.elements||[]).filter(c=>time>=(c.timelineStart||0)&&time<=((c.timelineStart||0)+(c.duration||3))).sort((a,b)=>(a.z||20)-(b.z||20))
}
function getAsset(id, project = state.project) { return project?.assets?.find(a=>a.id===id) }

function ratioValue(ratio) {
  return ({'16:9':16/9,'9:16':9/16,'1:1':1,'4:5':4/5})[ratio] || 16/9
}
function previewDimensions(ratio) {
  const q=state.preferences?.previewQuality||'balanced'
  const base=q==='performance'?360:q==='quality'?720:540
  if (ratio==='9:16') return [base,Math.round(base*16/9)]
  if (ratio==='1:1') return [base,base]
  if (ratio==='4:5') return [base,Math.round(base*5/4)]
  return [Math.round(base*16/9),base]
}
function exportDimensions(ratio, quality) {
  const q=Number(quality)
  const hi=q>=2160
  if (ratio==='9:16') return hi?[2160,3840]:q===1080?[1080,1920]:[720,1280]
  if (ratio==='1:1') return hi?[2160,2160]:q===1080?[1080,1080]:[720,720]
  if (ratio==='4:5') return hi?[2160,2700]:q===1080?[1080,1350]:[720,900]
  return hi?[3840,2160]:q===1080?[1920,1080]:[1280,720]
}

async function loadImage(url) {
  if (imageCache.has(url)) return imageCache.get(url)
  const promise = new Promise((resolve,reject)=>{ const img=new Image(); img.onload=()=>resolve(img); img.onerror=reject; img.src=url })
  imageCache.set(url,promise); return promise
}

function fitPreviewFrame() {
  const zone = $('.preview-zone'), frame = $('.preview-frame'), canvas = $('#preview-canvas')
  if (!zone || !frame || !canvas || !state.project) return
  const rect = zone.getBoundingClientRect()
  const style = getComputedStyle(zone)
  const padX = (parseFloat(style.paddingLeft) || 0) + (parseFloat(style.paddingRight) || 0)
  const padY = (parseFloat(style.paddingTop) || 0) + (parseFloat(style.paddingBottom) || 0)
  const ratio = ratioValue(state.project.ratio)
  const maxW = Math.max(120, rect.width - padX)
  const maxH = Math.max(110, rect.height - padY)
  let w = Math.min(maxW, maxH * ratio)
  let h = w / ratio
  if (h > maxH) { h = maxH; w = h * ratio }
  frame.style.width = `${Math.max(110, Math.floor(w))}px`
  frame.style.height = `${Math.max(90, Math.floor(h))}px`
  frame.style.aspectRatio = `${ratio}`
  const [cw,ch] = previewDimensions(state.project.ratio)
  if (canvas.width !== cw) canvas.width = cw
  if (canvas.height !== ch) canvas.height = ch
  drawPreview()
}

function applyClipDrawing(ctx, source, asset, clip, width, height, localProgress=0, globalAlpha=1) {
  ctx.save()
  const b=clip.brightness ?? 100, exposure=clip.exposure ?? 0, c=clip.contrast ?? 100, s=clip.saturation ?? 100, h=clip.hue ?? 0, blur=clip.blur ?? 0, gray=clip.grayscale ?? 0, sep=clip.sepia ?? 0, inv=clip.invert ?? 0
  const exposureBrightness = b * Math.pow(2, exposure / 100)
  ctx.filter=`brightness(${exposureBrightness}%) contrast(${c}%) saturate(${s}%) hue-rotate(${h}deg) blur(${blur}px) grayscale(${gray}%) sepia(${sep}%) invert(${inv}%)`
  ctx.globalAlpha=(clip.opacity ?? 1)*globalAlpha
  ctx.translate(width/2,height/2)
  let motionScale=1, motionX=0, motionY=0, motionRot=0
  const p=clamp(localProgress,0,1)
  switch(clip.motion){
    case 'zoom': motionScale=1 + .12*p; break
    case 'zoomout': motionScale=1.12 - .12*p; break
    case 'panleft': motionX=width*.08*(1-2*p); motionScale=1.08; break
    case 'panright': motionX=-width*.08*(1-2*p); motionScale=1.08; break
    case 'shake': motionX=Math.sin(p*80)*width*.006; motionY=Math.cos(p*67)*height*.005; motionRot=Math.sin(p*55)*.01; break
    case 'kenburns': motionScale=1.03 + .14*p; motionX=width*.04*(2*p-1); motionY=height*.018*(1-2*p); break
    case 'pulse': motionScale=1 + .035*Math.sin(p*Math.PI*4); break
    case 'float': motionY=Math.sin(p*Math.PI*2)*height*.018; break
    case 'driftup': motionY=height*.055*(1-2*p); motionScale=1.04; break
    case 'driftdown': motionY=-height*.055*(1-2*p); motionScale=1.04; break
    case 'spin': motionRot=(p-.5)*.16; motionScale=1.035; break
    case 'bounce': motionY=-Math.abs(Math.sin(p*Math.PI*3))*height*.035; break
    case 'swing': motionRot=Math.sin(p*Math.PI*4)*.035; break
    case 'breath': motionScale=1 + .035*Math.pow(Math.sin(p*Math.PI),2); break
  }
  ctx.translate(motionX,motionY)
  ctx.rotate(((clip.rotation||0)*Math.PI/180)+motionRot)
  ctx.scale(clip.flipX?-1:1,clip.flipY?-1:1)
  const sw=asset.width||width, sh=asset.height||height, sr=sw/sh, tr=width/height
  let dw,dh
  const fit=clip.fit||'cover'
  if ((fit==='cover' && sr>tr) || (fit==='contain' && sr<tr)) { dh=height; dw=dh*sr } else { dw=width; dh=dw/sr }
  const scale=(clip.scale||1)*motionScale
  dw*=scale; dh*=scale
  const ox=(clip.offsetX||0)*width, oy=(clip.offsetY||0)*height
  ctx.drawImage(source,-dw/2+ox,-dh/2+oy,dw,dh)
  ctx.restore()

  const temperature = clip.temperature ?? 0
  if (temperature !== 0) {
    ctx.save()
    ctx.globalCompositeOperation = 'soft-light'
    ctx.globalAlpha = Math.min(.28, Math.abs(temperature) / 180)
    ctx.fillStyle = temperature > 0 ? '#ff9a5a' : '#5a8dff'
    ctx.fillRect(0,0,width,height)
    ctx.restore()
  }

  const fadeAmount = clip.fadeAmount ?? 0
  if (fadeAmount > 0) {
    ctx.save()
    ctx.globalCompositeOperation = 'screen'
    ctx.globalAlpha = Math.min(.34, fadeAmount / 290)
    ctx.fillStyle = '#cbd3df'
    ctx.fillRect(0,0,width,height)
    ctx.restore()
  }

  const shadows = clip.shadows ?? 0
  if (shadows !== 0) {
    ctx.save()
    ctx.globalCompositeOperation = shadows > 0 ? 'screen' : 'multiply'
    ctx.globalAlpha = Math.min(.26, Math.abs(shadows) / 380)
    ctx.fillStyle = shadows > 0 ? '#566170' : '#11141a'
    ctx.fillRect(0,0,width,height)
    ctx.restore()
  }

  const vignette = clip.vignette ?? 0
  if (vignette > 0) {
    ctx.save()
    const g = ctx.createRadialGradient(width/2,height/2,Math.min(width,height)*.18,width/2,height/2,Math.max(width,height)*.72)
    g.addColorStop(0,'rgba(0,0,0,0)')
    g.addColorStop(1,`rgba(0,0,0,${Math.min(.82,vignette/120)})`)
    ctx.fillStyle=g
    ctx.fillRect(0,0,width,height)
    ctx.restore()
  }

  const grain = clip.grain ?? 0
  if (grain > 0) {
    ctx.save()
    ctx.globalAlpha = Math.min(.18, grain / 500)
    ctx.fillStyle = '#ffffff'
    const count = Math.round(40 + grain * 2)
    for (let i=0;i<count;i++) {
      const gx = (Math.sin(i*12.9898 + localProgress*78.233)*43758.5453 % 1 + 1) % 1
      const gy = (Math.sin(i*93.9898 + localProgress*11.133)*24634.6345 % 1 + 1) % 1
      const size = 1 + (i % 3)
      ctx.fillRect(gx*width,gy*height,size,size)
    }
    ctx.restore()
  }
}


const gpuFxRuntime={app:null,sourceCanvas:null,sourceCtx:null,texture:null,sprite:null,filters:new Map(),width:0,height:0,failed:false}
const gpuFxScratch=document.createElement('canvas')
const gpuFxFallback=document.createElement('canvas')
const glTransitionRuntime={canvas:document.createElement('canvas'),gl:null,programs:new Map(),sources:new Map(),failed:false}
const transitionSourceNodes=new Map()
const GL_TRANSITIONS={
  'gl-crosszoom':{file:'CrossZoom.glsl',uniforms:{strength:.4}},
  'gl-swirl':{file:'Swirl.glsl',uniforms:{}},
  'gl-mosaic':{file:'AdvancedMosaic.glsl',uniforms:{pixelSize:50}},
  'gl-circlecrop':{file:'CircleCrop.glsl',uniforms:{bgcolor:[0,0,0,1]}},
  'gl-directional':{file:'Directional.glsl',uniforms:{direction:[1,0]}},
  'gl-dreamy':{file:'Dreamy.glsl',uniforms:{}}
}
function ensureCanvasSize(canvas,w,h){if(canvas.width!==w)canvas.width=w;if(canvas.height!==h)canvas.height=h;return canvas}
function gpuFxAvailable(){return !gpuFxRuntime.failed&&Boolean(window.PIXI?.Application&&window.PIXI?.filters)}
async function ensureGpuFxRuntime(w,h){
  if(!gpuFxAvailable())return null
  try{
    const PIXI=window.PIXI
    if(!gpuFxRuntime.app){
      const sourceCanvas=document.createElement('canvas'),app=new PIXI.Application()
      await app.init({width:w,height:h,backgroundAlpha:0,preference:'webgl',autoStart:false,antialias:false,preserveDrawingBuffer:true,resolution:1})
      const texture=PIXI.Texture.from(sourceCanvas),sprite=new PIXI.Sprite(texture)
      sprite.width=w;sprite.height=h;app.stage.addChild(sprite)
      Object.assign(gpuFxRuntime,{app,sourceCanvas,sourceCtx:sourceCanvas.getContext('2d'),texture,sprite,width:w,height:h})
    }
    if(gpuFxRuntime.width!==w||gpuFxRuntime.height!==h){
      gpuFxRuntime.width=w;gpuFxRuntime.height=h;gpuFxRuntime.app.renderer.resize(w,h);ensureCanvasSize(gpuFxRuntime.sourceCanvas,w,h)
      gpuFxRuntime.texture.destroy(true);gpuFxRuntime.texture=PIXI.Texture.from(gpuFxRuntime.sourceCanvas);gpuFxRuntime.sprite.texture=gpuFxRuntime.texture;gpuFxRuntime.sprite.width=w;gpuFxRuntime.sprite.height=h
    }
    return gpuFxRuntime
  }catch(error){console.warn('PixiJS GPU effects unavailable, using Canvas fallback.',error);gpuFxRuntime.failed=true;return null}
}
function pixiFilterFor(effect,intensity,w,h,progress){
  const PIXI=window.PIXI,F=PIXI?.filters;if(!PIXI||!F)return null
  const i=clamp(Number(intensity)||.65,.1,1)
  try{
    let filter=gpuFxRuntime.filters.get(effect)
    if(!filter){
      if(effect==='bloom')filter=new F.AdvancedBloomFilter({threshold:.55,bloomScale:1.05,brightness:1,blur:6,quality:3})
      else if(effect==='glitch')filter=new F.GlitchFilter({slices:7,offset:28,direction:0,fillMode:2,seed:.2,average:false,minSize:8,sampleSize:256})
      else if(effect==='crt')filter=new F.CRTFilter({curvature:1.2,lineWidth:1,lineContrast:.22,noise:.08,noiseSize:1.2,vignetting:.28,vignettingAlpha:.65,vignettingBlur:.35})
      else if(effect==='oldfilm')filter=new F.OldFilmFilter({sepia:.28,noise:.16,noiseSize:1.2,scratch:.35,scratchDensity:.25,scratchWidth:1.2,vignetting:.3,vignettingAlpha:.55,vignettingBlur:.35})
      else if(effect==='rgbsplit')filter=new F.RGBSplitFilter({red:{x:-6,y:0},green:{x:0,y:0},blue:{x:6,y:0}})
      else if(effect==='pixelate')filter=new F.PixelateFilter(8)
      else if(effect==='bulge')filter=new F.BulgePinchFilter({center:{x:.5,y:.5},radius:Math.min(w,h)*.36,strength:.35})
      else if(effect==='dreamblur')filter=new PIXI.BlurFilter({strength:4,quality:3})
      if(filter)gpuFxRuntime.filters.set(effect,filter)
    }
    if(!filter)return null
    if(effect==='bloom'){filter.bloomScale=.55+1.25*i;filter.blur=3+8*i;filter.threshold=.75-.35*i}
    if(effect==='glitch'){filter.offset=8+48*i;filter.slices=Math.round(3+10*i);filter.seed=(progress*9.17)%1;filter.red={x:-8*i,y:0};filter.blue={x:8*i,y:0};filter.refresh?.()}
    if(effect==='crt'){filter.noise=.03+.22*i;filter.lineContrast=.12+.3*i;filter.curvature=.7+1.2*i;filter.time=progress*6;filter.seed=(progress*13.1)%1}
    if(effect==='oldfilm'){filter.noise=.05+.25*i;filter.sepia=.12+.42*i;filter.scratch=.12+.55*i;filter.scratchDensity=.15+.42*i;filter.seed=(progress*17.3)%1;filter.time=progress*4}
    if(effect==='rgbsplit'){filter.red={x:-3-11*i,y:0};filter.green={x:0,y:1.5*i};filter.blue={x:3+11*i,y:0}}
    if(effect==='pixelate')filter.size=3+Math.round(19*i)
    if(effect==='bulge'){filter.radius=Math.min(w,h)*(.22+.28*i);filter.strength=.12+.62*i}
    if(effect==='dreamblur')filter.strength=1.5+8*i
    return filter
  }catch(error){console.warn('Pixi filter setup failed.',effect,error);return null}
}
function applyGpuFallback(targetCtx,baseCanvas,effect,intensity,w,h,progress,alpha=1){
  const i=clamp(Number(intensity)||.65,.1,1)
  targetCtx.save();targetCtx.globalAlpha=alpha
  if(effect==='pixelate'){
    const small=ensureCanvasSize(gpuFxFallback,Math.max(24,Math.round(w/(3+18*i))),Math.max(24,Math.round(h/(3+18*i)))),sctx=small.getContext('2d');sctx.clearRect(0,0,small.width,small.height);sctx.drawImage(baseCanvas,0,0,small.width,small.height);targetCtx.imageSmoothingEnabled=false;targetCtx.drawImage(small,0,0,w,h);targetCtx.imageSmoothingEnabled=true
  }else if(effect==='dreamblur'||effect==='bloom'){
    targetCtx.filter=`blur(${effect==='bloom'?2+5*i:2+9*i}px)`;targetCtx.drawImage(baseCanvas,0,0);targetCtx.filter='none';targetCtx.globalCompositeOperation=effect==='bloom'?'screen':'source-over';targetCtx.globalAlpha=alpha*(effect==='bloom'?.58:.72);targetCtx.drawImage(baseCanvas,0,0)
  }else if(effect==='glitch'){
    targetCtx.drawImage(baseCanvas,0,0);const slices=5+Math.round(i*7),hh=h/slices;for(let s=0;s<slices;s++){const y=s*hh,off=Math.sin(s*19.7+progress*41)*w*.025*i;targetCtx.drawImage(baseCanvas,0,y,w,hh,off,y,w,hh)}
  }else if(effect==='crt'){
    targetCtx.drawImage(baseCanvas,0,0);targetCtx.globalAlpha=alpha*(.12+.22*i);targetCtx.fillStyle='#000';for(let y=0;y<h;y+=4)targetCtx.fillRect(0,y,w,1)
  }else if(effect==='oldfilm'){
    targetCtx.filter=`sepia(${.2+.45*i}) contrast(${1+.08*i})`;targetCtx.drawImage(baseCanvas,0,0);targetCtx.filter='none';targetCtx.globalAlpha=alpha*(.04+.08*i);targetCtx.fillStyle='#fff';for(let n=0;n<90;n++){const x=(Math.sin(n*12.93+progress*33)*9999%1+1)%1*w,y=(Math.sin(n*8.17+progress*19)*7777%1+1)%1*h;targetCtx.fillRect(x,y,1,1)}
  }else if(effect==='rgbsplit'){
    targetCtx.drawImage(baseCanvas,0,0);targetCtx.globalCompositeOperation='screen';targetCtx.globalAlpha=alpha*.28;targetCtx.filter='sepia(1) saturate(8) hue-rotate(300deg)';targetCtx.drawImage(baseCanvas,-10*i,0);targetCtx.filter='sepia(1) saturate(8) hue-rotate(150deg)';targetCtx.drawImage(baseCanvas,10*i,0);targetCtx.filter='none'
  }else if(effect==='bulge'){
    targetCtx.drawImage(baseCanvas,0,0);const scale=1+.05*i;targetCtx.globalAlpha=alpha*.5;targetCtx.drawImage(baseCanvas,w*(1-scale)/2,h*(1-scale)/2,w*scale,h*scale)
  }else targetCtx.drawImage(baseCanvas,0,0)
  targetCtx.restore()
}
async function drawVisualWithEffects(ctx,source,asset,clip,w,h,progress=0,alpha=1){
  const effect=clip.gpuEffect||'none'
  if(effect==='none'){applyClipDrawing(ctx,source,asset,clip,w,h,progress,alpha);return}
  const base=ensureCanvasSize(gpuFxScratch,w,h),bctx=base.getContext('2d');bctx.clearRect(0,0,w,h);applyClipDrawing(bctx,source,asset,{...clip,opacity:1},w,h,progress,1)
  const rt=await ensureGpuFxRuntime(w,h)
  if(rt){
    try{rt.sourceCtx.clearRect(0,0,w,h);rt.sourceCtx.drawImage(base,0,0);rt.texture.source.update();const filter=pixiFilterFor(effect,clip.gpuIntensity,w,h,progress);if(filter){rt.sprite.filters=[filter];rt.app.renderer.render({container:rt.app.stage,clear:true});ctx.save();ctx.globalAlpha=(clip.opacity??1)*alpha;ctx.drawImage(rt.app.canvas,0,0,w,h);ctx.restore();return}}
    catch(error){console.warn('GPU effect frame failed, falling back to Canvas.',error)}
  }
  applyGpuFallback(ctx,base,effect,clip.gpuIntensity,w,h,progress,(clip.opacity??1)*alpha)
}
function isGlTransition(name){return Boolean(GL_TRANSITIONS[name])}
function ensureGlContext(w,h){
  if(glTransitionRuntime.failed)return null
  try{const canvas=ensureCanvasSize(glTransitionRuntime.canvas,w,h);let gl=glTransitionRuntime.gl;if(!gl){gl=canvas.getContext('webgl',{alpha:true,preserveDrawingBuffer:true,antialias:false});if(!gl)throw new Error('WebGL unavailable');glTransitionRuntime.gl=gl}gl.viewport(0,0,w,h);return gl}catch(error){console.warn('GL transitions unavailable.',error);glTransitionRuntime.failed=true;return null}
}
async function glTransitionSource(name){
  if(glTransitionRuntime.sources.has(name))return glTransitionRuntime.sources.get(name)
  const def=GL_TRANSITIONS[name];if(!def)return null
  const p=fetch(`./vendor/gl-transitions/${def.file}`).then(r=>{if(!r.ok)throw new Error(`Shader ${def.file} ${r.status}`);return r.text()})
  glTransitionRuntime.sources.set(name,p);return p
}
function glCompile(gl,type,source){const sh=gl.createShader(type);gl.shaderSource(sh,source);gl.compileShader(sh);if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(sh)||'GL shader compile failed');return sh}
async function glProgram(name,gl){
  if(glTransitionRuntime.programs.has(name))return glTransitionRuntime.programs.get(name)
  const body=await glTransitionSource(name);if(!body)return null
  const vs=`attribute vec2 a_position;varying vec2 v_uv;void main(){v_uv=(a_position+1.0)*0.5;gl_Position=vec4(a_position,0.0,1.0);}`
  const fs=`precision highp float;uniform sampler2D u_from;uniform sampler2D u_to;uniform float progress;uniform float ratio;varying vec2 v_uv;vec4 getFromColor(vec2 uv){return texture2D(u_from,clamp(uv,0.0,1.0));}vec4 getToColor(vec2 uv){return texture2D(u_to,clamp(uv,0.0,1.0));}${body}\nvoid main(){gl_FragColor=transition(v_uv);}`
  const program=gl.createProgram();gl.attachShader(program,glCompile(gl,gl.VERTEX_SHADER,vs));gl.attachShader(program,glCompile(gl,gl.FRAGMENT_SHADER,fs));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(program)||'GL program link failed')
  const pos=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,pos);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW)
  const data={program,pos};glTransitionRuntime.programs.set(name,data);return data
}
function glTexture(gl,unit,source){const tex=gl.createTexture();gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,tex);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,source);return tex}
async function renderGlTransition(fromCanvas,toCanvas,name,progress,w,h){
  const gl=ensureGlContext(w,h);if(!gl)return null
  try{const compiled=await glProgram(name,gl);if(!compiled)return null;const {program,pos}=compiled;gl.useProgram(program);gl.bindBuffer(gl.ARRAY_BUFFER,pos);const loc=gl.getAttribLocation(program,'a_position');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);const t0=glTexture(gl,0,fromCanvas),t1=glTexture(gl,1,toCanvas);gl.uniform1i(gl.getUniformLocation(program,'u_from'),0);gl.uniform1i(gl.getUniformLocation(program,'u_to'),1);gl.uniform1f(gl.getUniformLocation(program,'progress'),clamp(progress,0,1));gl.uniform1f(gl.getUniformLocation(program,'ratio'),w/h);const defs=GL_TRANSITIONS[name]?.uniforms||{};for(const [key,value] of Object.entries(defs)){const u=gl.getUniformLocation(program,key);if(!u)continue;if(Array.isArray(value)){if(value.length===2)gl.uniform2f(u,value[0],value[1]);else if(value.length===4)gl.uniform4f(u,...value)}else gl.uniform1f(u,value)}gl.drawArrays(gl.TRIANGLES,0,6);gl.deleteTexture(t0);gl.deleteTexture(t1);return glTransitionRuntime.canvas}catch(error){console.warn('GL transition failed, using dissolve fallback.',name,error);return null}
}
function nextTimelineRow(row,project=state.project){const rows=clipTimeline(project),index=rows.findIndex(r=>r.clip.id===row.clip.id);return index>=0?rows[index+1]||null:null}
async function incomingTransitionSource(row,project=state.project){
  const next=nextTimelineRow(row,project);if(!next)return null;const asset=getAsset(next.clip.assetId,project),url=state.urls[next.clip.assetId];if(!asset||!url)return null
  if(asset.type==='image')return {row:next,asset,source:await loadImage(url)}
  let video=transitionSourceNodes.get(next.clip.id);if(!video){video=document.createElement('video');video.preload='auto';video.playsInline=true;video.muted=true;video.style.display='none';document.body.append(video);transitionSourceNodes.set(next.clip.id,video)}
  if(video.src!==url){video.src=url;video.load();await waitLoaded(video).catch(()=>{})}
  const target=Math.max(0,next.clip.start||0);if(video.readyState>=1&&Math.abs((video.currentTime||0)-target)>.04){video.currentTime=target;await waitSeek(video).catch(()=>{})}
  return video.readyState>=2?{row:next,asset,source:video}:null
}
async function drawGlTransition(ctx,source,asset,row,time,w,h,progress){
  const d=Math.min(Number(row.clip.transitionDuration)||.35,row.duration/2),remaining=row.end-time
  if(d<=0||remaining<0||remaining>d){await drawVisualWithEffects(ctx,source,asset,row.clip,w,h,progress,1);return true}
  const incoming=await incomingTransitionSource(row);if(!incoming){await drawVisualWithEffects(ctx,source,asset,row.clip,w,h,progress,1);return false}
  const fromCanvas=document.createElement('canvas'),toCanvas=document.createElement('canvas');fromCanvas.width=toCanvas.width=w;fromCanvas.height=toCanvas.height=h
  await drawVisualWithEffects(fromCanvas.getContext('2d'),source,asset,row.clip,w,h,progress,1)
  await drawVisualWithEffects(toCanvas.getContext('2d'),incoming.source,incoming.asset,incoming.row.clip,w,h,0,1)
  const p=clamp(1-remaining/d,0,1),result=await renderGlTransition(fromCanvas,toCanvas,row.clip.transition,p,w,h)
  if(result)ctx.drawImage(result,0,0,w,h);else{ctx.save();ctx.globalAlpha=1-p;ctx.drawImage(fromCanvas,0,0);ctx.globalAlpha=p;ctx.drawImage(toCanvas,0,0);ctx.restore()}
  return true
}

function transitionStyle(row,time,w,h) {
  const clip=row.clip, d=Math.min(Number(clip.transitionDuration)||.35,row.duration/2)
  const none={alpha:1,tx:0,ty:0,scale:1,rotation:0,blur:0,overlay:null,overlayAlpha:0}
  if (!clip.transition || clip.transition==='none' || d<=0) return none
  const local=time-row.start
  const atStart=local<d, atEnd=row.end-time<d
  if (!atStart && !atEnd) return none
  const progress=atStart ? clamp(local/d,0,1) : clamp((row.end-time)/d,0,1)
  const edge=1-progress
  const out={...none}
  switch(clip.transition) {
    case 'dissolve': out.alpha=progress; break
    case 'fade': out.overlay='#000000'; out.overlayAlpha=edge; break
    case 'flash': out.overlay='#ffffff'; out.overlayAlpha=edge*.9; break
    case 'slideleft': out.tx=(atStart?1:-1)*w*edge; out.alpha=.35+.65*progress; break
    case 'slideright': out.tx=(atStart?-1:1)*w*edge; out.alpha=.35+.65*progress; break
    case 'zoom': out.scale=1 + .20*edge; out.alpha=.55+.45*progress; break
    case 'blur': out.blur=10*edge; out.alpha=.72+.28*progress; break
    case 'slideup': out.ty=(atStart?1:-1)*h*edge; out.alpha=.35+.65*progress; break
    case 'slidedown': out.ty=(atStart?-1:1)*h*edge; out.alpha=.35+.65*progress; break
    case 'spin': out.scale=1+.12*edge; out.rotation=(atStart?1:-1)*edge*.16; out.alpha=.5+.5*progress; break
    case 'dipblack': out.overlay='#000000'; out.overlayAlpha=Math.sin((1-progress)*Math.PI/2); break
    case 'dipwhite': out.overlay='#ffffff'; out.overlayAlpha=Math.sin((1-progress)*Math.PI/2)*.9; break
    case 'push': out.tx=(atStart?1:-1)*w*.42*edge; out.scale=.97+.03*progress; out.alpha=.5+.5*progress; break
    case 'softzoom': out.scale=.9+.1*progress; out.blur=6*edge; out.alpha=.45+.55*progress; break
  }
  return out
}
function transitionAlpha(row,time) { return transitionStyle(row,time,1,1).alpha }
async function drawClipWithTransition(ctx,source,asset,row,time,w,h,progress) {
  if(isGlTransition(row.clip.transition)){await drawGlTransition(ctx,source,asset,row,time,w,h,progress);return}
  const fx=transitionStyle(row,time,w,h)
  ctx.save()
  ctx.translate(fx.tx,fx.ty)
  ctx.translate(w/2,h/2); ctx.rotate(fx.rotation||0); ctx.scale(fx.scale,fx.scale); ctx.translate(-w/2,-h/2)
  const clip = fx.blur ? {...row.clip, blur:(row.clip.blur||0)+fx.blur} : row.clip
  await drawVisualWithEffects(ctx,source,asset,clip,w,h,progress,fx.alpha)
  ctx.restore()
  if (fx.overlay && fx.overlayAlpha>0) {
    ctx.save(); ctx.fillStyle=fx.overlay; ctx.globalAlpha=fx.overlayAlpha; ctx.fillRect(0,0,w,h); ctx.restore()
  }
}
function drawTransitionOverlay(ctx,row,time,w,h) {
  const fx=transitionStyle(row,time,w,h)
  if (fx.overlay && fx.overlayAlpha>0) { ctx.save(); ctx.fillStyle=fx.overlay; ctx.globalAlpha=fx.overlayAlpha; ctx.fillRect(0,0,w,h); ctx.restore() }
}

function drawBuiltInElement(ctx,item,width,height){
  const x=(item.x??.5)*width,y=(item.y??.5)*height,scale=item.scale??1,rot=(item.rotation||0)*Math.PI/180
  ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(scale,scale);ctx.globalAlpha=item.opacity??1
  const w=width*.22,h=Math.max(28,height*.065),accent=item.color||'#2455F5'
  if(item.kind==='emoji'){ctx.font=`${Math.max(34,h*1.3)}px "Apple Color Emoji","Segoe UI Emoji",sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(item.label||'✨',0,0)}else if(item.kind==='subscribe'){
    ctx.fillStyle='#ff2d2d';roundedRect(ctx,-w/2,-h/2,w,h,h/2);ctx.fill();ctx.fillStyle='#fff';ctx.font=`700 ${Math.max(12,h*.34)}px -apple-system,system-ui`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(item.label||'SUBSCRIBE',0,1)
  }else if(item.kind==='like'){
    ctx.fillStyle=accent;ctx.beginPath();ctx.arc(0,0,h*.48,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff';ctx.font=`700 ${h*.46}px system-ui`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('♥',0,1)
  }else if(item.kind==='bell'){
    ctx.fillStyle=accent;ctx.beginPath();ctx.arc(0,0,h*.48,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff';ctx.font=`700 ${h*.42}px system-ui`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('●',0,-2);ctx.fillRect(-h*.16,h*.16,h*.32,h*.08)
  }else if(item.kind==='lowerthird'){
    ctx.fillStyle='rgba(10,12,17,.86)';roundedRect(ctx,-w,-h*.75,w*2,h*1.5,h*.18);ctx.fill();ctx.fillStyle=accent;ctx.fillRect(-w,-h*.75,Math.max(4,w*.04),h*1.5);ctx.fillStyle='#fff';ctx.font=`650 ${Math.max(11,h*.34)}px -apple-system,system-ui`;ctx.textAlign='left';ctx.textBaseline='middle';ctx.fillText(item.label||'Your title',-w+h*.28,0)
  }else if(item.kind==='arrow'){
    ctx.strokeStyle=accent;ctx.lineWidth=Math.max(4,h*.12);ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();ctx.moveTo(-w*.55,0);ctx.lineTo(w*.45,0);ctx.lineTo(w*.15,-h*.35);ctx.moveTo(w*.45,0);ctx.lineTo(w*.15,h*.35);ctx.stroke()
  }else if(item.kind==='circle'){
    ctx.strokeStyle=accent;ctx.lineWidth=Math.max(4,h*.1);ctx.beginPath();ctx.arc(0,0,h*.55,0,Math.PI*2);ctx.stroke()
  }else if(item.kind==='label'){
    ctx.fillStyle=accent;roundedRect(ctx,-w*.55,-h*.52,w*1.1,h*1.04,h*.2);ctx.fill();ctx.fillStyle='#fff';ctx.font=`650 ${Math.max(11,h*.34)}px -apple-system,system-ui`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(item.label||'NEW',0,1)
  }
  ctx.restore()
}

function drawElements(ctx,project,time,width,height){
  for(const item of activeElementsAt(time,project))drawBuiltInElement(ctx,item,width,height)
}

function overlayVideoFor(clip,url){
  let el=overlayPreviewNodes.get(clip.id)
  if(!el){el=document.createElement('video');el.preload='auto';el.playsInline=true;el.muted=true;el.style.display='none';document.body.append(el);overlayPreviewNodes.set(clip.id,el)}
  if(el.src!==url){el.src=url;el.load()}
  return el
}
function stopOverlayVideos(){for(const el of overlayPreviewNodes.values())el.pause()}
async function drawOverlays(ctx,project,time,width,height){
  const active=activeOverlaysAt(time,project), alive=new Set((project?.overlays||[]).map(c=>c.id))
  for(const [id,el] of overlayPreviewNodes){if(!alive.has(id)){el.pause();el.remove();overlayPreviewNodes.delete(id)}}
  for(const clip of active){
    const asset=getAsset(clip.assetId,project),url=state.urls[clip.assetId];if(!asset||!url)continue
    const local=Math.max(0,time-(clip.timelineStart||0)),progress=local/Math.max(.05,overlayDuration(clip))
    if(asset.type==='image'){
      try{const img=await loadImage(url);await drawVisualWithEffects(ctx,img,asset,clip,width,height,progress,1)}catch{}
    }else if(asset.type==='video'){
      const el=overlayVideoFor(clip,url),target=(clip.start||0)+local*(clip.speed||1)
      el.playbackRate=clamp(clip.speed||1,.25,4)
      if(el.readyState>=1&&(!state.playing||Math.abs((el.currentTime||0)-target)>.3))el.currentTime=clamp(target,clip.start||0,Math.max(clip.start||0,(clip.end||asset.duration)-.03))
      if(state.playing&&el.paused&&el.readyState>=2)el.play().catch(()=>{})
      if(!state.playing&&!el.paused)el.pause()
      if(el.readyState>=2)await drawVisualWithEffects(ctx,el,asset,clip,width,height,progress,1)
    }
  }
}

function drawTexts(ctx, project, time, width, height) {
  for (const item of project.texts || []) {
    if (time < item.start || time > item.end) continue
    const duration=Math.max(.01,item.end-item.start), p=(time-item.start)/duration
    let alpha=1, dy=0, scale=1
    if (item.animation==='fade') alpha=Math.min(1,p*5,(1-p)*5)
    if (item.animation==='pop') scale=.86 + .14*Math.min(1,p*7)
    if (item.animation==='slide') { dy=(1-Math.min(1,p*6))*height*.04; alpha=Math.min(1,p*5) }
    ctx.save(); ctx.globalAlpha=clamp(alpha,0,1); ctx.translate(item.x*width,item.y*height+dy); ctx.rotate((item.rotation||0)*Math.PI/180); const userScale=item.scale??1; ctx.scale(scale*userScale,scale*userScale)
    const fs=(item.fontSize||44)*(width/960)
    ctx.font=`${item.weight||700} ${fs}px Inter, system-ui, -apple-system, Segoe UI, sans-serif`
    ctx.textAlign=item.align||'center'; ctx.textBaseline='middle'
    const lines=String(item.text||'').split(/\n/).slice(0,6), lineH=fs*1.16
    const widths=lines.map(line=>ctx.measureText(line).width), maxW=Math.max(0,...widths), totalH=lineH*lines.length
    let left = item.align==='left'?0:item.align==='right'?-maxW:-maxW/2
    if (item.background && item.background!=='transparent' && item.background!=='#00000000') {
      ctx.fillStyle=item.background; roundedRect(ctx,left-fs*.28,-totalH/2-fs*.16,maxW+fs*.56,totalH+fs*.32,fs*.18); ctx.fill()
    }
    lines.forEach((line,i)=>{
      const y=-totalH/2+lineH*(i+.5)
      if ((item.strokeWidth||0)>0) { ctx.strokeStyle=item.strokeColor||'#000000'; ctx.lineWidth=(item.strokeWidth||0)*(width/960); ctx.lineJoin='round'; ctx.strokeText(line,0,y) }
      ctx.fillStyle=item.color||'#ffffff'; ctx.fillText(line,0,y)
    })
    ctx.restore()
  }
}
function roundedRect(ctx,x,y,w,h,r) { const rr=Math.min(r,w/2,h/2); ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x,y,w,h,rr) : (ctx.rect(x,y,w,h)); }

async function drawPreview() {
  if (!state.project) return
  const canvas=$('#preview-canvas'); if (!canvas) return
  const ctx=canvas.getContext('2d',{alpha:false}), w=canvas.width,h=canvas.height
  ctx.fillStyle=state.project.background||'#0b0d12'; ctx.fillRect(0,0,w,h)
  const row=activeAt(state.currentTime)
  if (row) {
    const asset=getAsset(row.clip.assetId), url=state.urls[row.clip.assetId]
    if (asset && url) {
      const progress=(state.currentTime-row.start)/row.duration
      if (asset.type==='video') {
        ensurePreviewVideo(row,asset,url)
        if (previewVideo.readyState>=2) await drawClipWithTransition(ctx,previewVideo,asset,row,state.currentTime,w,h,progress)
      } else if (asset.type==='image') {
        try { const img=await loadImage(url); await drawClipWithTransition(ctx,img,asset,row,state.currentTime,w,h,progress) } catch {}
      }
    }
  }
  await drawOverlays(ctx,state.project,state.currentTime,w,h)
  drawElements(ctx,state.project,state.currentTime,w,h)
  drawTexts(ctx,state.project,state.currentTime,w,h)
  const hasVisual=Boolean(row)||activeOverlaysAt(state.currentTime).length||activeElementsAt(state.currentTime).length
  const empty=$('.preview-empty'); if (empty) empty.classList.toggle('hidden',hasVisual)
  updatePreviewSelectionOverlay()
  if(state.playing)setKonvaEditorVisible(false);else if(!konvaRuntime.interacting)syncKonvaCanvasEditor()
}

function ensurePreviewVideo(row,asset,url) {
  const desired=sourceTime(row,state.currentTime)
  if (state.currentPreviewAsset!==asset.id || previewVideo.src!==url) {
    state.currentPreviewAsset=asset.id; previewVideo.pause(); previewVideo.src=url; previewVideo.load()
    previewVideo.addEventListener('loadedmetadata',()=>{ previewVideo.currentTime=clamp(desired,0,Math.max(0,(previewVideo.duration||asset.duration)-.03)); drawPreview() },{once:true})
  } else if (!state.playing && Math.abs((previewVideo.currentTime||0)-desired)>.05 && previewVideo.readyState>=1) {
    previewVideo.currentTime=clamp(desired,0,Math.max(0,(previewVideo.duration||asset.duration)-.03))
  }
  previewVideo.playbackRate=clamp(row.clip.speed||1,.25,4)
  previewVideo.volume=clamp(row.clip.volume??1,0,1)
  if (state.playing && previewVideo.paused && previewVideo.readyState>=2) previewVideo.play().catch(()=>{})
}

function audioFadeGain(clip,localTime) {
  const dur=audioClipDuration(clip), fadeIn=Math.min(clip.fadeIn||0,dur/2), fadeOut=Math.min(clip.fadeOut||0,dur/2)
  let gain=1
  if(fadeIn>0 && localTime<fadeIn) gain=Math.min(gain,localTime/fadeIn)
  if(fadeOut>0 && localTime>dur-fadeOut) gain=Math.min(gain,(dur-localTime)/fadeOut)
  return clamp(gain,0,1)
}
function audioElementForClip(clip) {
  let el=audioPreviewNodes.get(clip.id)
  if(!el){el=document.createElement('audio');el.preload='auto';el.playsInline=true;el.style.display='none';document.body.append(el);audioPreviewNodes.set(clip.id,el)}
  return el
}
function syncAudioTracks(force=false) {
  const clips=state.project?.audioClips||[], alive=new Set(clips.map(c=>c.id))
  for(const [id,el] of audioPreviewNodes){if(!alive.has(id)){el.pause();el.remove();audioPreviewNodes.delete(id)}}
  for(const clip of clips){
    const asset=getAsset(clip.assetId),url=state.urls[clip.assetId];if(!asset||!url)continue
    const dur=audioClipDuration(clip), local=state.currentTime-(clip.timelineStart||0), active=local>=0&&local<=dur
    const el=audioElementForClip(clip)
    if(el.src!==url){el.src=url;el.load();force=true}
    el.playbackRate=clamp(clip.speed||1,.5,2)
    el.volume=clip.muted?0:clamp((clip.volume??.8)*audioFadeGain(clip,Math.max(0,local)),0,1)
    if(active){
      const target=(clip.sourceStart||0)+local*(clip.speed||1)
      if(el.readyState>=1 && (force||Math.abs((el.currentTime||0)-target)>.28)) el.currentTime=clamp(target,clip.sourceStart||0,Math.max(clip.sourceStart||0,(clip.sourceEnd||asset.duration)-.02))
      if(state.playing && el.paused)el.play().catch(()=>{})
      if(!state.playing&&!el.paused)el.pause()
    } else if(!el.paused) el.pause()
  }
}
function stopAudioTracks(){for(const el of audioPreviewNodes.values())el.pause()}
function syncSoundtrack(){ syncAudioTracks(true) }

function updatePlaybackUi() {
  const dur=projectDuration(), seek=$('#seekbar'), time=$('#timecode'), play=$('[data-action="play-toggle"]'), head=$('.playhead')
  if (seek) { seek.max=dur||1; seek.value=state.currentTime }
  if (time) time.textContent=`${fmtTime(state.currentTime)} / ${fmtTime(dur)}`
  if (play) { play.textContent=state.playing?'❚❚':'▶'; play.setAttribute('aria-label',state.playing?tr('pause'):tr('play')) }
  if (head) head.style.left=`${Math.max(0,state.currentTime*state.pxPerSec)+42}px`
}
function playbackLoop(now) {
  if (!state.playing) return
  const dur=projectDuration()
  state.currentTime=Math.min(dur,playStartTime+(now-playStartPerf)/1000)
  const row=activeAt(state.currentTime)
  if (state.currentTime>=dur) { stopPlayback(true); return }
  if(row) ensureActiveMediaForPlayback(row); else previewVideo.pause()
  syncAudioTracks(false)
  drawPreview(); updatePlaybackUi()
  rafId=requestAnimationFrame(playbackLoop)
}
function ensureActiveMediaForPlayback(row) {
  const asset=getAsset(row.clip.assetId), url=state.urls[row.clip.assetId]
  if (asset?.type==='video' && url) {
    const changed=state.currentPreviewAsset!==asset.id
    ensurePreviewVideo(row,asset,url)
    if (changed && previewVideo.readyState>=1) previewVideo.currentTime=sourceTime(row,state.currentTime)
  } else previewVideo.pause()
}
function startPlayback() {
  if (!state.project || !projectDuration()) return
  if (state.currentTime>=projectDuration()-.03) state.currentTime=0
  state.playing=true; playStartPerf=performance.now(); playStartTime=state.currentTime
  syncAudioTracks(true); const row=activeAt(state.currentTime); if(row) ensureActiveMediaForPlayback(row)
  updatePlaybackUi(); cancelAnimationFrame(rafId); rafId=requestAnimationFrame(playbackLoop)
}
function stopPlayback(atEnd=false) {
  state.playing=false; cancelAnimationFrame(rafId); previewVideo.pause(); previewAudio.pause(); stopAudioTracks(); stopOverlayVideos()
  if (atEnd) state.currentTime=projectDuration()
  updatePlaybackUi(); drawPreview()
}
function seekTo(value) {
  state.currentTime=clamp(value,0,projectDuration()); if(state.playing){playStartTime=state.currentTime;playStartPerf=performance.now()}
  const row=activeAt(state.currentTime); if(row) ensureActiveMediaForPlayback(row); syncAudioTracks(true); updatePlaybackUi(); drawPreview()
}

function defaultProject(ratio='16:9') {
  const now=Date.now()
  return { id:uid(), name:state.language==='el'?'Νέο project':'Untitled project', createdAt:now, updatedAt:now, ratio, background:'#0b0d12', assets:[], clips:[], overlays:[], elements:[], audioClips:[], texts:[], soundtrack:null, smartAudioGuideId:null }
}
function normalizeProject(p) {
  p.background ||= '#0b0d12'; p.assets ||= []; p.clips ||= []; p.overlays ||= []; p.elements ||= []; p.texts ||= p.textOverlays || []; p.audioClips ||= []
  if(p.soundtrack && !p.audioClips.length){const a=p.assets.find(x=>x.id===p.soundtrack.assetId);if(a)p.audioClips.push({id:uid(),assetId:a.id,timelineStart:0,sourceStart:0,sourceEnd:a.duration||30,volume:p.soundtrack.volume??.7,speed:1,fadeIn:0,fadeOut:0,muted:false})}
  p.soundtrack=null
  p.smartAudioGuideId ||= null
  for (const c of p.audioClips) Object.assign(c,{beatCutEvery:2,smartSilence:false},c)
  if(p.smartAudioGuideId && !p.audioClips.some(c=>c.id===p.smartAudioGuideId))p.smartAudioGuideId=null
  for (const c of p.clips) Object.assign(c,{brightness:100,exposure:0,contrast:100,saturation:100,temperature:0,vignette:0,grain:0,hue:0,blur:0,grayscale:0,sepia:0,invert:0,fadeAmount:0,shadows:0,gpuEffect:'none',gpuIntensity:.65,motion:'none',transition:'none',transitionDuration:.35,offsetX:0,offsetY:0,flipX:false,flipY:false,audioFadeIn:0,audioFadeOut:0,smartReframe:null},c)
  for (const c of p.overlays) Object.assign(c,{timelineStart:0,lane:2,brightness:100,exposure:0,contrast:100,saturation:100,temperature:0,vignette:0,grain:0,hue:0,blur:0,grayscale:0,sepia:0,invert:0,fadeAmount:0,shadows:0,gpuEffect:'none',gpuIntensity:.65,motion:'none',offsetX:0,offsetY:0,scale:.36,fit:'contain',opacity:1,flipX:false,flipY:false,volume:0},c)
  for (const c of p.elements) Object.assign(c,{x:.5,y:.5,scale:1,rotation:0,opacity:1,z:20},c)
  for (const t of p.texts) Object.assign(t,{x:.5,y:.5,scale:1,rotation:0,align:'center'},t)
  return p
}
async function createProject(ratio='16:9') {
  stopPlayback(); state.project=defaultProject(ratio); await saveProject(state.project); state.projects=await listProjects(); state.urls={}; state.history=[]; state.future=[]; state.currentTime=0; state.selected=null; state.view='editor'; render()
}
async function openProject(id) {
  stopPlayback(); revokeUrls(); const p=await getProject(id); if(!p) return
  state.project=normalizeProject(p); state.urls={}
  for (const asset of state.project.assets) { const blob=await getBlob(asset.id); if(blob) state.urls[asset.id]=URL.createObjectURL(blob) }
  state.history=[];state.future=[];state.currentTime=0;state.selected=null;state.view='editor';render()
}
function revokeUrls() { Object.values(state.urls).forEach(url=>URL.revokeObjectURL(url)); state.urls={}; imageCache.clear();for(const el of overlayPreviewNodes.values()){el.pause();el.remove()}overlayPreviewNodes.clear();for(const el of transitionSourceNodes.values()){el.pause();el.remove()}transitionSourceNodes.clear() }
async function goHome() { stopPlayback(); if(state.project) await saveProject(state.project); revokeUrls(); state.project=null;state.view='home';state.projects=await listProjects();render() }

function pushHistory() {
  if (!state.project) return
  state.history.push(clone(state.project)); if(state.history.length>50) state.history.shift(); state.future=[]
}
function mutate(fn, {rerender=true}={}) {
  if (!state.project) return
  pushHistory(); fn(state.project); state.project.updatedAt=Date.now(); queueSave();
  if(rerender) renderEditor(); else { drawPreview(); updatePlaybackUi() }
}
function undo() { if(!state.history.length||!state.project)return; state.future.push(clone(state.project)); state.project=state.history.pop(); queueSave(); renderEditor() }
function redo() { if(!state.future.length||!state.project)return; state.history.push(clone(state.project)); state.project=state.future.pop(); queueSave(); renderEditor() }

async function mediaMetadata(file) {
  const type=file.type.startsWith('video/')?'video':file.type.startsWith('image/')?'image':file.type.startsWith('audio/')?'audio':null
  if(!type) throw new Error('unsupported')
  const url=URL.createObjectURL(file)
  try {
    if(type==='image') {
      const img=await loadImage(url); return {type,duration:4,width:img.naturalWidth,height:img.naturalHeight}
    }
    const media=document.createElement(type==='video'?'video':'audio'); media.preload='metadata'; media.src=url
    await new Promise((resolve,reject)=>{ media.onloadedmetadata=resolve; media.onerror=reject })
    const audioTracks=type==='video'&&media.audioTracks&&typeof media.audioTracks.length==='number'?media.audioTracks.length:undefined
    return {type,duration:Number.isFinite(media.duration)?media.duration:0,width:type==='video'?media.videoWidth:undefined,height:type==='video'?media.videoHeight:undefined,hasAudio:type==='audio'?true:(audioTracks===undefined?undefined:audioTracks>0)}
  } finally { URL.revokeObjectURL(url) }
}
async function buildWaveform(file,points=72) {
  if(!file.type.startsWith('audio/'))return null
  try {
    const ctx=new (window.AudioContext||window.webkitAudioContext)(), buffer=await ctx.decodeAudioData(await file.arrayBuffer()), data=buffer.getChannelData(0), step=Math.max(1,Math.floor(data.length/points)), peaks=[]
    for(let i=0;i<points;i++){let max=0;const start=i*step,end=Math.min(data.length,start+step);for(let j=start;j<end;j++)max=Math.max(max,Math.abs(data[j]));peaks.push(Math.round(max*1000)/1000)}
    await ctx.close().catch(()=>{});return peaks
  } catch { return null }
}

function smartcropEngine(){return window.smartcrop||window.SmartCrop||null}
function meydaEngine(){return window.Meyda||null}
function median(values){const v=values.filter(Number.isFinite).slice().sort((a,b)=>a-b);if(!v.length)return 0;const m=Math.floor(v.length/2);return v.length%2?v[m]:(v[m-1]+v[m])/2}
function percentile(values,q){const v=values.filter(Number.isFinite).slice().sort((a,b)=>a-b);if(!v.length)return 0;const i=clamp(q,0,1)*(v.length-1),lo=Math.floor(i),hi=Math.ceil(i),f=i-lo;return v[lo]*(1-f)+v[hi]*f}
function ratioPair(ratio){return ({'16:9':[16,9],'9:16':[9,16],'1:1':[1,1],'4:5':[4,5]})[ratio]||[16,9]}
function smartFrameCanvas(source,maxSide=640){
  const sw=source.videoWidth||source.naturalWidth||source.width||640,sh=source.videoHeight||source.naturalHeight||source.height||360
  const scale=Math.min(1,maxSide/Math.max(sw,sh)),w=Math.max(2,Math.round(sw*scale)),h=Math.max(2,Math.round(sh*scale))
  const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h
  const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.drawImage(source,0,0,w,h)
  return canvas
}
async function videoAnalysisFrame(url,sourceTime){
  const video=document.createElement('video');video.preload='auto';video.muted=true;video.playsInline=true;video.crossOrigin='anonymous';video.src=url
  try{
    await waitLoaded(video)
    const maxTime=Math.max(0,(Number.isFinite(video.duration)?video.duration:sourceTime)-.04)
    video.currentTime=clamp(sourceTime,0,maxTime)
    await waitSeek(video)
    return smartFrameCanvas(video)
  }finally{
    try{video.pause()}catch{}
    video.removeAttribute('src');video.load()
  }
}
async function smartCropSample(clip,asset,ratio,position=.5){
  const engine=smartcropEngine();if(!engine?.crop)throw new Error('Smartcrop.js runtime unavailable')
  const url=state.urls[asset.id];if(!url)throw new Error('Media source unavailable')
  let frame
  if(asset.type==='image')frame=smartFrameCanvas(await loadImage(url))
  else{
    const sourceTime=clip.start+(clip.end-clip.start)*clamp(position,0,1)
    frame=await videoAnalysisFrame(url,sourceTime)
  }
  const [rw,rh]=ratioPair(ratio)
  const result=await engine.crop(frame,{width:rw,height:rh,minScale:.7,maxScale:1,ruleOfThirds:true})
  const crop=result?.topCrop
  if(!crop)throw new Error('Smartcrop returned no crop')
  return {
    cx:(crop.x+crop.width/2)/frame.width,
    cy:(crop.y+crop.height/2)/frame.height,
    width:crop.width/frame.width,
    height:crop.height/frame.height,
    score:Number(crop.score?.total)||0
  }
}
function smartReframeTransform(asset,ratio,samples){
  const cx=median(samples.map(x=>x.cx)),cy=median(samples.map(x=>x.cy)),cw=median(samples.map(x=>x.width)),ch=median(samples.map(x=>x.height))
  const sw=Math.max(1,asset.width||1920),sh=Math.max(1,asset.height||1080),tr=ratioValue(ratio)
  const targetH=1000,targetW=targetH*tr
  const cropW=Math.max(1,cw*sw),cropH=Math.max(1,ch*sh)
  const desiredK=Math.max(targetW/cropW,targetH/cropH),baseK=Math.max(targetW/sw,targetH/sh)
  const scale=clamp(desiredK/baseK,1,3),dw=sw*baseK*scale,dh=sh*baseK*scale
  const offsetX=clamp((dw*(.5-cx))/targetW,-.7,.7),offsetY=clamp((dh*(.5-cy))/targetH,-.7,.7)
  return {scale,offsetX,offsetY,fit:'cover'}
}
async function autoReframeSelected(){
  const selected=selectedClip(),clipId=selected?.id,asset=getAsset(selected?.assetId)
  if(!selected||!asset||!['image','video'].includes(asset.type)){toast(state.language==='el'?'Επίλεξε ένα κύριο clip στη V1.':'Select a primary V1 clip.','error');return}
  if(state.smartBusy)return
  if(!smartcropEngine()?.crop){toast(state.language==='el'?'Το Smartcrop δεν φορτώθηκε. Κάνε ανανέωση της εφαρμογής.':'Smartcrop did not load. Refresh the app.','error');return}
  state.smartBusy='reframe';state.smartProgress=0;renderEditor()
  try{
    const positions=asset.type==='video'?[.2,.5,.8]:[.5],samples=[]
    for(let i=0;i<positions.length;i++){
      samples.push(await smartCropSample(selected,asset,state.project.ratio,positions[i]))
      state.smartProgress=(i+1)/positions.length
    }
    const target=state.project?.clips.find(c=>c.id===clipId);if(!target)return
    const transform=smartReframeTransform(asset,state.project.ratio,samples)
    pushHistory()
    Object.assign(target,transform,{smartReframe:{engine:'smartcrop-2.0.5',ratio:state.project.ratio,samples:samples.length,analyzedAt:Date.now()}})
    state.project.updatedAt=Date.now();queueSave();drawPreview()
    toast(state.language==='el'?'Το Auto Reframe εφαρμόστηκε.':'Auto Reframe applied.','success')
  }catch(error){
    console.error('Auto Reframe failed:',error)
    toast(state.language==='el'?'Το Auto Reframe δεν ολοκληρώθηκε.':'Auto Reframe could not finish.','error')
  }finally{state.smartBusy=null;state.smartProgress=0;renderEditor()}
}
function resetSmartReframe(){
  const c=selectedClip();if(!c)return
  mutate(p=>{const x=p.clips.find(v=>v.id===c.id);Object.assign(x,{fit:'cover',scale:1,offsetX:0,offsetY:0});delete x.smartReframe})
}
function audioAnalysisForClip(c){return c?getAsset(c.assetId)?.audioAnalysis:null}
function analysisBeatTimes(c,analysis=audioAnalysisForClip(c)){
  if(!c||!analysis?.beats)return[]
  const speed=Math.max(.05,c.speed||1),start=c.sourceStart||0,end=c.sourceEnd||0,timeline=c.timelineStart||0
  return analysis.beats.filter(b=>b.time>=start&&b.time<=end).map(b=>({time:timeline+(b.time-start)/speed,strength:b.strength??1,sourceTime:b.time}))
}
function analysisSilenceRanges(c,analysis=audioAnalysisForClip(c)){
  if(!c||!analysis?.silences)return[]
  const speed=Math.max(.05,c.speed||1),start=c.sourceStart||0,end=c.sourceEnd||0,timeline=c.timelineStart||0
  return analysis.silences.map(s=>({start:Math.max(s.start,start),end:Math.min(s.end,end)})).filter(s=>s.end-s.start>.05).map(s=>({start:timeline+(s.start-start)/speed,end:timeline+(s.end-start)/speed}))
}
function estimateBpm(beats){
  const intervals=[]
  for(let i=1;i<beats.length;i++){const d=beats[i].time-beats[i-1].time;if(d>=.25&&d<=1.6)intervals.push(d)}
  if(!intervals.length)return 0
  let bpm=60/median(intervals)
  while(bpm<70)bpm*=2
  while(bpm>180)bpm/=2
  return Math.round(bpm)
}
function detectSilenceRegions(times,dbValues,thresholdDb,minDuration=.35){
  const out=[];let start=null,last=null
  for(let i=0;i<times.length;i++){
    const silent=dbValues[i]<=thresholdDb
    if(silent&&start===null)start=times[i]
    if(silent)last=times[i]
    if(!silent&&start!==null){const end=last??times[i];if(end-start>=minDuration)out.push({start,end});start=null;last=null}
  }
  if(start!==null){const end=last??start;if(end-start>=minDuration)out.push({start,end})}
  const merged=[]
  for(const r of out){const prev=merged[merged.length-1];if(prev&&r.start-prev.end<.14)prev.end=r.end;else merged.push({...r})}
  return merged.map(r=>({start:Math.round(r.start*1000)/1000,end:Math.round(r.end*1000)/1000}))
}
function detectBeatPeaks(times,rmsValues,fluxValues,dbValues,silenceThreshold){
  const novelty=fluxValues.map((v,i)=>Number.isFinite(v)&&v>0?v:Math.max(0,(rmsValues[i]||0)-(rmsValues[i-1]||0))*40)
  const beats=[];let last=-10
  for(let i=6;i<novelty.length-2;i++){
    const from=Math.max(0,i-10),window=novelty.slice(from,i),mean=window.reduce((a,b)=>a+b,0)/Math.max(1,window.length)
    const variance=window.reduce((a,b)=>a+(b-mean)*(b-mean),0)/Math.max(1,window.length),std=Math.sqrt(variance)
    const threshold=mean+Math.max(std*1.25,mean*.22)
    const localPeak=novelty[i]>=novelty[i-1]&&novelty[i]>novelty[i+1]
    if(localPeak&&novelty[i]>threshold&&dbValues[i]>silenceThreshold+4&&times[i]-last>.22){
      const strength=clamp((novelty[i]-threshold)/(Math.abs(threshold)+std+.000001),.15,3)
      beats.push({time:Math.round(times[i]*1000)/1000,strength:Math.round(strength*100)/100})
      last=times[i]
    }
  }
  return beats
}
async function analyzeSelectedAudio(){
  const selected=selectedAudio(),clipId=selected?.id,asset=getAsset(selected?.assetId)
  if(!selected||!asset||asset.type!=='audio'){toast(state.language==='el'?'Επίλεξε audio clip στο A1.':'Select an audio clip on A1.','error');return}
  if(state.smartBusy)return
  const Meyda=meydaEngine()
  if(!Meyda?.extract){toast(state.language==='el'?'Το Meyda δεν φορτώθηκε. Κάνε ανανέωση της εφαρμογής.':'Meyda did not load. Refresh the app.','error');return}
  state.smartBusy='audio';state.smartProgress=0;renderEditor()
  let audioContext
  try{
    const blob=await getBlob(asset.id);if(!blob)throw new Error('Audio blob missing')
    audioContext=new (window.AudioContext||window.webkitAudioContext)()
    const buffer=await audioContext.decodeAudioData(await blob.arrayBuffer())
    const frameSize=2048,maxFrames=12000,rawHop=Math.max(1024,Math.ceil(Math.max(1,buffer.length-frameSize)/maxFrames))
    const hop=Math.max(1024,Math.ceil(rawHop/1024)*1024),channels=Array.from({length:buffer.numberOfChannels},(_,i)=>buffer.getChannelData(i))
    Meyda.bufferSize=frameSize;Meyda.sampleRate=buffer.sampleRate;Meyda.windowingFunction='hanning'
    const times=[],rmsValues=[],fluxValues=[],centroids=[];let previous=null,frameCount=0
    const estimatedFrames=Math.max(1,Math.ceil(Math.max(1,buffer.length-frameSize)/hop))
    for(let start=0;start+frameSize<=buffer.length;start+=hop){
      const frame=new Float32Array(frameSize)
      for(let i=0;i<frameSize;i++){let sum=0;for(const ch of channels)sum+=ch[start+i]||0;frame[i]=sum/Math.max(1,channels.length)}
      let features
      try{features=Meyda.extract(previous?['rms','spectralCentroid','spectralFlux']:['rms','spectralCentroid'],frame,previous)||{}}catch{features=Meyda.extract(['rms','spectralCentroid'],frame)||{}}
      times.push(start/buffer.sampleRate);rmsValues.push(Number(features.rms)||0);fluxValues.push(Number(features.spectralFlux));centroids.push(Number(features.spectralCentroid)||0)
      previous=frame;frameCount++
      if(frameCount%180===0){state.smartProgress=Math.min(.98,frameCount/estimatedFrames);await new Promise(resolve=>setTimeout(resolve,0))}
    }
    const dbValues=rmsValues.map(v=>20*Math.log10(Math.max(v,1e-8))),floor=percentile(dbValues,.12),med=percentile(dbValues,.5)
    const silenceThreshold=clamp(Math.min(floor+8,med-9),-55,-28)
    const silences=detectSilenceRegions(times,dbValues,silenceThreshold,.35)
    const beats=detectBeatPeaks(times,rmsValues,fluxValues,dbValues,silenceThreshold)
    const profilePoints=160,profile=[]
    for(let i=0;i<profilePoints;i++){const a=Math.floor(i*rmsValues.length/profilePoints),b=Math.max(a+1,Math.floor((i+1)*rmsValues.length/profilePoints));profile.push(Math.round(Math.max(0,...rmsValues.slice(a,b))*1000)/1000)}
    const analysis={engine:'meyda-5.6.3',version:1,analyzedAt:Date.now(),duration:buffer.duration,sampleRate:buffer.sampleRate,hopSeconds:hop/buffer.sampleRate,silenceThresholdDb:Math.round(silenceThreshold*10)/10,silences,beats,bpm:estimateBpm(beats),profile}
    const targetAsset=state.project?.assets.find(a=>a.id===asset.id);if(!targetAsset)return
    pushHistory();targetAsset.audioAnalysis=analysis;state.project.updatedAt=Date.now();queueSave()
    const targetClip=state.project.audioClips.find(c=>c.id===clipId);if(targetClip&&!targetClip.beatCutEvery)targetClip.beatCutEvery=2
    toast(state.language==='el'?`Ανάλυση έτοιμη · ${beats.length} beats · ${silences.length} σιωπές`:`Analysis ready · ${beats.length} beats · ${silences.length} silences`,'success')
  }catch(error){
    console.error('Smart audio analysis failed:',error)
    toast(state.language==='el'?'Η ανάλυση ήχου δεν ολοκληρώθηκε.':'Audio analysis could not finish.','error')
  }finally{
    if(audioContext)await audioContext.close().catch(()=>{})
    state.smartBusy=null;state.smartProgress=0;renderEditor()
  }
}
function toggleSmartAudioGuides(){
  const c=selectedAudio();if(!c||!audioAnalysisForClip(c))return
  mutate(p=>{p.smartAudioGuideId=p.smartAudioGuideId===c.id?null:c.id})
}
function smartGuideLayer(){
  const id=state.project?.smartAudioGuideId,c=state.project?.audioClips.find(x=>x.id===id),analysis=audioAnalysisForClip(c)
  if(!c||!analysis)return''
  const step=Math.max(1,Number(c.beatCutEvery)||2),allBeats=analysisBeatTimes(c,analysis).filter((_,i)=>i%step===0)
  const stride=Math.max(1,Math.ceil(allBeats.length/400)),beats=allBeats.filter((_,i)=>i%stride===0)
  const silences=analysisSilenceRanges(c,analysis).slice(0,140),maxTime=projectDuration()
  return `<div class="smart-guide-layer" aria-hidden="true">${silences.map(s=>`<i class="smart-silence-guide" style="left:${42+clamp(s.start,0,maxTime)*state.pxPerSec}px;width:${Math.max(2,(clamp(s.end,0,maxTime)-clamp(s.start,0,maxTime))*state.pxPerSec)}px"></i>`).join('')}${beats.map(b=>`<b class="smart-beat-guide" style="left:${42+clamp(b.time,0,maxTime)*state.pxPerSec}px;opacity:${(.34+Math.min(.5,(b.strength||1)*.18)).toFixed(2)}"></b>`).join('')}</div>`
}
function splitPrimaryClipsAtTimes(times){
  const project=state.project;if(!project?.clips?.length)return 0
  const rows=clipTimeline(project),clean=times.filter(Number.isFinite).sort((a,b)=>a-b),next=[],minGap=.28;let cuts=0
  for(const row of rows){
    const clip=row.clip,speed=Math.max(.05,clip.speed||1),inside=[];let last=row.start
    for(const t of clean){if(t<=row.start+minGap||t>=row.end-minGap||t-last<minGap)continue;inside.push(t);last=t}
    if(!inside.length){next.push(clip);continue}
    let sourceCursor=clip.start,first=true
    for(const t of inside){
      const sourceCut=clip.start+(t-row.start)*speed
      if(sourceCut-sourceCursor<.05)continue
      const seg={...clone(clip),id:first?clip.id:uid(),start:sourceCursor,end:sourceCut}
      if(!first)seg.transition='none'
      next.push(seg);sourceCursor=sourceCut;first=false;cuts++
    }
    const tail={...clone(clip),id:first?clip.id:uid(),start:sourceCursor,end:clip.end}
    if(!first)tail.transition='none'
    next.push(tail)
  }
  project.clips=next
  return cuts
}
function cutVideoToSelectedAudioBeats(){
  const c=selectedAudio(),analysis=audioAnalysisForClip(c);if(!c||!analysis){toast(state.language==='el'?'Ανάλυσε πρώτα το audio.':'Analyze the audio first.','error');return}
  const step=Math.max(1,Number(c.beatCutEvery)||2),beats=analysisBeatTimes(c,analysis).filter((_,i)=>i%step===0).map(b=>b.time).filter(t=>t>0&&t<visualDuration())
  if(!beats.length){toast(state.language==='el'?'Δεν βρέθηκαν beats μέσα στο video.':'No beats were found inside the video.','error');return}
  pushHistory();const cuts=splitPrimaryClipsAtTimes(beats)
  if(!cuts){state.history.pop();toast(state.language==='el'?'Δεν υπήρχαν ασφαλή σημεία για cut.':'No safe cut points were available.','error');return}
  state.project.updatedAt=Date.now();queueSave();renderEditor()
  toast(state.language==='el'?`${cuts} cuts εφαρμόστηκαν στα beats.`:`${cuts} beat cuts applied.`,'success')
}
function clearSmartAudioAnalysis(){
  const c=selectedAudio(),asset=getAsset(c?.assetId);if(!c||!asset?.audioAnalysis)return
  pushHistory();delete asset.audioAnalysis;if(state.project.smartAudioGuideId===c.id)state.project.smartAudioGuideId=null;state.project.updatedAt=Date.now();queueSave();renderEditor()
}

function preferredAudioInsertTime(){
  // New music should naturally play in parallel with the picture.
  // If a visual clip is selected align to its start, otherwise start at 00:00.
  const clip=selectedClip()
  if(clip){
    const row=clipTimeline().find(r=>r.clip.id===clip.id)
    if(row)return row.start
  }
  return visualDuration()>0 ? 0 : Math.max(0,state.currentTime||0)
}
function defaultAudioClip(asset,timelineStart=preferredAudioInsertTime()){
  const start=Math.max(0,timelineStart||0)
  const full=Math.max(.1,asset.duration||30)
  const visual=visualDuration()
  const remaining=visual>start?visual-start:0
  const fitted=remaining>0?Math.min(full,remaining):full
  return {id:uid(),assetId:asset.id,timelineStart:start,sourceStart:0,sourceEnd:Math.max(.1,fitted),volume:.8,speed:1,fadeIn:0,fadeOut:0,muted:false,beatCutEvery:2,smartSilence:false}
}
function addAudioToTimeline(id,at){const asset=getAsset(id);if(!asset||asset.type!=='audio')return;const start=at===undefined?preferredAudioInsertTime():Math.max(0,at);mutate(p=>{const c=defaultAudioClip(asset,start);p.audioClips.push(c);state.selected={type:'audio',id:c.id};state.tool='audio';state.sheet=isMobileViewport()?'audio':null});syncAudioTracks(true)}

function openMediaPicker(context='editor'){
  state.mediaImportContext=context
  const picker=$('#media-picker')
  if(!picker)return
  // Native showPicker keeps the file chooser tied directly to the user's gesture.
  try {
    if(typeof picker.showPicker==='function'){ picker.showPicker(); return }
  } catch {}
  picker.click()
}

async function importFiles(files, addVisuals=true) {
  if(!state.project || !files?.length) return
  const added=[]
  for(const file of files) {
    try {
      const meta=await mediaMetadata(file), id=uid()
      const waveform=meta.type==='audio'?await buildWaveform(file):null
      const asset={id,name:file.name,type:meta.type,mimeType:file.type,duration:meta.duration,width:meta.width,height:meta.height,size:file.size,waveform,hasAudio:meta.hasAudio}
      await putBlob(id,file); state.project.assets.push(asset); state.urls[id]=URL.createObjectURL(file); added.push(asset)
      if(addVisuals && (asset.type==='video'||asset.type==='image')) state.project.clips.push(defaultClip(asset))
      if(asset.type==='audio' && addVisuals) state.project.audioClips.push(defaultAudioClip(asset,preferredAudioInsertTime()))
    } catch { toast(tr('unsupported'),'error') }
  }
  state.project.updatedAt=Date.now(); await saveProject(state.project); state.projects=await listProjects(); toast(tr('imported'),'success'); renderEditor()
}
function defaultClip(asset) {
  return { id:uid(),assetId:asset.id,start:0,end:asset.type==='image'?Math.max(1,asset.duration||4):Math.max(.1,asset.duration||4),speed:1,volume:1,scale:1,rotation:0,opacity:1,fit:'cover',offsetX:0,offsetY:0,flipX:false,flipY:false,brightness:100,exposure:0,contrast:100,saturation:100,temperature:0,vignette:0,grain:0,hue:0,blur:0,grayscale:0,sepia:0,invert:0,fadeAmount:0,shadows:0,gpuEffect:'none',gpuIntensity:.65,motion:'none',transition:'none',transitionDuration:.35,audioFadeIn:0,audioFadeOut:0,smartReframe:null }
}
function nextOverlayLane(at=state.currentTime){
  const occupied=lane=>(state.project?.overlays||[]).some(c=>(c.lane||2)===lane&&at<(c.timelineStart||0)+overlayDuration(c)&&at+0.05>=(c.timelineStart||0))
  return occupied(2)&&!occupied(3)?3:2
}
function defaultOverlayClip(asset,timelineStart=state.currentTime,lane=nextOverlayLane(timelineStart)){
  const end=asset.type==='image'?Math.max(1,asset.duration||4):Math.max(.1,asset.duration||4)
  return {id:uid(),assetId:asset.id,timelineStart:Math.max(0,timelineStart||0),lane,start:0,end,speed:1,volume:0,scale:.38,rotation:0,opacity:1,fit:'contain',offsetX:0,offsetY:0,flipX:false,flipY:false,brightness:100,exposure:0,contrast:100,saturation:100,temperature:0,vignette:0,grain:0,hue:0,blur:0,grayscale:0,sepia:0,invert:0,fadeAmount:0,shadows:0,gpuEffect:'none',gpuIntensity:.65,motion:'none',filterPreset:'original'}
}
function addAssetToOverlay(id,at=state.currentTime,lane){const asset=getAsset(id);if(!asset||asset.type==='audio')return;mutate(p=>{const c=defaultOverlayClip(asset,Math.max(0,at||0),lane||nextOverlayLane(at));p.overlays.push(c);state.selected={type:'overlay',id:c.id};state.tool='edit';state.sheet=isMobileViewport()?'edit':null})}
function addAssetToTimeline(id) { const asset=getAsset(id); if(!asset)return; if(asset.type==='audio')return addAudioToTimeline(id); mutate(p=>p.clips.push(defaultClip(asset))); }
function setSoundtrack(id) { addAudioToTimeline(id,0) }

function selectedClip() { return state.selected?.type==='clip' ? state.project?.clips.find(c=>c.id===state.selected.id) : null }
function selectedOverlay(){ return state.selected?.type==='overlay' ? state.project?.overlays?.find(c=>c.id===state.selected.id) : null }
function selectedElement(){ return state.selected?.type==='element' ? state.project?.elements?.find(c=>c.id===state.selected.id) : null }
function selectedVisual(){ return selectedClip() || selectedOverlay() }
function selectedText() { return state.selected?.type==='text' ? state.project?.texts.find(t=>t.id===state.selected.id) : null }
function selectedAudio() { return state.selected?.type==='audio' ? state.project?.audioClips.find(c=>c.id===state.selected.id) : null }
function selectClip(id) { state.selected={type:'clip',id}; state.tool='edit'; state.sheet=isMobileViewport()?'edit':null; renderEditor() }
function selectOverlay(id){state.selected={type:'overlay',id};state.tool='edit';state.sheet=isMobileViewport()?'edit':null;renderEditor()}
function selectElement(id){state.selected={type:'element',id};state.tool='elements';state.sheet=isMobileViewport()?'elements':null;renderEditor()}
function selectText(id) { state.selected={type:'text',id}; state.tool='text'; state.sheet=isMobileViewport()?'text':null; renderEditor() }
function selectAudio(id) { state.selected={type:'audio',id}; state.tool='audio'; state.sheet=isMobileViewport()?'audio':null; renderEditor() }

function splitAtPlayhead() {
  const overlay=selectedOverlay()
  if(overlay){const startT=overlay.timelineStart||0,endT=startT+overlayDuration(overlay);if(state.currentTime<=startT+.05||state.currentTime>=endT-.05)return;const sourceSplit=overlay.start+(state.currentTime-startT)*(overlay.speed||1);return mutate(p=>{const i=p.overlays.findIndex(c=>c.id===overlay.id);const left={...clone(overlay),id:uid(),end:sourceSplit};const right={...clone(overlay),id:uid(),start:sourceSplit,timelineStart:state.currentTime};p.overlays.splice(i,1,left,right);state.selected={type:'overlay',id:right.id}})}
  const audio=selectedAudio()
  if(audio){
    const startT=audio.timelineStart||0,endT=startT+audioClipDuration(audio)
    if(state.currentTime<=startT+.05||state.currentTime>=endT-.05)return
    const splitSource=(audio.sourceStart||0)+(state.currentTime-startT)*(audio.speed||1)
    mutate(p=>{const idx=p.audioClips.findIndex(c=>c.id===audio.id),a={...audio,id:uid(),sourceEnd:splitSource},b={...audio,id:uid(),sourceStart:splitSource,timelineStart:state.currentTime};p.audioClips.splice(idx,1,a,b);state.selected={type:'audio',id:b.id}});syncAudioTracks(true);return
  }
  const row=activeAt(state.currentTime); if(!row) return
  const clip=row.clip, source=sourceTime(row,state.currentTime)
  if(source<=clip.start+.08 || source>=clip.end-.08) return
  mutate(p=>{
    const idx=p.clips.findIndex(c=>c.id===clip.id), a={...clip,id:uid(),end:source}, b={...clip,id:uid(),start:source}
    p.clips.splice(idx,1,a,b); state.selected={type:'clip',id:b.id}
  })
}

function duplicateSelected() {
  const clip=selectedClip(); if(clip)return mutate(p=>{const idx=p.clips.findIndex(c=>c.id===clip.id); const c={...clone(clip),id:uid()};p.clips.splice(idx+1,0,c);state.selected={type:'clip',id:c.id}})
  const overlay=selectedOverlay();if(overlay)return mutate(p=>{const c={...clone(overlay),id:uid(),timelineStart:(overlay.timelineStart||0)+.25};p.overlays.push(c);state.selected={type:'overlay',id:c.id}})
  const element=selectedElement();if(element)return mutate(p=>{const c={...clone(element),id:uid(),timelineStart:(element.timelineStart||0)+.25};p.elements.push(c);state.selected={type:'element',id:c.id}})
  const text=selectedText();if(text)return mutate(p=>{const c={...clone(text),id:uid(),x:clamp((text.x??.5)+.03,0,1),y:clamp((text.y??.5)+.03,0,1)};p.texts.push(c);state.selected={type:'text',id:c.id}})
  const audio=selectedAudio(); if(audio)return mutate(p=>{const c={...clone(audio),id:uid(),timelineStart:(audio.timelineStart||0)+.25};p.audioClips.push(c);state.selected={type:'audio',id:c.id}})
}
function deleteSelected() {
  if(state.selected?.type==='clip') mutate(p=>{p.clips=p.clips.filter(c=>c.id!==state.selected.id);state.selected=null})
  else if(state.selected?.type==='overlay') {const id=state.selected.id;mutate(p=>{p.overlays=p.overlays.filter(c=>c.id!==id);state.selected=null});const el=overlayPreviewNodes.get(id);if(el){el.pause();el.remove();overlayPreviewNodes.delete(id)}}
  else if(state.selected?.type==='element') mutate(p=>{p.elements=p.elements.filter(c=>c.id!==state.selected.id);state.selected=null})
  else if(state.selected?.type==='text') mutate(p=>{p.texts=p.texts.filter(t=>t.id!==state.selected.id);state.selected=null})
  else if(state.selected?.type==='audio') { const id=state.selected.id; mutate(p=>{p.audioClips=p.audioClips.filter(c=>c.id!==id);state.selected=null});const el=audioPreviewNodes.get(id);if(el){el.pause();el.remove();audioPreviewNodes.delete(id)} }
}
function moveSelected(delta) { const clip=selectedClip(); if(clip)return mutate(p=>{const i=p.clips.findIndex(c=>c.id===clip.id),j=clamp(i+delta,0,p.clips.length-1);if(i!==j){const [x]=p.clips.splice(i,1);p.clips.splice(j,0,x)}});const overlay=selectedOverlay();if(overlay)return mutate(p=>{const x=p.overlays.find(c=>c.id===overlay.id);x.timelineStart=Math.max(0,(x.timelineStart||0)+delta*(state.preferences.snap?.25:.1))});const element=selectedElement();if(element)return mutate(p=>{const x=p.elements.find(c=>c.id===element.id);x.timelineStart=Math.max(0,(x.timelineStart||0)+delta*(state.preferences.snap?.25:.1))});const audio=selectedAudio();if(audio)return mutate(p=>{const x=p.audioClips.find(c=>c.id===audio.id);x.timelineStart=Math.max(0,(x.timelineStart||0)+delta*(state.preferences.snap?.25:.1))}) }

function addText(kind='title') {
  if(!state.project) return
  const dur=Math.max(3,projectDuration()), start=clamp(state.currentTime,0,Math.max(0,dur-.3)), end=Math.min(Math.max(start+2.5,start+.5),Math.max(dur,start+2.5))
  const presets={
    title:{text:state.language==='el'?'Ο τίτλος σου':'Your title',fontSize:72,y:.5,weight:800,color:'#ffffff',background:'#00000000',strokeWidth:3,strokeColor:'#000000',animation:'pop'},
    caption:{text:state.language==='el'?'Γράψε το caption σου':'Write your caption',fontSize:46,y:.82,weight:800,color:'#ffffff',background:'#111827CC',strokeWidth:0,strokeColor:'#000000',animation:'fade'},
    sticker:{text:'✨',fontSize:90,y:.28,weight:700,color:'#ffffff',background:'#00000000',strokeWidth:0,strokeColor:'#000000',animation:'pop'}
  }
  const q=presets[kind]
  mutate(p=>{const item={id:uid(),start,end,x:.5,align:'center',scale:1,rotation:0,...q};p.texts.push(item);state.selected={type:'text',id:item.id};state.tool='text';state.sheet='text'})
}
function parseSrt(text) {
  return text.replace(/\r/g,'').trim().split(/\n\n+/).map(block=>{
    const lines=block.split('\n'), timeLine=lines.find(l=>l.includes('-->')); if(!timeLine)return null
    const [a,b]=timeLine.split('-->').map(s=>s.trim()); const parse=s=>{const m=s.match(/(\d+):(\d+):(\d+)[,.](\d+)/);return m?+m[1]*3600 + +m[2]*60 + +m[3] + +m[4]/1000:0}
    const ti=lines.indexOf(timeLine); return {start:parse(a),end:parse(b),text:lines.slice(ti+1).join('\n')}
  }).filter(Boolean)
}
async function importSrt(file) {
  if(!file||!state.project)return; const rows=parseSrt(await file.text()); if(!rows.length)return
  mutate(p=>{ for(const r of rows)p.texts.push({id:uid(),text:r.text,start:r.start,end:r.end,x:.5,y:.83,fontSize:44,color:'#ffffff',background:'#111827D9',weight:800,align:'center',strokeWidth:0,strokeColor:'#000000',animation:'fade',scale:1,rotation:0}) }); toast(tr('srtImported'),'success')
}

function applyFilter(name) {
  const c=selectedVisual(); if(!c)return
  const presets={
    original:{brightness:100,exposure:0,contrast:100,saturation:100,temperature:0,vignette:0,grain:0,hue:0,blur:0,grayscale:0,sepia:0},
    vivid:{brightness:104,contrast:112,saturation:135,hue:0,blur:0,grayscale:0,sepia:0},
    warm:{brightness:104,contrast:105,saturation:115,hue:-8,blur:0,grayscale:0,sepia:12},
    cool:{brightness:101,contrast:108,saturation:108,hue:12,blur:0,grayscale:0,sepia:0},
    mono:{brightness:102,contrast:116,saturation:100,hue:0,blur:0,grayscale:100,sepia:0},
    film:{brightness:96,contrast:112,saturation:88,hue:-4,blur:0,grayscale:0,sepia:20},
    dream:{brightness:109,contrast:92,saturation:108,hue:5,blur:1.2,grayscale:0,sepia:6},
    crisp:{brightness:101,exposure:0,contrast:124,saturation:112,temperature:0,vignette:0,grain:0,hue:0,blur:0,grayscale:0,sepia:0},
    cinematic:{brightness:98,exposure:-4,contrast:118,saturation:92,temperature:8,vignette:34,grain:10,hue:0,blur:0,grayscale:0,sepia:8},
    retro:{brightness:104,exposure:0,contrast:96,saturation:88,temperature:18,vignette:25,grain:24,hue:-6,blur:0,grayscale:0,sepia:22},
    soft:{brightness:108,exposure:2,contrast:90,saturation:96,temperature:3,vignette:8,grain:0,hue:0,blur:.6,grayscale:0,sepia:0},
    neon:{brightness:104,exposure:2,contrast:126,saturation:155,temperature:-5,vignette:22,grain:6,hue:8,blur:0,grayscale:0,sepia:0},
    matte:{brightness:106,exposure:3,contrast:86,saturation:82,temperature:5,vignette:12,grain:9,hue:0,blur:0,grayscale:0,sepia:5},
    sunset:{brightness:104,exposure:2,contrast:108,saturation:126,temperature:28,vignette:18,grain:4,hue:-5,blur:0,grayscale:0,sepia:12},
    ice:{brightness:103,exposure:1,contrast:114,saturation:104,temperature:-32,vignette:15,grain:3,hue:10,blur:0,grayscale:0,sepia:0},
    noir:{brightness:96,exposure:-2,contrast:140,saturation:0,temperature:0,vignette:42,grain:18,hue:0,blur:0,grayscale:100,sepia:0,invert:0},
    tealorange:{brightness:102,exposure:1,contrast:120,saturation:122,temperature:10,vignette:18,grain:4,hue:-16,blur:0,grayscale:0,sepia:5,invert:0},
    bleach:{brightness:110,exposure:4,contrast:134,saturation:62,temperature:0,vignette:8,grain:12,hue:0,blur:0,grayscale:0,sepia:4,invert:0},
    rose:{brightness:106,exposure:2,contrast:98,saturation:118,temperature:12,vignette:10,grain:3,hue:-12,blur:.2,grayscale:0,sepia:8,invert:0},
    forest:{brightness:98,exposure:-1,contrast:112,saturation:108,temperature:-3,vignette:18,grain:4,hue:18,blur:0,grayscale:0,sepia:2,invert:0},
    gold:{brightness:105,exposure:2,contrast:110,saturation:116,temperature:30,vignette:16,grain:8,hue:-4,blur:0,grayscale:0,sepia:16,invert:0},
    highkey:{brightness:118,exposure:8,contrast:88,saturation:94,temperature:2,vignette:0,grain:0,hue:0,blur:.2,grayscale:0,sepia:0,invert:0},
    lowkey:{brightness:82,exposure:-8,contrast:136,saturation:92,temperature:-4,vignette:48,grain:10,hue:0,blur:0,grayscale:0,sepia:0,invert:0},
    cyber:{brightness:102,exposure:1,contrast:132,saturation:170,temperature:-18,vignette:28,grain:7,hue:28,blur:0,grayscale:0,sepia:0,invert:0}
  }
  mutate(p=>{const list=state.selected?.type==='overlay'?p.overlays:p.clips;Object.assign(list.find(x=>x.id===c.id),presets.original,presets[name]||presets.original,{filterPreset:name})})
}

function svgIcon(name,size=20) {
  /* Lucide-derived geometry, normalized to one Edituno stroke system. */
  const icons={
    more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    menu:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    home:'<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    folder:'<path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/>',
    projects:'<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
    media:'<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
    video:'<path d="m12.296 3.464 3.02 3.956"/><path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3z"/><path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="m6.18 5.276 3.1 3.899"/>',
    edit:'<circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/>',
    split:'<circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/>',
    copy:'<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    trash:'<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 15H6L5 6"/><path d="M10 11v6M14 11v6"/>',
    text:'<path d="M12 4v16"/><path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2"/><path d="M9 20h6"/>',
    captions:'<rect width="18" height="14" x="3" y="5" rx="2"/><path d="M7 15h4M15 15h2M7 11h2M13 11h4"/>',
    audio:'<circle cx="8" cy="18" r="4"/><path d="M12 18V2l7 4"/>',
    volume:'<path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/>',
    mute:'<path d="M11 4.702a.7.7 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.7.7 0 0 0 11 19.298z"/><path d="m16.5 14.5 5-5"/><path d="m16.5 9.5 5 5"/>',
    effects:'<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4M22 4h-4"/>',
    adjust:'<path d="M10 5H3M12 19H3M14 3v4M16 17v4M21 12h-9M21 19h-5M21 5h-7M8 10v4M8 12H3"/>',
    settings:'<path d="M14 17H5"/><path d="M19 7h-9"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/>',
    canvas:'<path d="M6 2v14a2 2 0 0 0 2 2h14"/><path d="M18 22V8a2 2 0 0 0-2-2H2"/>',
    back:'<path d="m15 18-6-6 6-6"/>',
    export:'<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',
    share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>',
    plus:'<path d="M5 12h14"/><path d="M12 5v14"/>',
    play:'<path d="m8 5 11 7-11 7z"/>',
    undo:'<path d="M9 7 4 12l5 5"/><path d="M5 12h8a6 6 0 0 1 6 6"/>',
    redo:'<path d="m15 7 5 5-5 5"/><path d="M19 12h-8a6 6 0 0 0-6 6"/>',
    zoomin:'<circle cx="10" cy="10" r="6"/><path d="m15 15 5 5M10 7v6M7 10h6"/>',
    zoomout:'<circle cx="10" cy="10" r="6"/><path d="m15 15 5 5M7 10h6"/>',
    transition:'<path d="M7 5l5 7-5 7"/><path d="M17 5l-5 7 5 7"/>',
    language:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>',
    check:'<path d="m5 12 4 4L19 6"/>',
    timeline:'<path d="M4 6h16M4 12h16M4 18h16"/><path d="M8 4v4M15 10v4M11 16v4"/>',
    install:'<path d="M12 3v12"/><path d="m8 11 4 4 4-4"/><path d="M5 19h14"/>',
    close:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    left:'<path d="m15 18-6-6 6-6"/>',
    right:'<path d="m9 18 6-6-6-6"/>',
    movehorizontal:'<path d="m8 9-3 3 3 3M16 9l3 3-3 3M5 12h14"/>',
    movevertical:'<path d="m9 8 3-3 3 3M9 16l3 3 3-3M12 5v14"/>',
    expand:'<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>',
    circle:'<circle cx="12" cy="12" r="8"/>',
    heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8z"/>',
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>',
    half:'<circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 0 16z"/>',
    droplet:'<path d="M12 2.5s6 6.2 6 11a6 6 0 0 1-12 0c0-4.8 6-11 6-11z"/>',
    thermo:'<path d="M10 14.8V5a2 2 0 0 1 4 0v9.8a4 4 0 1 1-4 0z"/><path d="M12 9v7"/>',
    grain:'<circle cx="7" cy="7" r="1"/><circle cx="12" cy="6" r="1"/><circle cx="17" cy="8" r="1"/><circle cx="8" cy="13" r="1"/><circle cx="14" cy="12" r="1"/><circle cx="17" cy="17" r="1"/><circle cx="10" cy="18" r="1"/>',
    palette:'<circle cx="12" cy="12" r="8"/><circle cx="8" cy="10" r="1"/><circle cx="12" cy="7" r="1"/><circle cx="16" cy="10" r="1"/><path d="M18 15c-2 0-3 1-3 2s1 2 3 2"/>',
    moon:'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
    monitor:'<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
    rotate:'<path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/>'
  }
  return `<svg class="ui-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]||icons.effects}</svg>`
}
function renderLogo() { return `<span class="logo-lockup"><img class="logo-img" src="${EDITUNO_ICON}" alt="Edituno"><span>Edituno</span></span>` }
function installEntryHtml(kind='menu'){
  const installed=isAppInstalled(), el=state.language==='el'
  const status=installed?(el?'Εγκατεστημένο στη συσκευή':'Installed on this device'):(el?'Εγκατάσταση για αυτή τη συσκευή':'Install for this device')
  const icon=installed?'check':'install'
  if(kind==='settings')return `<button class="settings-link ${installed?'installed-state':''}" data-action="install"><span>${svgIcon(icon,18)}</span><span><strong>${tr('installApp')}</strong><small>${status}</small></span>${installed?'<span class="installed-dot"></span>':svgIcon('right',16)}</button>`
  return `<button type="button" class="home-menu-row ${installed?'installed-state':''}" data-action="install"><span class="menu-row-icon">${svgIcon(icon,18)}</span><span><strong>${tr('install')}</strong><small>${status}</small></span>${installed?'<span class="installed-dot"></span>':svgIcon('right',16)}</button>`
}
function aboutPage(){
  const el=state.language==='el', installed=isAppInstalled()
  document.body.classList.remove('editor-open')
  document.body.classList.toggle('mobile-app-shell',isMobileViewport())
  const title=el?'Video editing που μένει στη συσκευή σου.':'Video editing that stays on your device.'
  const intro=el?'Το Edituno είναι ένας δωρεάν, installable video editor για γρήγορη δημιουργία χωρίς account, upload ή watermark. Τα media και τα projects σου παραμένουν τοπικά στη συσκευή σου.':'Edituno is a free, installable video editor for fast creation without an account, upload or watermark. Your media and projects stay local on your device.'
  const installCta=installed?'':`<button class="about-install-btn" data-action="install">${svgIcon('install',19)}<span>${el?'Εγκατάσταση Edituno':'Install Edituno'}</span></button>`
  $('#app').innerHTML=`<div class="about-page">
    <header class="about-topbar"><button class="about-back" data-action="about-home">${svgIcon('back',18)}<span>${el?'Αρχική':'Home'}</span></button>${renderLogo()}<div class="mini-segment"><button type="button" class="${state.language==='el'?'active':''}" data-action="set-lang" data-value="el">ΕΛ</button><button type="button" class="${state.language==='en'?'active':''}" data-action="set-lang" data-value="en">EN</button></div></header>
    <main class="about-main">
      <section class="about-hero"><div class="about-hero-copy"><span class="eyebrow">EDITUNO</span><h1>${title}</h1><p>${intro}</p>${installCta?`<div class="about-hero-actions">${installCta}</div>`:''}</div><div class="about-brand-card"><img src="${EDITUNO_ICON}" alt="Edituno"><strong>Edituno</strong><span>${el?'Create locally. Edit freely.':'Create locally. Edit freely.'}</span><div class="about-version">v2.6.1</div></div></section>
      <section class="about-grid">
        <article>${svgIcon('folder',20)}<strong>${el?'Τοπικά και ιδιωτικά':'Local and private'}</strong><p>${el?'Τα media σου δεν χρειάζεται να ανέβουν σε server για να επεξεργαστείς το video.':'Your media does not need to be uploaded to a server to edit your video.'}</p></article>
        <article>${svgIcon('install',20)}<strong>${el?'Εγκαθίσταται σαν app':'Installs like an app'}</strong><p>${el?'Άμεση εγκατάσταση σε Android και Windows όταν την υποστηρίζει ο browser. Σε Apple συσκευές εμφανίζονται μόνο τα απαραίτητα βήματα.':'Direct install on Android and Windows when supported by the browser. Apple devices show only the required manual steps.'}</p></article>
        <article>${svgIcon('video',20)}<strong>${el?'Πλήρες δημιουργικό workflow':'Complete creative workflow'}</strong><p>${el?'Timeline, captions, audio, effects, transitions, adjustments και export μέχρι 4K όταν το υποστηρίζει η συσκευή.':'Timeline, captions, audio, effects, transitions, adjustments and up to 4K export when supported.'}</p></article>
        <article>${svgIcon('check',20)}<strong>${el?'Δωρεάν, χωρίς watermark':'Free, no watermark'}</strong><p>${el?'Χωρίς account και χωρίς υποχρεωτική συνδρομή. Η υποστήριξη μέσω PayPal είναι απολύτως προαιρετική.':'No account and no required subscription. PayPal support is completely optional.'}</p></article>
      </section>
      <section class="support-section"><div><span class="eyebrow">${el?'SUPPORT':'SUPPORT'}</span><h2>${el?'Βοήθησε το Edituno να συνεχίσει να εξελίσσεται.':'Help Edituno keep getting better.'}</h2><p>${el?'Αν το Edituno σου είναι χρήσιμο, μπορείς προαιρετικά να υποστηρίξεις την ανάπτυξή του μέσω PayPal. Η εφαρμογή παραμένει δωρεάν.':'If Edituno is useful to you, you can optionally support its development through PayPal. The app remains free.'}</p></div><a class="paypal-btn" href="${PAYPAL_SUPPORT_URL}" target="_blank" rel="noopener noreferrer"><span>PayPal</span><strong>${el?'Υποστήριξη ανάπτυξης':'Support development'}</strong>${svgIcon('right',18)}</a></section>
      <footer class="about-footer"><span>Edituno v2.6.1</span><span>${el?'Local-first video editor':'Local-first video editor'}</span></footer>
    </main>
  </div><div class="toast-stack" id="toasts"></div>${state.installOpen?installModal():''}`
}

function homeMenuPopover(){
  if(!state.homeMenuOpen)return''
  const el=state.language==='el'
  return `<div class="home-menu-scrim" data-action="home-menu-close"></div><aside class="home-menu-popover" role="dialog" aria-modal="true" aria-label="Edituno menu">
    <div class="home-menu-grabber"></div>
    <div class="home-menu-head"><div><span class="eyebrow">EDITUNO</span><strong>${el?'Μενού':'Menu'}</strong></div><button type="button" class="round-icon" data-action="home-menu-close" aria-label="${tr('close')}">${svgIcon('close',18)}</button></div>
    <div class="home-menu-language"><span>${el?'Γλώσσα':'Language'}</span><div class="mini-segment"><button type="button" class="${state.language==='el'?'active':''}" data-action="set-lang" data-value="el">ΕΛ</button><button type="button" class="${state.language==='en'?'active':''}" data-action="set-lang" data-value="en">EN</button></div></div>
    <div class="home-menu-list">
      <button type="button" class="home-menu-row" data-action="settings"><span class="menu-row-icon">${svgIcon('settings',18)}</span><span><strong>${tr('settings')}</strong><small>${el?'Timeline, export, storage':'Timeline, export, storage'}</small></span>${svgIcon('right',16)}</button>
      <button type="button" class="home-menu-row" data-action="about"><span class="menu-row-icon">${svgIcon('heart',18)}</span><span><strong>${el?'Υποστήριξη':'Support'}</strong><small>${el?'Σχετικά με το Edituno και υποστήριξη':'About Edituno and support'}</small></span>${svgIcon('right',16)}</button>
      ${installEntryHtml('menu')}
    </div>
    <div class="home-menu-note"><span class="status-dot"></span><span>${el?'Τοπική επεξεργασία. Τα media δεν ανεβαίνουν σε server.':'Local editing. Your media is not uploaded to a server.'}</span></div>
  </aside>`
}
function renderHome() {
  document.body.classList.remove('editor-open')
  document.body.classList.toggle('mobile-app-shell', isMobileViewport())
  scheduleMobileViewportSync()
  const app=$('#app'), projects=state.projects||[], last=projects[0], mobile=isMobileViewport(), recent=projects.slice(0,mobile?7:10), el=state.language==='el'
  const hello=el?'Δημιούργησε χωρίς τριβή.':'Create without friction.'
  const sub=el?'Video editing σχεδιασμένο πρώτα για κινητό.':'Video editing designed mobile first.'
  app.innerHTML=`<div class="studio-home ${mobile?'is-mobile':'is-desktop'}">
    <aside class="home-rail desktop-home-only">
      <div class="home-rail-brand">${renderLogo()}</div>
      <nav class="home-rail-nav" aria-label="Edituno">
        <button class="active" data-action="home-top">${svgIcon('home',18)}<span>Home</span></button>
        <button data-action="projects-scroll">${svgIcon('projects',18)}<span>Projects</span></button>
      </nav>
      <div class="home-rail-spacer"></div>
      <button class="home-rail-link" data-action="settings">${svgIcon('settings',18)}<span>${tr('settings')}</span></button>
      <button class="home-rail-link home-rail-support" data-action="about">${svgIcon('heart',18)}<span>${el?'Υποστήριξη':'Support'}</span></button>
      <div class="home-rail-version">v2.6.1</div>
    </aside>

    <div class="home-surface">
      <header class="home-topbar">
        <div class="mobile-brand mobile-home-only">${renderLogo()}</div>
        <div class="home-topbar-copy desktop-home-only"><strong>${el?'Studio':'Studio'}</strong><span>${el?'Όλα τα projects σου, τοπικά.':'All your projects, local.'}</span></div>
        <div class="home-topbar-actions">
          ${last?`<button class="topbar-resume desktop-home-only" data-action="open-project" data-id="${last.id}">${svgIcon('play',14)}<span>${el?'Συνέχεια':'Resume'}</span></button>`:''}
          <button class="round-icon" data-action="home-menu-toggle" aria-label="Menu">${svgIcon('more',19)}</button>
        </div>
      </header>

      <main class="home-main">
        <section class="home-intro">
          <div class="home-intro-copy"><span class="eyebrow">EDITUNO STUDIO</span><h1>${hello}</h1><p>${sub}</p></div>
          <div class="home-primary-actions">
            <button class="create-main" data-action="create" data-ratio="${mobile?'9:16':'16:9'}"><span class="create-main-icon">${svgIcon('plus',19)}</span><span><strong>${el?'Νέο project':'New project'}</strong><small>${mobile?'9:16 default':'Start from a blank canvas'}</small></span></button>
            <button class="import-main" data-action="create-import"><span class="import-main-icon">${svgIcon('folder',18)}</span><span><strong>Import</strong><small>Video · Photo · Audio</small></span>${svgIcon('right',16)}</button>
          </div>
        </section>

        ${last?`<section class="resume-strip mobile-home-only"><button data-action="open-project" data-id="${last.id}"><span class="resume-thumb">${svgIcon('play',16)}</span><span class="resume-copy"><small>${el?'Συνέχισε από εκεί που έμεινες':'Continue where you left off'}</small><strong>${escapeHtml(last.name)}</strong></span><span class="resume-meta">${escapeHtml(last.ratio||'9:16')}</span>${svgIcon('right',16)}</button></section>`:''}

        <section class="create-section">
          <div class="section-heading"><div><span class="eyebrow">${el?'ΝΕΟ':'NEW'}</span><h2>${el?'Διάλεξε καμβά':'Choose a canvas'}</h2></div><span>${el?'Μπορείς να το αλλάξεις μετά':'Change it anytime'}</span></div>
          <div class="format-gallery">
            ${studioFormatCard('9:16','Vertical','TikTok · Reels','phone')}
            ${studioFormatCard('16:9','Landscape','YouTube · Video','landscape')}
            ${studioFormatCard('1:1','Square','Social','square')}
            ${studioFormatCard('4:5','Portrait','Feed','portrait')}
          </div>
        </section>

        <section class="projects-section" id="projects-section">
          <div class="section-heading"><div><span class="eyebrow">LIBRARY</span><h2>${tr('recent')}</h2></div><span>${projects.length?`${projects.length} ${projects.length===1?'project':'projects'}`:el?'Κανένα project ακόμη':'No projects yet'}</span></div>
          <div class="studio-project-grid">${recent.length?recent.map(studioProjectCard).join(''):`<button class="empty-library" data-action="create" data-ratio="${mobile?'9:16':'16:9'}"><span class="empty-library-icon">${svgIcon('plus',20)}</span><span><strong>${el?'Δημιούργησε το πρώτο σου project':'Create your first project'}</strong><small>${el?'Χωρίς account. Χωρίς upload.':'No account. No upload.'}</small></span></button>`}</div>
        </section>
      </main>

      <nav class="mobile-dock mobile-home-only" aria-label="Edituno">
        <button class="active" data-action="home-top">${svgIcon('home',19)}<span>Home</span></button>
        <button class="dock-create" data-action="create" data-ratio="9:16"><span>${svgIcon('plus',22)}</span></button>
        <button data-action="projects-scroll">${svgIcon('projects',19)}<span>Projects</span></button>
        <button data-action="about">${svgIcon('heart',19)}<span>${el?'Υποστήριξη':'Support'}</span></button>
      </nav>
    </div>
    ${homeMenuPopover()}${state.settingsOpen?settingsModal():''}${state.installOpen?installModal():''}${projectActionsModal()}${renameProjectModal()}${confirmationModal()}
  </div><div class="toast-stack" id="toasts"></div>`
}
function studioFormatCard(ratio,title,sub,shape='phone'){return `<button type="button" class="studio-format-card" data-action="create" data-ratio="${ratio}"><span class="format-preview"><i class="format-symbol ${shape}"></i><b>${ratio}</b></span><span class="format-copy"><strong>${title}</strong><small>${sub}</small></span></button>`}
function studioProjectCard(p){return `<article class="studio-project-card"><button class="project-card-main" data-action="open-project" data-id="${p.id}"><span class="project-poster"><i>${svgIcon('video',20)}</i><b>${escapeHtml(p.ratio||'16:9')}</b></span><span class="project-card-copy"><strong>${escapeHtml(p.name)}</strong><small>${new Date(p.updatedAt).toLocaleDateString(state.language==='el'?'el-GR':'en-US',{day:'2-digit',month:'short'})}</small></span></button><button class="project-card-more" data-action="project-menu" data-id="${p.id}" aria-label="${tr('projectOptions')}">${svgIcon('more',17)}</button></article>`}
function mobileFormatCard(ratio,title,sub,shape='phone'){return studioFormatCard(ratio,title,sub,shape)}
function desktopFormatButton(ratio,title,sub,shape='phone'){return studioFormatCard(ratio,title,sub,shape)}
function mobileProjectCard(p){return studioProjectCard(p)}
function projectCard(p){return studioProjectCard(p)}

function projectActionsModal(){
  const p=state.projects.find(x=>x.id===state.projectMenuId)
  if(!p)return''
  return `<div class="app-modal-backdrop" data-action="project-menu-close"><section class="project-action-sheet" role="dialog" aria-modal="true" aria-label="${tr('projectOptions')}">
    <div class="action-sheet-grabber"></div>
    <header class="project-action-head"><div class="project-action-identity"><span class="project-action-thumb">${svgIcon('video',20)}</span><span><strong>${escapeHtml(p.name)}</strong><small>${escapeHtml(p.ratio||'16:9')}</small></span></div><button class="round-icon" data-action="project-menu-close" aria-label="${tr('close')}">${svgIcon('close',17)}</button></header>
    <div class="project-action-list">
      <button data-action="project-menu-open" data-id="${p.id}"><span>${svgIcon('play',18)}</span><span><strong>${tr('open')}</strong><small>${state.language==='el'?'Συνέχεια επεξεργασίας':'Continue editing'}</small></span>${svgIcon('right',15)}</button>
      <button data-action="project-menu-rename" data-id="${p.id}"><span>${svgIcon('edit',18)}</span><span><strong>${tr('rename')}</strong><small>${state.language==='el'?'Αλλαγή ονόματος project':'Change project name'}</small></span>${svgIcon('right',15)}</button>
      <button data-action="project-menu-duplicate" data-id="${p.id}"><span>${svgIcon('copy',18)}</span><span><strong>${tr('duplicate')}</strong><small>${state.language==='el'?'Δημιουργία ανεξάρτητου αντιγράφου':'Create an independent copy'}</small></span>${svgIcon('right',15)}</button>
      <button class="danger" data-action="project-menu-delete" data-id="${p.id}"><span>${svgIcon('trash',18)}</span><span><strong>${tr('delete')}</strong><small>${state.language==='el'?'Διαγραφή από αυτή τη συσκευή':'Remove from this device'}</small></span>${svgIcon('right',15)}</button>
    </div>
  </section></div>`
}

function renameProjectModal(){
  const p=state.projects.find(x=>x.id===state.renameProjectId)
  if(!p)return''
  return `<div class="app-modal-backdrop" data-action="rename-close"><section class="rename-dialog" role="dialog" aria-modal="true" aria-label="${tr('renameProject')}">
    <header><div><span class="eyebrow">EDITUNO</span><h2>${tr('renameProject')}</h2></div><button class="round-icon" data-action="rename-close">${svgIcon('close',17)}</button></header>
    <div class="rename-dialog-body"><label><span>${tr('projectName')}</span><input id="project-rename-input" maxlength="80" value="${escapeHtml(p.name)}" autocomplete="off"></label></div>
    <footer><button class="secondary-btn" data-action="rename-close">${tr('cancel')}</button><button class="primary-btn" data-action="rename-save" data-id="${p.id}">${tr('saveChanges')}</button></footer>
  </section></div>`
}

function confirmationModal(){
  const c=state.confirmDialog
  if(!c)return''
  const p=c.type==='delete-project'?state.projects.find(x=>x.id===c.id):null
  const title=c.type==='clear-all'?tr('clearAllTitle'):tr('confirmDelete')
  const body=c.type==='clear-all'?tr('clearAllBody'):tr('deleteProjectBody')
  return `<div class="app-modal-backdrop confirmation-backdrop" data-action="confirm-cancel"><section class="confirm-dialog" role="alertdialog" aria-modal="true">
    <div class="confirm-icon">${svgIcon('trash',20)}</div>
    <h2>${title}</h2>
    ${p?`<strong class="confirm-project-name">${escapeHtml(p.name)}</strong>`:''}
    <p>${body}</p>
    <div class="confirm-actions"><button class="secondary-btn" data-action="confirm-cancel">${c.type==='delete-project'?tr('keepProject'):tr('cancel')}</button><button class="danger-confirm" data-action="confirm-accept">${tr('delete')}</button></div>
  </section></div>`
}

function settingsModal(){
  const p=state.preferences, el=state.language==='el'
  return `<div class="modal-backdrop settings-backdrop" data-action="settings-close"><section class="settings-panel" role="dialog" aria-modal="true" aria-label="${tr('settings')}">
    <div class="settings-grabber"></div>
    <header class="settings-header"><div><span class="eyebrow">EDITUNO</span><h2>${tr('settings')}</h2></div><button type="button" class="round-icon" data-action="settings-close" aria-label="${tr('close')}">${svgIcon('close',18)}</button></header>
    <div class="settings-scroll">
      <section class="settings-card"><div class="settings-card-title"><span>${svgIcon('language',18)}</span><div><strong>${tr('language')}</strong><small>${el?'Interface':'Interface'}</small></div></div><div class="language-segment"><button type="button" class="${state.language==='el'?'active':''}" data-action="set-lang" data-value="el"><span>Ελληνικά</span><i>${state.language==='el'?svgIcon('check',14):''}</i></button><button type="button" class="${state.language==='en'?'active':''}" data-action="set-lang" data-value="en"><span>English</span><i>${state.language==='en'?svgIcon('check',14):''}</i></button></div></section>
      <section class="settings-card theme-settings-card"><div class="settings-card-title"><span>${svgIcon('sun',18)}</span><div><strong>${el?'Εμφάνιση':'Appearance'}</strong><small>${el?'Θέμα εφαρμογής':'App theme'}</small></div></div><div class="language-segment theme-segment"><button type="button" class="${p.theme==='system'?'active':''}" data-action="set-theme" data-value="system"><span class="theme-option-icon">${svgIcon('monitor',14)}</span><span class="theme-option-label">${el?'Σύστημα':'System'}</span><i class="theme-option-check">${p.theme==='system'?svgIcon('check',14):''}</i></button><button type="button" class="${p.theme==='dark'?'active':''}" data-action="set-theme" data-value="dark"><span class="theme-option-icon">${svgIcon('moon',14)}</span><span class="theme-option-label">${el?'Σκούρο':'Dark'}</span><i class="theme-option-check">${p.theme==='dark'?svgIcon('check',14):''}</i></button><button type="button" class="${p.theme==='light'?'active':''}" data-action="set-theme" data-value="light"><span class="theme-option-icon">${svgIcon('sun',14)}</span><span class="theme-option-label">${el?'Φωτεινό':'Light'}</span><i class="theme-option-check">${p.theme==='light'?svgIcon('check',14):''}</i></button></div></section>
      <section class="settings-card"><div class="settings-card-title"><span>${svgIcon('timeline',18)}</span><div><strong>Timeline</strong><small>${el?'Editing behavior':'Editing behavior'}</small></div></div><button class="setting-row" data-action="pref-toggle" data-key="snap"><span><strong>${preferenceLabel('snap')}</strong><small>${el?'Αυτόματη ευθυγράμμιση clips':'Snap clips to edit points'}</small></span><i class="switch ${p.snap?'on':''}"><b></b></i></button><button class="setting-row" data-action="pref-toggle" data-key="showWaveforms"><span><strong>${preferenceLabel('showWaveforms')}</strong><small>${el?'Waveforms στο audio track':'Show waveforms in audio track'}</small></span><i class="switch ${p.showWaveforms?'on':''}"><b></b></i></button><label class="setting-slider"><span><strong>${preferenceLabel('timelineScale')}</strong><b>${p.timelineScale||48}</b></span><input data-pref="timelineScale" type="range" min="28" max="100" step="4" value="${p.timelineScale||48}"></label></section>
      <section class="settings-card"><div class="settings-card-title"><span>${svgIcon('effects',18)}</span><div><strong>${el?'Playback':'Playback'}</strong><small>${el?'Preview performance':'Preview performance'}</small></div></div><label class="setting-select"><span>${preferenceLabel('previewQuality')}</span><select data-pref="previewQuality"><option value="performance" ${p.previewQuality==='performance'?'selected':''}>Performance</option><option value="balanced" ${p.previewQuality==='balanced'?'selected':''}>Balanced</option><option value="quality" ${p.previewQuality==='quality'?'selected':''}>Quality</option></select></label></section>
      <section class="settings-card"><div class="settings-card-title"><span>${svgIcon('export',18)}</span><div><strong>${tr('export')}</strong><small>${el?'Defaults':'Defaults'}</small></div></div><div class="settings-split"><label class="setting-select"><span>${preferenceLabel('defaultQuality')}</span><select data-pref="defaultQuality"><option value="720" ${+p.defaultQuality===720?'selected':''}>720p</option><option value="1080" ${+p.defaultQuality===1080?'selected':''}>1080p</option><option value="2160" ${+p.defaultQuality===2160?'selected':''}>4K · 2160p</option></select></label><label class="setting-select"><span>${preferenceLabel('defaultFps')}</span><select data-pref="defaultFps"><option value="24" ${+p.defaultFps===24?'selected':''}>24 fps</option><option value="30" ${+p.defaultFps===30?'selected':''}>30 fps</option><option value="60" ${+p.defaultFps===60?'selected':''}>60 fps</option></select></label></div></section>
      <section class="settings-card storage-settings-card"><div class="settings-card-title"><span>${svgIcon('folder',18)}</span><div><strong>${el?'Αποθήκευση':'Storage'}</strong><small>${el?'Projects και αλλαγές':'Projects and changes'}</small></div></div><button class="setting-row" data-action="pref-toggle" data-key="autoSave"><span><strong>${preferenceLabel('autoSave')}</strong><small>${p.autoSave?(el?'On · αποθήκευση αλλαγών κατά την επεξεργασία':'On · save changes while editing'):(el?'Off · αποθήκευση όταν βγαίνεις από το project':'Off · save when leaving the project')}</small></span><i class="switch ${p.autoSave?'on':''}"><b></b></i></button></section>
      <section class="settings-card">${installEntryHtml('settings')}<button class="settings-link" data-action="persist-storage"><span>${svgIcon('folder',18)}</span><span><strong>${tr('requestStorage')}</strong><small>${el?'Κράτησε τα projects διαθέσιμα':'Keep projects available'}</small></span>${svgIcon('right',16)}</button><button class="settings-link" data-action="about"><span>${svgIcon('heart',18)}</span><span><strong>${el?'Υποστήριξη':'Support'}</strong><small>${el?'Σχετικά με το Edituno και PayPal support':'About Edituno and PayPal support'}</small></span>${svgIcon('right',16)}</button></section>
      <button class="settings-danger" data-action="clear-all">${svgIcon('trash',16)}<span>${tr('clearAll')}</span></button>
    </div>
  </section></div>`
}
function installModal(){
  const el=state.language==='el', env=installEnvironment(), installed=isAppInstalled(), promptReady=!!state.installPrompt
  if(installed)return `<div class="modal-backdrop" data-action="install-close"><section class="modal install-modal smart-install-modal installed-install-modal"><div class="modal-head"><div><span class="eyebrow">EDITUNO APP</span><h2>${el?'Εγκατάσταση':'Installation'}</h2></div><button class="sheet-close" data-action="install-close" aria-label="${tr('close')}">${svgIcon('close',18)}</button></div><div class="modal-body"><div class="install-success">${svgIcon('check',28)}<strong>${el?'Ήδη εγκατεστημένο':'Already installed'}</strong><p>${el?'Το Edituno είναι ήδη εγκατεστημένο σε αυτή τη συσκευή.':'Edituno is already installed on this device.'}</p></div></div></section></div>`
  let title='',copy='',steps=[],canPrompt=false,appleManual=false
  if(env.platform==='ios'){
    appleManual=true
    title=el?'Εγκατάσταση σε iPhone / iPad':'Install on iPhone / iPad'
    copy=el?'Στο iPhone και το iPad η εγκατάσταση γίνεται από το μενού Κοινοποίησης.':'On iPhone and iPad, installation is completed from the Share menu.'
    steps=env.browser==='safari'?
      [[svgIcon('share',18),el?'Πάτησε Κοινοποίηση στο Safari.':'Tap Share in Safari.'],[svgIcon('plus',18),el?'Επίλεξε «Προσθήκη στην οθόνη αφετηρίας».':'Choose “Add to Home Screen”.'],[svgIcon('check',18),el?'Πάτησε «Προσθήκη».':'Tap “Add”.']]:
      [[svgIcon('share',18),el?'Άνοιξε τη σελίδα στο Safari και πάτησε Κοινοποίηση.':'Open the page in Safari and tap Share.'],[svgIcon('plus',18),el?'Επίλεξε «Προσθήκη στην οθόνη αφετηρίας».':'Choose “Add to Home Screen”.'],[svgIcon('check',18),el?'Επιβεβαίωσε με «Προσθήκη».':'Confirm with “Add”.']]
  }else if(env.platform==='mac'&&env.browser==='safari'){
    appleManual=true
    title=el?'Εγκατάσταση σε Mac':'Install on Mac'
    copy=el?'Στο Safari η εγκατάσταση γίνεται με Add to Dock.':'In Safari, installation uses Add to Dock.'
    steps=[[svgIcon('plus',18),el?'Safari: File → Add to Dock.':'Safari: File → Add to Dock.'],[svgIcon('check',18),el?'Επιβεβαίωσε το Edituno και πάτησε Add.':'Confirm Edituno and choose Add.']]
  }else{
    canPrompt=promptReady
    if(env.platform==='android'){
      title=el?'Εγκατάσταση σε Android':'Install on Android'
      copy=el?'Εγκατέστησε το Edituno άμεσα σαν κανονική εφαρμογή.':'Install Edituno immediately like a regular app.'
    }else if(env.platform==='windows'){
      title=el?'Εγκατάσταση σε Windows':'Install on Windows'
      copy=el?'Εγκατέστησε το Edituno άμεσα ως desktop εφαρμογή.':'Install Edituno immediately as a desktop app.'
    }else if(env.platform==='mac'){
      title=el?'Εγκατάσταση σε Mac':'Install on Mac'
      copy=el?'Εγκατέστησε το Edituno άμεσα από τον browser σου.':'Install Edituno directly from your browser.'
    }else{
      title=el?'Εγκατάσταση Edituno':'Install Edituno'
      copy=el?'Εγκατέστησε το Edituno σαν εφαρμογή όταν ο browser υποστηρίζει PWA installation.':'Install Edituno as an app when your browser supports PWA installation.'
    }
  }
  const directArea=appleManual?`<div class="install-steps">${steps.map((step,i)=>`<div class="install-step"><b>${i+1}</b><span class="install-step-icon">${step[0]}</span><p>${step[1]}</p></div>`).join('')}</div>`:(canPrompt?`<button class="install-primary" data-action="install-confirm">${svgIcon('install',19)}<span>${el?'Εγκατάσταση τώρα':'Install now'}</span></button>`:`<div class="install-waiting">${svgIcon('install',22)}<span><strong>${el?'Η άμεση εγκατάσταση δεν είναι διαθέσιμη ακόμη':'Direct install is not available yet'}</strong><small>${el?'Σε Android, Windows και Chrome/Edge το κουμπί εγκατάστασης ενεργοποιείται αυτόματα μόλις ο browser το επιτρέψει.':'On Android, Windows and Chrome/Edge the install button activates automatically as soon as the browser allows it.'}</small></span></div>`)
  return `<div class="modal-backdrop" data-action="install-close"><section class="modal install-modal smart-install-modal" role="dialog" aria-modal="true" aria-label="${escapeHtml(title)}"><div class="modal-head"><div><span class="eyebrow">${escapeHtml(env.label.toUpperCase())}</span><h2>${title}</h2></div><button class="sheet-close" data-action="install-close" aria-label="${tr('close')}">${svgIcon('close',18)}</button></div><div class="modal-body"><div class="install-device-card"><span class="install-device-icon">${svgIcon(appleManual?'share':env.platform==='windows'?'video':'install',24)}</span><span><strong>${escapeHtml(env.label)}</strong><small>${copy}</small></span></div>${directArea}<div class="install-privacy">${svgIcon('folder',17)}<span>${el?'Η εγκατάσταση δεν ανεβάζει τα projects σου. Παραμένουν τοπικά στη συσκευή.':'Installing does not upload your projects. They remain local on your device.'}</span></div></div></section></div>`
}

const konvaRuntime={stage:null,layer:null,transformer:null,container:null,nodes:new Map(),interacting:false,historyPushed:false,visible:false,failed:false}
const konvaMeasureCanvas=document.createElement('canvas')
function konvaAvailable(){return !konvaRuntime.failed&&Boolean(window.Konva?.Stage&&window.Konva?.Layer&&window.Konva?.Transformer)}
function konvaEditableSelection(){return ['overlay','element','text'].includes(state.selected?.type)}
function destroyKonvaCanvasEditor(){
  const failed=konvaRuntime.failed
  try{konvaRuntime.stage?.destroy?.()}catch{}
  Object.assign(konvaRuntime,{stage:null,layer:null,transformer:null,container:null,nodes:new Map(),interacting:false,historyPushed:false,visible:false,failed})
}
function setKonvaEditorVisible(show){
  const container=konvaRuntime.container||$('#konva-editor-layer');if(!container)return
  container.classList.toggle('active',Boolean(show));container.classList.toggle('hidden-by-playback',!show)
  konvaRuntime.visible=Boolean(show)
}
function konvaOverlayGeometry(clip,width,height){
  const asset=getAsset(clip.assetId),sw=Math.max(1,asset?.width||width),sh=Math.max(1,asset?.height||height),sr=sw/sh,tr=width/height
  let dw,dh;const fit=clip.fit||'contain'
  if((fit==='cover'&&sr>tr)||(fit==='contain'&&sr<tr)){dh=height;dw=dh*sr}else{dw=width;dh=dw/sr}
  return {x:width/2+(clip.offsetX||0)*width,y:height/2+(clip.offsetY||0)*height,width:Math.max(12,dw),height:Math.max(12,dh),scale:clip.scale??.36,rotation:clip.rotation||0,offsetX:dw/2,offsetY:dh/2}
}
function konvaElementGeometry(item,width,height){
  const [cw]=previewDimensions(state.project.ratio),pixelScale=width/Math.max(1,cw),baseH=Math.max(28*pixelScale,height*.065),baseW=width*.22
  let w=baseW,h=baseH
  if(item.kind==='emoji'){w=h=Math.max(34*pixelScale,baseH*1.45)}
  else if(item.kind==='lowerthird'){w=baseW*2;h=baseH*1.5}
  else if(item.kind==='like'||item.kind==='bell'||item.kind==='circle'){w=h=baseH*1.1}
  else if(item.kind==='arrow'){w=baseW*1.15;h=baseH*.9}
  else if(item.kind==='label'){w=baseW*1.12;h=baseH*1.08}
  return {x:(item.x??.5)*width,y:(item.y??.5)*height,width:Math.max(16,w),height:Math.max(16,h),scale:item.scale??1,rotation:item.rotation||0,offsetX:w/2,offsetY:h/2}
}
function konvaTextGeometry(item,width,height){
  const ctx=konvaMeasureCanvas.getContext('2d'),fontPx=Math.max(8,(item.fontSize||44)*(width/960)),lines=String(item.text||'').split(/\n/).slice(0,6),lineH=fontPx*1.16
  ctx.font=`${item.weight||700} ${fontPx}px Inter, system-ui, -apple-system, Segoe UI, sans-serif`
  const maxW=Math.max(fontPx*.6,...lines.map(line=>ctx.measureText(line||' ').width)),totalH=Math.max(lineH,lineH*lines.length),padX=fontPx*.28,padY=fontPx*.16
  const w=maxW+padX*2,h=totalH+padY*2,align=item.align||'center'
  return {x:(item.x??.5)*width,y:(item.y??.5)*height,width:Math.max(18,w),height:Math.max(18,h),scale:item.scale??1,rotation:item.rotation||0,offsetX:align==='left'?padX:align==='right'?w-padX:w/2,offsetY:h/2}
}
function konvaEntriesAt(time=state.currentTime){
  if(!state.project)return[]
  const entries=[]
  for(const item of activeOverlaysAt(time,state.project))entries.push({type:'overlay',id:item.id,model:item,geometry:konvaOverlayGeometry})
  for(const item of activeElementsAt(time,state.project))entries.push({type:'element',id:item.id,model:item,geometry:konvaElementGeometry})
  for(const item of state.project.texts||[])if(time>=item.start&&time<=item.end)entries.push({type:'text',id:item.id,model:item,geometry:konvaTextGeometry})
  return entries
}
function konvaSelectEntry(entry,focusText=false){
  if(!entry)return
  if(entry.type==='overlay'){state.selected={type:'overlay',id:entry.id};state.tool='edit';state.sheet=isMobileViewport()?'edit':null}
  else if(entry.type==='element'){state.selected={type:'element',id:entry.id};state.tool='elements';state.sheet=isMobileViewport()?'elements':null}
  else {state.selected={type:'text',id:entry.id};state.tool='text';state.sheet=isMobileViewport()?'text':null}
  renderEditor()
  if(focusText&&entry.type==='text')setTimeout(()=>{const field=$('[data-bind-text="text"]');field?.focus?.();field?.select?.()},50)
}
function clearKonvaGuides(){
  if(!konvaRuntime.layer)return
  konvaRuntime.layer.find('.edituno-konva-guide').forEach(node=>node.destroy())
}
function drawKonvaGuide(x1,y1,x2,y2){
  const Konva=window.Konva;if(!Konva||!konvaRuntime.layer)return
  konvaRuntime.layer.add(new Konva.Line({points:[x1,y1,x2,y2],stroke:'#7E99FF',strokeWidth:1,dash:[5,4],opacity:.86,listening:false,name:'edituno-konva-guide'}))
}
function snapKonvaNode(node,width,height){
  clearKonvaGuides()
  const box=node.getClientRect({skipShadow:true,skipStroke:true}),cx=box.x+box.width/2,cy=box.y+box.height/2,threshold=isMobileViewport()?8:6
  const xs=[width/3,width/2,width*2/3],ys=[height/3,height/2,height*2/3]
  let bestX=null,bestY=null
  for(const x of xs){const d=x-cx;if(Math.abs(d)<=threshold&&(!bestX||Math.abs(d)<Math.abs(bestX.d)))bestX={x,d}}
  for(const y of ys){const d=y-cy;if(Math.abs(d)<=threshold&&(!bestY||Math.abs(d)<Math.abs(bestY.d)))bestY={y,d}}
  if(bestX){node.x(node.x()+bestX.d);drawKonvaGuide(bestX.x,0,bestX.x,height)}
  if(bestY){node.y(node.y()+bestY.d);drawKonvaGuide(0,bestY.y,width,bestY.y)}
  konvaRuntime.layer.batchDraw()
}
function syncModelFromKonvaNode(entry,node,width,height){
  const model=entry.model,scale=clamp(Math.abs(node.scaleX()||1),entry.type==='overlay'?.08:.2,4),rotation=((node.rotation()%360)+540)%360-180
  if(entry.type==='overlay'){
    model.offsetX=clamp((node.x()-width/2)/Math.max(1,width),-.95,.95)
    model.offsetY=clamp((node.y()-height/2)/Math.max(1,height),-.95,.95)
  }else{
    model.x=clamp(node.x()/Math.max(1,width),0,1);model.y=clamp(node.y()/Math.max(1,height),0,1)
  }
  model.scale=scale;model.rotation=Math.round(rotation*10)/10
}
function beginKonvaInteraction(){
  if(konvaRuntime.interacting)return
  konvaRuntime.interacting=true;konvaRuntime.historyPushed=true;pushHistory()
}
function endKonvaInteraction(entry,node,width,height){
  syncModelFromKonvaNode(entry,node,width,height);clearKonvaGuides();konvaRuntime.interacting=false;state.project.updatedAt=Date.now();queueSave();drawPreview();setTimeout(()=>syncKonvaCanvasEditor(true),0)
}
function syncKonvaCanvasEditor(force=false){
  const {stage,layer,container}=konvaRuntime,frame=$('.preview-frame');if(!stage||!layer||!container||!frame||!konvaAvailable())return
  if(state.playing){setKonvaEditorVisible(false);return}
  const width=Math.max(1,frame.clientWidth),height=Math.max(1,frame.clientHeight)
  if(stage.width()!==width||stage.height()!==height){stage.size({width,height})}
  if(konvaRuntime.interacting&&!force)return
  layer.destroyChildren();konvaRuntime.nodes.clear();konvaRuntime.transformer=null
  const Konva=window.Konva,entries=konvaEntriesAt()
  setKonvaEditorVisible(entries.length>0&&state.selected?.type!=='clip')
  for(const entry of entries){
    const g=entry.geometry(entry.model,width,height),selected=state.selected?.type===entry.type&&state.selected?.id===entry.id
    const node=new Konva.Rect({
      x:g.x,y:g.y,width:g.width,height:g.height,offsetX:g.offsetX,offsetY:g.offsetY,
      scaleX:g.scale,scaleY:g.scale,rotation:g.rotation||0,
      fill:'rgba(126,153,255,0.008)',stroke:'rgba(126,153,255,0)',strokeWidth:1,
      draggable:selected,listening:true,name:`edituno-konva-node ${entry.type}`,id:`konva-${entry.type}-${entry.id}`
    })
    node.setAttr('editunoType',entry.type);node.setAttr('editunoId',entry.id)
    node.on('mouseenter',()=>{stage.container().style.cursor=selected?'move':'pointer'})
    node.on('mouseleave',()=>{stage.container().style.cursor='default'})
    node.on('click tap',ev=>{ev.cancelBubble=true;if(!selected)konvaSelectEntry(entry,false)})
    if(entry.type==='text')node.on('dblclick dbltap',ev=>{ev.cancelBubble=true;konvaSelectEntry(entry,true)})
    if(selected){
      node.dragBoundFunc(pos=>entry.type==='overlay'?{x:clamp(pos.x,-width*.45,width*1.45),y:clamp(pos.y,-height*.45,height*1.45)}:{x:clamp(pos.x,0,width),y:clamp(pos.y,0,height)})
      node.on('dragstart',()=>beginKonvaInteraction())
      node.on('dragmove',()=>{snapKonvaNode(node,width,height);syncModelFromKonvaNode(entry,node,width,height);drawPreview()})
      node.on('dragend',()=>endKonvaInteraction(entry,node,width,height))
    }
    layer.add(node);konvaRuntime.nodes.set(`${entry.type}:${entry.id}`,node)
  }
  const selectedEntry=entries.find(e=>state.selected?.type===e.type&&state.selected?.id===e.id),selectedNode=selectedEntry?konvaRuntime.nodes.get(`${selectedEntry.type}:${selectedEntry.id}`):null
  if(selectedNode){
    const transformer=new Konva.Transformer({
      nodes:[selectedNode],rotateEnabled:true,keepRatio:true,flipEnabled:false,
      enabledAnchors:['top-left','top-right','bottom-left','bottom-right'],
      anchorSize:isMobileViewport()?15:11,anchorCornerRadius:6,padding:4,
      borderStroke:'#7E99FF',borderStrokeWidth:1.5,anchorFill:'#F7F8FA',anchorStroke:'#5575E8',anchorStrokeWidth:2,
      rotateAnchorOffset:isMobileViewport()?30:26,rotationSnaps:[0,90,180,270],rotationSnapTolerance:5,
      boundBoxFunc:(oldBox,newBox)=>{
        const min=isMobileViewport()?28:22,max=Math.max(width,height)*4
        if(Math.abs(newBox.width)<min||Math.abs(newBox.height)<min||Math.abs(newBox.width)>max||Math.abs(newBox.height)>max)return oldBox
        return newBox
      }
    })
    transformer.on('transformstart',()=>beginKonvaInteraction())
    transformer.on('transform',()=>{syncModelFromKonvaNode(selectedEntry,selectedNode,width,height);drawPreview()})
    transformer.on('transformend',()=>endKonvaInteraction(selectedEntry,selectedNode,width,height))
    layer.add(transformer);konvaRuntime.transformer=transformer
  }
  layer.draw()
}
function bindKonvaCanvasEditor(){
  destroyKonvaCanvasEditor()
  const container=$('#konva-editor-layer'),frame=$('.preview-frame');if(!container||!frame||!konvaAvailable()){container?.classList.add('runtime-unavailable');return}
  try{
    const Konva=window.Konva,width=Math.max(1,frame.clientWidth),height=Math.max(1,frame.clientHeight)
    const stage=new Konva.Stage({container,width,height}),layer=new Konva.Layer()
    stage.add(layer);Object.assign(konvaRuntime,{stage,layer,container,nodes:new Map(),interacting:false,historyPushed:false})
    stage.on('click tap',ev=>{if(ev.target===stage&&konvaEditableSelection()){state.selected=null;renderEditor()}})
    syncKonvaCanvasEditor(true)
  }catch(error){
    console.warn('Konva canvas editor unavailable; using Edituno fallback controls.',error)
    konvaRuntime.failed=true;destroyKonvaCanvasEditor();container.classList.add('runtime-unavailable')
  }
}
function konvaManipulationHint(){
  return `<div class="konva-editor-hint"><span class="konva-hint-mark">K</span><span><strong>${state.language==='el'?'Άμεσος χειρισμός στον καμβά':'Direct canvas controls'}</strong><small>${state.language==='el'?'Σύρε · άλλαξε μέγεθος · περιστροφή · έξυπνο snapping':'Drag · resize · rotate · smart snapping'} · Konva 10.5.0 · MIT</small></span></div>`
}

function selectedTransformTarget(){return selectedVisual()||selectedElement()}
function updatePreviewSelectionOverlay(){
  const box=$('#preview-selection-box'),frame=$('.preview-frame'),target=selectedTransformTarget();if(konvaAvailable()&&konvaEditableSelection()){box?.classList.add('hidden');return}if(!box||!frame||!target){box?.classList.add('hidden');return}
  box.classList.remove('hidden')
  const fr=frame.getBoundingClientRect(),scale=target.scale??1
  const base=state.selected?.type==='overlay'?Math.min(fr.width,fr.height)*.72:state.selected?.type==='element'?Math.min(fr.width,fr.height)*.34:Math.min(fr.width,fr.height)*1.02
  const size=Math.max(34,base*scale),x=fr.width/2+(target.offsetX??((target.x??.5)-.5))*fr.width,y=fr.height/2+(target.offsetY??((target.y??.5)-.5))*fr.height
  box.style.width=`${size}px`;box.style.height=`${size}px`;box.style.left=`${x-size/2}px`;box.style.top=`${y-size/2}px`;box.style.transform=`rotate(${target.rotation||0}deg)`
}
function bindPreviewInteractions(){
  if(konvaAvailable()&&konvaEditableSelection())return
  const layer=$('#preview-interaction-layer'), frame=$('.preview-frame'), target=selectedTransformTarget()
  if(!layer||!frame||!target)return
  const pointers=new Map(); let origin=null,pinch=null,resizing=false
  const point=e=>({x:e.clientX,y:e.clientY})
  layer.addEventListener('pointerdown',e=>{
    const c=selectedTransformTarget();if(!c)return
    e.preventDefault();layer.setPointerCapture?.(e.pointerId);pointers.set(e.pointerId,point(e))
    resizing=Boolean(e.target.closest?.('.selection-handle'))
    if(pointers.size===1)origin={x:e.clientX,y:e.clientY,offsetX:c.offsetX??((c.x??.5)-.5),offsetY:c.offsetY??((c.y??.5)-.5),scale:c.scale||1,distance:Math.hypot(e.clientX-frame.getBoundingClientRect().left-frame.clientWidth/2,e.clientY-frame.getBoundingClientRect().top-frame.clientHeight/2)}
    if(pointers.size===2){const ps=[...pointers.values()];pinch={distance:Math.hypot(ps[0].x-ps[1].x,ps[0].y-ps[1].y),scale:c.scale||1}}
  },{passive:false})
  layer.addEventListener('pointermove',e=>{
    if(!pointers.has(e.pointerId))return;e.preventDefault();pointers.set(e.pointerId,point(e));const c=selectedTransformTarget();if(!c)return
    const rect=frame.getBoundingClientRect()
    if(pointers.size===1&&origin){
      if(resizing){const d=Math.hypot(e.clientX-(rect.left+rect.width/2),e.clientY-(rect.top+rect.height/2));c.scale=clamp(origin.scale*(d/Math.max(20,origin.distance)),.08,4)}
      else {const ox=clamp(origin.offsetX+(e.clientX-origin.x)/Math.max(1,rect.width),-.95,.95),oy=clamp(origin.offsetY+(e.clientY-origin.y)/Math.max(1,rect.height),-.95,.95);if(state.selected?.type==='element'){c.x=.5+ox;c.y=.5+oy}else{c.offsetX=ox;c.offsetY=oy}}
      queueSave();drawPreview();updatePreviewSelectionOverlay()
    }
    if(pointers.size===2&&pinch){const ps=[...pointers.values()],d=Math.hypot(ps[0].x-ps[1].x,ps[0].y-ps[1].y);c.scale=clamp(pinch.scale*(d/Math.max(1,pinch.distance)),.08,4);queueSave();drawPreview();updatePreviewSelectionOverlay()}
  },{passive:false})
  const end=e=>{pointers.delete(e.pointerId);if(!pointers.size){origin=null;pinch=null;resizing=false}}
  layer.addEventListener('pointerup',end);layer.addEventListener('pointercancel',end)
}



function applySheetSnap(sheet,snap){
  if(!sheet)return
  state.sheetSnap=snap
  sheet.classList.remove('snap-collapsed','snap-half','snap-full','dragging')
  sheet.classList.add(`snap-${snap}`);sheet.style.height=''
  const backdrop=$('.sheet-backdrop');backdrop?.classList.toggle('collapsed',snap==='collapsed')
}
function bindBottomSheetGesture(){
  const sheet=$('.bottom-sheet.open'),grabber=sheet?.querySelector('.sheet-grabber');if(!sheet||!grabber)return
  applySheetSnap(sheet,state.sheetSnap||'half')
  let startY=0,startH=0,moved=false,pointerId=null
  const heights=()=>({collapsed:42,half:Math.min(window.innerHeight*.54,560),full:Math.min(window.innerHeight*.86,820)})
  const move=e=>{if(e.pointerId!==pointerId)return;e.preventDefault();moved=true;const h=heights(),next=clamp(startH+(startY-e.clientY),h.collapsed,h.full);sheet.classList.add('dragging');sheet.style.height=`${next}px`;const backdrop=$('.sheet-backdrop');if(backdrop)backdrop.classList.remove('collapsed')}
  const finish=e=>{if(pointerId===null||e.pointerId!==pointerId)return;window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',finish);window.removeEventListener('pointercancel',finish);const h=heights(),current=sheet.getBoundingClientRect().height;let snap='half';if(current<(h.collapsed+h.half)/2)snap='collapsed';else if(current>(h.half+h.full)/2)snap='full';applySheetSnap(sheet,snap);pointerId=null;if(!moved&&snap==='collapsed')applySheetSnap(sheet,'half')}
  grabber.addEventListener('pointerdown',e=>{e.preventDefault();pointerId=e.pointerId;startY=e.clientY;startH=sheet.getBoundingClientRect().height;moved=false;grabber.setPointerCapture?.(e.pointerId);window.addEventListener('pointermove',move,{passive:false});window.addEventListener('pointerup',finish,{passive:false});window.addEventListener('pointercancel',finish,{passive:false})},{passive:false})
  grabber.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();applySheetSnap(sheet,state.sheetSnap==='collapsed'?'half':'collapsed')}})
}

function renderEditor() {
  if(!state.project) return
  const previousTimeline=$('#timeline-scroll'); if(previousTimeline)state.timelineScrollLeft=previousTimeline.scrollLeft
  const previousSheet=$('.sheet-content'); if(previousSheet)state.sheetScrollTop=previousSheet.scrollTop
  document.body.classList.toggle('editor-open', isMobileViewport())
  document.body.classList.toggle('mobile-app-shell', isMobileViewport())
  scheduleMobileViewportSync()
  const app=$('#app'), p=state.project, dur=projectDuration(), rows=clipTimeline(), mobile=isMobileViewport(), totalWidth=Math.max(360,Math.ceil(dur*state.pxPerSec)+72)
  destroyKonvaCanvasEditor()
  app.innerHTML=`<div class="studio-editor ${mobile?'editor-mobile':'editor-desktop'}">
    <header class="editor-topbar">
      <div class="editor-topbar-left"><button class="round-icon" data-action="back" aria-label="${tr('back')}">${svgIcon('back',19)}</button></div>
      <div class="project-title-shell"><input class="project-title" id="project-name" aria-label="${tr('projectName')}" value="${escapeHtml(p.name)}"><span class="save-chip" id="save-state">${tr('save')}</span></div>
      <div class="editor-topbar-right"><button class="round-icon desktop-editor-only" data-action="settings" aria-label="${tr('settings')}">${svgIcon('settings',18)}</button><button class="export-pill" data-action="export">${svgIcon('export',15)}<span>${tr('export')}</span></button></div>
    </header>

    <main class="editor-workspace">
      <aside class="asset-browser desktop-editor-only"><div class="panel-top"><span class="eyebrow">STUDIO</span><strong>${desktopToolTitle()}</strong></div><div class="desktop-sidebar-shell">${desktopSidebar()}</div></aside>

      <section class="editor-center">
        <div class="viewer-shell">
          <div class="viewer-toolbar"><div><span class="viewer-ratio">${escapeHtml(p.ratio)}</span><span class="viewer-quality">${state.preferences.previewQuality}</span></div><div class="viewer-actions"><button data-action="undo" aria-label="${tr('undo')}">${svgIcon('undo',15)}</button><button data-action="redo" aria-label="${tr('redo')}">${svgIcon('redo',15)}</button></div></div>
          <div class="preview-zone"><div class="preview-wrap"><div class="preview-frame"><canvas id="preview-canvas"></canvas><div id="konva-editor-layer" class="konva-editor-layer" data-konva-direct-manipulation="true" aria-label="Direct canvas editor"></div><div id="preview-interaction-layer" class="preview-interaction-layer ${state.selected?.type==='clip'||(!konvaAvailable()&&['overlay','element'].includes(state.selected?.type))?'active':''}" aria-label="Canvas interaction layer"><div id="preview-selection-box" class="preview-selection-box hidden"><i class="selection-handle"></i></div></div><div class="preview-empty ${rows.length?'hidden':''}"><span>${svgIcon('media',25)}</span><strong>${state.language==='el'?'Πρόσθεσε media':'Add media'}</strong><small>${state.language==='el'?'Video, φωτογραφίες ή audio':'Video, photos or audio'}</small><button class="viewer-add" data-action="pick-media">${svgIcon('plus',16)}<span>Import</span></button></div></div></div></div>
          <div class="transport-bar"><button class="transport-btn" data-action="jump-start" aria-label="Start">${svgIcon('back',17)}</button><button class="transport-play" data-action="play-toggle" aria-label="${tr('play')}"><span id="play-icon">${state.playing?'Ⅱ':svgIcon('play',18)}</span></button><span class="timecode" id="timecode">${fmtTime(state.currentTime)} <i>/</i> ${fmtTime(dur)}</span><input class="viewer-seek" id="seekbar" type="range" min="0" max="${Math.max(.01,dur)}" step="0.01" value="${state.currentTime}"></div>
        </div>

        <section class="timeline-shell">
          <header class="timeline-header"><div><strong>Timeline</strong><span>${dur?fmtTime(dur):'00:00.0'}</span></div><div class="timeline-actions"><button data-action="timeline-zoom" data-value="-1">${svgIcon('zoomout',15)}</button><button data-action="timeline-zoom" data-value="1">${svgIcon('zoomin',15)}</button><button data-action="split">${svgIcon('split',15)}<span class="desktop-editor-only">${tr('split')}</span></button></div></header>
          <div class="timeline-scroll" id="timeline-scroll"><div class="timeline-canvas" style="width:${totalWidth}px"><div class="timeline-ruler" data-timeline-ruler>${timelineRuler(dur,totalWidth)}</div>${smartGuideLayer()}<div class="track-row overlay-row" data-lane="3"><span class="track-label">V3</span><div class="timeline-overlay-row">${(p.overlays||[]).filter(c=>(c.lane||2)===3).map(timelineOverlay).join('')}</div></div><div class="track-row overlay-row" data-lane="2"><span class="track-label">V2</span><div class="timeline-overlay-row">${(p.overlays||[]).filter(c=>(c.lane||2)===2).map(timelineOverlay).join('')}</div></div><div class="track-row video-row"><span class="track-label">V1</span><div class="timeline-track">${rows.length?rows.map((r,i)=>timelineClip(r,i)).join(''):`<button class="timeline-empty-add" data-action="pick-media">${svgIcon('plus',17)}<span>${tr('addMedia')}</span></button>`}</div></div><div class="track-row audio-row"><span class="track-label">A1</span><div class="timeline-audio-row">${(p.audioClips||[]).map(timelineAudio).join('')}</div></div><div class="track-row element-row"><span class="track-label">E1</span><div class="timeline-element-row">${(p.elements||[]).map(timelineElement).join('')}</div></div><div class="track-row text-row"><span class="track-label">T1</span><div class="timeline-text-row">${(p.texts||[]).map(timelineText).join('')}</div></div><div class="playhead" style="left:${42+state.currentTime*state.pxPerSec}px"><i></i></div></div></div>
        </section>
      </section>

      <aside class="inspector-panel desktop-editor-only"><div class="panel-top"><span class="eyebrow">INSPECTOR</span><strong>${state.selected?.type==='clip'?tr('selectedClip'):state.selected?.type==='overlay'?'Overlay':state.selected?.type==='element'?(state.language==='el'?'Στοιχείο':'Element'):state.selected?.type==='audio'?tr('audio'):state.selected?.type==='text'?tr('text'):tr('canvas')}</strong></div><div class="desktop-inspector-scroll">${desktopInspector()}</div></aside>
    </main>

    <footer class="mobile-tool-dock mobile-editor-only"><div class="tool-scroller">${toolButton('media','media',tr('media'))}${toolButton('edit','edit',tr('quickEdit'))}${toolButton('text','text',tr('text'))}${toolButton('elements','effects',state.language==='el'?'Στοιχεία':'Elements')}${toolButton('audio','audio',tr('audio'))}${toolButton('effects','effects',tr('effects'))}${toolButton('adjust','adjust',tr('adjust'))}${toolButton('transitions','transition',tr('transitions'))}${toolButton('canvas','canvas',tr('canvas'))}</div></footer>

    <div class="sheet-backdrop ${state.sheet?'open':''} ${state.sheetSnap==='collapsed'?'collapsed':''}" data-action="sheet-close"></div>
    <section class="bottom-sheet ${state.sheet?'open':''} snap-${state.sheetSnap||'half'}" aria-modal="true"><div class="sheet-grabber" role="button" tabindex="0" aria-label="${state.language==='el'?'Σύρε για αλλαγή ύψους':'Drag to resize panel'}"></div><header class="sheet-header"><div><span class="eyebrow">EDITUNO</span><strong>${sheetTitle()}</strong></div><button class="round-icon" data-action="sheet-close">${svgIcon('close',17)}</button></header><div class="sheet-content">${state.sheet?panelContent(state.sheet):''}</div></section>
    ${state.projectHubOpen?mobileProjectHubModal():''}${state.settingsOpen?settingsModal():''}${state.installOpen?installModal():''}${confirmationModal()}
  </div><div class="toast-stack" id="toasts"></div>`
  requestAnimationFrame(()=>{
    fitPreviewFrame();updatePlaybackUi();bindTimelineInteractions();bindTimelineResizeInteractions();bindKonvaCanvasEditor();bindPreviewInteractions();bindBottomSheetGesture()
    const sc=$('#timeline-scroll');if(sc){const restore=()=>{const max=Math.max(0,sc.scrollWidth-sc.clientWidth);sc.scrollTop=0;sc.scrollLeft=clamp(state.timelineScrollLeft||0,0,max)};restore();requestAnimationFrame(restore);sc.addEventListener('scroll',()=>{state.timelineScrollLeft=sc.scrollLeft},{passive:true})}
    const sh=$('.sheet-content');if(sh){sh.scrollTop=state.sheetScrollTop||0;sh.addEventListener('scroll',()=>{state.sheetScrollTop=sh.scrollTop},{passive:true})}
    if(state.tool==='elements'||state.sheet==='elements')ensureFluentCatalog()
  })
}
function timelineRuler(dur,width){if(!dur)return'';const every=dur>180?30:dur>60?10:dur>20?5:2;let out='';for(let t=0;t<=dur+.001;t+=every)out+=`<span style="left:${t*state.pxPerSec}px">${fmtTime(t).slice(0,5)}</span>`;return out}
function timelineResizeHandle(kind,id){return `<span class="timeline-resize-handle end" data-resize-kind="${kind}" data-id="${id}" aria-label="Resize"></span>`}
function timelineClip(row,index){const a=getAsset(row.clip.assetId),w=Math.max(68,row.duration*state.pxPerSec);const transition=row.clip.transition&&row.clip.transition!=='none';return `<div class="timeline-clip-wrap ${state.selected?.type==='clip'&&state.selected.id===row.clip.id?'selected':''}" data-id="${row.clip.id}" style="width:${w}px"><button class="timeline-clip ${a?.type==='image'?'image':''} ${state.selected?.type==='clip'&&state.selected.id===row.clip.id?'selected':''}" data-action="select-clip" data-id="${row.clip.id}"><strong>${escapeHtml(a?.name||'Clip')}</strong><small>${fmtTime(row.duration)}</small></button>${timelineResizeHandle('clip',row.clip.id)}${index<state.project.clips.length-1?`<button class="timeline-transition ${transition?'active':''}" data-action="select-transition" data-id="${row.clip.id}" aria-label="${tr('transitions')}">${svgIcon('transition',14)}</button>`:''}</div>`}
function timelineOverlay(c){const a=getAsset(c.assetId),w=Math.max(54,overlayDuration(c)*state.pxPerSec),left=Math.max(0,(c.timelineStart||0)*state.pxPerSec);return `<button class="timeline-overlay ${a?.type==='image'?'image':''} ${state.selected?.type==='overlay'&&state.selected.id===c.id?'selected':''}" data-action="select-overlay" data-id="${c.id}" style="left:${left}px;width:${w}px"><strong>${escapeHtml(a?.name||'Overlay')}</strong><small>V${c.lane||2} · ${fmtTime(overlayDuration(c))}</small>${timelineResizeHandle('overlay',c.id)}</button>`}
function timelineElement(c){const w=Math.max(48,(c.duration||3)*state.pxPerSec),left=Math.max(0,(c.timelineStart||0)*state.pxPerSec);return `<button class="timeline-element ${state.selected?.type==='element'&&state.selected.id===c.id?'selected':''}" data-action="select-element" data-id="${c.id}" style="left:${left}px;width:${w}px"><strong>${escapeHtml(c.label||c.kind||'Element')}</strong><small>E1 · ${fmtTime(c.duration||3)}</small>${timelineResizeHandle('element',c.id)}</button>`}
function timelineText(t){const w=Math.max(54,(t.end-t.start)*state.pxPerSec);return `<button class="timeline-text ${state.selected?.type==='text'&&state.selected.id===t.id?'selected':''}" data-action="select-text" data-id="${t.id}" style="left:${(t.start||0)*state.pxPerSec}px;width:${w}px">${escapeHtml(t.text)}</button>`}
function waveformBars(asset,count=36){const peaks=asset?.waveform||[];if(!state.preferences.showWaveforms)return'';let out='';for(let i=0;i<count;i++){const v=peaks.length?peaks[Math.floor(i*peaks.length/count)]:(.28+.6*Math.abs(Math.sin(i*1.73)));out+=`<i style="height:${Math.max(12,Math.round(v*86))}%"></i>`}return out}
function timelineAudio(c){const a=getAsset(c.assetId),w=Math.max(72,audioClipDuration(c)*state.pxPerSec),left=(c.timelineStart||0)*state.pxPerSec;return `<button class="timeline-audio ${state.selected?.type==='audio'&&state.selected.id===c.id?'selected':''}" data-action="select-audio" data-id="${c.id}" style="left:${left}px;width:${w}px"><span class="audio-wave">${waveformBars(a)}</span><strong>${escapeHtml(a?.name||'Audio')}</strong><small>${Math.round((c.volume??.8)*100)}%</small>${timelineResizeHandle('audio',c.id)}</button>`}
function toolButton(tool,iconName,label){return `<button class="tool-btn ${state.tool===tool?'active':''}" data-action="tool" data-tool="${tool}" aria-pressed="${state.tool===tool?'true':'false'}"><span class="tool-icon">${svgIcon(iconName,20)}</span><span>${label}</span></button>`}
function sheetTitle(){if(state.sheet==='edit')return tr('quickEdit');if(state.sheet==='effects')return tr('effects');if(state.sheet==='adjust')return tr('adjust');if(state.sheet==='transitions')return tr('transitions');if(state.sheet==='text'&&selectedText())return tr('selectedText');return tr(state.sheet||'project')}
const EDITOR_TOOL_DEFS=[['media','media'],['edit','edit'],['text','text'],['elements','effects'],['audio','audio'],['effects','effects'],['adjust','adjust'],['transitions','transition'],['canvas','canvas']]
function desktopToolTitle(){const key=state.tool||'media';if(key==='edit')return tr('quickEdit');if(key==='adjust')return tr('adjust');if(key==='transitions')return tr('transitions');return tr(key)}
function desktopSidebar(){return `<nav class="desktop-tool-menu" aria-label="Editor tools">${EDITOR_TOOL_DEFS.map(([tool,icon])=>`<button class="${state.tool===tool?'active':''}" data-action="tool" data-tool="${tool}" title="${desktopToolTitleFor(tool)}"><span>${svgIcon(icon,17)}</span><small>${desktopToolTitleFor(tool)}</small></button>`).join('')}</nav><div class="desktop-tool-content">${panelContent(state.tool||'media')}</div>`}
function desktopToolTitleFor(tool){if(tool==='edit')return tr('quickEdit');if(tool==='adjust')return tr('adjust');if(tool==='transitions')return tr('transitions');return tr(tool)}
function desktopInspector(){return `${state.selected?.type==='clip'||state.selected?.type==='overlay'?clipPanel():state.selected?.type==='element'?elementPanel():state.selected?.type==='text'?textPanel():state.selected?.type==='audio'?audioClipPanel():canvasPanel()}`}
const INSPECTOR_ONLY_TOOLS=new Set(['edit','effects','adjust','transitions'])
function desktopInspectorToolPanel(tool){
  const el=state.language==='el'
  const meta={
    edit:{icon:'edit',title:tr('quickEdit'),body:el?'Trim και Μετασχηματισμός βρίσκονται στο Inspector δεξιά.':'Trim and Transform are in the Inspector on the right.'},
    effects:{icon:'effects',title:tr('effects'),body:el?'Φίλτρα και Κίνηση βρίσκονται στο Inspector δεξιά.':'Filters and Motion are in the Inspector on the right.'},
    adjust:{icon:'adjust',title:tr('adjust'),body:el?'Οι ρυθμίσεις εικόνας βρίσκονται στο Inspector δεξιά.':'Image adjustments are in the Inspector on the right.'},
    transitions:{icon:'transition',title:tr('transitions'),body:el?'Οι μεταβάσεις του clip βρίσκονται στο Inspector δεξιά.':'Clip transitions are in the Inspector on the right.'}
  }[tool]
  if(!meta)return''
  return `<div class="panel-grid desktop-inspector-launcher"><button class="inspector-launch-card" data-action="inspector-focus" data-target="${tool}"><span>${svgIcon(meta.icon,22)}</span><strong>${meta.title}</strong><small>${meta.body}</small><i>${el?'Μετάβαση στο Inspector':'Go to Inspector'} ${svgIcon('right',14)}</i></button></div>`
}
function focusInspectorSection(tool){
  const root=$('.desktop-inspector-scroll'),node=root?.querySelector(`[data-inspector-section="${tool}"]`)
  if(node)node.scrollIntoView({behavior:'smooth',block:'start'})
}
function panelContent(tool){if(tool==='media')return mediaPanel();if(tool==='edit')return isMobileViewport()?editPanel():desktopInspectorToolPanel('edit');if(tool==='text')return textPanel(true);if(tool==='elements')return elementPanel();if(tool==='audio')return audioPanel();if(tool==='effects')return isMobileViewport()?effectsPanel():desktopInspectorToolPanel('effects');if(tool==='adjust')return isMobileViewport()?adjustPanel():desktopInspectorToolPanel('adjust');if(tool==='transitions')return isMobileViewport()?transitionPanel():desktopInspectorToolPanel('transitions');if(tool==='canvas')return canvasPanel();return''}

function mediaPanel(){const list=state.project.assets||[];return `<div class="panel-grid"><button class="primary-btn full" data-action="pick-media">＋ ${tr('addMedia')}</button>${list.length?`<div class="media-list">${list.map(a=>`<div class="media-row ${a.type}" data-drag-asset="${a.id}" data-drag-type="${a.type}"><div class="media-type">${a.type==='video'?svgIcon('video',18):a.type==='image'?svgIcon('media',18):svgIcon('audio',18)}</div><div class="media-copy"><strong>${escapeHtml(a.name)}</strong><span>${a.type} · ${a.duration?fmtTime(a.duration):''} · ${fmtBytes(a.size)}<em class="drag-hint"> · ${tr('dragTimeline')}</em></span></div><div class="media-actions"><button class="media-action" data-action="${a.type==='audio'?'add-audio':'add-asset'}" data-id="${a.id}">${svgIcon('plus',14)}<span>${tr('add')}</span></button>${a.type!=='audio'?`<button class="media-action overlay-add" data-action="add-overlay" data-id="${a.id}">${svgIcon('copy',14)}<span>${state.language==='el'?'Overlay':'Overlay'}</span></button>`:''}</div></div>`).join('')}</div>`:`<div class="empty-state"><b>${tr('noMedia')}</b></div>`}</div>`}
function textPanel(showAdd=true){
  const t=selectedText()
  return `<div class="panel-grid">${showAdd?`<div class="action-row"><button class="sheet-action" data-action="add-text" data-kind="title"><i>T</i>${tr('addTitle')}</button><button class="sheet-action" data-action="add-text" data-kind="caption"><i>CC</i>${tr('addCaption')}</button><button class="sheet-action" data-action="add-text" data-kind="sticker"><i>${svgIcon('effects',17)}</i>${tr('addSticker')}</button></div><button class="secondary-btn" data-action="open-srt">CC ${tr('importSrt')}</button>`:''}${t?`${konvaManipulationHint()}<div class="panel-section"><h3>${tr('textStyle')}</h3><div class="field-grid"><label class="field"><span>${tr('textContent')}</span><textarea data-bind-text="text">${escapeHtml(t.text)}</textarea></label><div class="field-grid two"><label class="field"><span>${tr('fontSize')}</span><input data-bind-text="fontSize" type="number" min="12" max="180" value="${t.fontSize}"></label><label class="field"><span>${tr('weight')}</span><select data-bind-text="weight"><option ${t.weight==600?'selected':''}>600</option><option ${t.weight==700?'selected':''}>700</option><option ${t.weight==800?'selected':''}>800</option></select></label></div><div class="field-grid two"><label class="field"><span>${tr('color')}</span><input data-bind-text="color" type="color" value="${safeColor(t.color,'#ffffff')}"></label><label class="field"><span>${tr('textBackground')}</span><input data-bind-text="background" type="color" value="${safeColor(t.background,'#111827')}"></label></div><div class="field-grid two"><label class="field"><span>${state.language==='el'?'Στοίχιση':'Alignment'}</span><select data-bind-text="align"><option value="left" ${t.align==='left'?'selected':''}>${state.language==='el'?'Αριστερά':'Left'}</option><option value="center" ${(t.align||'center')==='center'?'selected':''}>${state.language==='el'?'Κέντρο':'Center'}</option><option value="right" ${t.align==='right'?'selected':''}>${state.language==='el'?'Δεξιά':'Right'}</option></select></label><label class="field"><span>${tr('animation')}</span><select data-bind-text="animation"><option value="none" ${t.animation==='none'?'selected':''}>${tr('none')}</option><option value="fade" ${t.animation==='fade'?'selected':''}>Fade</option><option value="pop" ${t.animation==='pop'?'selected':''}>Pop</option><option value="slide" ${t.animation==='slide'?'selected':''}>Slide up</option></select></label></div></div></div><div class="panel-section"><h3>${tr('position')}</h3>${rangeField('x',t.x,0,1,.01,true,'text')}${rangeField('y',t.y,0,1,.01,true,'text')}${rangeField('scale',t.scale??1,.2,4,.01,true,'text')}${rangeField('rotation',t.rotation||0,-180,180,1,true,'text')}<div class="field-grid two"><label class="field"><span>${tr('start')}</span><input data-bind-text="start" type="number" step="0.1" min="0" value="${t.start.toFixed(2)}"></label><label class="field"><span>${tr('end')}</span><input data-bind-text="end" type="number" step="0.1" min="0" value="${t.end.toFixed(2)}"></label></div></div><div class="smart-action-row"><button class="secondary-btn" data-action="duplicate">${svgIcon('copy',15)}<span>${tr('duplicate')}</span></button><button class="danger-btn" data-action="delete-selected">${tr('delete')}</button></div>`:''}</div>`
}
function safeColor(v,fallback){return /^#[0-9a-f]{6}$/i.test(v||'')?v:fallback}
function audioPanel(){
  const audios=state.project.assets.filter(a=>a.type==='audio'), c=selectedAudio()
  const selectedUi=c?(isMobileViewport()?audioClipPanel():`<div class="panel-section soft desktop-audio-inspector-note"><div class="panel-heading-row"><div><h3>${state.language==='el'?'Επιλεγμένο audio':'Selected audio'}</h3><small>${state.language==='el'?'Mixer και Smart Audio στο Inspector':'Mixer and Smart Audio are in the Inspector'}</small></div><span>${svgIcon('right',16)}</span></div></div>`):`<div class="panel-section soft"><h3>${state.language==='el'?'Πολυκάναλος ήχος':'Multitrack audio'}</h3><p class="helper">${state.language==='el'?'Πρόσθεσε μουσική στο A1 και μετακίνησέ την ελεύθερα πάνω στο timeline.':'Add music to A1 and position it freely on the timeline.'}</p></div>`
  return `<div class="panel-grid"><button class="primary-btn full" data-action="pick-media">＋ ${tr('addMedia')}</button>${audios.length?`<div class="media-list">${audios.map(a=>`<div class="media-row audio" data-drag-asset="${a.id}" data-drag-type="audio"><div class="media-type">${svgIcon('audio',18)}</div><div class="media-copy"><strong>${escapeHtml(a.name)}</strong><span>${fmtTime(a.duration)} · ${fmtBytes(a.size)}</span></div><button class="media-action" data-action="add-audio" data-id="${a.id}">＋ ${tr('add')}</button></div>`).join('')}</div>`:`<div class="empty-state"><b>${tr('noAudio')}</b></div>`}${selectedUi}</div>`
}

function smartAudioPanel(){
  const c=selectedAudio(),a=getAsset(c?.assetId);if(!c||!a)return''
  const analysis=a.audioAnalysis,busy=state.smartBusy==='audio',guides=state.project.smartAudioGuideId===c.id
  const silenceSeconds=analysis?.silences?.reduce((sum,s)=>sum+Math.max(0,s.end-s.start),0)||0
  return `<div class="panel-section smart-tool-card smart-audio-card"><div class="smart-tool-head"><span class="smart-tool-icon">${svgIcon('audio',18)}</span><div><strong>${state.language==='el'?'Smart Audio':'Smart Audio'}</strong><small>Meyda 5.6.3 · MIT · local analysis</small></div><span class="smart-badge">SMART</span></div>${analysis?`<div class="smart-metrics"><div><strong>${analysis.bpm||'--'}</strong><small>BPM</small></div><div><strong>${analysis.beats?.length||0}</strong><small>Beats</small></div><div><strong>${analysis.silences?.length||0}</strong><small>${state.language==='el'?'Σιωπές':'Silences'}</small></div><div><strong>${silenceSeconds.toFixed(1)}s</strong><small>${state.language==='el'?'Σιωπηλός χρόνος':'Silent time'}</small></div></div><div class="smart-analysis-note"><span>${svgIcon('check',14)}</span><span>${state.language==='el'?`Όριο σιωπής ${analysis.silenceThresholdDb} dB · ανάλυση στη συσκευή`:`Silence threshold ${analysis.silenceThresholdDb} dB · on-device analysis`}</span></div><label class="field smart-density"><span>${state.language==='el'?'Πυκνότητα beat cuts':'Beat cut density'}</span><select data-bind-audio="beatCutEvery"><option value="1" ${Number(c.beatCutEvery||2)===1?'selected':''}>${state.language==='el'?'Κάθε beat':'Every beat'}</option><option value="2" ${Number(c.beatCutEvery||2)===2?'selected':''}>${state.language==='el'?'Κάθε 2 beats':'Every 2 beats'}</option><option value="4" ${Number(c.beatCutEvery||2)===4?'selected':''}>${state.language==='el'?'Κάθε 4 beats':'Every 4 beats'}</option></select></label><div class="smart-audio-actions"><button class="secondary-btn ${guides?'smart-active':''}" data-action="smart-audio-guides">${svgIcon('timeline',15)}<span>${guides?(state.language==='el'?'Απόκρυψη guides':'Hide guides'):(state.language==='el'?'Beat + silence guides':'Beat + silence guides')}</span></button><button class="primary-btn" data-action="smart-cut-beats">${svgIcon('split',15)}<span>${state.language==='el'?'Cut V1 στα beats':'Cut V1 to beats'}</span></button></div><div class="smart-action-row"><button class="secondary-btn" data-action="smart-audio-analyze">${svgIcon('audio',15)}<span>${state.language==='el'?'Νέα ανάλυση':'Re-analyze'}</span></button><button class="secondary-btn subtle-danger" data-action="smart-audio-clear">${svgIcon('trash',15)}<span>${state.language==='el'?'Καθαρισμός':'Clear'}</span></button></div>`:`<p class="helper">${state.language==='el'?'Ανίχνευση σιωπής, beat detection και αυτόματα cuts στη V1. Η ανάλυση γίνεται τοπικά χωρίς upload.':'Silence detection, beat detection and automatic V1 cuts. Analysis runs locally with no upload.'}</p><button class="primary-btn full smart-analyze-btn" data-action="smart-audio-analyze" ${busy?'disabled':''}>${busy?`<span class="smart-spinner"></span>${state.language==='el'?'Ανάλυση ήχου…':'Analyzing audio…'}`:`${svgIcon('effects',16)}<span>${state.language==='el'?'Ανάλυση με Meyda':'Analyze with Meyda'}</span>`}</button>`}</div>`
}

function audioClipPanel(){
  const c=selectedAudio(),a=getAsset(c?.assetId);if(!c)return''
  return `<div class="panel-grid">${smartAudioPanel()}<div class="panel-section audio-mixer"><div class="mixer-heading"><span class="mixer-icon">${svgIcon('audio',18)}</span><div><strong>${escapeHtml(a?.name||'Audio')}</strong><small>A1 · ${fmtTime(audioClipDuration(c))}</small></div></div>${rangeField('volume',c.volume,0,1,.01,true,'audio')}${rangeField('fadeIn',c.fadeIn,0,Math.min(5,audioClipDuration(c)/2),.05,true,'audio')}${rangeField('fadeOut',c.fadeOut,0,Math.min(5,audioClipDuration(c)/2),.05,true,'audio')}<div class="field-grid two"><label class="field"><span>${state.language==='el'?'Θέση':'Position'}</span><input data-bind-audio="timelineStart" type="number" min="0" step="0.05" value="${(c.timelineStart||0).toFixed(2)}"></label><label class="field"><span>${tr('speed')}</span><select data-bind-audio="speed"><option value="0.5" ${c.speed===.5?'selected':''}>0.5×</option><option value="0.75" ${c.speed===.75?'selected':''}>0.75×</option><option value="1" ${c.speed===1?'selected':''}>1×</option><option value="1.25" ${c.speed===1.25?'selected':''}>1.25×</option><option value="1.5" ${c.speed===1.5?'selected':''}>1.5×</option><option value="2" ${c.speed===2?'selected':''}>2×</option></select></label></div><div class="field-grid two"><label class="field"><span>${tr('start')}</span><input data-bind-audio="sourceStart" type="number" min="0" max="${Math.max(0,(a?.duration||c.sourceEnd)-.05)}" step="0.05" value="${(c.sourceStart||0).toFixed(2)}"></label><label class="field"><span>${tr('end')}</span><input data-bind-audio="sourceEnd" type="number" min="${(c.sourceStart||0)+.05}" max="${a?.duration||c.sourceEnd}" step="0.05" value="${c.sourceEnd.toFixed(2)}"></label></div><div class="audio-quick-grid"><button class="secondary-btn" data-action="audio-fit-video">${svgIcon('expand',15)}<span>${tr('fitAudio')}</span></button><button class="secondary-btn" data-action="audio-to-playhead">${svgIcon('right',15)}<span>${tr('movePlayhead')}</span></button><button class="secondary-btn" data-action="audio-align-clip">${svgIcon('transition',15)}<span>${tr('alignClip')}</span></button></div><div class="audio-actions"><button class="secondary-btn" data-action="audio-toggle-mute">${c.muted?svgIcon('mute',16):svgIcon('volume',16)}<span>${c.muted?(state.language==='el'?'Ενεργοποίηση':'Unmute'):(state.language==='el'?'Σίγαση':'Mute')}</span></button><button class="secondary-btn" data-action="duplicate">${tr('duplicate')}</button><button class="danger-btn" data-action="delete-selected">${tr('delete')}</button></div></div></div>`
}

function effectsEmpty(){return `<div class="empty-state"><b>${tr('effects')}</b><span>${state.language==='el'?'Επίλεξε clip από το timeline.':'Select a clip on the timeline.'}</span></div>`}

function smartReframePanel(){
  const c=selectedClip(),a=getAsset(c?.assetId);if(!c||!a||!['image','video'].includes(a.type))return''
  const applied=c.smartReframe,valid=applied?.ratio===state.project.ratio,busy=state.smartBusy==='reframe'
  return `<div class="panel-section smart-tool-card smart-reframe-card"><div class="smart-tool-head"><span class="smart-tool-icon">${svgIcon('effects',18)}</span><div><strong>${state.language==='el'?'Auto Reframe':'Auto Reframe'}</strong><small>Smartcrop.js 2.0.5 · MIT</small></div><span class="smart-badge">SMART</span></div><p class="helper">${a.type==='video'?(state.language==='el'?'Αναλύει τρία σημεία του clip και κρατά σταθερό το σημαντικό περιεχόμενο μέσα στο τρέχον κάδρο.':'Analyzes three points in the clip and keeps important content framed consistently for the current canvas.'):(state.language==='el'?'Εντοπίζει το σημαντικό περιεχόμενο και προσαρμόζει το κάδρο στο τρέχον aspect ratio.':'Finds the important content and reframes it for the current canvas aspect ratio.')}</p><div class="smart-reframe-status"><span>${svgIcon(valid?'check':'canvas',15)}</span><span><strong>${valid?(state.language==='el'?'Εφαρμοσμένο':'Applied'):(applied?(state.language==='el'?'Χρειάζεται νέα ανάλυση':'Needs refresh'):(state.language==='el'?'Τρέχον κάδρο':'Current canvas'))}</strong><small>${escapeHtml(state.project.ratio)} · ${a.type==='video'?'3-frame':'1-frame'} analysis</small></span></div><div class="smart-action-row"><button class="primary-btn smart-primary" data-action="smart-reframe" ${busy?'disabled':''}>${busy?`<span class="smart-spinner"></span>${state.language==='el'?'Ανάλυση…':'Analyzing…'}`:`${svgIcon('effects',16)}<span>${state.language==='el'?'Auto Reframe':'Auto Reframe'}</span>`}</button><button class="secondary-btn" data-action="smart-reframe-reset">${svgIcon('undo',15)}<span>${state.language==='el'?'Reset κάδρου':'Reset frame'}</span></button></div></div>`
}

function editPanel(){
  const c=selectedVisual(),a=getAsset(c?.assetId); if(!c)return effectsEmpty()
  return `<div class="panel-grid compact-panels">${smartReframePanel()}${state.selected?.type==='overlay'?konvaManipulationHint():''}<div class="mobile-quick-actions"><button class="sheet-action" data-action="split"><i>${svgIcon('split',19)}</i>${tr('split')}</button><button class="sheet-action" data-action="duplicate"><i>${svgIcon('copy',19)}</i>${tr('duplicate')}</button><button class="sheet-action" data-action="move" data-value="-1"><i>${svgIcon('left',19)}</i>${tr('moveLeft')}</button><button class="sheet-action" data-action="move" data-value="1"><i>${svgIcon('right',19)}</i>${tr('moveRight')}</button><button class="sheet-action danger" data-action="delete-selected"><i>${svgIcon('trash',19)}</i>${tr('delete')}</button></div><div class="panel-section"><h3>${tr('trim')}</h3><div class="field-grid two"><label class="field"><span>${tr('start')}</span><input data-bind-clip="start" type="number" step="0.05" min="0" max="${Math.max(0,(a?.duration||c.end)-.05)}" value="${c.start.toFixed(2)}"></label><label class="field"><span>${tr('end')}</span><input data-bind-clip="end" type="number" step="0.05" min="${c.start+.05}" max="${a?.duration||c.end}" value="${c.end.toFixed(2)}"></label></div>${rangeField('speed',c.speed,.25,8,.05,true,'clip')}${a?.type==='video'?`${rangeField('volume',c.volume,0,1,.01,true,'clip')}${rangeField('audioFadeIn',c.audioFadeIn||0,0,Math.min(5,clipDuration(c)/2),.05,true,'clip')}${rangeField('audioFadeOut',c.audioFadeOut||0,0,Math.min(5,clipDuration(c)/2),.05,true,'clip')}`:''}</div><div class="panel-section"><h3>${tr('transform')}</h3>${rangeField('scale',c.scale,.2,3,.01,true,'clip')}${rangeField('rotation',c.rotation,-180,180,1,true,'clip')}<div class="field-grid two">${rangeField('offsetX',c.offsetX,-.7,.7,.01,true,'clip')}${rangeField('offsetY',c.offsetY,-.7,.7,.01,true,'clip')}</div><div class="format-grid"><button class="format-btn ${c.fit==='cover'?'active':''}" data-action="clip-set" data-key="fit" data-value="cover">${tr('cover')}</button><button class="format-btn ${c.fit==='contain'?'active':''}" data-action="clip-set" data-key="fit" data-value="contain">${tr('contain')}</button><button class="format-btn ${c.flipX?'active':''}" data-action="clip-toggle" data-key="flipX">↔</button><button class="format-btn ${c.flipY?'active':''}" data-action="clip-toggle" data-key="flipY">↕</button></div></div></div>`
}
function effectsPanel(){
  const c=selectedVisual(); if(!c)return effectsEmpty()
  const presets=['original','vivid','warm','cool','cinematic','film','dream','crisp','retro','soft','neon','matte','sunset','ice','noir','mono','tealorange','bleach','rose','forest','gold','highkey','lowkey','cyber']
  const gpu=[['none',state.language==='el'?'Χωρίς GPU':'No GPU'],['bloom','Bloom'],['glitch','Glitch'],['crt','CRT'],['oldfilm',state.language==='el'?'Παλιό φιλμ':'Old Film'],['rgbsplit','RGB Split'],['pixelate','Pixelate'],['bulge','Bulge'],['dreamblur',state.language==='el'?'Dream Blur':'Dream Blur']]
  const glyph={none:'circle',bloom:'sun',glitch:'effects',crt:'video',oldfilm:'grain',rgbsplit:'palette',pixelate:'projects',bulge:'circle',dreamblur:'droplet'}
  return `<div class="panel-grid"><div class="panel-section borderless-mobile gpu-lab"><div class="panel-heading-row"><div><h3>${state.language==='el'?'GPU Effects':'GPU Effects'}</h3><small>PixiJS Filters · GPU accelerated</small></div><span class="gpu-badge">GPU</span></div><div class="gpu-effect-grid">${gpu.map(([v,l])=>`<button class="gpu-effect-card ${c.gpuEffect===v?'active':''}" data-action="clip-set" data-key="gpuEffect" data-value="${v}"><span>${svgIcon(glyph[v]||'effects',19)}</span><strong>${l}</strong><small>${v==='none'?'Canvas':(state.language==='el'?'Πραγματικό εφέ':'Live effect')}</small></button>`).join('')}</div>${c.gpuEffect&&c.gpuEffect!=='none'?`<div class="gpu-effect-focus"><div><strong>${state.language==='el'?'Ένταση εφέ':'Effect intensity'}</strong><small>${Math.round((c.gpuIntensity??.65)*100)}%</small></div>${rangeField('gpuIntensity',c.gpuIntensity??.65,.1,1,.05,true,'clip')}</div>`:''}<p class="helper gpu-helper">${state.language==='el'?'Τα GPU effects εφαρμόζονται σε preview και export. Αν η GPU δεν είναι διαθέσιμη, το Edituno χρησιμοποιεί ασφαλές Canvas fallback.':'GPU effects are applied to preview and export. If GPU rendering is unavailable, Edituno uses a safe Canvas fallback.'}</p></div><div class="panel-section borderless-mobile"><h3>${tr('filter')}</h3><div class="preset-carousel">${presets.map(n=>`<button class="preset-card ${c.filterPreset===n?'active':''}" data-action="filter" data-value="${n}"><div class="preset-preview" style="${filterPreviewStyle(n)}"></div><strong>${n[0].toUpperCase()+n.slice(1)}</strong></button>`).join('')}</div></div><div class="panel-section borderless-mobile"><h3>${tr('motion')}</h3><div class="motion-grid">${[['none',tr('none')],['zoom',tr('zoom')],['zoomout',tr('zoomOut')],['kenburns',tr('kenBurns')],['panleft',tr('panLeft')],['panright',tr('panRight')],['pulse',tr('pulse')],['float',tr('float')],['shake',tr('shake')],['driftup',tr('driftUp')],['driftdown',tr('driftDown')],['spin',tr('spin')],['bounce',tr('bounce')],['swing',tr('swing')],['breath',tr('breath')]].map(([v,l])=>`<button class="motion-card ${c.motion===v?'active':''}" data-action="clip-set" data-key="motion" data-value="${v}"><span>${motionGlyph(v)}</span><strong>${l}</strong></button>`).join('')}</div></div></div>`
}
function motionGlyph(v){const m={none:'circle',zoom:'zoomin',zoomout:'zoomout',kenburns:'expand',panleft:'left',panright:'right',pulse:'circle',float:'movevertical',shake:'movehorizontal',driftup:'movevertical',driftdown:'movevertical',spin:'rotate',bounce:'movevertical',swing:'rotate',breath:'circle'};return svgIcon(m[v]||'effects',20)}
function adjustPanel(){
  const c=selectedVisual(); if(!c)return effectsEmpty()
  const defs={brightness:[50,150,1],exposure:[-50,50,1],contrast:[50,160,1],saturation:[0,200,1],temperature:[-50,50,1],vignette:[0,100,1],grain:[0,100,1],hue:[-180,180,1],blur:[0,8,.1],grayscale:[0,100,1],sepia:[0,100,1],invert:[0,100,1],opacity:[0,1,.01],fadeAmount:[0,100,1],shadows:[-100,100,1]}
  const key=defs[state.adjustKey]?state.adjustKey:'brightness', [min,max,step]=defs[key], value=c[key]??(key==='opacity'?1:0)
  return `<div class="adjust-mobile"><div class="adjust-grid">${Object.keys(defs).map(k=>`<button class="adjust-tile ${key===k?'active':''}" data-action="adjust-select" data-key="${k}"><span>${adjustGlyph(k)}</span><strong>${tr(k)}</strong><small>${Number(c[k]??0).toFixed(step<1?1:0)}</small></button>`).join('')}</div><div class="adjust-focus"><div class="adjust-focus-head"><strong>${tr(key)}</strong><button data-action="reset-adjustment" data-key="${key}">${tr('reset')}</button></div>${rangeField(key,value,min,max,step,true,'clip')}</div></div>`
}
function adjustGlyph(k){const m={brightness:'sun',exposure:'half',contrast:'half',saturation:'droplet',temperature:'thermo',vignette:'circle',grain:'grain',hue:'palette',blur:'droplet',grayscale:'half',sepia:'palette',invert:'half',opacity:'circle',fadeAmount:'half',shadows:'half'};return svgIcon(m[k]||'adjust',19)}
function transitionPanel(){
  const c=selectedClip(); if(!c)return `<div class="empty-state"><b>${state.language==='el'?'Μεταβάσεις V1':'V1 transitions'}</b><span>${state.language==='el'?'Οι μεταβάσεις εφαρμόζονται ανάμεσα στα κύρια clips της V1.':'Transitions are applied between primary V1 clips.'}</span></div>`
  const opts=[['none',tr('none')],['dissolve',tr('dissolve')],['fade',tr('fade')],['flash',tr('flash')],['slideleft',tr('slideLeft')],['slideright',tr('slideRight')],['zoom',tr('zoom')],['blur',tr('blurTransition')],['slideup',tr('slideUp')],['slidedown',tr('slideDown')],['spin',tr('spin')],['dipblack',tr('dipBlack')],['dipwhite',tr('dipWhite')],['push',tr('pushTransition')],['softzoom',tr('softZoom')],['gl-crosszoom','Cross Zoom'],['gl-swirl','Swirl'],['gl-mosaic','Mosaic'],['gl-circlecrop','Circle Crop'],['gl-directional','Directional'],['gl-dreamy','Dreamy']]
  return `<div class="panel-grid"><div class="transition-grid">${opts.map(([v,l])=>`<button class="transition-card ${c.transition===v?'active':''}" data-action="clip-set" data-key="transition" data-value="${v}"><span class="transition-preview t-${v}"><i></i><b></b>${v.startsWith('gl-')?'<u>GL</u>':''}<em>${svgIcon(v==='zoom'||v==='softzoom'?'zoomin':v==='spin'?'rotate':v.includes('slide')||v==='push'?'right':v==='flash'?'sun':v==='blur'?'droplet':'transition',18)}</em></span><strong>${l}</strong><small>${c.transition===v?(state.language==='el'?'Επιλεγμένο':'Selected'):''}</small></button>`).join('')}</div>${isGlTransition(c.transition)?`<p class="helper gl-transition-note">${state.language==='el'?'MIT shader transition · gl-transitions · πραγματικό WebGL blend δύο frames':'MIT shader transition · gl-transitions · real WebGL two-frame blend'}</p>`:''}<div class="panel-section borderless-mobile"><h3>${tr('duration')}</h3>${rangeField('transitionDuration',c.transitionDuration,.1,1.5,.05,true,'clip')}</div></div>`
}
const ELEMENT_PRESETS=[
  {kind:'subscribe',name:'Subscribe',icon:'play',color:'#ff2d2d'},
  {kind:'like',name:'Like',icon:'effects',color:'#2455F5'},
  {kind:'bell',name:'Bell',icon:'audio',color:'#f5b82e'},
  {kind:'lowerthird',name:'Lower third',icon:'text',color:'#2455F5'},
  {kind:'arrow',name:'Arrow',icon:'right',color:'#F7DCFF'},
  {kind:'circle',name:'Highlight',icon:'circle',color:'#ff4e67'},
  {kind:'label',name:'NEW',icon:'text',color:'#7c5cff'}
]
const EMOJI_PRESETS=['🔥','✨','❤️','🚀','⭐','👀','💯','🎉','👍','👏','😍','😎','😂','🤯','✅','❌','⚡','💡','🎮','🎬','🎵','📌','👉','⬇️']
function addElement(kind){const isEmoji=String(kind).startsWith('emoji:');const preset=isEmoji?{kind:'emoji',name:String(kind).slice(6)||'✨',color:'#ffffff'}:(ELEMENT_PRESETS.find(x=>x.kind===kind)||ELEMENT_PRESETS[0]);const dur=Math.max(3,Math.min(6,visualDuration()||3)),item={id:uid(),kind:preset.kind,label:isEmoji?preset.name:(preset.name==='Subscribe'?'SUBSCRIBE':preset.name),timelineStart:Math.max(0,state.currentTime||0),duration:Math.min(dur,Math.max(1,(visualDuration()||dur)-(state.currentTime||0))||dur),x:.5,y:preset.kind==='lowerthird'?.8:.5,scale:isEmoji?.9:1,rotation:0,opacity:1,color:preset.color,z:20};mutate(p=>{p.elements.push(item);state.selected={type:'element',id:item.id};state.tool='elements';state.sheet=isMobileViewport()?'elements':null})}
function elementPanel(){
  const selected=selectedElement(),fluent=fluentMatches(),q=escapeHtml(state.fluentQuery||''),style=state.fluentStyle||'color'
  const fluentSection=`<div class="panel-section borderless-mobile fluent-section"><div class="panel-heading-row"><div><h3>Microsoft Fluent Emoji</h3><small>${state.fluentCatalog.length?`${state.fluentCatalog.length.toLocaleString()} assets · MIT`:'MIT · 1,285 Color + 1,285 3D assets'}</small></div><div class="fluent-style-toggle"><button class="${style==='color'?'active':''}" data-action="fluent-style" data-value="color">Color</button><button class="${style==='3d'?'active':''}" data-action="fluent-style" data-value="3d">3D</button></div></div><label class="fluent-search">${svgIcon('search',15)}<input data-fluent-search type="search" value="${q}" placeholder="${state.language==='el'?'Αναζήτηση 1.285 στοιχείων':'Search 1,285 elements'}"></label>${state.fluentLoading?`<div class="fluent-loading">${state.language==='el'?'Φόρτωση πλήρους βιβλιοθήκης…':'Loading full library…'}</div>`:state.fluentError?`<div class="fluent-error"><span>${state.language==='el'?'Δεν φορτώθηκε η βιβλιοθήκη.':'Library could not load.'}</span><button data-action="fluent-retry">Retry</button></div>`:state.fluentCatalog.length?`<div class="fluent-grid">${fluent.map(entry=>{const path=fluentStylePath(entry,style);return `<button class="fluent-card" data-action="add-fluent" data-name="${escapeHtml(entry.name)}" data-path="${escapeHtml(path)}" title="${escapeHtml(entry.name)}"><span><img loading="lazy" decoding="async" src="${escapeHtml(fluentRawUrl(path))}" alt=""></span><small>${escapeHtml(entry.name)}</small></button>`}).join('')}</div>${fluent.length<state.fluentCatalog.filter(x=>!state.fluentQuery||x.name.toLowerCase().includes(String(state.fluentQuery).toLowerCase())).length?`<button class="secondary-btn full" data-action="fluent-more">${state.language==='el'?'Περισσότερα':'Load more'}</button>`:''}`:`<button class="secondary-btn full" data-action="fluent-retry">${state.language==='el'?'Φόρτωση Fluent library':'Load Fluent library'}</button>`}<p class="helper">${state.language==='el'?'Τα Fluent Emoji φορτώνονται κατά απαίτηση από το επίσημο Microsoft repository. Μόλις τα προσθέσεις σε project αποθηκεύονται τοπικά στη συσκευή.':'Fluent Emoji are loaded on demand from the official Microsoft repository. Once added to a project they are stored locally on your device.'}</p></div>`
  return `<div class="panel-grid"><div class="panel-section borderless-mobile"><h3>${state.language==='el'?'Creator στοιχεία':'Creator elements'}</h3><div class="element-library">${ELEMENT_PRESETS.map(e=>`<button class="element-card" data-action="add-element" data-value="${e.kind}"><span style="--element-color:${e.color}">${svgIcon(e.icon,20)}</span><strong>${e.name}</strong></button>`).join('')}</div></div><div class="panel-section borderless-mobile"><h3>${state.language==='el'?'Γρήγορα stickers':'Quick stickers'}</h3><div class="emoji-library">${EMOJI_PRESETS.map(e=>`<button class="emoji-card" data-action="add-element" data-value="emoji:${e}">${e}</button>`).join('')}</div></div>${fluentSection}${selected?`${konvaManipulationHint()}<div class="panel-section"><h3>${state.language==='el'?'Επιλεγμένο στοιχείο':'Selected element'}</h3>${rangeField('scale',selected.scale,.2,3,.01,true,'element')}${rangeField('rotation',selected.rotation,-180,180,1,true,'element')}<div class="field-grid two">${rangeField('x',selected.x??.5,0,1,.01,true,'element')}${rangeField('y',selected.y??.5,0,1,.01,true,'element')}</div>${rangeField('opacity',selected.opacity,0,1,.01,true,'element')}${selected.kind!=='emoji'?`<label class="field"><span>${state.language==='el'?'Χρώμα':'Color'}</span><input data-bind-element="color" type="color" value="${safeColor(selected.color,'#2455F5')}"></label>`:''}<button class="danger-btn" data-action="delete-selected">${tr('delete')}</button></div>`:''}</div>`
}

function clipPanel(){
  const c=selectedVisual();if(!c)return effectsEmpty()
  return `<div class="desktop-clip-stack"><section class="inspector-anchor" data-inspector-section="edit">${editPanel()}</section><section class="inspector-anchor" data-inspector-section="effects">${effectsPanel()}</section><section class="inspector-anchor" data-inspector-section="adjust">${adjustPanel()}</section><section class="inspector-anchor" data-inspector-section="transitions">${transitionPanel()}</section></div>`
}
function filterPreviewStyle(n){const f={original:'',vivid:'filter:saturate(1.4) contrast(1.1)',warm:'filter:sepia(.25) saturate(1.2)',cool:'filter:hue-rotate(18deg)',mono:'filter:grayscale(1) contrast(1.15)',film:'filter:sepia(.3) saturate(.8) contrast(1.1)',dream:'filter:brightness(1.15) saturate(1.05);opacity:.82',crisp:'filter:contrast(1.3) saturate(1.12)',cinematic:'filter:contrast(1.2) saturate(.9) sepia(.08)',retro:'filter:sepia(.3) saturate(.85) contrast(.95)',soft:'filter:brightness(1.1) contrast(.9)',neon:'filter:saturate(1.65) contrast(1.25) hue-rotate(8deg)',matte:'filter:saturate(.8) contrast(.86) brightness(1.07)',sunset:'filter:sepia(.22) saturate(1.35) hue-rotate(-8deg)',ice:'filter:saturate(1.05) hue-rotate(18deg) brightness(1.04)',noir:'filter:grayscale(1) contrast(1.45) brightness(.96)',tealorange:'filter:saturate(1.22) contrast(1.2) hue-rotate(-16deg)',bleach:'filter:saturate(.62) contrast(1.34) brightness(1.1)',rose:'filter:saturate(1.18) sepia(.12) hue-rotate(-12deg)',forest:'filter:saturate(1.08) hue-rotate(18deg) contrast(1.12)',gold:'filter:sepia(.18) saturate(1.16) brightness(1.05)',highkey:'filter:brightness(1.18) contrast(.88)',lowkey:'filter:brightness(.82) contrast(1.36)',cyber:'filter:saturate(1.7) contrast(1.32) hue-rotate(28deg)'};return f[n]||''}
function rangeField(key,value,min,max,step,show,scope){return `<label class="field"><span>${tr(key.split('.').pop())}<b>${show?Number(value).toFixed(step<1?2:0):Math.round(value)}</b></span><input data-bind-${scope}="${key}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"></label>`}
function canvasPanel(){const p=state.project;return `<div class="panel-grid"><div class="panel-section"><h3>${tr('projectCanvas')}</h3><div class="canvas-ratio-grid">${[['16:9','Landscape'],['9:16','Vertical'],['1:1','Square'],['4:5','Portrait']].map(([r,label])=>`<button class="canvas-ratio-card ${p.ratio===r?'active':''}" data-action="ratio" data-value="${r}"><span class="ratio-shape ratio-${r.replace(':','-')}"></span><strong>${r}</strong><small>${label}</small></button>`).join('')}</div></div><div class="panel-section"><label class="field"><span>${tr('background')}</span><input data-bind-project="background" type="color" value="${safeColor(p.background,'#0b0d12')}"></label></div><div class="install-card"><strong>${tr('private')}</strong><p>${tr('privateSub')}</p></div></div>`}

function snapTime(value){if(!state.preferences.snap)return Math.max(0,value);const step=.25;return Math.max(0,Math.round(value/step)*step)}
function commitTimelineDragNoRender(item,newStart,el){
  const scroll=$('#timeline-scroll')
  if(scroll)state.timelineScrollLeft=scroll.scrollLeft
  item.timelineStart=snapTime(newStart)
  if(el)el.style.left=`${item.timelineStart*state.pxPerSec}px`
  state.project.updatedAt=Date.now()
  state.suppressTimelineClickUntil=performance.now()+420
  queueSave()
  drawPreview()
  updatePlaybackUi()
}

function bindTimelineResizeInteractions(){
  const scroll=$('#timeline-scroll'); if(!scroll)return
  const startResize=(handle,resolve,getDuration,setDuration)=>{
    handle.addEventListener('pointerdown',e=>{
      if(e.button!==undefined&&e.pointerType==='mouse'&&e.button!==0)return
      const item=resolve(handle.dataset.id); if(!item)return
      e.preventDefault(); e.stopPropagation()
      const target=handle.closest('.timeline-clip-wrap,.timeline-audio,.timeline-overlay,.timeline-element'); if(!target)return
      const origin=getDuration(item), startX=e.clientX
      handle.setPointerCapture?.(e.pointerId)
      target.classList.add('resizing')
      const move=ev=>{
        if(ev.pointerId!==e.pointerId)return
        ev.preventDefault()
        const delta=(ev.clientX-startX)/state.pxPerSec
        const next=Math.max(.25,origin+delta)
        target.style.width=`${Math.max(40,next*state.pxPerSec)}px`
      }
      const finish=ev=>{
        window.removeEventListener('pointermove',move)
        window.removeEventListener('pointerup',finish)
        window.removeEventListener('pointercancel',finish)
        target.classList.remove('resizing')
        const delta=((ev?.clientX??startX)-startX)/state.pxPerSec
        const next=Math.max(.25,origin+delta)
        pushHistory()
        setDuration(item,next)
      }
      window.addEventListener('pointermove',move,{passive:false})
      window.addEventListener('pointerup',finish,{passive:false})
      window.addEventListener('pointercancel',finish,{passive:false})
    },{passive:false})
  }

  $$('.timeline-resize-handle[data-resize-kind="clip"]').forEach(handle=>startResize(
    handle,
    id=>state.project?.clips.find(c=>c.id===id),
    clip=>clipDuration(clip),
    (clip,next)=>{
      const asset=getAsset(clip.assetId)
      const maxDuration=asset?.type==='image'?120:Math.max(.25,(asset?.duration||clip.end)-clip.start)
      const clamped=clamp(next,.25,maxDuration/Math.max(.05,clip.speed||1))
      clip.end=clip.start+(clamped*Math.max(.05,clip.speed||1))
      state.project.updatedAt=Date.now(); queueSave(); drawPreview(); updatePlaybackUi(); renderEditor()
    }
  ))

  $$('.timeline-resize-handle[data-resize-kind="audio"]').forEach(handle=>startResize(
    handle,
    id=>state.project?.audioClips.find(c=>c.id===id),
    clip=>audioClipDuration(clip),
    (clip,next)=>{
      const asset=getAsset(clip.assetId)
      const maxDuration=Math.max(.25,(asset?.duration||clip.sourceEnd)-clip.sourceStart)
      const clamped=clamp(next,.25,maxDuration/Math.max(.05,clip.speed||1))
      clip.sourceEnd=clip.sourceStart+(clamped*Math.max(.05,clip.speed||1))
      state.project.updatedAt=Date.now(); queueSave(); drawPreview(); updatePlaybackUi(); syncAudioTracks(true); renderEditor()
    }
  ))

  $$('.timeline-resize-handle[data-resize-kind="overlay"]').forEach(handle=>startResize(
    handle,
    id=>state.project?.overlays.find(c=>c.id===id),
    clip=>overlayDuration(clip),
    (clip,next)=>{
      const asset=getAsset(clip.assetId)
      const maxDuration=asset?.type==='image'?120:Math.max(.25,(asset?.duration||clip.end)-clip.start)
      const clamped=clamp(next,.25,maxDuration/Math.max(.05,clip.speed||1))
      clip.end=clip.start+(clamped*Math.max(.05,clip.speed||1))
      state.project.updatedAt=Date.now(); queueSave(); drawPreview(); updatePlaybackUi(); renderEditor()
    }
  ))

  $$('.timeline-resize-handle[data-resize-kind="element"]').forEach(handle=>startResize(
    handle,
    id=>state.project?.elements.find(c=>c.id===id),
    item=>Math.max(.25,item.duration||3),
    (item,next)=>{
      item.duration=clamp(next,.25,120)
      state.project.updatedAt=Date.now(); queueSave(); drawPreview(); updatePlaybackUi(); renderEditor()
    }
  ))
}

function bindTimelineInteractions(){
  const scroll=$('#timeline-scroll'),ruler=$('[data-timeline-ruler]');if(!scroll)return
  if(ruler)ruler.addEventListener('pointerdown',e=>{const rect=ruler.getBoundingClientRect();seekTo(clamp((e.clientX-rect.left)/state.pxPerSec,0,projectDuration()))})

  // Pointer Events are used for audio movement so the exact same interaction works
  // with mouse, Apple Pencil and a finger. Vertical page panning never steals A1.
  $$('.timeline-audio').forEach(el=>{
    el.addEventListener('pointerdown',e=>{
      if(e.button!==undefined&&e.pointerType==='mouse'&&e.button!==0)return
      const clip=state.project?.audioClips.find(c=>c.id===el.dataset.id);if(!clip)return
      e.preventDefault();e.stopPropagation()
      const startX=e.clientX,original=clip.timelineStart||0;let moved=false,lastX=startX
      el.setPointerCapture?.(e.pointerId);el.classList.add('dragging')
      const move=ev=>{
        if(ev.pointerId!==e.pointerId)return
        ev.preventDefault()
        lastX=ev.clientX
        const delta=(lastX-startX)/state.pxPerSec
        if(Math.abs(lastX-startX)>2)moved=true
        const next=Math.max(0,original+delta)
        el.style.left=`${next*state.pxPerSec}px`
        const r=scroll.getBoundingClientRect(),edge=42
        if(lastX<r.left+edge)scroll.scrollLeft=Math.max(0,scroll.scrollLeft-8)
        else if(lastX>r.right-edge)scroll.scrollLeft+=8
      }
      const finish=ev=>{
        window.removeEventListener('pointermove',move)
        window.removeEventListener('pointerup',finish)
        window.removeEventListener('pointercancel',finish)
        el.classList.remove('dragging')
        if(moved){
          pushHistory()
          commitTimelineDragNoRender(clip,original+(lastX-startX)/state.pxPerSec,el)
          syncAudioTracks(true)
        }
      }
      window.addEventListener('pointermove',move,{passive:false})
      window.addEventListener('pointerup',finish,{passive:false})
      window.addEventListener('pointercancel',finish,{passive:false})
    },{passive:false})
  })

  $$('.timeline-element').forEach(el=>{
    el.addEventListener('pointerdown',e=>{
      if(e.button!==undefined&&e.pointerType==='mouse'&&e.button!==0)return
      const item=state.project?.elements?.find(c=>c.id===el.dataset.id);if(!item)return
      e.preventDefault();e.stopPropagation();const startX=e.clientX,original=item.timelineStart||0;let moved=false,lastX=startX
      el.setPointerCapture?.(e.pointerId);el.classList.add('dragging')
      const move=ev=>{if(ev.pointerId!==e.pointerId)return;ev.preventDefault();lastX=ev.clientX;if(Math.abs(lastX-startX)>2)moved=true;const next=Math.max(0,original+(lastX-startX)/state.pxPerSec);el.style.left=`${next*state.pxPerSec}px`}
      const finish=()=>{window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',finish);window.removeEventListener('pointercancel',finish);el.classList.remove('dragging');if(moved){pushHistory();commitTimelineDragNoRender(item,original+(lastX-startX)/state.pxPerSec,el)}}
      window.addEventListener('pointermove',move,{passive:false});window.addEventListener('pointerup',finish,{passive:false});window.addEventListener('pointercancel',finish,{passive:false})
    },{passive:false})
  })

  $$('.timeline-overlay').forEach(el=>{
    el.addEventListener('pointerdown',e=>{
      if(e.button!==undefined&&e.pointerType==='mouse'&&e.button!==0)return
      const clip=state.project?.overlays?.find(c=>c.id===el.dataset.id);if(!clip)return
      e.preventDefault();e.stopPropagation();const startX=e.clientX,original=clip.timelineStart||0;let moved=false,lastX=startX,lastY=e.clientY
      el.setPointerCapture?.(e.pointerId);el.classList.add('dragging')
      const move=ev=>{if(ev.pointerId!==e.pointerId)return;ev.preventDefault();lastX=ev.clientX;lastY=ev.clientY;if(Math.abs(lastX-startX)>2)moved=true;const next=Math.max(0,original+(lastX-startX)/state.pxPerSec);el.style.left=`${next*state.pxPerSec}px`;const r=scroll.getBoundingClientRect(),edge=42;if(lastX<r.left+edge)scroll.scrollLeft=Math.max(0,scroll.scrollLeft-8);else if(lastX>r.right-edge)scroll.scrollLeft+=8;$$('.overlay-row.drop-target').forEach(x=>x.classList.remove('drop-target'));document.elementFromPoint(lastX,lastY)?.closest('.overlay-row')?.classList.add('drop-target')}
      const finish=ev=>{window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',finish);window.removeEventListener('pointercancel',finish);el.classList.remove('dragging');$$('.overlay-row.drop-target').forEach(x=>x.classList.remove('drop-target'));if(moved){const target=document.elementFromPoint(lastX,lastY)?.closest('.overlay-row');pushHistory();const nextLane=target?(+target.dataset.lane||clip.lane):clip.lane;clip.lane=nextLane;commitTimelineDragNoRender(clip,original+(lastX-startX)/state.pxPerSec,el);if(target){target.querySelector('.timeline-overlay-row')?.appendChild(el);const small=el.querySelector('small');if(small)small.textContent=`V${nextLane} · ${fmtTime(overlayDuration(clip))}`}}}
      window.addEventListener('pointermove',move,{passive:false});window.addEventListener('pointerup',finish,{passive:false});window.addEventListener('pointercancel',finish,{passive:false})
    },{passive:false})
  })

  // On touch, dragging a V1 clip onto V2/V3 converts it into a simultaneous overlay.
  $$('.timeline-clip').forEach(el=>{el.addEventListener('pointerdown',e=>{
    if(!isMobileViewport()||e.target.closest('.timeline-transition'))return
    const clip=state.project?.clips.find(c=>c.id===el.dataset.id);if(!clip)return
    const sx=e.clientX,sy=e.clientY;let active=false,last={x:sx,y:sy},ghost=null
    const clean=()=>{window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',up);window.removeEventListener('pointercancel',up);ghost?.remove();$$('.overlay-row.drop-target').forEach(x=>x.classList.remove('drop-target'))}
    const move=ev=>{if(ev.pointerId!==e.pointerId)return;last={x:ev.clientX,y:ev.clientY};if(!active&&Math.hypot(ev.clientX-sx,ev.clientY-sy)>10){active=true;ghost=document.createElement('div');ghost.className='asset-drag-ghost video';ghost.innerHTML=`${svgIcon('video',17)}<span>${escapeHtml(getAsset(clip.assetId)?.name||'Video')}</span>`;document.body.append(ghost)}if(!active)return;ev.preventDefault();ghost.style.transform=`translate3d(${ev.clientX+10}px,${ev.clientY-24}px,0)`;$$('.overlay-row.drop-target').forEach(x=>x.classList.remove('drop-target'));document.elementFromPoint(ev.clientX,ev.clientY)?.closest('.overlay-row')?.classList.add('drop-target')}
    const up=ev=>{if(active){ev.preventDefault();const target=document.elementFromPoint(last.x,last.y)?.closest('.overlay-row');if(target){state.timelineScrollLeft=scroll.scrollLeft;const lane=+target.dataset.lane||2,track=target.querySelector('.timeline-overlay-row'),rect=track?.getBoundingClientRect(),at=rect?snapTime(Math.max(0,(last.x-rect.left)/state.pxPerSec)):state.currentTime;state.suppressTimelineClickUntil=performance.now()+420;mutate(p=>{const idx=p.clips.findIndex(c=>c.id===clip.id);if(idx>=0)p.clips.splice(idx,1);const converted={...clip,id:uid(),timelineStart:at,lane,fit:'contain',scale:Math.min(.55,clip.scale||.38),volume:0,transition:'none'};p.overlays.push(converted);state.selected={type:'overlay',id:converted.id}})}}clean()}
    window.addEventListener('pointermove',move,{passive:false});window.addEventListener('pointerup',up,{passive:false});window.addEventListener('pointercancel',up,{passive:false})
  },{passive:false})})

  $$('.timeline-clip').forEach(el=>{el.draggable=!isMobileViewport();el.addEventListener('dragstart',e=>{e.dataTransfer?.setData('text/edituno-clip',el.dataset.id);el.classList.add('dragging')});el.addEventListener('dragend',()=>el.classList.remove('dragging'));el.addEventListener('dragover',e=>e.preventDefault());el.addEventListener('drop',e=>{e.preventDefault();const source=e.dataTransfer?.getData('text/edituno-clip'),target=el.dataset.id;if(!source||!target||source===target)return;mutate(p=>{const from=p.clips.findIndex(c=>c.id===source),to=p.clips.findIndex(c=>c.id===target);if(from<0||to<0)return;const [clip]=p.clips.splice(from,1);p.clips.splice(to,0,clip);state.selected={type:'clip',id:clip.id}})})})

  bindAssetDragInteractions()
}

function bindAssetDragInteractions(){
  $$('.media-row[data-drag-asset]').forEach(row=>{
    row.addEventListener('pointerdown',e=>{
      if(e.target.closest('button,input,select,textarea'))return
      if(e.button!==undefined&&e.pointerType==='mouse'&&e.button!==0)return
      const id=row.dataset.dragAsset,type=row.dataset.dragType
      if(!id||!type)return
      const sx=e.clientX,sy=e.clientY;let active=false,ghost=null,last={x:sx,y:sy}
      const clear=()=>{
        window.removeEventListener('pointermove',move)
        window.removeEventListener('pointerup',up)
        window.removeEventListener('pointercancel',up)
        ghost?.remove()
        document.body.classList.remove('asset-dragging')
      }
      const begin=()=>{
        if(active)return
        active=true
        document.body.classList.add('asset-dragging')
        ghost=document.createElement('div');ghost.className=`asset-drag-ghost ${type}`;ghost.innerHTML=`${svgIcon(type==='audio'?'audio':'media',17)}<span>${escapeHtml(getAsset(id)?.name||type)}</span>`
        document.body.append(ghost)
      }
      const move=ev=>{
        if(ev.pointerId!==e.pointerId)return
        const dx=ev.clientX-sx,dy=ev.clientY-sy;last={x:ev.clientX,y:ev.clientY}
        if(!active&&Math.hypot(dx,dy)>8)begin()
        if(!active)return
        ev.preventDefault()
        ghost.style.transform=`translate3d(${ev.clientX+10}px,${ev.clientY-24}px,0)`
        $$('.track-row.drop-target').forEach(x=>x.classList.remove('drop-target'))
        const target=document.elementFromPoint(ev.clientX,ev.clientY)?.closest(type==='audio'?'.audio-row':'.video-row,.overlay-row')
        target?.classList.add('drop-target')
      }
      const up=ev=>{
        if(active){
          ev.preventDefault()
          const target=document.elementFromPoint(last.x,last.y)?.closest(type==='audio'?'.audio-row':'.video-row,.overlay-row')
          $$('.track-row.drop-target').forEach(x=>x.classList.remove('drop-target'))
          if(target){
            if(type==='audio'){
              const track=$('.timeline-audio-row'),rect=track?.getBoundingClientRect()
              const at=rect?snapTime(Math.max(0,(last.x-rect.left)/state.pxPerSec)):0
              state.sheet=null
              addAudioToTimeline(id,at)
            } else {
              state.sheet=null
              if(target.classList.contains('overlay-row')){const track=target.querySelector('.timeline-overlay-row'),rect=track?.getBoundingClientRect(),at=rect?snapTime(Math.max(0,(last.x-rect.left)/state.pxPerSec)):state.currentTime;addAssetToOverlay(id,at,+target.dataset.lane||2)}
              else addAssetToTimeline(id)
            }
          }
        }
        clear()
      }
      window.addEventListener('pointermove',move,{passive:false})
      window.addEventListener('pointerup',up,{passive:false})
      window.addEventListener('pointercancel',up,{passive:false})
    },{passive:false})
  })
}

function renderExportModal() {
  const old=$('.modal-backdrop.export-modal'); if(old)old.remove()
  const el=document.createElement('div');el.className='modal-backdrop export-modal';el.innerHTML=`<section class="modal"><div class="modal-head"><h2>${tr('exportTitle')}</h2><button class="sheet-close" data-action="export-close">×</button></div><div class="modal-body"><div class="panel-grid"><div class="panel-section"><div class="field-grid two"><label class="field"><span>${tr('quality')}</span><select id="export-quality"><option value="720" ${+state.preferences.defaultQuality===720?'selected':''}>720p</option><option value="1080" ${+state.preferences.defaultQuality===1080?'selected':''}>1080p</option><option value="2160" ${+state.preferences.defaultQuality===2160?'selected':''}>4K · 2160p</option></select></label><label class="field"><span>${tr('frameRate')}</span><select id="export-fps"><option ${+state.preferences.defaultFps===24?'selected':''}>24</option><option ${+state.preferences.defaultFps===30?'selected':''}>30</option><option ${+state.preferences.defaultFps===60?'selected':''}>60</option></select></label></div><p class="helper">${tr('browserLimit')} ${state.language==='el'?'Το 4K απαιτεί αρκετή μνήμη και η διαθεσιμότητα εξαρτάται από browser και συσκευή.':'4K needs substantial memory and availability depends on the browser and device.'}</p></div><div class="install-card"><strong>${tr('exportLocal')}</strong><p>${tr('free')}</p></div><div id="export-progress-wrap" class="hidden"><div class="export-progress"><span id="export-progress"></span></div><div class="export-status" id="export-status">${tr('ready')}</div></div><div id="export-result" class="hidden"></div><button class="primary-btn full" data-action="export-start">${tr('startExport')}</button></div></div></section>`;document.body.append(el)
}

function render() { document.documentElement.lang=state.language; safeSetLanguage(state.language); applyTheme(state.preferences.theme); if(state.view==='editor')renderEditor(); else if(state.view==='about')aboutPage(); else renderHome() }

function toast(message,type='') {
  let root=$('#toasts'); if(!root){root=document.createElement('div');root.id='toasts';root.className='toast-stack';document.body.append(root)}
  const el=document.createElement('div');el.className=`toast ${type}`;el.textContent=message;root.append(el);setTimeout(()=>el.remove(),2600)
}

async function decodeAudioAsset(assetId,audioContext){const url=state.urls[assetId];if(!url)return null;try{return await audioContext.decodeAudioData(await (await fetch(url)).arrayBuffer())}catch{return null}}
async function scheduleAudioTracks(project,audioContext,dest,zeroTime=audioContext.currentTime+.12){
  const decoded=[]
  for(const clip of project.audioClips||[]){const buffer=await decodeAudioAsset(clip.assetId,audioContext);if(buffer)decoded.push({clip,buffer})}
  const nodes=[]
  for(const {clip,buffer} of decoded){
    const source=audioContext.createBufferSource(),gain=audioContext.createGain(),duration=audioClipDuration(clip),start=zeroTime+(clip.timelineStart||0),vol=clip.muted?0:clamp(clip.volume??.8,0,1),fadeIn=Math.min(clip.fadeIn||0,duration/2),fadeOut=Math.min(clip.fadeOut||0,duration/2)
    source.buffer=buffer;source.playbackRate.value=clamp(clip.speed||1,.5,2);source.connect(gain).connect(dest)
    gain.gain.setValueAtTime(fadeIn>0?0:vol,start);if(fadeIn>0)gain.gain.linearRampToValueAtTime(vol,start+fadeIn);if(fadeOut>0){gain.gain.setValueAtTime(vol,start+duration-fadeOut);gain.gain.linearRampToValueAtTime(0,start+duration)}
    source.start(start,clip.sourceStart||0,Math.max(.05,(clip.sourceEnd||buffer.duration)-(clip.sourceStart||0)));nodes.push(source)
  }
  return nodes
}
function exportSleep(ms,signal){
  if(ms<=0)return Promise.resolve()
  return new Promise((resolve,reject)=>{
    const timer=setTimeout(resolve,ms)
    if(signal)signal.addEventListener('abort',()=>{clearTimeout(timer);reject(new DOMException('Aborted','AbortError'))},{once:true})
  })
}
function attachExportMedia(media){
  media.playsInline=true;media.preload='auto';media.setAttribute('playsinline','');media.setAttribute('aria-hidden','true')
  Object.assign(media.style,{position:'fixed',left:'0',top:'0',width:'2px',height:'2px',opacity:'0.001',pointerEvents:'none',zIndex:'-1'})
  document.body.append(media);return media
}
function cleanupExportMedia(media){
  if(!media)return
  try{media.pause()}catch{}
  try{media.removeAttribute('src');media.load()}catch{}
  try{media.remove()}catch{}
}
function waitExportSeek(media,signal,timeout=900){
  if(!media.seeking)return Promise.resolve()
  return new Promise((resolve,reject)=>{
    let settled=false
    const finish=()=>{if(settled)return;settled=true;clearTimeout(timer);media.removeEventListener('seeked',finish);signal?.removeEventListener('abort',abort);resolve()}
    const abort=()=>{if(settled)return;settled=true;clearTimeout(timer);media.removeEventListener('seeked',finish);reject(new DOMException('Aborted','AbortError'))}
    const timer=setTimeout(finish,timeout)
    media.addEventListener('seeked',finish,{once:true});signal?.addEventListener('abort',abort,{once:true})
  })
}
async function syncExportVideoFrame(video,target,signal,force=false){
  const maxTime=Math.max(0,(Number.isFinite(video.duration)?video.duration:target)-.025),safe=clamp(target,0,maxTime)
  if(force||video.readyState<2||Math.abs((video.currentTime||0)-safe)>.16){
    video.currentTime=safe
    await waitExportSeek(video,signal)
  }
}
function exportCanvasStream(canvas,fps){
  let stream=null,commit=()=>{}
  try{
    const manual=canvas.captureStream(0),track=manual.getVideoTracks()[0]
    if(track&&typeof track.requestFrame==='function'){
      stream=manual
      commit=()=>{try{track.requestFrame()}catch{}}
    }else{
      for(const t of manual.getTracks())try{t.stop()}catch{}
    }
  }catch{}
  if(!stream)stream=canvas.captureStream(fps)
  return {stream,commit}
}
async function validateExportBlob(blob,expectedAudio=false){
  if(!blob||blob.size<2048)throw new Error('empty-export')
  const url=URL.createObjectURL(blob),probe=document.createElement('video');probe.preload='metadata';probe.muted=true;probe.playsInline=true;probe.src=url
  try{
    await new Promise((resolve,reject)=>{
      const timer=setTimeout(()=>reject(new Error('export-probe-timeout')),6000)
      probe.onloadedmetadata=()=>{clearTimeout(timer);resolve()}
      probe.onerror=()=>{clearTimeout(timer);reject(new Error('export-probe-failed'))}
    })
    if(!probe.videoWidth||!probe.videoHeight)throw new Error('export-no-video-track')
    if(expectedAudio){
      const hasAudio=await exportedBlobHasAudioTrack(blob,probe)
      if(hasAudio===false)throw new Error('export-no-audio-track')
    }
  }finally{
    probe.removeAttribute('src');probe.load();URL.revokeObjectURL(url)
  }
}


function projectExpectsAudio(project=state.project){
  if(!project)return false
  for(const row of clipTimeline(project)){
    const clip=row.clip,asset=getAsset(clip.assetId,project)
    if(asset?.type==='video'&&asset.hasAudio!==false&&(clip.volume??1)>0)return true
  }
  for(const clip of project.overlays||[]){
    const asset=getAsset(clip.assetId,project)
    if(asset?.type==='video'&&asset.hasAudio!==false&&(clip.volume??0)>0)return true
  }
  for(const clip of project.audioClips||[]){
    if(!clip.muted&&(clip.volume??.8)>0)return true
  }
  return false
}
function isAppleMobileRuntime(){
  const ua=navigator.userAgent||''
  return /iPad|iPhone|iPod/i.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1)
}
async function prewarmExportAudioContext(){
  const Ctx=window.AudioContext||window.webkitAudioContext
  if(!Ctx)return null
  const ctx=new Ctx()
  try{
    if(ctx.state==='suspended')await ctx.resume()
    const source=ctx.createBufferSource(),buffer=ctx.createBuffer(1,1,ctx.sampleRate)
    source.buffer=buffer;source.connect(ctx.destination);source.start(0)
    return ctx
  }catch(error){
    try{await ctx.close()}catch{}
    console.warn('Export audio prewarm failed.',error)
    return null
  }
}
async function blobChunkContainsAscii(blob,text){
  const bytes=new TextEncoder().encode(text),windowSize=Math.min(blob.size,2*1024*1024)
  const ranges=[[0,windowSize]]
  if(blob.size>windowSize)ranges.push([Math.max(0,blob.size-windowSize),blob.size])
  for(const [start,end] of ranges){
    const data=new Uint8Array(await blob.slice(start,end).arrayBuffer())
    outer:for(let i=0;i<=data.length-bytes.length;i++){
      for(let j=0;j<bytes.length;j++)if(data[i+j]!==bytes[j])continue outer
      return true
    }
  }
  return false
}
async function exportedBlobHasAudioTrack(blob,probe){
  try{
    if(probe?.audioTracks&&typeof probe.audioTracks.length==='number')return probe.audioTracks.length>0
  }catch{}
  if((blob.type||'').includes('mp4'))return await blobChunkContainsAscii(blob,'soun')
  return null
}

function webCodecsExportAvailable(){
  return Boolean((window).VideoEncoder&&(window).AudioEncoder&&(window).VideoFrame&&(window).AudioData&&(window).Mp4Muxer?.Muxer&&(window).Mp4Muxer?.ArrayBufferTarget)
}
function exportBitrate(quality,fps){
  const f=Math.max(24,Number(fps)||30)
  if(Number(quality)>=2160)return f>=50?68_000_000:48_000_000
  if(Number(quality)>=1080)return f>=50?26_000_000:18_000_000
  return f>=50?12_000_000:8_000_000
}
async function chooseAvcEncoderConfig(width,height,fps,quality){
  const Encoder=(window).VideoEncoder
  const pixels=width*height,high=pixels>1920*1080||fps>30
  const codecs=pixels>=3840*2160?['avc1.640033','avc1.4d0033','avc1.420033']:high?['avc1.64002a','avc1.4d002a','avc1.42002a']:['avc1.640028','avc1.4d0028','avc1.420028']
  for(const codec of codecs){
    const rich={codec,width,height,framerate:fps,bitrate:exportBitrate(quality,fps),bitrateMode:'variable',latencyMode:'quality',hardwareAcceleration:'prefer-hardware',avc:{format:'avc'}}
    try{const support=await Encoder.isConfigSupported(rich);if(support.supported)return support.config}catch{}
    const basic={codec,width,height,framerate:fps,bitrate:exportBitrate(quality,fps),avc:{format:'avc'}}
    try{const support=await Encoder.isConfigSupported(basic);if(support.supported)return support.config}catch{}
  }
  return null
}
async function chooseAacEncoderConfig(sampleRate=48000,channels=2){
  const Encoder=(window).AudioEncoder
  const candidates=[192000,160000,128000]
  for(const bitrate of candidates){
    const config={codec:'mp4a.40.2',sampleRate,numberOfChannels:channels,bitrate}
    try{const support=await Encoder.isConfigSupported(config);if(support.supported)return support.config}catch{}
  }
  return null
}
function waitEncoderQueue(encoder,max=5){
  if((encoder.encodeQueueSize||0)<=max)return Promise.resolve()
  return new Promise(resolve=>{
    const old=encoder.ondequeue
    const done=()=>{if((encoder.encodeQueueSize||0)<=max){encoder.ondequeue=old||null;resolve()}else requestAnimationFrame(done)}
    encoder.ondequeue=()=>{try{if(typeof old==='function')old()}catch{};done()}
    done()
  })
}
function createDeterministicVideoElement(url){
  const video=document.createElement('video')
  video.preload='auto';video.muted=true;video.playsInline=true;video.setAttribute('playsinline','')
  Object.assign(video.style,{position:'fixed',left:'-8px',top:'-8px',width:'2px',height:'2px',opacity:'0.001',pointerEvents:'none',zIndex:'-1'})
  video.src=url;document.body.append(video);video.load();return video
}
function waitMediaEvent(media,name,signal,timeout=4000){
  return new Promise((resolve,reject)=>{
    let done=false
    const finish=()=>{if(done)return;done=true;clearTimeout(timer);media.removeEventListener(name,finish);signal?.removeEventListener('abort',abort);resolve()}
    const abort=()=>{if(done)return;done=true;clearTimeout(timer);media.removeEventListener(name,finish);reject(new DOMException('Aborted','AbortError'))}
    const timer=setTimeout(finish,timeout)
    media.addEventListener(name,finish,{once:true});signal?.addEventListener('abort',abort,{once:true})
  })
}
async function seekExportFrameExact(video,time,signal){
  if(signal?.aborted)throw new DOMException('Aborted','AbortError')
  if(video.readyState<1)await waitMediaEvent(video,'loadedmetadata',signal,5000)
  const maxTime=Math.max(0,(Number.isFinite(video.duration)?video.duration:time)-.015),target=clamp(time,0,maxTime)
  if(Math.abs((video.currentTime||0)-target)>.001||video.readyState<2){
    video.currentTime=target
    if(video.seeking)await waitMediaEvent(video,'seeked',signal,2500)
  }
  if(typeof video.requestVideoFrameCallback==='function'){
    await new Promise((resolve,reject)=>{
      let done=false
      const timer=setTimeout(()=>{if(!done){done=true;resolve()}},180)
      const abort=()=>{if(done)return;done=true;clearTimeout(timer);reject(new DOMException('Aborted','AbortError'))}
      signal?.addEventListener('abort',abort,{once:true})
      video.requestVideoFrameCallback(()=>{if(done)return;done=true;clearTimeout(timer);signal?.removeEventListener('abort',abort);resolve()})
    })
  }else{
    await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))
  }
}
function destroyDeterministicSources(map){
  for(const value of map.values())if(value?.tagName==='VIDEO')cleanupExportMedia(value)
  map.clear()
}
async function deterministicSourceFor(clip,asset,key,sources,signal){
  const url=state.urls[asset.id];if(!url)return null
  if(asset.type==='image'){
    if(!sources.has(key))sources.set(key,await loadImage(url))
    return sources.get(key)
  }
  let video=sources.get(key)
  if(!video){video=createDeterministicVideoElement(url);sources.set(key,video);await waitMediaEvent(video,'loadeddata',signal,5000)}
  return video
}
async function drawDeterministicPrimary(ctx,project,time,w,h,sources,signal){
  const row=activeAt(time,project);if(!row)return
  const asset=getAsset(row.clip.assetId,project);if(!asset)return
  const source=await deterministicSourceFor(row.clip,asset,`primary:${row.clip.id}`,sources,signal);if(!source)return
  const sourceAt=sourceTime(row,time),progress=(time-row.start)/Math.max(.001,row.duration)
  if(asset.type==='video')await seekExportFrameExact(source,sourceAt,signal)
  if(isGlTransition(row.clip.transition)){
    const d=Math.min(Number(row.clip.transitionDuration)||.35,row.duration/2),remaining=row.end-time
    const next=nextTimelineRow(row,project)
    if(d>0&&remaining>=0&&remaining<=d&&next){
      const incomingAsset=getAsset(next.clip.assetId,project)
      if(incomingAsset){
        const incoming=await deterministicSourceFor(next.clip,incomingAsset,`primary:${next.clip.id}`,sources,signal)
        const p=clamp(1-remaining/d,0,1)
        if(incomingAsset.type==='video'&&incoming)await seekExportFrameExact(incoming,(next.clip.start||0)+p*d*(next.clip.speed||1),signal)
        if(incoming){
          const fromCanvas=document.createElement('canvas'),toCanvas=document.createElement('canvas');fromCanvas.width=toCanvas.width=w;fromCanvas.height=toCanvas.height=h
          await drawVisualWithEffects(fromCanvas.getContext('2d'),source,asset,row.clip,w,h,progress,1)
          await drawVisualWithEffects(toCanvas.getContext('2d'),incoming,incomingAsset,next.clip,w,h,p,1)
          const result=await renderGlTransition(fromCanvas,toCanvas,row.clip.transition,p,w,h)
          if(result){ctx.drawImage(result,0,0,w,h);return}
          ctx.save();ctx.globalAlpha=1-p;ctx.drawImage(fromCanvas,0,0);ctx.globalAlpha=p;ctx.drawImage(toCanvas,0,0);ctx.restore();return
        }
      }
    }
  }
  await drawClipWithTransition(ctx,source,asset,row,time,w,h,progress)
}
async function drawDeterministicOverlays(ctx,project,time,w,h,sources,signal){
  for(const clip of activeOverlaysAt(time,project)){
    const asset=getAsset(clip.assetId,project);if(!asset)continue
    const source=await deterministicSourceFor(clip,asset,`overlay:${clip.id}`,sources,signal);if(!source)continue
    const local=Math.max(0,time-(clip.timelineStart||0)),progress=local/Math.max(.05,overlayDuration(clip))
    if(asset.type==='video')await seekExportFrameExact(source,(clip.start||0)+local*(clip.speed||1),signal)
    await drawVisualWithEffects(ctx,source,asset,clip,w,h,progress,1)
  }
}
async function decodeOfflineAudio(assetId,ctx,cache){
  if(cache.has(assetId))return cache.get(assetId)
  const promise=(async()=>{try{const blob=await getBlob(assetId);if(!blob)return null;return await ctx.decodeAudioData(await blob.arrayBuffer())}catch{return null}})()
  cache.set(assetId,promise);return promise
}
function connectOfflineSource(ctx,master,buffer,when,sourceStart,sourceEnd,speed,volume,fadeIn,fadeOut){
  if(!buffer||sourceEnd<=sourceStart||volume<=0)return false
  const source=ctx.createBufferSource(),gain=ctx.createGain(),rate=clamp(speed||1,.25,4),timelineDuration=(sourceEnd-sourceStart)/rate
  source.buffer=buffer;source.playbackRate.value=rate;source.connect(gain);gain.connect(master)
  const start=Math.max(0,when),vol=clamp(volume,0,2),fi=Math.min(Math.max(0,fadeIn||0),timelineDuration/2),fo=Math.min(Math.max(0,fadeOut||0),timelineDuration/2)
  gain.gain.setValueAtTime(fi>0?0:vol,start)
  if(fi>0)gain.gain.linearRampToValueAtTime(vol,start+fi)
  if(fo>0){gain.gain.setValueAtTime(vol,start+timelineDuration-fo);gain.gain.linearRampToValueAtTime(0,start+timelineDuration)}
  source.start(start,clamp(sourceStart,0,Math.max(0,buffer.duration-.001)),Math.max(.001,Math.min(sourceEnd,buffer.duration)-sourceStart))
  return true
}
async function renderOfflineProjectAudio(project,sampleRate=48000){
  const duration=Math.max(.05,projectDuration(project)),frames=Math.max(1,Math.ceil(duration*sampleRate)),Ctx=(window).OfflineAudioContext,expectedAudio=projectExpectsAudio(project)
  if(!Ctx)return {buffer:null,hasAudio:false,expectedAudio,decodeFailures:expectedAudio?1:0}
  const ctx=new Ctx(2,frames,sampleRate),master=ctx.createDynamicsCompressor(),cache=new Map();master.connect(ctx.destination)
  master.threshold.value=-2;master.knee.value=8;master.ratio.value=4;master.attack.value=.003;master.release.value=.15
  let hasAudio=false,decodeFailures=0
  for(const row of clipTimeline(project)){
    const clip=row.clip,asset=getAsset(clip.assetId,project);if(!asset||asset.type!=='video'||(clip.volume??1)<=0)continue
    const buffer=await decodeOfflineAudio(asset.id,ctx,cache);if(!buffer){if(asset.hasAudio!==false)decodeFailures++;continue}
    hasAudio=connectOfflineSource(ctx,master,buffer,row.start,clip.start||0,clip.end||buffer.duration,clip.speed||1,clip.volume??1,clip.audioFadeIn||0,clip.audioFadeOut||0)||hasAudio
  }
  for(const clip of project.overlays||[]){
    const asset=getAsset(clip.assetId,project);if(!asset||asset.type!=='video'||(clip.volume??0)<=0)continue
    const buffer=await decodeOfflineAudio(asset.id,ctx,cache);if(!buffer){if(asset.hasAudio!==false)decodeFailures++;continue}
    hasAudio=connectOfflineSource(ctx,master,buffer,clip.timelineStart||0,clip.start||0,clip.end||buffer.duration,clip.speed||1,clip.volume??0,0,0)||hasAudio
  }
  for(const clip of project.audioClips||[]){
    if(clip.muted||(clip.volume??.8)<=0)continue
    const buffer=await decodeOfflineAudio(clip.assetId,ctx,cache);if(!buffer){decodeFailures++;continue}
    hasAudio=connectOfflineSource(ctx,master,buffer,clip.timelineStart||0,clip.sourceStart||0,clip.sourceEnd||buffer.duration,clip.speed||1,clip.volume??.8,clip.fadeIn||0,clip.fadeOut||0)||hasAudio
  }
  return {buffer:hasAudio?await ctx.startRendering():null,hasAudio,expectedAudio,decodeFailures}
}
async function encodeOfflineAudio(buffer,encoder,onProgress,signal){
  if(!buffer)return 0
  const AudioDataCtor=(window).AudioData,channels=Math.min(2,buffer.numberOfChannels),block=1024,total=buffer.length
  let chunks=0
  for(let offset=0;offset<total;offset+=block){
    if(signal?.aborted)throw new DOMException('Aborted','AbortError')
    const frames=Math.min(block,total-offset),data=new Float32Array(frames*2)
    const left=buffer.getChannelData(0),right=buffer.getChannelData(channels>1?1:0)
    data.set(left.subarray(offset,offset+frames),0);data.set(right.subarray(offset,offset+frames),frames)
    const audioData=new AudioDataCtor({format:'f32-planar',sampleRate:buffer.sampleRate,numberOfFrames:frames,numberOfChannels:2,timestamp:Math.round(offset/buffer.sampleRate*1e6),data})
    encoder.encode(audioData);audioData.close();chunks++
    if((encoder.encodeQueueSize||0)>8)await waitEncoderQueue(encoder,4)
    if(chunks%24===0){onProgress?.(offset/total);await Promise.resolve()}
  }
  await encoder.flush();onProgress?.(1);return chunks
}
async function exportProjectWebCodecs(quality,fps,onProgress,signal){
  const project=state.project
  if(!project)throw new Error('empty')
  const [w,h]=exportDimensions(project.ratio,quality),duration=Math.max(.05,projectDuration(project)),MuxerLib=(window).Mp4Muxer
  const videoConfig=await chooseAvcEncoderConfig(w,h,fps,quality);if(!videoConfig)throw new Error('webcodecs-video')
  const audioMix=await renderOfflineProjectAudio(project,48000)
  if(audioMix.expectedAudio&&!audioMix.hasAudio)throw new Error('offline-audio-decode')
  const audioConfig=audioMix.hasAudio?await chooseAacEncoderConfig(48000,2):null
  if(audioMix.hasAudio&&!audioConfig)throw new Error('webcodecs-audio')
  const target=new MuxerLib.ArrayBufferTarget()
  const muxer=new MuxerLib.Muxer({target,video:{codec:'avc',width:w,height:h,frameRate:fps},audio:audioConfig?{codec:'aac',numberOfChannels:2,sampleRate:48000}:undefined,fastStart:'in-memory',firstTimestampBehavior:'strict'})
  let videoError=null,audioError=null,videoChunks=0,audioChunks=0
  const VideoEncoderCtor=(window).VideoEncoder,AudioEncoderCtor=(window).AudioEncoder,VideoFrameCtor=(window).VideoFrame
  const videoEncoder=new VideoEncoderCtor({output:(chunk,meta)=>{videoChunks++;muxer.addVideoChunk(chunk,meta)},error:error=>{videoError=error}})
  videoEncoder.configure(videoConfig)
  let audioEncoder=null
  if(audioConfig){audioEncoder=new AudioEncoderCtor({output:(chunk,meta)=>{audioChunks++;muxer.addAudioChunk(chunk,meta)},error:error=>{audioError=error}});audioEncoder.configure(audioConfig)}
  const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;const ctx=canvas.getContext('2d',{alpha:false,desynchronized:false}),sources=new Map()
  const frameDurationUs=Math.round(1e6/fps),frameCount=Math.max(1,Math.ceil(duration*fps))
  try{
    for(let index=0;index<frameCount;index++){
      if(signal?.aborted)throw new DOMException('Aborted','AbortError')
      if(videoError)throw videoError
      const time=Math.min(duration,index/fps)
      ctx.fillStyle=project.background||'#0b0d12';ctx.fillRect(0,0,w,h)
      await drawDeterministicPrimary(ctx,project,time,w,h,sources,signal)
      await drawDeterministicOverlays(ctx,project,time,w,h,sources,signal)
      drawElements(ctx,project,time,w,h);drawTexts(ctx,project,time,w,h)
      const actualDurationUs=Math.max(1,Math.min(frameDurationUs,Math.round((duration-time)*1e6))),frame=new VideoFrameCtor(canvas,{timestamp:index*frameDurationUs,duration:actualDurationUs})
      videoEncoder.encode(frame,{keyFrame:index===0||index%Math.max(1,Math.round(fps*2))===0});frame.close()
      if((videoEncoder.encodeQueueSize||0)>6)await waitEncoderQueue(videoEncoder,3)
      onProgress(Math.min(.78,(index+1)/frameCount*.78))
    }
    await videoEncoder.flush();if(videoError)throw videoError
    if(audioEncoder&&audioMix.buffer){await encodeOfflineAudio(audioMix.buffer,audioEncoder,p=>onProgress(.78+p*.18),signal);if(audioError)throw audioError}
    muxer.finalize();onProgress(.98)
    if(!target.buffer||target.buffer.byteLength<4096||videoChunks<1)throw new Error('webcodecs-empty')
    if(audioMix.hasAudio&&audioChunks<1)throw new Error('webcodecs-no-audio')
    const blob=new Blob([target.buffer],{type:'video/mp4'});await validateExportBlob(blob,audioMix.expectedAudio);onProgress(1)
    return {blob,extension:'mp4',mime:'video/mp4'}
  }finally{
    destroyDeterministicSources(sources)
    try{videoEncoder.close()}catch{}
    try{audioEncoder?.close()}catch{}
  }
}
async function exportProjectLocal(quality,fps,onProgress,signal,prewarmedAudioContext=null){
  if(webCodecsExportAvailable()){
    try{return await exportProjectWebCodecs(quality,fps,onProgress,signal)}
    catch(error){
      if(error?.name==='AbortError')throw error
      console.warn('Deterministic WebCodecs export unavailable; falling back to realtime export.',error)
      onProgress(0)
    }
  }
  return exportProjectRealtimeFallback(quality,fps,onProgress,signal,prewarmedAudioContext)
}

async function renderMediaClockSegment(video,clip,duration,fps,draw,signal){
  const sourceStart=clip.start||0,speed=Math.max(.05,clip.speed||1),interval=1000/Math.max(1,fps),started=performance.now()
  let nextFrameAt=started,lastMedia=video.currentTime||sourceStart,lastAdvance=started
  while(true){
    if(signal?.aborted)throw new DOMException('Aborted','AbortError')
    const now=performance.now(),current=video.currentTime||sourceStart
    if(Math.abs(current-lastMedia)>.0015){lastMedia=current;lastAdvance=now}
    const elapsed=clamp((current-sourceStart)/speed,0,duration)
    await draw(elapsed)
    if(elapsed>=duration-.002)return
    const wallElapsed=(now-started)/1000
    if(now-lastAdvance>450){
      const recoveryTarget=sourceStart+Math.min(duration,wallElapsed)*speed
      await syncExportVideoFrame(video,recoveryTarget,signal,true)
      lastMedia=video.currentTime||recoveryTarget;lastAdvance=performance.now()
      if(video.paused)await video.play()
    }
    nextFrameAt+=interval
    const wait=nextFrameAt-performance.now()
    if(wait>1)await exportSleep(wait,signal)
    else await new Promise(resolve=>requestAnimationFrame(()=>resolve()))
  }
}

async function exportProjectRealtimeFallback(quality,fps,onProgress,signal,prewarmedAudioContext=null) {
  const project=state.project
  if(!project||(project.clips?.length||0)+(project.overlays?.length||0)+(project.elements?.length||0)===0)throw new Error('empty')
  if(typeof HTMLCanvasElement.prototype.captureStream!=='function'||typeof MediaRecorder==='undefined')throw new Error('mediarecorder')

  const [w,h]=exportDimensions(project.ratio,quality),canvas=document.createElement('canvas');canvas.width=w;canvas.height=h
  const ctx=canvas.getContext('2d',{alpha:false,desynchronized:false})
  const capture=exportCanvasStream(canvas,fps),stream=capture.stream,commitFrame=capture.commit
  if(!stream.getVideoTracks().length)throw new Error('video-track')

  const AudioCtx=window.AudioContext||window.webkitAudioContext
  if(!AudioCtx)throw new Error('audio-context')
  const audioContext=prewarmedAudioContext&&prewarmedAudioContext.state!=='closed'?prewarmedAudioContext:new AudioCtx(),dest=audioContext.createMediaStreamDestination(),master=audioContext.createGain(),monitor=audioContext.createGain()
  master.gain.value=1;monitor.gain.value=.000001;master.connect(dest);master.connect(monitor);monitor.connect(audioContext.destination)
  const audioTrack=dest.stream.getAudioTracks()[0]
  if(audioTrack)stream.addTrack(audioTrack)

  const mime=pickMime()
  if(!mime)throw new Error('mediarecorder')
  const recorder=new MediaRecorder(stream,{mimeType:mime,videoBitsPerSecond:exportBitrate(quality,fps),audioBitsPerSecond:192_000})
  const chunks=[]
  recorder.ondataavailable=e=>e.data.size&&chunks.push(e.data)
  const done=new Promise((resolve,reject)=>{recorder.onerror=()=>reject(new Error('record'));recorder.onstop=()=>resolve(new Blob(chunks,{type:mime}))})

  await audioContext.resume()
  const exportZero=audioContext.currentTime+.16
  const audioNodes=await scheduleAudioTracks(project,audioContext,master,exportZero)
  let exportError=null,blob=null,global=0,total=projectDuration(project)

  recorder.start(250)
  ctx.fillStyle=project.background||'#0b0d12';ctx.fillRect(0,0,w,h);commitFrame()
  const leadMs=Math.max(0,(exportZero-audioContext.currentTime)*1000)
  if(leadMs)await exportSleep(leadMs,signal)

  try{
    for(const clip of project.clips){
      if(signal?.aborted)throw new DOMException('Aborted','AbortError')
      const asset=getAsset(clip.assetId,project),url=state.urls[clip.assetId]
      if(!asset||!url)continue
      const dur=clipDuration(clip)

      if(asset.type==='video'){
        const v=attachExportMedia(document.createElement('video'))
        let src=null,gain=null
        try{
          v.src=url;v.muted=false;v.volume=1;v.load();await waitLoaded(v)
          v.playbackRate=clamp(clip.speed||1,.25,4)
          await syncExportVideoFrame(v,clip.start||0,signal,true)

          src=audioContext.createMediaElementSource(v)
          gain=audioContext.createGain()
          src.connect(gain);gain.connect(master)

          const now=audioContext.currentTime,clipVol=clamp(clip.volume??1,0,1),fi=Math.min(clip.audioFadeIn||0,dur/2),fo=Math.min(clip.audioFadeOut||0,dur/2)
          gain.gain.cancelScheduledValues(now);gain.gain.setValueAtTime(fi?0:clipVol,now)
          if(fi)gain.gain.linearRampToValueAtTime(clipVol,now+fi)
          if(fo){gain.gain.setValueAtTime(clipVol,now+dur-fo);gain.gain.linearRampToValueAtTime(0,now+dur)}

          await v.play()

          await renderMediaClockSegment(v,clip,dur,fps,async elapsed=>{
            ctx.fillStyle=project.background||'#0b0d12';ctx.fillRect(0,0,w,h)
            const row={clip,start:global,end:global+dur,duration:dur}
            await drawClipWithTransition(ctx,v,asset,row,global+elapsed,w,h,elapsed/Math.max(.001,dur))
            await drawOverlays(ctx,project,global+elapsed,w,h)
            drawElements(ctx,project,global+elapsed,w,h)
            drawTexts(ctx,project,global+elapsed,w,h)
            commitFrame()
            onProgress(Math.min(1,(global+elapsed)/Math.max(.001,total)))
          },signal)
        }finally{
          try{v.pause()}catch{}
          try{src?.disconnect()}catch{}
          try{gain?.disconnect()}catch{}
          cleanupExportMedia(v)
        }
      }else if(asset.type==='image'){
        const img=await loadImage(url)
        await renderSegment(dur,fps,async elapsed=>{
          ctx.fillStyle=project.background||'#0b0d12';ctx.fillRect(0,0,w,h)
          const row={clip,start:global,end:global+dur,duration:dur}
          await drawClipWithTransition(ctx,img,asset,row,global+elapsed,w,h,elapsed/Math.max(.001,dur))
          await drawOverlays(ctx,project,global+elapsed,w,h)
          drawElements(ctx,project,global+elapsed,w,h)
          drawTexts(ctx,project,global+elapsed,w,h)
          commitFrame()
          onProgress(Math.min(1,(global+elapsed)/Math.max(.001,total)))
        },signal)
      }
      global+=dur
    }

    if(global<total){
      const rest=total-global
      await renderSegment(rest,fps,async elapsed=>{
        ctx.fillStyle=project.background||'#0b0d12';ctx.fillRect(0,0,w,h)
        await drawOverlays(ctx,project,global+elapsed,w,h)
        drawElements(ctx,project,global+elapsed,w,h)
        drawTexts(ctx,project,global+elapsed,w,h)
        commitFrame()
        onProgress(Math.min(1,(global+elapsed)/Math.max(.001,total)))
      },signal)
    }
  }catch(error){
    exportError=error
  }

  for(const node of audioNodes||[])try{node.stop()}catch{}
  if(recorder.state!=='inactive')recorder.stop()

  try{
    blob=await done
  }finally{
    try{master.disconnect()}catch{}
    try{monitor.disconnect()}catch{}
    for(const track of stream.getTracks())try{track.stop()}catch{}
    await audioContext.close().catch(()=>{})
  }

  if(exportError)throw exportError
  await validateExportBlob(blob,projectExpectsAudio(project))
  onProgress(1)
  return {blob,extension:mime.includes('mp4')?'mp4':'webm',mime}
}
function pickMime(){const list=['video/mp4;codecs=avc1.42E01E,mp4a.40.2','video/mp4','video/webm;codecs=vp9,opus','video/webm;codecs=vp8,opus','video/webm'];return list.find(x=>MediaRecorder.isTypeSupported(x))||''}
function waitLoaded(media){if(media.readyState>=2)return Promise.resolve();return new Promise((resolve,reject)=>{media.onloadeddata=resolve;media.onerror=reject})}
function waitSeek(media){if(!media.seeking)return Promise.resolve();return new Promise(resolve=>media.addEventListener('seeked',resolve,{once:true}))}
async function renderSegment(duration,fps,draw,signal){
  const start=performance.now(),interval=1000/Math.max(1,fps)
  let slot=0
  while(true){
    if(signal?.aborted)throw new DOMException('Aborted','AbortError')
    const elapsed=Math.min(duration,(performance.now()-start)/1000)
    await draw(elapsed)
    if(elapsed>=duration)return
    slot=Math.max(slot+1,Math.floor((performance.now()-start)/interval)+1)
    const wait=start+slot*interval-performance.now()
    if(wait>1)await exportSleep(wait,signal)
    else await new Promise(resolve=>requestAnimationFrame(()=>resolve()))
  }
}
function getAsset(id,project=state.project){return project?.assets?.find(a=>a.id===id)}

async function beginExport() {
  if(!state.project||((state.project.clips?.length||0)+(state.project.overlays?.length||0)+(state.project.elements?.length||0)===0)){toast(tr('emptyTimeline'),'error');return}
  const q=+$('#export-quality').value,fps=+$('#export-fps').value,wrap=$('#export-progress-wrap'),bar=$('#export-progress'),status=$('#export-status'),btn=$('[data-action="export-start"]')
  wrap.classList.remove('hidden');btn.disabled=true;btn.textContent=tr('exporting');state.exportController=new AbortController()
  const prewarmedAudioContext=projectExpectsAudio(state.project)?await prewarmExportAudioContext():null
  try{
    const result=await exportProjectLocal(q,fps,p=>{bar.style.width=`${Math.round(p*100)}%`;status.textContent=`${tr('exporting')} ${Math.round(p*100)}%`},state.exportController.signal,prewarmedAudioContext)
    state.exportResult=result;if(state.exportUrl)URL.revokeObjectURL(state.exportUrl);state.exportUrl=URL.createObjectURL(result.blob);status.textContent=tr('exportDone');toast(tr('exportDone'),'success')
    const resultBox=$('#export-result');resultBox.classList.remove('hidden');resultBox.innerHTML=`<div class="action-row"><button class="sheet-action" data-action="download-export"><i>${svgIcon('export',19)}</i>${tr('download')}</button><button class="sheet-action" data-action="share-export"><i>${svgIcon('share',19)}</i>${tr('share')}</button><button class="sheet-action" data-action="export-close"><i>${svgIcon('check',19)}</i>${tr('close')}</button></div>`
  }catch(e){
    const missingAudio=e?.message==='export-no-audio-track'||e?.message==='offline-audio-decode'
    status.textContent=missingAudio?(state.language==='el'?'Αποτυχία ήχου στο export':'Export audio failed'):tr('exportFailed')
    toast(missingAudio?(state.language==='el'?'Το export σταμάτησε γιατί δεν δημιουργήθηκε έγκυρο audio track.':'Export stopped because a valid audio track was not created.'):tr('exportFailed'),'error')
    console.error(e)
  }finally{
    if(prewarmedAudioContext&&prewarmedAudioContext.state!=='closed')await prewarmedAudioContext.close().catch(()=>{})
    btn.disabled=false;btn.textContent=tr('startExport')
  }
}
function exportFilename(){const name=(state.project?.name||'Edituno').replace(/[^a-z0-9\-_ ]/gi,'').trim().replace(/\s+/g,'-')||'Edituno';return `${name}.${state.exportResult?.extension||'webm'}`}
function downloadExport(){if(!state.exportUrl)return;const a=document.createElement('a');a.href=state.exportUrl;a.download=exportFilename();document.body.append(a);a.click();a.remove()}
async function shareExport(){if(!state.exportResult)return;const file=new File([state.exportResult.blob],exportFilename(),{type:state.exportResult.mime});if(navigator.canShare?.({files:[file]})){await navigator.share({files:[file],title:state.project?.name||'Edituno'}).catch(()=>{})}else downloadExport()}

function bindGlobalEvents() {
  for (const name of ['gesturestart','gesturechange','gestureend']) document.addEventListener(name,e=>e.preventDefault(),{passive:false})
  document.addEventListener('dblclick',e=>e.preventDefault(),{passive:false})
  document.addEventListener('click',async e=>{
    const el=e.target.closest('[data-action]');if(!el)return;const a=el.dataset.action
    if((a==='settings-close'||a==='install-close'||a==='mobile-hub-close') && e.target!==el && (el.classList.contains('modal-backdrop')||el.classList.contains('project-hub-backdrop'))) return
    if((a==='project-menu-close'||a==='rename-close'||a==='confirm-cancel') && el.classList.contains('app-modal-backdrop') && e.target!==el) return
    if(a==='home-menu-toggle'){state.homeMenuOpen=!state.homeMenuOpen;renderHome();return}
    if(a==='home-menu-close'){state.homeMenuOpen=false;renderHome();return}
    if(a==='create'){state.mediaImportContext=null;return createProject(el.dataset.ratio||'16:9')}
    if(a==='create-import'){state.homeMenuOpen=false;openMediaPicker('home');return}
    if(a==='open-project'){state.mediaImportContext=null;state.projectHubOpen=false;state.homeMenuOpen=false;state.projectMenuId=null;return openProject(el.dataset.id)}
    if(a==='project-menu'){e.stopPropagation();state.projectMenuId=el.dataset.id;state.renameProjectId=null;renderHome();return}
    if(a==='project-menu-close'){state.projectMenuId=null;renderHome();return}
    if(a==='project-menu-open'){const id=el.dataset.id;state.projectMenuId=null;return openProject(id)}
    if(a==='project-menu-rename'){state.renameProjectId=el.dataset.id;state.projectMenuId=null;renderHome();requestAnimationFrame(()=>$('#project-rename-input')?.focus());return}
    if(a==='project-menu-duplicate'){const id=el.dataset.id;state.projectMenuId=null;await duplicateProjectFull(id);state.projects=await listProjects();renderHome();toast(tr('duplicatedProject'),'success');return}
    if(a==='project-menu-delete'){state.confirmDialog={type:'delete-project',id:el.dataset.id};state.projectMenuId=null;renderHome();return}
    if(a==='rename-close'){state.renameProjectId=null;renderHome();return}
    if(a==='rename-save'){const id=el.dataset.id,name=$('#project-rename-input')?.value;await renameProjectFull(id,name);state.renameProjectId=null;state.projects=await listProjects();renderHome();return}
    if(a==='confirm-cancel'){state.confirmDialog=null;render();return}
    if(a==='confirm-accept'){
      const c=state.confirmDialog
      state.confirmDialog=null
      if(c?.type==='delete-project'){await deleteProjectFull(c.id);state.projects=await listProjects();renderHome();toast(tr('deleted'));return}
      if(c?.type==='clear-all'){for(const p of await listProjects())await deleteProjectFull(p.id);state.projects=[];state.settingsOpen=false;render();return}
      return
    }
    if(a==='language'){state.language=state.language==='el'?'en':'el';state.homeMenuOpen=false;render();return}
    if(a==='set-lang'){state.language=el.dataset.value;state.homeMenuOpen=false;render();return}
    if(a==='set-theme'){state.preferences.theme=normalizeTheme(el.dataset.value);applyTheme(state.preferences.theme);savePreferences();render();return}
    if(a==='pref-toggle'){const key=el.dataset.key;state.preferences[key]=!state.preferences[key];if(key==='autoSave'){clearTimeout(saveTimer);if(state.preferences.autoSave&&state.project)queueSave()}if(key==='showWaveforms')renderEditor();savePreferences();render();return}
    if(a==='settings'){state.homeMenuOpen=false;state.settingsOpen=true;render();return}
    if(a==='settings-close'){state.settingsOpen=false;render();return}
    if(a==='about'){state.homeMenuOpen=false;state.settingsOpen=false;if(state.view==='editor'){stopPlayback();if(state.project)await saveProject(state.project)}state.view='about';state.installOpen=false;render();return}
    if(a==='about-home'){state.projects=await listProjects();state.view='home';state.installOpen=false;render();return}
    if(a==='install'){state.homeMenuOpen=false;if(isAppInstalled()){toast(state.language==='el'?'Το Edituno είναι ήδη εγκατεστημένο σε αυτή τη συσκευή':'Edituno is already installed on this device','success');return}state.installOpen=true;render();return}
    if(a==='install-close'){state.installOpen=false;render();return}
    if(a==='install-confirm'&&state.installPrompt){await state.installPrompt.prompt();const choice=await state.installPrompt.userChoice;if(choice?.outcome==='accepted')markAppInstalled();state.installPrompt=null;state.installOpen=false;render();return}
    if(a==='persist-storage'){const ok=await navigator.storage?.persist?.();toast(ok?'✓ '+tr('persistent'):tr('storage'));return}
    if(a==='clear-all'){state.confirmDialog={type:'clear-all'};render();return}
    if(a==='home-top'){window.scrollTo({top:0,behavior:'smooth'});return}
    if(a==='projects-scroll'){$('#projects-section')?.scrollIntoView({behavior:'smooth'});return}
    if(a==='back')return goHome()
    if(a==='mobile-hub'){state.projectHubOpen=true;renderEditor();return}
    if(a==='mobile-hub-close'){state.projectHubOpen=false;renderEditor();return}
    if(a==='pick-media'){openMediaPicker('editor');return}
    if(a==='add-asset')return addAssetToTimeline(el.dataset.id)
    if(a==='add-overlay')return addAssetToOverlay(el.dataset.id,state.currentTime)
    if(a==='add-audio'||a==='set-soundtrack')return addAudioToTimeline(el.dataset.id)
    if(['select-audio','select-clip','select-overlay','select-element'].includes(a) && performance.now()<(state.suppressTimelineClickUntil||0))return
    if(a==='select-audio')return selectAudio(el.dataset.id)
    if(a==='select-clip')return selectClip(el.dataset.id)
    if(a==='select-overlay')return selectOverlay(el.dataset.id)
    if(a==='select-element')return selectElement(el.dataset.id)
    if(a==='add-element')return addElement(el.dataset.value)
    if(a==='select-text')return selectText(el.dataset.id)
    if(a==='tool'){state.tool=el.dataset.tool;state.sheet=isMobileViewport()?el.dataset.tool:null;if(state.tool==='elements')state.sheetSnap='half';renderEditor();if(state.tool==='elements')ensureFluentCatalog();if(!isMobileViewport()&&INSPECTOR_ONLY_TOOLS.has(state.tool))requestAnimationFrame(()=>focusInspectorSection(state.tool));return}
    if(a==='inspector-focus'){focusInspectorSection(el.dataset.target);return}
    if(a==='select-transition'){state.selected={type:'clip',id:el.dataset.id};state.tool='transitions';state.sheet='transitions';renderEditor();return}
    if(a==='timeline-zoom'){state.pxPerSec=clamp(state.pxPerSec+(+el.dataset.value)*12,24,120);state.preferences.timelineScale=state.pxPerSec;savePreferences();renderEditor();return}
    if(a==='adjust-select'){state.adjustKey=el.dataset.key;state.tool='adjust';state.sheet='adjust';renderEditor();return}
    if(a==='reset-adjustment'){const c=selectedVisual();if(!c)return;const defaults={brightness:100,exposure:0,contrast:100,saturation:100,temperature:0,vignette:0,grain:0,hue:0,blur:0,grayscale:0,sepia:0,invert:0,fadeAmount:0,shadows:0,opacity:1};mutate(p=>{const list=state.selected?.type==='overlay'?p.overlays:p.clips;list.find(x=>x.id===c.id)[el.dataset.key]=defaults[el.dataset.key]??0});return}
    if(a==='sheet-close'){state.sheet=null;state.sheetSnap='half';renderEditor();return}
    if(a==='play-toggle'){state.playing?stopPlayback():startPlayback();return}
    if(a==='jump-start'){seekTo(0);return}
    if(a==='undo')return undo()
    if(a==='redo')return redo()
    if(a==='split')return splitAtPlayhead()
    if(a==='duplicate')return duplicateSelected()
    if(a==='delete-selected')return deleteSelected()
    if(a==='move')return moveSelected(+el.dataset.value)
    if(a==='filter')return applyFilter(el.dataset.value)
    if(a==='clip-set'){const c=selectedVisual();if(!c)return;mutate(p=>{const list=state.selected?.type==='overlay'?p.overlays:p.clips;list.find(x=>x.id===c.id)[el.dataset.key]=el.dataset.value});return}
    if(a==='clip-toggle'){const c=selectedVisual();if(!c)return;mutate(p=>{const list=state.selected?.type==='overlay'?p.overlays:p.clips;const x=list.find(y=>y.id===c.id);x[el.dataset.key]=!x[el.dataset.key]});return}
    if(a==='add-text')return addText(el.dataset.kind)
    if(a==='open-srt'){$('#subtitle-picker')?.click();return}
    if(a==='toggle-loop')return mutate(p=>p.soundtrack.loop=!p.soundtrack.loop)
        if(a==='audio-fit-video'){const c=selectedAudio(),asset=getAsset(c?.assetId);if(!c||!asset)return;mutate(p=>{const x=p.audioClips.find(y=>y.id===c.id);x.timelineStart=0;x.sourceStart=0;x.sourceEnd=Math.min(asset.duration||x.sourceEnd,Math.max(.05,visualDuration()*(x.speed||1)))});syncAudioTracks(true);return}
    if(a==='audio-to-playhead'){const c=selectedAudio();if(!c)return;mutate(p=>{p.audioClips.find(y=>y.id===c.id).timelineStart=snapTime(state.currentTime)});syncAudioTracks(true);return}
    if(a==='audio-align-clip'){const c=selectedAudio(),v=selectedClip()||activeAt(state.currentTime)?.clip;if(!c||!v)return;const row=clipTimeline().find(r=>r.clip.id===v.id);if(!row)return;mutate(p=>{p.audioClips.find(y=>y.id===c.id).timelineStart=row.start});syncAudioTracks(true);return}
    if(a==='audio-toggle-mute'){const c=selectedAudio();if(!c)return;mutate(p=>{const x=p.audioClips.find(y=>y.id===c.id);x.muted=!x.muted});syncAudioTracks(true);return}
    if(a==='smart-reframe')return autoReframeSelected()
    if(a==='smart-reframe-reset')return resetSmartReframe()
    if(a==='smart-audio-analyze')return analyzeSelectedAudio()
    if(a==='smart-audio-guides')return toggleSmartAudioGuides()
    if(a==='smart-cut-beats')return cutVideoToSelectedAudioBeats()
    if(a==='smart-audio-clear')return clearSmartAudioAnalysis()
    if(a==='remove-soundtrack'){const c=selectedAudio();if(c){deleteSelected();syncAudioTracks(true)}return}
    if(a==='fluent-style'){state.fluentStyle=el.dataset.value==='3d'?'3d':'color';state.fluentVisible=60;renderEditor();return}
    if(a==='fluent-more'){state.fluentVisible=(state.fluentVisible||60)+60;renderEditor();return}
    if(a==='fluent-retry'){state.fluentCatalog=[];state.fluentError='';ensureFluentCatalog();return}
    if(a==='add-fluent'){return addFluentElement(el.dataset.name,el.dataset.path)}
    if(a==='ratio')return mutate(p=>p.ratio=el.dataset.value)
    if(a==='export'){renderExportModal();return}
    if(a==='export-close'){state.exportController?.abort();$('.export-modal')?.remove();return}
    if(a==='export-start')return beginExport()
    if(a==='download-export')return downloadExport()
    if(a==='share-export')return shareExport()
  })

  document.addEventListener('input',e=>{
    const el=e.target
    if(el.matches?.('[data-fluent-search]')){state.fluentQuery=el.value;state.fluentVisible=60;const grid=el.closest('.fluent-section')?.querySelector('.fluent-grid');if(grid){const style=state.fluentStyle||'color';grid.innerHTML=fluentMatches().map(entry=>{const path=fluentStylePath(entry,style);return `<button class="fluent-card" data-action="add-fluent" data-name="${escapeHtml(entry.name)}" data-path="${escapeHtml(path)}" title="${escapeHtml(entry.name)}"><span><img loading="lazy" decoding="async" src="${escapeHtml(fluentRawUrl(path))}" alt=""></span><small>${escapeHtml(entry.name)}</small></button>`}).join('')}return}
    if(el.id==='seekbar'){seekTo(+el.value);return}
    if(el.id==='project-name'&&state.project){state.project.name=el.value;queueSave();return}
    const clipKey=el.dataset.bindClip,textKey=el.dataset.bindText,audioKey=el.dataset.bindAudio,elementKey=el.dataset.bindElement,projectKey=el.dataset.bindProject,prefKey=el.dataset.pref
    if(prefKey){let val=(el.type==='range'||el.type==='number'||el.tagName==='SELECT'&&/^\d/.test(el.value))?+el.value:el.value;state.preferences[prefKey]=val;if(prefKey==='timelineScale')state.pxPerSec=+val;savePreferences();if(state.view==='editor'){fitPreviewFrame();if(prefKey==='timelineScale'||prefKey==='showWaveforms')renderEditor()}return}
    if(clipKey){const c=selectedVisual();if(!c)return;const val=el.type==='range'||el.type==='number'?+el.value:el.value;const list=state.selected?.type==='overlay'?state.project.overlays:state.project.clips;const obj=list.find(x=>x.id===c.id);obj[clipKey]=val;if(clipKey==='start')obj.start=Math.min(obj.start,obj.end-.05);if(clipKey==='end')obj.end=Math.max(obj.end,obj.start+.05);queueSave();drawPreview();updateRangeLabel(el);return}
    if(textKey){const t=selectedText();if(!t)return;let val=(el.type==='range'||el.type==='number')?+el.value:el.value;if(textKey==='weight')val=+val;const obj=state.project.texts.find(x=>x.id===t.id);obj[textKey]=val;if(textKey==='start')obj.start=Math.max(0,Math.min(obj.start,obj.end-.05));if(textKey==='end')obj.end=Math.max(obj.end,obj.start+.05);queueSave();drawPreview();updateRangeLabel(el);return}
    if(audioKey){const c=selectedAudio();if(!c)return;let val=(el.type==='range'||el.type==='number'||el.tagName==='SELECT')?+el.value:el.value;const obj=state.project.audioClips.find(x=>x.id===c.id);obj[audioKey]=val;if(audioKey==='sourceStart')obj.sourceStart=Math.max(0,Math.min(obj.sourceStart,obj.sourceEnd-.05));if(audioKey==='sourceEnd')obj.sourceEnd=Math.max(obj.sourceStart+.05,obj.sourceEnd);if(audioKey==='timelineStart')obj.timelineStart=snapTime(obj.timelineStart);queueSave();syncAudioTracks(true);updateRangeLabel(el);return}
    if(elementKey){const c=selectedElement();if(!c)return;const val=el.type==='range'||el.type==='number'?+el.value:el.value;c[elementKey]=val;queueSave();drawPreview();updateRangeLabel(el);return}
    if(projectKey&&state.project){state.project[projectKey]=el.value;queueSave();drawPreview();return}
  })
  document.addEventListener('change',e=>{
    const el=e.target
    if(el.matches('[data-bind-clip],[data-bind-text],[data-bind-audio],[data-bind-element],[data-bind-project]')&&state.view==='editor')setTimeout(()=>renderEditor(),0);if(el.matches('[data-pref]')){savePreferences();if(state.view==='editor')setTimeout(()=>renderEditor(),0)}
  })
  $('#media-picker').addEventListener('change',async e=>{
    const files=[...e.target.files], context=state.mediaImportContext
    e.target.value=''; state.mediaImportContext=null
    if(!files.length)return
    if(context==='home'||state.view==='home'){
      await createProject(isMobileViewport()?'9:16':'16:9')
      await importFiles(files,true)
      return
    }
    await importFiles(files,true)
  })
  $('#subtitle-picker').addEventListener('change',async e=>{const file=e.target.files?.[0];e.target.value='';if(file)await importSrt(file)})

  window.addEventListener('resize',()=>{ scheduleMobileViewportSync(); if(state.view==='editor')requestAnimationFrame(fitPreviewFrame) })
  window.visualViewport?.addEventListener('resize',()=>{ scheduleMobileViewportSync(); if(state.view==='editor')requestAnimationFrame(fitPreviewFrame) })
  window.visualViewport?.addEventListener('scroll',()=>{ if(mobileViewport.keyboardOpen||mobileViewport.settling) scheduleMobileViewportSync() })
  window.addEventListener('orientationchange',()=>{
    mobileViewport.lastStableHeight=0; mobileViewport.lastStableWidth=0
    setTimeout(()=>{ resetWindowScrollPosition(); scheduleMobileViewportSync(true) },180)
    setTimeout(()=>{ resetWindowScrollPosition(); scheduleMobileViewportSync(true); if(state.view==='editor')fitPreviewFrame() },420)
  })
  document.addEventListener('focusin',e=>{
    if(isEditableElement(e.target)) {
      document.body.classList.add('keyboard-transition')
      setTimeout(()=>scheduleMobileViewportSync(),20)
    }
  },true)
  document.addEventListener('focusout',e=>{
    if(isEditableElement(e.target)) {
      document.body.classList.remove('keyboard-transition')
      normalizeViewportAfterKeyboard()
    }
  },true)
  window.addEventListener('pageshow',()=>normalizeViewportAfterKeyboard())
  window.addEventListener('beforeinstallprompt',e=>{if(isAppInstalled())return;e.preventDefault();state.installPrompt=e;if(state.installOpen)render()})
  window.addEventListener('appinstalled',()=>{markAppInstalled();state.installPrompt=null;state.installOpen=false;render();toast(state.language==='el'?'Το Edituno εγκαταστάθηκε':'Edituno installed','success')})
  window.addEventListener('keydown',e=>{
    if(e.key==='Enter'&&document.activeElement?.id==='project-rename-input'){
      e.preventDefault()
      document.querySelector('[data-action="rename-save"]')?.click()
      return
    }
    if(e.key==='Escape'&&state.renameProjectId){state.renameProjectId=null;renderHome();return}
    if(e.key==='Escape'&&state.projectMenuId){state.projectMenuId=null;renderHome();return}
    if(state.view!=='editor'||['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName))return
    if(e.code==='Space'){e.preventDefault();state.playing?stopPlayback():startPlayback()}
    if(e.key.toLowerCase()==='s')splitAtPlayhead()
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='z'){e.preventDefault();e.shiftKey?redo():undo()}
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='y'){e.preventDefault();redo()}
    if(e.key==='Delete'||e.key==='Backspace')deleteSelected()
  })
}
function updateRangeLabel(el){const b=el.closest('.field')?.querySelector('b');if(b)b.textContent=Number(el.value).toFixed(+el.step<1?2:0)}

async function init() {
  const bootStarted=performance.now()
  syncMobileViewport(true)
  applyTheme(state.preferences.theme)
  setupSystemThemeWatcher()
  try {
    if(isStandaloneMode())markAppInstalled()
    bindGlobalEvents()
    const launch=new URLSearchParams(location.search)
    try { state.projects=await listProjects() } catch(storageError){ console.warn('Edituno local storage unavailable:',storageError);state.projects=[] }

    if(launch.get('new')==='1') {
      state.project=defaultProject(isMobileViewport()?'9:16':'16:9');state.view='editor';saveProject(state.project).catch(()=>{})
    } else {
      // Home is always the entry point on every device. The user explicitly chooses
      // a project or creates a new one before entering the editor.
      state.view='home'
      state.project=null
      state.selected=null
      state.sheet=null
    }

    const remaining=Math.max(0,620-(performance.now()-bootStarted))
    if(remaining) await new Promise(resolve=>setTimeout(resolve,remaining))
    render()

    // Prime the complete Microsoft Fluent Emoji catalog in the background so
    // Elements feels instant the first time it is opened. One catalog request
    // is cached locally; artwork itself stays lazy-loaded to keep the PWA small.
    if(!state.fluentCatalog.length) setTimeout(()=>ensureFluentCatalog(),900)

    if('serviceWorker' in navigator && location.protocol.startsWith('http')) {
      const register=()=>navigator.serviceWorker.register('./sw.js?v=2.6.1',{updateViaCache:'none'}).then(reg=>reg.update().catch(()=>{})).catch(error=>console.warn('Service worker registration failed:',error))
      if(document.readyState==='complete')register();else window.addEventListener('load',register,{once:true})
    }
  } catch(error) {
    console.error('Edituno initialization failed:',error)
    const app=$('#app');if(app)app.innerHTML=`<main class="startup-error"><div><img src="${EDITUNO_ICON}" alt="Edituno" style="width:72px;height:72px;border-radius:18px"><strong>Edituno</strong><p>${state.language==='el'?'Η εφαρμογή δεν μπόρεσε να ξεκινήσει. Πάτησε επαναφόρτωση.':'The app could not start. Reload to retry.'}</p><button onclick="location.reload()" class="primary-btn">${state.language==='el'?'Επαναφόρτωση':'Reload'}</button></div></main>`
  }
}

init()
