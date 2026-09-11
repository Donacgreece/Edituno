// @ts-nocheck
/* Edituno v1.6.0 Launch RC production source. TypeScript is the canonical source; dist is prebuilt for GitHub Pages. */
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


function loadPreferences() {
  const defaults={snap:true,defaultQuality:1080,defaultFps:30,previewQuality:'balanced',timelineScale:48,showWaveforms:true}
  try { return {...defaults,...JSON.parse(localStorage.getItem('edituno-preferences')||'{}')} } catch { return defaults }
}
function savePreferences() {
  try { localStorage.setItem('edituno-preferences',JSON.stringify(state.preferences)) } catch {}
}
function preferenceLabel(key) {
  const el=state.language==='el'
  const labels={snap:el?'Μαγνήτιση στο timeline':'Timeline snapping',showWaveforms:el?'Waveforms ήχου':'Audio waveforms',previewQuality:el?'Ποιότητα preview':'Preview quality',defaultQuality:el?'Προεπιλεγμένη εξαγωγή':'Default export',defaultFps:el?'Προεπιλεγμένα FPS':'Default FPS',timelineScale:el?'Μέγεθος timeline':'Timeline scale'}
  return labels[key]||key
}

const STRINGS = {
  en: {
    create:'Create project', import:'Import media', recent:'Recent projects', noProjects:'No projects yet', home:'Home',
    homeLead:'Create. Cut. Share.', homeBody:'A private studio that feels native on every screen. No upload. No watermark.',
    free:'Free. No watermark. No account.', newProject:'New project', templates:'Start with a format', projects:'Projects', settings:'Settings',
    private:'Local by default', privateSub:'Your media stays on this device.', offline:'Works offline', offlineSub:'Install once and keep editing.', noAccount:'No account', noAccountSub:'Open Edituno and start.',
    open:'Open', delete:'Delete', edit:'Edit', export:'Export', media:'Media', text:'Text', audio:'Audio', effects:'Effects', canvas:'Canvas',
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
    autoSave:'Autosaved', add:'Add', noAudio:'Import an audio file to use music.', noMedia:'No imported media yet.',
    selectedText:'Selected text', textStyle:'Text style', position:'Position', apply:'Apply', installHint:'Install Edituno',
    desktopMedia:'Project media', inspector:'Properties', adjust:'Adjust', transitions:'Transitions', projectHub:'Projects', quickEdit:'Edit', dissolve:'Dissolve', slideLeft:'Slide left', slideRight:'Slide right', blurTransition:'Blur', kenBurns:'Ken Burns', pulse:'Pulse', float:'Float', reset:'Reset', timelineZoom:'Timeline zoom', transitionDuration:'Duration', newBlank:'New blank project', resume:'Resume editing', editLocally:'Edit locally. Export anywhere.', chooseProject:'Choose project', mobileReady:'Ready to edit', noUploadShort:'No upload. No watermark.', blurFill:'Blur fill'
  },
  el: {
    create:'Δημιουργία project', import:'Εισαγωγή media', recent:'Πρόσφατα projects', noProjects:'Δεν υπάρχουν projects ακόμα', home:'Αρχική',
    homeLead:'Δημιούργησε. Κόψε. Μοιράσου.', homeBody:'Ένα ιδιωτικό studio που νιώθει φυσικό σε κάθε οθόνη. Χωρίς upload. Χωρίς watermark.',
    free:'Δωρεάν. Χωρίς watermark. Χωρίς λογαριασμό.', newProject:'Νέο project', templates:'Ξεκίνα με format', projects:'Projects', settings:'Ρυθμίσεις',
    private:'Τοπικά από προεπιλογή', privateSub:'Τα αρχεία μένουν στη συσκευή σου.', offline:'Λειτουργεί offline', offlineSub:'Εγκατέστησέ το μία φορά και συνέχισε.', noAccount:'Χωρίς λογαριασμό', noAccountSub:'Άνοιξε το Edituno και ξεκίνα.',
    open:'Άνοιγμα', delete:'Διαγραφή', edit:'Επεξεργασία', export:'Export', media:'Media', text:'Κείμενο', audio:'Ήχος', effects:'Εφέ', canvas:'Καμβάς',
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
    autoSave:'Αυτόματη αποθήκευση', add:'Προσθήκη', noAudio:'Κάνε import αρχείο ήχου για μουσική.', noMedia:'Δεν υπάρχουν media ακόμα.',
    selectedText:'Επιλεγμένο κείμενο', textStyle:'Στυλ κειμένου', position:'Θέση', apply:'Εφαρμογή', installHint:'Εγκατάσταση Edituno',
    desktopMedia:'Media project', inspector:'Ιδιότητες', adjust:'Ρυθμίσεις', transitions:'Μεταβάσεις', projectHub:'Projects', quickEdit:'Edit', dissolve:'Dissolve', slideLeft:'Slide αριστερά', slideRight:'Slide δεξιά', blurTransition:'Blur', kenBurns:'Ken Burns', pulse:'Pulse', float:'Float', reset:'Επαναφορά', timelineZoom:'Zoom timeline', transitionDuration:'Διάρκεια', newBlank:'Νέο κενό project', resume:'Συνέχεια επεξεργασίας', editLocally:'Επεξεργασία τοπικά. Export παντού.', chooseProject:'Επίλεξε project', mobileReady:'Έτοιμο για επεξεργασία', noUploadShort:'Χωρίς upload. Χωρίς watermark.', blurFill:'Blur fill'
  }
}

const state = {
  language: safeLanguage(),
  view: 'home', projects: [], project: null, urls: {}, currentTime: 0, playing: false,
  selected: null, tool: 'media', sheet: null, history: [], future: [], installPrompt: null,
  exportController: null, exportResult: null, exportUrl: null, pxPerSec: 48, currentPreviewAsset: null,
  settingsOpen: false, installOpen: false, projectHubOpen: false, homeMenuOpen: false, adjustKey: 'brightness',
  preferences: loadPreferences(), audioDrag: null
}
state.pxPerSec=Number(state.preferences.timelineScale)||48
const tr = key => STRINGS[state.language][key] ?? STRINGS.en[key] ?? key

function isMobileViewport() {
  return window.matchMedia('(max-width: 979px)').matches || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
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

let saveTimer
function queueSave() {
  clearTimeout(saveTimer)
  if (!state.project) return
  state.project.updatedAt = Date.now()
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
const imageCache = new Map()
let rafId = 0
let playStartPerf = 0
let playStartTime = 0

function visualDuration(project = state.project) {
  return (project?.clips || []).reduce((sum,c)=>sum + clipDuration(c),0)
}
function audioClipDuration(c) { return Math.max(.05,(c.sourceEnd-c.sourceStart)/Math.max(.05,c.speed||1)) }
function projectDuration(project = state.project) {
  const visual=visualDuration(project)
  const audio=Math.max(0,...(project?.audioClips||[]).map(c=>(c.timelineStart||0)+audioClipDuration(c)))
  const text=Math.max(0,...(project?.texts||[]).map(t=>t.end||0))
  return Math.max(visual,audio,text)
}
function clipDuration(c) { return Math.max(.05, (c.end-c.start) / Math.max(.05,c.speed || 1)) }
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
  if (ratio==='9:16') return q===1080?[1080,1920]:[720,1280]
  if (ratio==='1:1') return q===1080?[1080,1080]:[720,720]
  if (ratio==='4:5') return q===1080?[1080,1350]:[720,900]
  return q===1080?[1920,1080]:[1280,720]
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
  const ratio = ratioValue(state.project.ratio)
  const mobile = isMobileViewport()
  const horizontalInset = mobile ? 16 : 52
  const verticalInset = mobile ? 16 : 76
  const maxW = Math.max(120, rect.width - horizontalInset)
  const maxH = Math.max(110, rect.height - verticalInset)
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
  const b=clip.brightness ?? 100, exposure=clip.exposure ?? 0, c=clip.contrast ?? 100, s=clip.saturation ?? 100, h=clip.hue ?? 0, blur=clip.blur ?? 0, gray=clip.grayscale ?? 0, sep=clip.sepia ?? 0
  const exposureBrightness = b * Math.pow(2, exposure / 100)
  ctx.filter=`brightness(${exposureBrightness}%) contrast(${c}%) saturate(${s}%) hue-rotate(${h}deg) blur(${blur}px) grayscale(${gray}%) sepia(${sep}%)`
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

function transitionStyle(row,time,w,h) {
  const clip=row.clip, d=Math.min(Number(clip.transitionDuration)||.35,row.duration/2)
  const none={alpha:1,tx:0,ty:0,scale:1,blur:0,overlay:null,overlayAlpha:0}
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
  }
  return out
}
function transitionAlpha(row,time) { return transitionStyle(row,time,1,1).alpha }
function drawClipWithTransition(ctx,source,asset,row,time,w,h,progress) {
  const fx=transitionStyle(row,time,w,h)
  ctx.save()
  ctx.translate(fx.tx,fx.ty)
  ctx.translate(w/2,h/2); ctx.scale(fx.scale,fx.scale); ctx.translate(-w/2,-h/2)
  const clip = fx.blur ? {...row.clip, blur:(row.clip.blur||0)+fx.blur} : row.clip
  applyClipDrawing(ctx,source,asset,clip,w,h,progress,fx.alpha)
  ctx.restore()
  if (fx.overlay && fx.overlayAlpha>0) {
    ctx.save(); ctx.fillStyle=fx.overlay; ctx.globalAlpha=fx.overlayAlpha; ctx.fillRect(0,0,w,h); ctx.restore()
  }
}
function drawTransitionOverlay(ctx,row,time,w,h) {
  const fx=transitionStyle(row,time,w,h)
  if (fx.overlay && fx.overlayAlpha>0) { ctx.save(); ctx.fillStyle=fx.overlay; ctx.globalAlpha=fx.overlayAlpha; ctx.fillRect(0,0,w,h); ctx.restore() }
}

function drawTexts(ctx, project, time, width, height) {
  for (const item of project.texts || []) {
    if (time < item.start || time > item.end) continue
    const duration=Math.max(.01,item.end-item.start), p=(time-item.start)/duration
    let alpha=1, dy=0, scale=1
    if (item.animation==='fade') alpha=Math.min(1,p*5,(1-p)*5)
    if (item.animation==='pop') scale=.86 + .14*Math.min(1,p*7)
    if (item.animation==='slide') { dy=(1-Math.min(1,p*6))*height*.04; alpha=Math.min(1,p*5) }
    ctx.save(); ctx.globalAlpha=clamp(alpha,0,1); ctx.translate(item.x*width,item.y*height+dy); ctx.scale(scale,scale)
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
        if (previewVideo.readyState>=2) drawClipWithTransition(ctx,previewVideo,asset,row,state.currentTime,w,h,progress)
      } else if (asset.type==='image') {
        try { const img=await loadImage(url); drawClipWithTransition(ctx,img,asset,row,state.currentTime,w,h,progress) } catch {}
      }
    }
  }
  drawTexts(ctx,state.project,state.currentTime,w,h)
  const empty=$('.preview-empty'); if (empty) empty.classList.toggle('hidden',Boolean(row))
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
  state.playing=false; cancelAnimationFrame(rafId); previewVideo.pause(); previewAudio.pause(); stopAudioTracks()
  if (atEnd) state.currentTime=projectDuration()
  updatePlaybackUi(); drawPreview()
}
function seekTo(value) {
  state.currentTime=clamp(value,0,projectDuration()); if(state.playing){playStartTime=state.currentTime;playStartPerf=performance.now()}
  const row=activeAt(state.currentTime); if(row) ensureActiveMediaForPlayback(row); syncAudioTracks(true); updatePlaybackUi(); drawPreview()
}

function defaultProject(ratio='16:9') {
  const now=Date.now()
  return { id:uid(), name:state.language==='el'?'Νέο project':'Untitled project', createdAt:now, updatedAt:now, ratio, background:'#0b0d12', assets:[], clips:[], audioClips:[], texts:[], soundtrack:null }
}
function normalizeProject(p) {
  p.background ||= '#0b0d12'; p.assets ||= []; p.clips ||= []; p.texts ||= p.textOverlays || []; p.audioClips ||= []
  if(p.soundtrack && !p.audioClips.length){const a=p.assets.find(x=>x.id===p.soundtrack.assetId);if(a)p.audioClips.push({id:uid(),assetId:a.id,timelineStart:0,sourceStart:0,sourceEnd:a.duration||30,volume:p.soundtrack.volume??.7,speed:1,fadeIn:0,fadeOut:0,muted:false})}
  p.soundtrack=null
  for (const c of p.clips) Object.assign(c,{brightness:100,exposure:0,contrast:100,saturation:100,temperature:0,vignette:0,grain:0,hue:0,blur:0,grayscale:0,sepia:0,motion:'none',transition:'none',transitionDuration:.35,offsetX:0,offsetY:0,flipX:false,flipY:false,audioFadeIn:0,audioFadeOut:0},c)
  return p
}
async function createProject(ratio='16:9', importNow=false) {
  stopPlayback(); state.project=defaultProject(ratio); await saveProject(state.project); state.projects=await listProjects(); state.urls={}; state.history=[]; state.future=[]; state.currentTime=0; state.selected=null; state.view='editor'; render(); if(importNow) $('#media-picker')?.click()
}
async function openProject(id) {
  stopPlayback(); revokeUrls(); const p=await getProject(id); if(!p) return
  state.project=normalizeProject(p); state.urls={}
  for (const asset of state.project.assets) { const blob=await getBlob(asset.id); if(blob) state.urls[asset.id]=URL.createObjectURL(blob) }
  state.history=[];state.future=[];state.currentTime=0;state.selected=null;state.view='editor';render()
}
function revokeUrls() { Object.values(state.urls).forEach(url=>URL.revokeObjectURL(url)); state.urls={}; imageCache.clear() }
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
    return {type,duration:Number.isFinite(media.duration)?media.duration:0,width:type==='video'?media.videoWidth:undefined,height:type==='video'?media.videoHeight:undefined}
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
function defaultAudioClip(asset,timelineStart=state.currentTime||0){return {id:uid(),assetId:asset.id,timelineStart:Math.max(0,timelineStart),sourceStart:0,sourceEnd:Math.max(.1,asset.duration||30),volume:.8,speed:1,fadeIn:0,fadeOut:0,muted:false}}
function addAudioToTimeline(id,at=state.currentTime||0){const asset=getAsset(id);if(!asset||asset.type!=='audio')return;mutate(p=>{const c=defaultAudioClip(asset,at);p.audioClips.push(c);state.selected={type:'audio',id:c.id};state.tool='audio';state.sheet=isMobileViewport()?'audio':null});syncAudioTracks(true)}

async function importFiles(files, addVisuals=true) {
  if(!state.project || !files?.length) return
  const added=[]
  for(const file of files) {
    try {
      const meta=await mediaMetadata(file), id=uid()
      const waveform=meta.type==='audio'?await buildWaveform(file):null
      const asset={id,name:file.name,type:meta.type,mimeType:file.type,duration:meta.duration,width:meta.width,height:meta.height,size:file.size,waveform}
      await putBlob(id,file); state.project.assets.push(asset); state.urls[id]=URL.createObjectURL(file); added.push(asset)
      if(addVisuals && (asset.type==='video'||asset.type==='image')) state.project.clips.push(defaultClip(asset))
      if(asset.type==='audio' && addVisuals) state.project.audioClips.push(defaultAudioClip(asset,state.currentTime||0))
    } catch { toast(tr('unsupported'),'error') }
  }
  state.project.updatedAt=Date.now(); await saveProject(state.project); state.projects=await listProjects(); toast(tr('imported'),'success'); renderEditor()
}
function defaultClip(asset) {
  return { id:uid(),assetId:asset.id,start:0,end:asset.type==='image'?Math.max(1,asset.duration||4):Math.max(.1,asset.duration||4),speed:1,volume:1,scale:1,rotation:0,opacity:1,fit:'cover',offsetX:0,offsetY:0,flipX:false,flipY:false,brightness:100,exposure:0,contrast:100,saturation:100,temperature:0,vignette:0,grain:0,hue:0,blur:0,grayscale:0,sepia:0,motion:'none',transition:'none',transitionDuration:.35,audioFadeIn:0,audioFadeOut:0 }
}
function addAssetToTimeline(id) { const asset=getAsset(id); if(!asset)return; if(asset.type==='audio')return addAudioToTimeline(id); mutate(p=>p.clips.push(defaultClip(asset))); }
function setSoundtrack(id) { addAudioToTimeline(id,0) }

function selectedClip() { return state.selected?.type==='clip' ? state.project?.clips.find(c=>c.id===state.selected.id) : null }
function selectedText() { return state.selected?.type==='text' ? state.project?.texts.find(t=>t.id===state.selected.id) : null }
function selectedAudio() { return state.selected?.type==='audio' ? state.project?.audioClips.find(c=>c.id===state.selected.id) : null }
function selectClip(id) { state.selected={type:'clip',id}; state.tool='edit'; state.sheet=isMobileViewport()?'edit':null; renderEditor() }
function selectText(id) { state.selected={type:'text',id}; state.tool='text'; state.sheet=isMobileViewport()?'text':null; renderEditor() }
function selectAudio(id) { state.selected={type:'audio',id}; state.tool='audio'; state.sheet=isMobileViewport()?'audio':null; renderEditor() }

function splitAtPlayhead() {
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
  const audio=selectedAudio(); if(audio)return mutate(p=>{const c={...clone(audio),id:uid(),timelineStart:(audio.timelineStart||0)+.25};p.audioClips.push(c);state.selected={type:'audio',id:c.id}})
}
function deleteSelected() {
  if(state.selected?.type==='clip') mutate(p=>{p.clips=p.clips.filter(c=>c.id!==state.selected.id);state.selected=null})
  else if(state.selected?.type==='text') mutate(p=>{p.texts=p.texts.filter(t=>t.id!==state.selected.id);state.selected=null})
  else if(state.selected?.type==='audio') { const id=state.selected.id; mutate(p=>{p.audioClips=p.audioClips.filter(c=>c.id!==id);state.selected=null});const el=audioPreviewNodes.get(id);if(el){el.pause();el.remove();audioPreviewNodes.delete(id)} }
}
function moveSelected(delta) { const clip=selectedClip(); if(clip)return mutate(p=>{const i=p.clips.findIndex(c=>c.id===clip.id),j=clamp(i+delta,0,p.clips.length-1);if(i!==j){const [x]=p.clips.splice(i,1);p.clips.splice(j,0,x)}});const audio=selectedAudio();if(audio)return mutate(p=>{const x=p.audioClips.find(c=>c.id===audio.id);x.timelineStart=Math.max(0,(x.timelineStart||0)+delta*(state.preferences.snap?.25:.1))}) }

function addText(kind='title') {
  if(!state.project) return
  const dur=Math.max(3,projectDuration()), start=clamp(state.currentTime,0,Math.max(0,dur-.3)), end=Math.min(Math.max(start+2.5,start+.5),Math.max(dur,start+2.5))
  const presets={
    title:{text:state.language==='el'?'Ο τίτλος σου':'Your title',fontSize:72,y:.5,weight:800,color:'#ffffff',background:'#00000000',strokeWidth:3,strokeColor:'#000000',animation:'pop'},
    caption:{text:state.language==='el'?'Γράψε το caption σου':'Write your caption',fontSize:46,y:.82,weight:800,color:'#ffffff',background:'#111827CC',strokeWidth:0,strokeColor:'#000000',animation:'fade'},
    sticker:{text:'✨',fontSize:90,y:.28,weight:700,color:'#ffffff',background:'#00000000',strokeWidth:0,strokeColor:'#000000',animation:'pop'}
  }
  const q=presets[kind]
  mutate(p=>{const item={id:uid(),start,end,x:.5,align:'center',...q};p.texts.push(item);state.selected={type:'text',id:item.id};state.tool='text';state.sheet='text'})
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
  mutate(p=>{ for(const r of rows)p.texts.push({id:uid(),text:r.text,start:r.start,end:r.end,x:.5,y:.83,fontSize:44,color:'#ffffff',background:'#111827D9',weight:800,align:'center',strokeWidth:0,strokeColor:'#000000',animation:'fade'}) }); toast(tr('srtImported'),'success')
}

function applyFilter(name) {
  const c=selectedClip(); if(!c)return
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
    noir:{brightness:96,exposure:-2,contrast:140,saturation:0,temperature:0,vignette:42,grain:18,hue:0,blur:0,grayscale:100,sepia:0}
  }
  mutate(p=>Object.assign(p.clips.find(x=>x.id===c.id),presets.original,presets[name]||presets.original,{filterPreset:name}))
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
    transition:'<path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/>',
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
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>',
    half:'<circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 0 16z"/>',
    droplet:'<path d="M12 2.5s6 6.2 6 11a6 6 0 0 1-12 0c0-4.8 6-11 6-11z"/>',
    thermo:'<path d="M10 14.8V5a2 2 0 0 1 4 0v9.8a4 4 0 1 1-4 0z"/><path d="M12 9v7"/>',
    grain:'<circle cx="7" cy="7" r="1"/><circle cx="12" cy="6" r="1"/><circle cx="17" cy="8" r="1"/><circle cx="8" cy="13" r="1"/><circle cx="14" cy="12" r="1"/><circle cx="17" cy="17" r="1"/><circle cx="10" cy="18" r="1"/>',
    palette:'<circle cx="12" cy="12" r="8"/><circle cx="8" cy="10" r="1"/><circle cx="12" cy="7" r="1"/><circle cx="16" cy="10" r="1"/><path d="M18 15c-2 0-3 1-3 2s1 2 3 2"/>',
    rotate:'<path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/>'
  }
  return `<svg class="ui-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]||icons.effects}</svg>`
}
function renderLogo() { return `<span class="logo-lockup"><img class="logo-img" src="${EDITUNO_ICON}" alt="Edituno"><span>Edituno</span></span>` }
function homeMenuPopover(){
  if(!state.homeMenuOpen)return''
  const el=state.language==='el'
  return `<div class="home-menu-scrim" data-action="home-menu-close"></div><aside class="home-menu-popover" role="dialog" aria-label="Edituno menu">
    <div class="home-menu-language"><span>${el?'Γλώσσα':'Language'}</span><div class="mini-segment"><button type="button" class="${state.language==='el'?'active':''}" data-action="set-lang" data-value="el">ΕΛ</button><button type="button" class="${state.language==='en'?'active':''}" data-action="set-lang" data-value="en">EN</button></div></div>
    <div class="home-menu-divider"></div>
    <button type="button" class="home-menu-row" data-action="settings">${svgIcon('settings',18)}<span>${tr('settings')}</span></button>
    <button type="button" class="home-menu-row" data-action="install">${svgIcon('install',18)}<span>${tr('install')}</span></button>
    <div class="home-menu-note"><span class="status-dot"></span>${el?'Τα media μένουν στη συσκευή σου':'Media stays on your device'}</div>
  </aside>`
}
function renderHome() {
  const app=$('#app'), projects=state.projects||[], last=projects[0]
  const mobile=isMobileViewport(), recent=projects.slice(0,mobile?6:8)
  const el=state.language==='el'
  const headline='Edit video. Simply.'
  const subline=el?'Γρήγορο editing, χωρίς upload και watermark.':'Fast editing, without uploads or watermarks.'
  app.innerHTML=`<div class="landing-page ${mobile?'mobile-home':'desktop-home'}">
    <header class="landing-header">
      <div class="landing-header-inner">
        ${renderLogo()}
        <nav class="desktop-nav desktop-home-only" aria-label="Edituno">
          <button type="button" data-action="projects-scroll">${tr('projects')}</button>
          <button type="button" data-action="create" data-ratio="16:9">${el?'Νέο project':'New project'}</button>
        </nav>
        <div class="landing-actions">
          <button type="button" class="home-more-btn" data-action="home-menu-toggle" aria-label="Menu">${svgIcon('more',20)}</button>
        </div>
      </div>
    </header>

    <main class="landing-main">
      <section class="mobile-home-dashboard">
        <div class="mobile-welcome">
          <h1>${headline}</h1>
          <p>${subline}</p>
        </div>
        <div class="mobile-action-row">
          <button type="button" class="home-action primary" data-action="create" data-ratio="9:16">${svgIcon('plus',18)}<span>${el?'Νέο project':'New project'}</span></button>
          <button type="button" class="home-action" data-action="create-import">${svgIcon('folder',18)}<span>${el?'Import media':'Import media'}</span></button>
        </div>
        ${last?`<button type="button" class="continue-card" data-action="open-project" data-id="${last.id}"><span class="continue-icon">${svgIcon('play',16)}</span><span><small>${tr('resume')}</small><strong>${escapeHtml(last.name)}</strong><em>${escapeHtml(last.ratio||'16:9')} · ${new Date(last.updatedAt).toLocaleDateString(state.language==='el'?'el-GR':'en-US')}</em></span><i>${svgIcon('right',17)}</i></button>`:''}
        <section class="mobile-section">
          <div class="mobile-section-head"><div><strong>${el?'Γρήγορη έναρξη':'Quick start'}</strong><span>${el?'Διάλεξε format':'Choose a format'}</span></div></div>
          <div class="mobile-format-strip">
            ${mobileFormatCard('9:16','Vertical','Reels · TikTok','phone')}
            ${mobileFormatCard('16:9','Landscape','YouTube','landscape')}
            ${mobileFormatCard('1:1','Square','Social','square')}
            ${mobileFormatCard('4:5','Portrait','Feed','portrait')}
          </div>
        </section>
        <section class="mobile-section" id="projects-section">
          <div class="mobile-section-head"><div><strong>${tr('recent')}</strong><span>${projects.length?`${projects.length} ${tr('projects').toLowerCase()}`:tr('noProjects')}</span></div></div>
          <div class="mobile-project-list">${recent.length?recent.map(mobileProjectCard).join(''):`<button type="button" class="mobile-empty-project" data-action="create" data-ratio="9:16">${svgIcon('plus',18)}<span><strong>${el?'Δημιούργησε το πρώτο project':'Create your first project'}</strong><small>${tr('noUploadShort')}</small></span></button>`}</div>
        </section>
      </section>

      <section class="desktop-landing-content">
        <section class="desktop-hero-grid">
          <div class="desktop-hero-copy">
            <span class="desktop-eyebrow">EDITUNO</span>
            <h1>${headline}</h1>
            <p>${subline}</p>
            <div class="desktop-hero-actions"><button type="button" class="primary-btn desktop-primary" data-action="create" data-ratio="16:9">${svgIcon('plus',17)} ${el?'Νέο project':'New project'}</button><button type="button" class="secondary-btn desktop-secondary" data-action="create-import">${svgIcon('folder',17)} Import media</button></div>
            <div class="desktop-trust"><span>${svgIcon('check',14)} ${el?'Χωρίς upload':'No uploads'}</span><span>${svgIcon('check',14)} ${el?'Χωρίς watermark':'No watermark'}</span><span>${svgIcon('check',14)} Offline</span></div>
          </div>
          <div class="desktop-start-panel">
            <div class="desktop-start-head"><div><small>${el?'ΝΕΟ PROJECT':'NEW PROJECT'}</small><strong>${el?'Διάλεξε format':'Choose a format'}</strong></div>${svgIcon('video',20)}</div>
            <div class="desktop-format-grid">
              ${desktopFormatButton('9:16','Vertical','Reels · TikTok','phone')}
              ${desktopFormatButton('16:9','Landscape','YouTube','landscape')}
              ${desktopFormatButton('1:1','Square','Social','square')}
              ${desktopFormatButton('4:5','Portrait','Feed','portrait')}
            </div>
            <button type="button" class="desktop-import-row" data-action="create-import">${svgIcon('folder',18)}<span><strong>Import media</strong><small>Video · Photo · Audio</small></span>${svgIcon('right',17)}</button>
          </div>
        </section>
        <section class="desktop-projects-section" id="projects-desktop">
          <div class="desktop-section-title"><div><small>${el?'ΒΙΒΛΙΟΘΗΚΗ':'LIBRARY'}</small><h2>${tr('recent')}</h2></div>${projects.length?`<span>${projects.length}</span>`:''}</div>
          <div class="project-list">${projects.length?projects.map(projectCard).join(''):`<button type="button" class="desktop-empty-project" data-action="create" data-ratio="16:9">${svgIcon('plus',20)}<span><strong>${el?'Νέο project':'New project'}</strong><small>${tr('noUploadShort')}</small></span></button>`}</div>
        </section>
      </section>
    </main>

    <nav class="mobile-home-nav" aria-label="Edituno">
      <button type="button" class="active" data-action="home-top">${svgIcon('home',18)}<span>${tr('home')}</span></button>
      <button type="button" class="create-tab" data-action="create" data-ratio="9:16"><span class="create-tab-icon">${svgIcon('plus',21)}</span><span>${el?'Νέο':'Create'}</span></button>
      <button type="button" data-action="projects-scroll">${svgIcon('projects',18)}<span>${tr('projects')}</span></button>
    </nav>
    ${homeMenuPopover()}
    ${state.settingsOpen?settingsModal():''}${state.installOpen?installModal():''}
  </div><div class="toast-stack" id="toasts"></div>`
}
function mobileFormatCard(ratio,title,sub,shape='phone'){return `<button type="button" class="mobile-format-card" data-action="create" data-ratio="${ratio}"><span class="format-symbol ${shape}"></span><strong>${title}</strong><small>${sub}</small></button>`}
function desktopFormatButton(ratio,title,sub,shape='phone'){return `<button type="button" class="desktop-format-btn" data-action="create" data-ratio="${ratio}"><span class="format-symbol ${shape}"></span><span><strong>${title}</strong><small>${sub}</small></span></button>`}
function mobileProjectCard(p){return `<article class="mobile-project-card"><button type="button" class="mobile-project-open" data-action="open-project" data-id="${p.id}"><span class="mobile-project-thumb">${svgIcon('video',18)}</span><span class="mobile-project-copy"><strong>${escapeHtml(p.name)}</strong><small>${escapeHtml(p.ratio||'16:9')} · ${new Date(p.updatedAt).toLocaleDateString(state.language==='el'?'el-GR':'en-US')}</small></span><span class="mobile-project-arrow">${svgIcon('right',16)}</span></button><button type="button" class="mobile-project-menu" data-action="delete-project" data-id="${p.id}" aria-label="${tr('delete')}">${svgIcon('trash',15)}</button></article>`}
function projectCard(p){return `<article class="project-card" data-action="open-project" data-id="${p.id}"><div class="project-thumb">${svgIcon('video',20)}</div><div class="project-copy"><strong>${escapeHtml(p.name)}</strong><span>${new Date(p.updatedAt).toLocaleDateString(state.language==='el'?'el-GR':'en-US')} · ${escapeHtml(p.ratio||'16:9')}</span></div><button class="project-more" data-action="delete-project" data-id="${p.id}" aria-label="${tr('delete')}">${svgIcon('trash',15)}</button></article>`}
function settingsModal(){
  const p=state.preferences
  return `<div class="modal-backdrop settings-backdrop" data-action="settings-close">
    <section class="modal settings-modal" role="dialog" aria-modal="true" aria-label="${tr('settings')}">
      <div class="modal-head settings-head"><div><h2>${tr('settings')}</h2><small>${state.language==='el'?'Προσαρμόζεις μόνο ό,τι χρειάζεσαι.':'Only tune what you actually need.'}</small></div><button type="button" class="sheet-close" data-action="settings-close" aria-label="${tr('close')}">${svgIcon('close',18)}</button></div>
      <div class="modal-body settings-body"><div class="settings-stack">
        <section class="settings-group"><div class="settings-group-title"><span class="settings-group-icon">${svgIcon('language',18)}</span><div><strong>${tr('language')}</strong><small>${state.language==='el'?'Γλώσσα περιβάλλοντος':'Interface language'}</small></div></div><div class="language-segment"><button type="button" class="${state.language==='el'?'active':''}" data-action="set-lang" data-value="el"><span>Ελληνικά</span><i class="segment-check">${state.language==='el'?svgIcon('check',15):''}</i></button><button type="button" class="${state.language==='en'?'active':''}" data-action="set-lang" data-value="en"><span>English</span><i class="segment-check">${state.language==='en'?svgIcon('check',15):''}</i></button></div></section>
        <section class="settings-group"><div class="settings-group-title"><span class="settings-group-icon">${svgIcon('timeline',18)}</span><div><strong>Timeline</strong><small>${state.language==='el'?'Συμπεριφορά και εμφάνιση':'Behavior and appearance'}</small></div></div><button type="button" class="settings-toggle-row" data-action="pref-toggle" data-key="snap"><span><strong>${preferenceLabel('snap')}</strong><small>${state.language==='el'?'Ευθυγράμμιση clips σε κοντινά σημεία':'Align clips to nearby edit points'}</small></span><i class="switch ${p.snap?'on':''}"></i></button><button type="button" class="settings-toggle-row" data-action="pref-toggle" data-key="showWaveforms"><span><strong>${preferenceLabel('showWaveforms')}</strong><small>${state.language==='el'?'Εμφάνιση waveform στα audio clips':'Show waveforms on audio clips'}</small></span><i class="switch ${p.showWaveforms?'on':''}"></i></button><label class="settings-slider"><span><strong>${preferenceLabel('timelineScale')}</strong><b>${p.timelineScale||48}</b></span><input data-pref="timelineScale" type="range" min="28" max="100" step="4" value="${p.timelineScale||48}"></label></section>
        <section class="settings-group"><div class="settings-group-title"><span class="settings-group-icon">${svgIcon('effects',18)}</span><div><strong>${state.language==='el'?'Απόδοση':'Performance'}</strong><small>${state.language==='el'?'Προεπισκόπηση και ποιότητα':'Preview and quality'}</small></div></div><label class="settings-select"><span>${preferenceLabel('previewQuality')}</span><select data-pref="previewQuality"><option value="performance" ${p.previewQuality==='performance'?'selected':''}>Performance</option><option value="balanced" ${p.previewQuality==='balanced'?'selected':''}>Balanced</option><option value="quality" ${p.previewQuality==='quality'?'selected':''}>Quality</option></select></label></section>
        <section class="settings-group"><div class="settings-group-title"><span class="settings-group-icon">${svgIcon('export',18)}</span><div><strong>${tr('export')}</strong><small>${state.language==='el'?'Προεπιλογές νέων exports':'Default export choices'}</small></div></div><div class="settings-two"><label class="settings-select"><span>${preferenceLabel('defaultQuality')}</span><select data-pref="defaultQuality"><option value="720" ${+p.defaultQuality===720?'selected':''}>720p</option><option value="1080" ${+p.defaultQuality===1080?'selected':''}>1080p</option></select></label><label class="settings-select"><span>${preferenceLabel('defaultFps')}</span><select data-pref="defaultFps"><option value="24" ${+p.defaultFps===24?'selected':''}>24 fps</option><option value="30" ${+p.defaultFps===30?'selected':''}>30 fps</option><option value="60" ${+p.defaultFps===60?'selected':''}>60 fps</option></select></label></div></section>
        <section class="settings-group"><div class="settings-group-title"><span class="settings-group-icon">${svgIcon('install',18)}</span><div><strong>${tr('installHint')}</strong><small>${state.language==='el'?'Χρήση σαν κανονική εφαρμογή':'Use Edituno like a native app'}</small></div></div><button type="button" class="settings-action-row" data-action="install"><span>${tr('installApp')}</span><i>›</i></button><button type="button" class="settings-action-row" data-action="persist-storage"><span>${tr('requestStorage')}</span><i>›</i></button></section>
        <section class="settings-group danger-zone"><button type="button" class="settings-danger-row" data-action="clear-all"><span>${tr('clearAll')}</span>${svgIcon('close',16)}</button></section>
      </div></div>
      <div class="settings-footer"><button type="button" class="primary-btn full" data-action="settings-close">${state.language==='el'?'Τέλος':'Done'}</button></div>
    </section>
  </div>`
}

function installModal(){const ios=/iphone|ipad|ipod/i.test(navigator.userAgent);return `<div class="modal-backdrop" data-action="install-close"><section class="modal"><div class="modal-head"><h2>${tr('installTitle')}</h2><button class="sheet-close" data-action="install-close" aria-label="${tr('close')}">${svgIcon('close',18)}</button></div><div class="modal-body"><div class="install-card"><strong>Edituno</strong><p>${ios?tr('iosInstall'):tr('chromeInstall')}</p>${!ios&&state.installPrompt?`<button class="primary-btn full" data-action="install-confirm">${tr('installApp')}</button>`:''}</div></div></section></div>`}

function mobileProjectHubModal(){
  const projects=state.projects||[]
  return `<div class="project-hub-backdrop" data-action="mobile-hub-close"><section class="project-hub"><div class="project-hub-head"><div>${renderLogo()}<span>${tr('projectHub')}</span></div><button class="icon-btn" data-action="mobile-hub-close">${svgIcon('close')}</button></div><div class="project-hub-body"><button class="primary-btn full" data-action="create" data-ratio="9:16">${svgIcon('plus',18)} ${tr('newBlank')}</button>${projects.length?`<div class="hub-project-list">${projects.slice(0,10).map(p=>`<button class="hub-project" data-action="open-project" data-id="${p.id}"><span class="hub-thumb">${svgIcon('play',18)}</span><span><strong>${escapeHtml(p.name)}</strong><small>${escapeHtml(p.ratio||'16:9')} · ${new Date(p.updatedAt).toLocaleDateString(state.language==='el'?'el-GR':'en-US')}</small></span></button>`).join('')}</div>`:`<div class="empty-state"><b>${tr('noProjects')}</b></div>`}<div class="hub-footer"><button class="secondary-btn" data-action="language">${state.language==='el'?'English':'Ελληνικά'}</button><button class="secondary-btn" data-action="settings">${tr('settings')}</button></div></div></section></div>`
}

function renderEditor() {
  if(!state.project) return
  const app=$('#app'), p=state.project, dur=projectDuration(), rows=clipTimeline(), mobile=isMobileViewport()
  const totalWidth=Math.max(320,Math.ceil(dur*state.pxPerSec)+60)
  app.innerHTML=`<div class="editor-page ${mobile?'mobile-editor':'desktop-editor'}">
    <header class="editor-header">
      <button class="icon-btn editor-home-btn" data-action="back" aria-label="${tr('back')}">${svgIcon('back',20)}</button>
      <div class="editor-title-wrap"><input class="editor-title" id="project-name" aria-label="${tr('projectName')}" value="${escapeHtml(p.name)}" /></div>
      <span class="editor-save-state" id="save-state">${tr('save')}</span>
      <div class="editor-header-actions"><button class="icon-btn editor-settings-btn" data-action="settings" aria-label="${tr('settings')}">${svgIcon('settings',19)}</button><button class="primary-btn export-btn" data-action="export">${svgIcon('export',16)}<span>${tr('export')}</span></button></div>
    </header>

    <main class="editor-body">
      <aside class="desktop-sidebar">${desktopSidebar()}</aside>
      <section class="preview-zone">
        <div class="preview-wrap"><div class="preview-frame"><canvas id="preview-canvas"></canvas><div class="preview-empty ${rows.length?'hidden':''}"><span class="empty-preview-icon">${svgIcon('media',26)}</span><strong>${tr('mobileReady')}</strong><span>${tr('emptyTimeline')}</span><button class="primary-btn compact" data-action="pick-media">${svgIcon('plus',17)} ${tr('addMedia')}</button></div><span class="preview-overlay-badge">${escapeHtml(p.ratio)}</span></div></div>
      </section>
      <div class="transport"><button class="icon-btn transport-home" data-action="jump-start" aria-label="Start">↤</button><button class="play-btn" data-action="play-toggle" aria-label="${tr('play')}">${svgIcon('play',19)}</button><input id="seekbar" class="seekbar" type="range" min="0" max="${dur||1}" step="0.01" value="${state.currentTime}" /><span class="timecode" id="timecode">${fmtTime(state.currentTime)} / ${fmtTime(dur)}</span></div>
      <section class="timeline-panel">
        <div class="timeline-toolbar"><div class="timeline-toolbar-left"><strong>${tr('timeline')}</strong></div><div class="timeline-toolbar-right"><button data-action="timeline-zoom" data-value="-1" title="${tr('timelineZoom')}">${svgIcon('zoomout',15)}</button><button data-action="timeline-zoom" data-value="1" title="${tr('timelineZoom')}">${svgIcon('zoomin',15)}</button><button data-action="undo" title="${tr('undo')}">${svgIcon('undo',15)}</button><button data-action="redo" title="${tr('redo')}">${svgIcon('redo',15)}</button><button data-action="split" title="${tr('split')}">${svgIcon('split',15)}</button></div></div>
        <div class="timeline-scroll" id="timeline-scroll"><div class="timeline-canvas" style="width:${totalWidth}px"><div class="timeline-ruler" data-timeline-ruler>${timelineRuler(dur,totalWidth)}</div><div class="track-row video-row"><span class="track-label">V1</span><div class="timeline-track">${rows.length?rows.map((r,i)=>timelineClip(r,i)).join(''):`<button class="timeline-empty-add" data-action="pick-media">${svgIcon('plus',18)} ${tr('addMedia')}</button>`}</div></div><div class="track-row audio-row"><span class="track-label">A1</span><div class="timeline-audio-row">${(p.audioClips||[]).map(timelineAudio).join('')}</div></div><div class="track-row text-row"><span class="track-label">T1</span><div class="timeline-text-row">${(p.texts||[]).map(timelineText).join('')}</div></div><div class="playhead" style="left:${42+state.currentTime*state.pxPerSec}px"></div></div></div>
      </section>
      <aside class="desktop-inspector">${desktopInspector()}</aside>
    </main>

    <footer class="editor-bottom"><div class="editor-tools">
      ${toolButton('media','media',tr('media'))}${toolButton('edit','edit',tr('quickEdit'))}${toolButton('text','text',tr('text'))}${toolButton('audio','audio',tr('audio'))}${toolButton('effects','effects',tr('effects'))}${toolButton('adjust','adjust',tr('adjust'))}${toolButton('transitions','transition',tr('transitions'))}${toolButton('canvas','canvas',tr('canvas'))}
    </div></footer>
    <div class="sheet-backdrop ${state.sheet?'open':''}" data-action="sheet-close"></div>
    <section class="bottom-sheet ${state.sheet?'open':''}" aria-modal="true"><div class="sheet-handle"></div><div class="sheet-head"><strong>${sheetTitle()}</strong><button class="sheet-close" data-action="sheet-close">${svgIcon('close',18)}</button></div><div class="sheet-content">${state.sheet?panelContent(state.sheet):''}</div></section>
    ${state.projectHubOpen?mobileProjectHubModal():''}${state.settingsOpen?settingsModal():''}${state.installOpen?installModal():''}
  </div><div class="toast-stack" id="toasts"></div>`
  requestAnimationFrame(()=>{ fitPreviewFrame(); updatePlaybackUi(); bindTimelineInteractions() })
}
function timelineRuler(dur,width){if(!dur)return'';const every=dur>180?30:dur>60?10:dur>20?5:2;let out='';for(let t=0;t<=dur+.001;t+=every)out+=`<span style="left:${t*state.pxPerSec}px">${fmtTime(t).slice(0,5)}</span>`;return out}
function timelineClip(row,index){const a=getAsset(row.clip.assetId),w=Math.max(68,row.duration*state.pxPerSec);const transition=row.clip.transition&&row.clip.transition!=='none';return `<div class="timeline-clip-wrap" style="width:${w}px"><button class="timeline-clip ${a?.type==='image'?'image':''} ${state.selected?.type==='clip'&&state.selected.id===row.clip.id?'selected':''}" data-action="select-clip" data-id="${row.clip.id}"><strong>${escapeHtml(a?.name||'Clip')}</strong><small>${fmtTime(row.duration)}</small></button>${index<state.project.clips.length-1?`<button class="timeline-transition ${transition?'active':''}" data-action="select-transition" data-id="${row.clip.id}" aria-label="${tr('transitions')}">${svgIcon('transition',16)}</button>`:''}</div>`}
function timelineText(t){const w=Math.max(54,(t.end-t.start)*state.pxPerSec);return `<button class="timeline-text ${state.selected?.type==='text'&&state.selected.id===t.id?'selected':''}" data-action="select-text" data-id="${t.id}" style="left:${(t.start||0)*state.pxPerSec}px;width:${w}px">${escapeHtml(t.text)}</button>`}
function waveformBars(asset,count=36){const peaks=asset?.waveform||[];if(!state.preferences.showWaveforms)return'';let out='';for(let i=0;i<count;i++){const v=peaks.length?peaks[Math.floor(i*peaks.length/count)]:(.28+.6*Math.abs(Math.sin(i*1.73)));out+=`<i style="height:${Math.max(12,Math.round(v*86))}%"></i>`}return out}
function timelineAudio(c){const a=getAsset(c.assetId),w=Math.max(72,audioClipDuration(c)*state.pxPerSec),left=(c.timelineStart||0)*state.pxPerSec;return `<button class="timeline-audio ${state.selected?.type==='audio'&&state.selected.id===c.id?'selected':''}" data-action="select-audio" data-id="${c.id}" style="left:${left}px;width:${w}px"><span class="audio-wave">${waveformBars(a)}</span><strong>${escapeHtml(a?.name||'Audio')}</strong><small>${Math.round((c.volume??.8)*100)}%</small></button>`}
function toolButton(tool,iconName,label){return `<button class="tool-btn ${state.tool===tool?'active':''}" data-action="tool" data-tool="${tool}" aria-pressed="${state.tool===tool?'true':'false'}"><span class="tool-icon">${svgIcon(iconName,20)}</span><span>${label}</span></button>`}
function sheetTitle(){if(state.sheet==='edit')return tr('quickEdit');if(state.sheet==='effects')return tr('effects');if(state.sheet==='adjust')return tr('adjust');if(state.sheet==='transitions')return tr('transitions');if(state.sheet==='text'&&selectedText())return tr('selectedText');return tr(state.sheet||'project')}
function desktopSidebar(){return `<h3 class="desktop-panel-title">${tr('desktopMedia')}</h3><div class="desktop-tool-tabs"><button class="active" data-action="pick-media">＋ ${tr('media')}</button><button data-action="add-text" data-kind="title">T ${tr('text')}</button><button data-action="open-srt">CC</button></div>${mediaPanel()}`}
function desktopInspector(){return `<h3 class="desktop-panel-title">${tr('inspector')}</h3>${state.selected?.type==='clip'?clipPanel():state.selected?.type==='text'?textPanel():state.selected?.type==='audio'?audioClipPanel():canvasPanel()}`}
function panelContent(tool){if(tool==='media')return mediaPanel();if(tool==='edit')return editPanel();if(tool==='text')return textPanel(true);if(tool==='audio')return audioPanel();if(tool==='effects')return effectsPanel();if(tool==='adjust')return adjustPanel();if(tool==='transitions')return transitionPanel();if(tool==='canvas')return canvasPanel();return''}

function mediaPanel(){const list=state.project.assets||[];return `<div class="panel-grid"><button class="primary-btn full" data-action="pick-media">＋ ${tr('addMedia')}</button>${list.length?`<div class="media-list">${list.map(a=>`<div class="media-row ${a.type}"><div class="media-type">${a.type==='video'?svgIcon('video',18):a.type==='image'?svgIcon('media',18):svgIcon('audio',18)}</div><div class="media-copy"><strong>${escapeHtml(a.name)}</strong><span>${a.type} · ${a.duration?fmtTime(a.duration):''} · ${fmtBytes(a.size)}</span></div><button class="media-action" data-action="${a.type==='audio'?'add-audio':'add-asset'}" data-id="${a.id}">${svgIcon('plus',14)}<span>${tr('add')}</span></button></div>`).join('')}</div>`:`<div class="empty-state"><b>${tr('noMedia')}</b></div>`}</div>`}
function textPanel(showAdd=true){const t=selectedText();return `<div class="panel-grid">${showAdd?`<div class="action-row"><button class="sheet-action" data-action="add-text" data-kind="title"><i>T</i>${tr('addTitle')}</button><button class="sheet-action" data-action="add-text" data-kind="caption"><i>CC</i>${tr('addCaption')}</button><button class="sheet-action" data-action="add-text" data-kind="sticker"><i>✨</i>${tr('addSticker')}</button></div><button class="secondary-btn" data-action="open-srt">CC ${tr('importSrt')}</button>`:''}${t?`<div class="panel-section"><h3>${tr('textStyle')}</h3><div class="field-grid"><label class="field"><span>${tr('textContent')}</span><textarea data-bind-text="text">${escapeHtml(t.text)}</textarea></label><div class="field-grid two"><label class="field"><span>${tr('fontSize')}</span><input data-bind-text="fontSize" type="number" min="12" max="180" value="${t.fontSize}"></label><label class="field"><span>${tr('weight')}</span><select data-bind-text="weight"><option ${t.weight==600?'selected':''}>600</option><option ${t.weight==700?'selected':''}>700</option><option ${t.weight==800?'selected':''}>800</option></select></label></div><div class="field-grid two"><label class="field"><span>${tr('color')}</span><input data-bind-text="color" type="color" value="${safeColor(t.color,'#ffffff')}"></label><label class="field"><span>${tr('textBackground')}</span><input data-bind-text="background" type="color" value="${safeColor(t.background,'#111827')}"></label></div><label class="field"><span>${tr('animation')}</span><select data-bind-text="animation"><option value="none" ${t.animation==='none'?'selected':''}>${tr('none')}</option><option value="fade" ${t.animation==='fade'?'selected':''}>Fade</option><option value="pop" ${t.animation==='pop'?'selected':''}>Pop</option><option value="slide" ${t.animation==='slide'?'selected':''}>Slide up</option></select></label></div></div><div class="panel-section"><h3>${tr('position')}</h3>${rangeField('x',t.x,0,1,.01,true,'text')}${rangeField('y',t.y,0,1,.01,true,'text')}<div class="field-grid two"><label class="field"><span>${tr('start')}</span><input data-bind-text="start" type="number" step="0.1" min="0" value="${t.start.toFixed(2)}"></label><label class="field"><span>${tr('end')}</span><input data-bind-text="end" type="number" step="0.1" min="0" value="${t.end.toFixed(2)}"></label></div></div><button class="danger-btn" data-action="delete-selected">${tr('delete')}</button>`:''}</div>`}
function safeColor(v,fallback){return /^#[0-9a-f]{6}$/i.test(v||'')?v:fallback}
function audioPanel(){
  const audios=state.project.assets.filter(a=>a.type==='audio'), c=selectedAudio()
  return `<div class="panel-grid"><button class="primary-btn full" data-action="pick-media">＋ ${tr('addMedia')}</button>${audios.length?`<div class="media-list">${audios.map(a=>`<div class="media-row audio"><div class="media-type">${svgIcon('audio',18)}</div><div class="media-copy"><strong>${escapeHtml(a.name)}</strong><span>${fmtTime(a.duration)} · ${fmtBytes(a.size)}</span></div><button class="media-action" data-action="add-audio" data-id="${a.id}">＋ ${tr('add')}</button></div>`).join('')}</div>`:`<div class="empty-state"><b>${tr('noAudio')}</b></div>`}${c?audioClipPanel():`<div class="panel-section soft"><h3>${state.language==='el'?'Πολυκάναλος ήχος':'Multitrack audio'}</h3><p class="helper">${state.language==='el'?'Πρόσθεσε μουσική στο A1 και μετακίνησέ την ελεύθερα πάνω στο timeline.':'Add music to A1 and position it freely on the timeline.'}</p></div>`}</div>`
}
function audioClipPanel(){
  const c=selectedAudio(),a=getAsset(c?.assetId);if(!c)return''
  return `<div class="panel-grid"><div class="panel-section audio-mixer"><div class="mixer-heading"><span class="mixer-icon">${svgIcon('audio',18)}</span><div><strong>${escapeHtml(a?.name||'Audio')}</strong><small>A1 · ${fmtTime(audioClipDuration(c))}</small></div></div>${rangeField('volume',c.volume,0,1,.01,true,'audio')}${rangeField('fadeIn',c.fadeIn,0,Math.min(5,audioClipDuration(c)/2),.05,true,'audio')}${rangeField('fadeOut',c.fadeOut,0,Math.min(5,audioClipDuration(c)/2),.05,true,'audio')}<div class="field-grid two"><label class="field"><span>${state.language==='el'?'Θέση':'Position'}</span><input data-bind-audio="timelineStart" type="number" min="0" step="0.05" value="${(c.timelineStart||0).toFixed(2)}"></label><label class="field"><span>${tr('speed')}</span><select data-bind-audio="speed"><option value="0.75" ${c.speed===.75?'selected':''}>0.75×</option><option value="1" ${c.speed===1?'selected':''}>1×</option><option value="1.25" ${c.speed===1.25?'selected':''}>1.25×</option><option value="1.5" ${c.speed===1.5?'selected':''}>1.5×</option><option value="2" ${c.speed===2?'selected':''}>2×</option></select></label></div><div class="field-grid two"><label class="field"><span>${tr('start')}</span><input data-bind-audio="sourceStart" type="number" min="0" max="${Math.max(0,(a?.duration||c.sourceEnd)-.05)}" step="0.05" value="${(c.sourceStart||0).toFixed(2)}"></label><label class="field"><span>${tr('end')}</span><input data-bind-audio="sourceEnd" type="number" min="${(c.sourceStart||0)+.05}" max="${a?.duration||c.sourceEnd}" step="0.05" value="${c.sourceEnd.toFixed(2)}"></label></div><div class="audio-actions"><button class="secondary-btn" data-action="audio-toggle-mute">${c.muted?svgIcon('mute',16):svgIcon('volume',16)}<span>${c.muted?(state.language==='el'?'Ενεργοποίηση':'Unmute'):(state.language==='el'?'Σίγαση':'Mute')}</span></button><button class="secondary-btn" data-action="duplicate">${tr('duplicate')}</button><button class="danger-btn" data-action="delete-selected">${tr('delete')}</button></div></div></div>`
}

function effectsEmpty(){return `<div class="empty-state"><b>${tr('effects')}</b><span>${state.language==='el'?'Επίλεξε clip από το timeline.':'Select a clip on the timeline.'}</span></div>`}
function editPanel(){
  const c=selectedClip(),a=getAsset(c?.assetId); if(!c)return effectsEmpty()
  return `<div class="panel-grid compact-panels"><div class="mobile-quick-actions"><button class="sheet-action" data-action="split"><i>${svgIcon('split',19)}</i>${tr('split')}</button><button class="sheet-action" data-action="duplicate"><i>${svgIcon('copy',19)}</i>${tr('duplicate')}</button><button class="sheet-action" data-action="move" data-value="-1"><i>${svgIcon('left',19)}</i>${tr('moveLeft')}</button><button class="sheet-action" data-action="move" data-value="1"><i>${svgIcon('right',19)}</i>${tr('moveRight')}</button><button class="sheet-action danger" data-action="delete-selected"><i>${svgIcon('trash',19)}</i>${tr('delete')}</button></div><div class="panel-section"><h3>${tr('trim')}</h3><div class="field-grid two"><label class="field"><span>${tr('start')}</span><input data-bind-clip="start" type="number" step="0.05" min="0" max="${Math.max(0,(a?.duration||c.end)-.05)}" value="${c.start.toFixed(2)}"></label><label class="field"><span>${tr('end')}</span><input data-bind-clip="end" type="number" step="0.05" min="${c.start+.05}" max="${a?.duration||c.end}" value="${c.end.toFixed(2)}"></label></div>${rangeField('speed',c.speed,.25,4,.05,true,'clip')}${a?.type==='video'?rangeField('volume',c.volume,0,1,.01,true,'clip'):''}</div><div class="panel-section"><h3>${tr('transform')}</h3>${rangeField('scale',c.scale,.2,3,.01,true,'clip')}${rangeField('rotation',c.rotation,-180,180,1,true,'clip')}<div class="field-grid two">${rangeField('offsetX',c.offsetX,-.7,.7,.01,true,'clip')}${rangeField('offsetY',c.offsetY,-.7,.7,.01,true,'clip')}</div><div class="format-grid"><button class="format-btn ${c.fit==='cover'?'active':''}" data-action="clip-set" data-key="fit" data-value="cover">${tr('cover')}</button><button class="format-btn ${c.fit==='contain'?'active':''}" data-action="clip-set" data-key="fit" data-value="contain">${tr('contain')}</button><button class="format-btn ${c.flipX?'active':''}" data-action="clip-toggle" data-key="flipX">↔</button><button class="format-btn ${c.flipY?'active':''}" data-action="clip-toggle" data-key="flipY">↕</button></div></div></div>`
}
function effectsPanel(){
  const c=selectedClip(); if(!c)return effectsEmpty()
  const presets=['original','vivid','warm','cool','cinematic','film','dream','crisp','retro','soft','neon','matte','sunset','ice','noir','mono']
  return `<div class="panel-grid"><div class="panel-section borderless-mobile"><h3>${tr('filter')}</h3><div class="preset-carousel">${presets.map(n=>`<button class="preset-card ${c.filterPreset===n?'active':''}" data-action="filter" data-value="${n}"><div class="preset-preview" style="${filterPreviewStyle(n)}"></div><strong>${n[0].toUpperCase()+n.slice(1)}</strong></button>`).join('')}</div></div><div class="panel-section borderless-mobile"><h3>${tr('motion')}</h3><div class="motion-grid">${[['none',tr('none')],['zoom',tr('zoom')],['zoomout',tr('zoomOut')],['kenburns',tr('kenBurns')],['panleft',tr('panLeft')],['panright',tr('panRight')],['pulse',tr('pulse')],['float',tr('float')],['shake',tr('shake')]].map(([v,l])=>`<button class="motion-card ${c.motion===v?'active':''}" data-action="clip-set" data-key="motion" data-value="${v}"><span>${motionGlyph(v)}</span><strong>${l}</strong></button>`).join('')}</div></div></div>`
}
function motionGlyph(v){const m={none:'circle',zoom:'zoomin',zoomout:'zoomout',kenburns:'expand',panleft:'left',panright:'right',pulse:'circle',float:'movevertical',shake:'movehorizontal'};return svgIcon(m[v]||'effects',20)}
function adjustPanel(){
  const c=selectedClip(); if(!c)return effectsEmpty()
  const defs={brightness:[50,150,1],exposure:[-50,50,1],contrast:[50,160,1],saturation:[0,200,1],temperature:[-50,50,1],vignette:[0,100,1],grain:[0,100,1],hue:[-180,180,1],blur:[0,8,.1],grayscale:[0,100,1],sepia:[0,100,1],opacity:[0,1,.01]}
  const key=defs[state.adjustKey]?state.adjustKey:'brightness', [min,max,step]=defs[key], value=c[key]??(key==='opacity'?1:0)
  return `<div class="adjust-mobile"><div class="adjust-grid">${Object.keys(defs).map(k=>`<button class="adjust-tile ${key===k?'active':''}" data-action="adjust-select" data-key="${k}"><span>${adjustGlyph(k)}</span><strong>${tr(k)}</strong><small>${Number(c[k]??0).toFixed(step<1?1:0)}</small></button>`).join('')}</div><div class="adjust-focus"><div class="adjust-focus-head"><strong>${tr(key)}</strong><button data-action="reset-adjustment" data-key="${key}">${tr('reset')}</button></div>${rangeField(key,value,min,max,step,true,'clip')}</div></div>`
}
function adjustGlyph(k){const m={brightness:'sun',exposure:'half',contrast:'half',saturation:'droplet',temperature:'thermo',vignette:'circle',grain:'grain',hue:'palette',blur:'droplet',grayscale:'half',sepia:'palette',opacity:'circle'};return svgIcon(m[k]||'adjust',19)}
function transitionPanel(){
  const c=selectedClip(); if(!c)return effectsEmpty()
  const opts=[['none',tr('none')],['dissolve',tr('dissolve')],['fade',tr('fade')],['flash',tr('flash')],['slideleft',tr('slideLeft')],['slideright',tr('slideRight')],['zoom',tr('zoom')],['blur',tr('blurTransition')]]
  return `<div class="panel-grid"><div class="transition-grid">${opts.map(([v,l])=>`<button class="transition-card ${c.transition===v?'active':''}" data-action="clip-set" data-key="transition" data-value="${v}"><span class="transition-preview t-${v}"><i></i><b></b></span><strong>${l}</strong></button>`).join('')}</div><div class="panel-section borderless-mobile"><h3>${tr('duration')}</h3>${rangeField('transitionDuration',c.transitionDuration,.1,1.5,.05,true,'clip')}</div></div>`
}
function clipPanel(){const c=selectedClip();if(!c)return effectsEmpty();return `<div class="desktop-clip-stack">${editPanel()}${effectsPanel()}<div class="panel-section"><h3>${tr('adjust')}</h3>${rangeField('brightness',c.brightness,50,150,1,false,'clip')}${rangeField('exposure',c.exposure,-50,50,1,false,'clip')}${rangeField('contrast',c.contrast,50,160,1,false,'clip')}${rangeField('saturation',c.saturation,0,200,1,false,'clip')}${rangeField('temperature',c.temperature,-50,50,1,false,'clip')}${rangeField('vignette',c.vignette,0,100,1,false,'clip')}${rangeField('grain',c.grain,0,100,1,false,'clip')}${rangeField('hue',c.hue,-180,180,1,false,'clip')}${rangeField('blur',c.blur,0,8,.1,false,'clip')}</div>${transitionPanel()}</div>`}
function filterPreviewStyle(n){const f={original:'',vivid:'filter:saturate(1.4) contrast(1.1)',warm:'filter:sepia(.25) saturate(1.2)',cool:'filter:hue-rotate(18deg)',mono:'filter:grayscale(1) contrast(1.15)',film:'filter:sepia(.3) saturate(.8) contrast(1.1)',dream:'filter:brightness(1.15) saturate(1.05);opacity:.82',crisp:'filter:contrast(1.3) saturate(1.12)',cinematic:'filter:contrast(1.2) saturate(.9) sepia(.08)',retro:'filter:sepia(.3) saturate(.85) contrast(.95)',soft:'filter:brightness(1.1) contrast(.9)',neon:'filter:saturate(1.65) contrast(1.25) hue-rotate(8deg)',matte:'filter:saturate(.8) contrast(.86) brightness(1.07)',sunset:'filter:sepia(.22) saturate(1.35) hue-rotate(-8deg)',ice:'filter:saturate(1.05) hue-rotate(18deg) brightness(1.04)',noir:'filter:grayscale(1) contrast(1.45) brightness(.96)'};return f[n]||''}
function rangeField(key,value,min,max,step,show,scope){return `<label class="field"><span>${tr(key.split('.').pop())}<b>${show?Number(value).toFixed(step<1?2:0):Math.round(value)}</b></span><input data-bind-${scope}="${key}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"></label>`}
function canvasPanel(){const p=state.project;return `<div class="panel-grid"><div class="panel-section"><h3>${tr('projectCanvas')}</h3><div class="format-grid">${['16:9','9:16','1:1','4:5'].map(r=>`<button class="format-btn ${p.ratio===r?'active':''}" data-action="ratio" data-value="${r}">${r}</button>`).join('')}</div></div><div class="panel-section"><label class="field"><span>${tr('background')}</span><input data-bind-project="background" type="color" value="${safeColor(p.background,'#0b0d12')}"></label></div><div class="install-card"><strong>${tr('private')}</strong><p>${tr('privateSub')}</p></div></div>`}

function snapTime(value){if(!state.preferences.snap)return Math.max(0,value);const step=.25;return Math.max(0,Math.round(value/step)*step)}
function bindTimelineInteractions(){
  const scroll=$('#timeline-scroll'),ruler=$('[data-timeline-ruler]');if(!scroll)return
  if(ruler)ruler.addEventListener('pointerdown',e=>{const rect=ruler.getBoundingClientRect();seekTo(clamp((e.clientX-rect.left)/state.pxPerSec,0,projectDuration()))})
  $$('.timeline-audio').forEach(el=>{
    el.addEventListener('pointerdown',e=>{
      if(e.button!==undefined&&e.button!==0)return
      const clip=state.project?.audioClips.find(c=>c.id===el.dataset.id);if(!clip)return
      const startX=e.clientX,original=clip.timelineStart||0;let moved=false
      el.setPointerCapture?.(e.pointerId);el.classList.add('dragging')
      const move=ev=>{const delta=(ev.clientX-startX)/state.pxPerSec;if(Math.abs(ev.clientX-startX)>3)moved=true;const next=Math.max(0,original+delta);el.style.left=`${next*state.pxPerSec}px`}
      const up=ev=>{el.removeEventListener('pointermove',move);el.removeEventListener('pointerup',up);el.removeEventListener('pointercancel',up);el.classList.remove('dragging');if(moved){pushHistory();clip.timelineStart=snapTime(original+(ev.clientX-startX)/state.pxPerSec);state.project.updatedAt=Date.now();queueSave();renderEditor();syncAudioTracks(true)}}
      el.addEventListener('pointermove',move);el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up)
    })
  })
  $$('.timeline-clip').forEach(el=>{el.draggable=!isMobileViewport();el.addEventListener('dragstart',e=>{e.dataTransfer?.setData('text/edituno-clip',el.dataset.id);el.classList.add('dragging')});el.addEventListener('dragend',()=>el.classList.remove('dragging'));el.addEventListener('dragover',e=>e.preventDefault());el.addEventListener('drop',e=>{e.preventDefault();const source=e.dataTransfer?.getData('text/edituno-clip'),target=el.dataset.id;if(!source||!target||source===target)return;mutate(p=>{const from=p.clips.findIndex(c=>c.id===source),to=p.clips.findIndex(c=>c.id===target);if(from<0||to<0)return;const [clip]=p.clips.splice(from,1);p.clips.splice(to,0,clip);state.selected={type:'clip',id:clip.id}})})})
}

function renderExportModal() {
  const old=$('.modal-backdrop.export-modal'); if(old)old.remove()
  const el=document.createElement('div');el.className='modal-backdrop export-modal';el.innerHTML=`<section class="modal"><div class="modal-head"><h2>${tr('exportTitle')}</h2><button class="sheet-close" data-action="export-close">×</button></div><div class="modal-body"><div class="panel-grid"><div class="panel-section"><div class="field-grid two"><label class="field"><span>${tr('quality')}</span><select id="export-quality"><option value="720" ${+state.preferences.defaultQuality===720?'selected':''}>720p</option><option value="1080" ${+state.preferences.defaultQuality===1080?'selected':''}>1080p</option></select></label><label class="field"><span>${tr('frameRate')}</span><select id="export-fps"><option ${+state.preferences.defaultFps===24?'selected':''}>24</option><option ${+state.preferences.defaultFps===30?'selected':''}>30</option><option ${+state.preferences.defaultFps===60?'selected':''}>60</option></select></label></div><p class="helper">${tr('browserLimit')}</p></div><div class="install-card"><strong>${tr('exportLocal')}</strong><p>${tr('free')}</p></div><div id="export-progress-wrap" class="hidden"><div class="export-progress"><span id="export-progress"></span></div><div class="export-status" id="export-status">${tr('ready')}</div></div><div id="export-result" class="hidden"></div><button class="primary-btn full" data-action="export-start">${tr('startExport')}</button></div></div></section>`;document.body.append(el)
}

function render() { document.documentElement.lang=state.language; safeSetLanguage(state.language); state.view==='editor'?renderEditor():renderHome() }

function toast(message,type='') {
  let root=$('#toasts'); if(!root){root=document.createElement('div');root.id='toasts';root.className='toast-stack';document.body.append(root)}
  const el=document.createElement('div');el.className=`toast ${type}`;el.textContent=message;root.append(el);setTimeout(()=>el.remove(),2600)
}

async function decodeAudioAsset(assetId,audioContext){const url=state.urls[assetId];if(!url)return null;try{return await audioContext.decodeAudioData(await (await fetch(url)).arrayBuffer())}catch{return null}}
async function scheduleAudioTracks(project,audioContext,dest){
  const decoded=[]
  for(const clip of project.audioClips||[]){const buffer=await decodeAudioAsset(clip.assetId,audioContext);if(buffer)decoded.push({clip,buffer})}
  const zero=audioContext.currentTime+.04
  const nodes=[]
  for(const {clip,buffer} of decoded){
    const source=audioContext.createBufferSource(),gain=audioContext.createGain(),duration=audioClipDuration(clip),start=zero+(clip.timelineStart||0),vol=clip.muted?0:clamp(clip.volume??.8,0,1),fadeIn=Math.min(clip.fadeIn||0,duration/2),fadeOut=Math.min(clip.fadeOut||0,duration/2)
    source.buffer=buffer;source.playbackRate.value=clamp(clip.speed||1,.5,2);source.connect(gain).connect(dest)
    gain.gain.setValueAtTime(fadeIn>0?0:vol,start);if(fadeIn>0)gain.gain.linearRampToValueAtTime(vol,start+fadeIn);if(fadeOut>0){gain.gain.setValueAtTime(vol,start+duration-fadeOut);gain.gain.linearRampToValueAtTime(0,start+duration)}
    source.start(start,clip.sourceStart||0,Math.max(.05,(clip.sourceEnd||buffer.duration)-(clip.sourceStart||0)));nodes.push(source)
  }
  return nodes
}

async function exportProjectLocal(quality,fps,onProgress,signal) {
  const project=state.project; if(!project?.clips.length)throw new Error('empty')
  const [w,h]=exportDimensions(project.ratio,quality),canvas=document.createElement('canvas');canvas.width=w;canvas.height=h
  const ctx=canvas.getContext('2d',{alpha:false}), stream=canvas.captureStream(fps)
  const audioContext=new AudioContext(), dest=audioContext.createMediaStreamDestination(); const atrack=dest.stream.getAudioTracks()[0]; if(atrack)stream.addTrack(atrack)
  const mime=pickMime(); if(!mime)throw new Error('mediarecorder')
  const recorder=new MediaRecorder(stream,{mimeType:mime,videoBitsPerSecond:quality===1080?10_000_000:5_500_000,audioBitsPerSecond:192_000})
  const chunks=[];recorder.ondataavailable=e=>e.data.size&&chunks.push(e.data)
  const done=new Promise((resolve,reject)=>{recorder.onerror=()=>reject(new Error('record'));recorder.onstop=()=>resolve(new Blob(chunks,{type:mime}))})
  await audioContext.resume();const audioNodes=await scheduleAudioTracks(project,audioContext,dest);recorder.start(500)
  let global=0,total=projectDuration(project)
  try {
    for(const clip of project.clips){if(signal?.aborted)throw new DOMException('Aborted','AbortError');const asset=getAsset(clip.assetId,project),url=state.urls[clip.assetId];if(!asset||!url)continue;const dur=clipDuration(clip)
      if(asset.type==='video'){
        const v=document.createElement('video');v.src=url;v.playsInline=true;v.preload='auto';await waitLoaded(v);v.currentTime=Math.min(clip.start,Math.max(0,(v.duration||asset.duration)-.03));await waitSeek(v);v.playbackRate=clamp(clip.speed,.25,4)
        const src=audioContext.createMediaElementSource(v),gain=audioContext.createGain(),now=audioContext.currentTime,clipVol=clamp(clip.volume,0,1),fi=Math.min(clip.audioFadeIn||0,dur/2),fo=Math.min(clip.audioFadeOut||0,dur/2);gain.gain.setValueAtTime(fi?0:clipVol,now);if(fi)gain.gain.linearRampToValueAtTime(clipVol,now+fi);if(fo){gain.gain.setValueAtTime(clipVol,now+dur-fo);gain.gain.linearRampToValueAtTime(0,now+dur)};src.connect(gain).connect(dest);await v.play()
        await renderSegment(dur,fps,async elapsed=>{ctx.fillStyle=project.background||'#0b0d12';ctx.fillRect(0,0,w,h);const row={clip,start:global,end:global+dur,duration:dur};drawClipWithTransition(ctx,v,asset,row,global+elapsed,w,h,elapsed/dur);drawTexts(ctx,project,global+elapsed,w,h);onProgress((global+elapsed)/total)},signal);v.pause();src.disconnect();gain.disconnect()
      } else if(asset.type==='image'){
        const img=await loadImage(url);await renderSegment(dur,fps,async elapsed=>{ctx.fillStyle=project.background||'#0b0d12';ctx.fillRect(0,0,w,h);const row={clip,start:global,end:global+dur,duration:dur};drawClipWithTransition(ctx,img,asset,row,global+elapsed,w,h,elapsed/dur);drawTexts(ctx,project,global+elapsed,w,h);onProgress((global+elapsed)/total)},signal)
      }
      global+=dur
    }
    if(global<total){const rest=total-global;await renderSegment(rest,fps,async elapsed=>{ctx.fillStyle=project.background||'#0b0d12';ctx.fillRect(0,0,w,h);drawTexts(ctx,project,global+elapsed,w,h);onProgress((global+elapsed)/total)},signal)}
  } finally { for(const n of audioNodes||[])try{n.stop()}catch{}; if(recorder.state!=='inactive')recorder.stop(); await audioContext.close().catch(()=>{}) }
  const blob=await done;onProgress(1);return {blob,extension:mime.includes('mp4')?'mp4':'webm',mime}
}
function pickMime(){const list=['video/mp4;codecs=avc1.42E01E,mp4a.40.2','video/mp4','video/webm;codecs=vp9,opus','video/webm;codecs=vp8,opus','video/webm'];return list.find(x=>MediaRecorder.isTypeSupported(x))||''}
function waitLoaded(media){if(media.readyState>=2)return Promise.resolve();return new Promise((resolve,reject)=>{media.onloadeddata=resolve;media.onerror=reject})}
function waitSeek(media){if(!media.seeking)return Promise.resolve();return new Promise(resolve=>media.addEventListener('seeked',resolve,{once:true}))}
function renderSegment(duration,fps,draw,signal){return new Promise((resolve,reject)=>{const start=performance.now(),interval=1000/fps;let last=-interval;const tick=async now=>{if(signal?.aborted)return reject(new DOMException('Aborted','AbortError'));const ms=now-start;if(ms-last>=interval-1){last=ms;await draw(Math.min(duration,ms/1000))}if(ms>=duration*1000)resolve();else requestAnimationFrame(tick)};requestAnimationFrame(tick)})}
function getAsset(id,project=state.project){return project?.assets?.find(a=>a.id===id)}

async function beginExport() {
  if(!state.project?.clips.length){toast(tr('emptyTimeline'),'error');return}
  const q=+$('#export-quality').value,fps=+$('#export-fps').value,wrap=$('#export-progress-wrap'),bar=$('#export-progress'),status=$('#export-status'),btn=$('[data-action="export-start"]')
  wrap.classList.remove('hidden');btn.disabled=true;btn.textContent=tr('exporting');state.exportController=new AbortController()
  try{
    const result=await exportProjectLocal(q,fps,p=>{bar.style.width=`${Math.round(p*100)}%`;status.textContent=`${tr('exporting')} ${Math.round(p*100)}%`},state.exportController.signal)
    state.exportResult=result;if(state.exportUrl)URL.revokeObjectURL(state.exportUrl);state.exportUrl=URL.createObjectURL(result.blob);status.textContent=tr('exportDone');toast(tr('exportDone'),'success')
    const resultBox=$('#export-result');resultBox.classList.remove('hidden');resultBox.innerHTML=`<div class="action-row"><button class="sheet-action" data-action="download-export"><i>${svgIcon('export',19)}</i>${tr('download')}</button><button class="sheet-action" data-action="share-export"><i>${svgIcon('share',19)}</i>${tr('share')}</button><button class="sheet-action" data-action="export-close"><i>${svgIcon('check',19)}</i>${tr('close')}</button></div>`
  }catch(e){status.textContent=tr('exportFailed');toast(tr('exportFailed'),'error');console.error(e)}finally{btn.disabled=false;btn.textContent=tr('startExport')}
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
    if(a==='home-menu-toggle'){state.homeMenuOpen=!state.homeMenuOpen;renderHome();return}
    if(a==='home-menu-close'){state.homeMenuOpen=false;renderHome();return}
    if(a==='create')return createProject(el.dataset.ratio||'16:9')
    if(a==='create-import'){state.homeMenuOpen=false;return createProject(isMobileViewport()?'9:16':'16:9',true)}
    if(a==='open-project'){state.projectHubOpen=false;state.homeMenuOpen=false;return openProject(el.dataset.id)}
    if(a==='delete-project'){e.stopPropagation();if(confirm(tr('delete')+'?')){await deleteProjectFull(el.dataset.id);state.projects=await listProjects();renderHome();toast(tr('deleted'))}return}
    if(a==='language'){state.language=state.language==='el'?'en':'el';state.homeMenuOpen=false;render();return}
    if(a==='set-lang'){state.language=el.dataset.value;state.homeMenuOpen=false;render();return}
    if(a==='pref-toggle'){const key=el.dataset.key;state.preferences[key]=!state.preferences[key];if(key==='showWaveforms')renderEditor();savePreferences();render();return}
    if(a==='settings'){state.homeMenuOpen=false;state.settingsOpen=true;render();return}
    if(a==='settings-close'){state.settingsOpen=false;render();return}
    if(a==='install'){state.homeMenuOpen=false;state.installOpen=true;render();return}
    if(a==='install-close'){state.installOpen=false;render();return}
    if(a==='install-confirm'&&state.installPrompt){await state.installPrompt.prompt();await state.installPrompt.userChoice;state.installPrompt=null;state.installOpen=false;render();return}
    if(a==='persist-storage'){const ok=await navigator.storage?.persist?.();toast(ok?'✓ '+tr('persistent'):tr('storage'));return}
    if(a==='clear-all'){if(confirm(tr('confirmClear'))){for(const p of await listProjects())await deleteProjectFull(p.id);state.projects=[];state.settingsOpen=false;render();}return}
    if(a==='home-top'){window.scrollTo({top:0,behavior:'smooth'});return}
    if(a==='projects-scroll'){$('#projects-section')?.scrollIntoView({behavior:'smooth'});return}
    if(a==='back')return goHome()
    if(a==='mobile-hub'){state.projectHubOpen=true;renderEditor();return}
    if(a==='mobile-hub-close'){state.projectHubOpen=false;renderEditor();return}
    if(a==='pick-media'){$('#media-picker')?.click();return}
    if(a==='add-asset')return addAssetToTimeline(el.dataset.id)
    if(a==='add-audio'||a==='set-soundtrack')return addAudioToTimeline(el.dataset.id)
    if(a==='select-audio')return selectAudio(el.dataset.id)
    if(a==='select-clip')return selectClip(el.dataset.id)
    if(a==='select-text')return selectText(el.dataset.id)
    if(a==='tool'){state.tool=el.dataset.tool;state.sheet=el.dataset.tool;renderEditor();return}
    if(a==='select-transition'){state.selected={type:'clip',id:el.dataset.id};state.tool='transitions';state.sheet='transitions';renderEditor();return}
    if(a==='timeline-zoom'){state.pxPerSec=clamp(state.pxPerSec+(+el.dataset.value)*12,24,120);state.preferences.timelineScale=state.pxPerSec;savePreferences();renderEditor();return}
    if(a==='adjust-select'){state.adjustKey=el.dataset.key;state.tool='adjust';state.sheet='adjust';renderEditor();return}
    if(a==='reset-adjustment'){const c=selectedClip();if(!c)return;const defaults={brightness:100,exposure:0,contrast:100,saturation:100,temperature:0,vignette:0,grain:0,hue:0,blur:0,grayscale:0,sepia:0,opacity:1};mutate(p=>p.clips.find(x=>x.id===c.id)[el.dataset.key]=defaults[el.dataset.key]??0);return}
    if(a==='sheet-close'){state.sheet=null;renderEditor();return}
    if(a==='play-toggle'){state.playing?stopPlayback():startPlayback();return}
    if(a==='jump-start'){seekTo(0);return}
    if(a==='undo')return undo()
    if(a==='redo')return redo()
    if(a==='split')return splitAtPlayhead()
    if(a==='duplicate')return duplicateSelected()
    if(a==='delete-selected')return deleteSelected()
    if(a==='move')return moveSelected(+el.dataset.value)
    if(a==='filter')return applyFilter(el.dataset.value)
    if(a==='clip-set'){const c=selectedClip();if(!c)return;mutate(p=>p.clips.find(x=>x.id===c.id)[el.dataset.key]=el.dataset.value);return}
    if(a==='clip-toggle'){const c=selectedClip();if(!c)return;mutate(p=>{const x=p.clips.find(y=>y.id===c.id);x[el.dataset.key]=!x[el.dataset.key]});return}
    if(a==='add-text')return addText(el.dataset.kind)
    if(a==='open-srt'){$('#subtitle-picker')?.click();return}
    if(a==='toggle-loop')return mutate(p=>p.soundtrack.loop=!p.soundtrack.loop)
    if(a==='audio-toggle-mute'){const c=selectedAudio();if(!c)return;mutate(p=>{const x=p.audioClips.find(y=>y.id===c.id);x.muted=!x.muted});syncAudioTracks(true);return}
    if(a==='remove-soundtrack'){const c=selectedAudio();if(c){deleteSelected();syncAudioTracks(true)}return}
    if(a==='ratio')return mutate(p=>p.ratio=el.dataset.value)
    if(a==='export'){renderExportModal();return}
    if(a==='export-close'){state.exportController?.abort();$('.export-modal')?.remove();return}
    if(a==='export-start')return beginExport()
    if(a==='download-export')return downloadExport()
    if(a==='share-export')return shareExport()
  })

  document.addEventListener('input',e=>{
    const el=e.target
    if(el.id==='seekbar'){seekTo(+el.value);return}
    if(el.id==='project-name'&&state.project){state.project.name=el.value;queueSave();return}
    const clipKey=el.dataset.bindClip,textKey=el.dataset.bindText,audioKey=el.dataset.bindAudio,projectKey=el.dataset.bindProject,prefKey=el.dataset.pref
    if(prefKey){let val=(el.type==='range'||el.type==='number'||el.tagName==='SELECT'&&/^\d/.test(el.value))?+el.value:el.value;state.preferences[prefKey]=val;if(prefKey==='timelineScale')state.pxPerSec=+val;savePreferences();if(state.view==='editor'){fitPreviewFrame();if(prefKey==='timelineScale'||prefKey==='showWaveforms')renderEditor()}return}
    if(clipKey){const c=selectedClip();if(!c)return;const val=el.type==='range'||el.type==='number'?+el.value:el.value;const obj=state.project.clips.find(x=>x.id===c.id);obj[clipKey]=val;if(clipKey==='start')obj.start=Math.min(obj.start,obj.end-.05);if(clipKey==='end')obj.end=Math.max(obj.end,obj.start+.05);queueSave();drawPreview();updateRangeLabel(el);return}
    if(textKey){const t=selectedText();if(!t)return;let val=(el.type==='range'||el.type==='number')?+el.value:el.value;if(textKey==='weight')val=+val;const obj=state.project.texts.find(x=>x.id===t.id);obj[textKey]=val;if(textKey==='start')obj.start=Math.max(0,Math.min(obj.start,obj.end-.05));if(textKey==='end')obj.end=Math.max(obj.end,obj.start+.05);queueSave();drawPreview();updateRangeLabel(el);return}
    if(audioKey){const c=selectedAudio();if(!c)return;let val=(el.type==='range'||el.type==='number'||el.tagName==='SELECT')?+el.value:el.value;const obj=state.project.audioClips.find(x=>x.id===c.id);obj[audioKey]=val;if(audioKey==='sourceStart')obj.sourceStart=Math.max(0,Math.min(obj.sourceStart,obj.sourceEnd-.05));if(audioKey==='sourceEnd')obj.sourceEnd=Math.max(obj.sourceStart+.05,obj.sourceEnd);if(audioKey==='timelineStart')obj.timelineStart=snapTime(obj.timelineStart);queueSave();syncAudioTracks(true);updateRangeLabel(el);return}
    if(projectKey&&state.project){state.project[projectKey]=el.value;queueSave();drawPreview();return}
  })
  document.addEventListener('change',e=>{
    const el=e.target
    if(el.matches('[data-bind-clip],[data-bind-text],[data-bind-audio],[data-bind-project]')&&state.view==='editor')setTimeout(()=>renderEditor(),0);if(el.matches('[data-pref]')){savePreferences();if(state.view==='editor')setTimeout(()=>renderEditor(),0)}
  })
  $('#media-picker').addEventListener('change',async e=>{const files=[...e.target.files];e.target.value='';await importFiles(files,true)})
  $('#subtitle-picker').addEventListener('change',async e=>{const file=e.target.files?.[0];e.target.value='';if(file)await importSrt(file)})

  window.addEventListener('resize',()=>state.view==='editor'&&fitPreviewFrame())
  window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();state.installPrompt=e})
  window.addEventListener('keydown',e=>{
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
  try {
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

    if('serviceWorker' in navigator && location.protocol.startsWith('http')) {
      const register=()=>navigator.serviceWorker.register('./sw.js?v=1.6.0',{updateViaCache:'none'}).then(reg=>reg.update().catch(()=>{})).catch(error=>console.warn('Service worker registration failed:',error))
      if(document.readyState==='complete')register();else window.addEventListener('load',register,{once:true})
    }
  } catch(error) {
    console.error('Edituno initialization failed:',error)
    const app=$('#app');if(app)app.innerHTML=`<main class="startup-error"><div><img src="${EDITUNO_ICON}" alt="Edituno" style="width:72px;height:72px;border-radius:18px"><strong>Edituno</strong><p>${state.language==='el'?'Η εφαρμογή δεν μπόρεσε να ξεκινήσει. Πάτησε επαναφόρτωση.':'The app could not start. Reload to retry.'}</p><button onclick="location.reload()" class="primary-btn">${state.language==='el'?'Επαναφόρτωση':'Reload'}</button></div></main>`
  }
}

init()
