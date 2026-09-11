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

const STRINGS = {
  en: {
    create:'Create project', import:'Import media', recent:'Recent projects', noProjects:'No projects yet',
    homeLead:'Edit video. Keep control.', homeBody:'A fast, private editor built for mobile first. Cut clips, add text, music, effects and export without uploading your footage.',
    free:'Free. No watermark. No account.', newProject:'New project', templates:'Start with a format', projects:'Projects', settings:'Settings',
    private:'Local by default', privateSub:'Your media stays on this device.', offline:'Works offline', offlineSub:'Install once and keep editing.', noAccount:'No account', noAccountSub:'Open Edituno and start.',
    open:'Open', delete:'Delete', edit:'Edit', export:'Export', media:'Media', text:'Text', audio:'Audio', effects:'Effects', canvas:'Canvas',
    addMedia:'Add media', addTimeline:'Add', soundtrack:'Soundtrack', useSoundtrack:'Use', remove:'Remove', captions:'Captions', importSrt:'Import SRT',
    addTitle:'Add title', addCaption:'Add caption', addSticker:'Add sticker', selectedClip:'Selected clip', clip:'Clip', trim:'Trim', transform:'Transform',
    speed:'Speed', volume:'Volume', opacity:'Opacity', scale:'Scale', rotation:'Rotation', fit:'Fit', cover:'Cover', contain:'Contain', mirror:'Mirror',
    split:'Split', duplicate:'Duplicate', moveLeft:'Left', moveRight:'Right', brightness:'Brightness', contrast:'Contrast', saturation:'Saturation',
    hue:'Hue', blur:'Blur', grayscale:'Grayscale', sepia:'Sepia', filter:'Filter', motion:'Motion', transition:'Transition', duration:'Duration',
    none:'None', fade:'Fade', flash:'Flash', zoom:'Zoom', panLeft:'Pan left', panRight:'Pan right', zoomOut:'Zoom out', shake:'Shake',
    original:'Original', vivid:'Vivid', warm:'Warm', cool:'Cool', mono:'Mono', film:'Film', dream:'Dream', crisp:'Crisp',
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
    desktopMedia:'Project media', inspector:'Properties'
  },
  el: {
    create:'Δημιουργία project', import:'Εισαγωγή media', recent:'Πρόσφατα projects', noProjects:'Δεν υπάρχουν projects ακόμα',
    homeLead:'Επεξεργασία video. Χωρίς περιορισμούς.', homeBody:'Γρήγορος, ιδιωτικός editor σχεδιασμένος πρώτα για κινητό. Κόψε clips, βάλε κείμενο, μουσική, εφέ και κάνε export χωρίς upload.',
    free:'Δωρεάν. Χωρίς watermark. Χωρίς λογαριασμό.', newProject:'Νέο project', templates:'Ξεκίνα με format', projects:'Projects', settings:'Ρυθμίσεις',
    private:'Τοπικά από προεπιλογή', privateSub:'Τα αρχεία μένουν στη συσκευή σου.', offline:'Λειτουργεί offline', offlineSub:'Εγκατέστησέ το μία φορά και συνέχισε.', noAccount:'Χωρίς λογαριασμό', noAccountSub:'Άνοιξε το Edituno και ξεκίνα.',
    open:'Άνοιγμα', delete:'Διαγραφή', edit:'Επεξεργασία', export:'Export', media:'Media', text:'Κείμενο', audio:'Ήχος', effects:'Εφέ', canvas:'Καμβάς',
    addMedia:'Προσθήκη media', addTimeline:'Προσθήκη', soundtrack:'Μουσική', useSoundtrack:'Χρήση', remove:'Αφαίρεση', captions:'Υπότιτλοι', importSrt:'Εισαγωγή SRT',
    addTitle:'Προσθήκη τίτλου', addCaption:'Προσθήκη caption', addSticker:'Προσθήκη sticker', selectedClip:'Επιλεγμένο clip', clip:'Clip', trim:'Trim', transform:'Μετασχηματισμός',
    speed:'Ταχύτητα', volume:'Ένταση', opacity:'Διαφάνεια', scale:'Μέγεθος', rotation:'Περιστροφή', fit:'Προσαρμογή', cover:'Γέμισμα', contain:'Ολόκληρο', mirror:'Καθρέφτης',
    split:'Κόψιμο', duplicate:'Αντιγραφή', moveLeft:'Αριστερά', moveRight:'Δεξιά', brightness:'Φωτεινότητα', contrast:'Αντίθεση', saturation:'Κορεσμός',
    hue:'Απόχρωση', blur:'Θόλωμα', grayscale:'Ασπρόμαυρο', sepia:'Σέπια', filter:'Φίλτρο', motion:'Κίνηση', transition:'Μετάβαση', duration:'Διάρκεια',
    none:'Καμία', fade:'Fade', flash:'Flash', zoom:'Zoom', panLeft:'Pan αριστερά', panRight:'Pan δεξιά', zoomOut:'Zoom out', shake:'Shake',
    original:'Original', vivid:'Vivid', warm:'Warm', cool:'Cool', mono:'Mono', film:'Film', dream:'Dream', crisp:'Crisp',
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
    desktopMedia:'Media project', inspector:'Ιδιότητες'
  }
}

const state = {
  language: localStorage.getItem('edituno-language') || (navigator.language.toLowerCase().startsWith('el') ? 'el' : 'en'),
  view: 'home', projects: [], project: null, urls: {}, currentTime: 0, playing: false,
  selected: null, tool: 'media', sheet: null, history: [], future: [], installPrompt: null,
  exportController: null, exportResult: null, exportUrl: null, pxPerSec: 48, currentPreviewAsset: null,
  settingsOpen: false, installOpen: false
}
const tr = key => STRINGS[state.language][key] ?? STRINGS.en[key] ?? key

const DB_NAME = 'edituno-db'
const DB_VERSION = 2
const PROJECTS = 'projects'
const BLOBS = 'blobs'
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
  const db = await openDb()
  await new Promise((resolve,reject) => {
    const tx = db.transaction(store,'readwrite')
    key === undefined ? tx.objectStore(store).put(value) : tx.objectStore(store).put(value,key)
    tx.oncomplete = resolve
    tx.onerror = () => reject(tx.error)
  })
  db.close()
}
async function dbGet(store, key) {
  const db = await openDb()
  const out = await new Promise((resolve,reject) => {
    const req = db.transaction(store,'readonly').objectStore(store).get(key)
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
  db.close(); return out
}
async function dbAll(store) {
  const db = await openDb()
  const out = await new Promise((resolve,reject) => {
    const req = db.transaction(store,'readonly').objectStore(store).getAll()
    req.onsuccess = () => resolve(req.result || [])
    req.onerror = () => reject(req.error)
  })
  db.close(); return out
}
async function dbDelete(store,key) {
  const db = await openDb()
  await new Promise((resolve,reject)=>{
    const tx=db.transaction(store,'readwrite'); tx.objectStore(store).delete(key); tx.oncomplete=resolve; tx.onerror=()=>reject(tx.error)
  }); db.close()
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
const imageCache = new Map()
let rafId = 0
let playStartPerf = 0
let playStartTime = 0

function projectDuration(project = state.project) {
  return (project?.clips || []).reduce((sum,c)=>sum + clipDuration(c),0)
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
  if (ratio==='9:16') return [540,960]
  if (ratio==='1:1') return [800,800]
  if (ratio==='4:5') return [720,900]
  return [960,540]
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
  const rect=zone.getBoundingClientRect(), ratio=ratioValue(state.project.ratio)
  const maxW=Math.max(100,rect.width-24), maxH=Math.max(100,rect.height-24-(window.innerWidth>=980?54:0))
  let w=maxW, h=w/ratio
  if (h>maxH) { h=maxH; w=h*ratio }
  frame.style.width=`${Math.floor(w)}px`; frame.style.height=`${Math.floor(h)}px`
  const [cw,ch]=previewDimensions(state.project.ratio)
  if (canvas.width!==cw) canvas.width=cw
  if (canvas.height!==ch) canvas.height=ch
  drawPreview()
}

function applyClipDrawing(ctx, source, asset, clip, width, height, localProgress=0, globalAlpha=1) {
  ctx.save()
  const b=clip.brightness ?? 100, c=clip.contrast ?? 100, s=clip.saturation ?? 100, h=clip.hue ?? 0, blur=clip.blur ?? 0, gray=clip.grayscale ?? 0, sep=clip.sepia ?? 0
  ctx.filter=`brightness(${b}%) contrast(${c}%) saturate(${s}%) hue-rotate(${h}deg) blur(${blur}px) grayscale(${gray}%) sepia(${sep}%)`
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
}

function transitionAlpha(row,time) {
  const clip=row.clip, d=Math.min(Number(clip.transitionDuration)||.3,row.duration/2)
  if (!clip.transition || clip.transition==='none' || d<=0) return 1
  const local=time-row.start
  if (local<d) return local/d
  if (row.end-time<d) return (row.end-time)/d
  return 1
}
function drawTransitionOverlay(ctx,row,time,w,h) {
  const clip=row.clip, d=Math.min(Number(clip.transitionDuration)||.3,row.duration/2)
  if (!clip.transition || clip.transition==='none' || d<=0) return
  const local=time-row.start
  const edge = local<d ? 1-local/d : row.end-time<d ? 1-(row.end-time)/d : 0
  if (edge<=0) return
  if (clip.transition==='fade') { ctx.fillStyle=`rgba(0,0,0,${edge})`; ctx.fillRect(0,0,w,h) }
  if (clip.transition==='flash') { ctx.fillStyle=`rgba(255,255,255,${edge})`; ctx.fillRect(0,0,w,h) }
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
        if (previewVideo.readyState>=2) applyClipDrawing(ctx,previewVideo,asset,row.clip,w,h,progress,transitionAlpha(row,state.currentTime))
      } else if (asset.type==='image') {
        try { const img=await loadImage(url); applyClipDrawing(ctx,img,asset,row.clip,w,h,progress,transitionAlpha(row,state.currentTime)) } catch {}
      }
      drawTransitionOverlay(ctx,row,state.currentTime,w,h)
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

function syncSoundtrack() {
  const st=state.project?.soundtrack
  if (!st) { previewAudio.pause(); previewAudio.removeAttribute('src'); return }
  const url=state.urls[st.assetId]; if (!url) return
  if (previewAudio.src!==url) { previewAudio.src=url; previewAudio.load() }
  previewAudio.volume=clamp(st.volume??.7,0,1); previewAudio.loop=Boolean(st.loop)
  if (previewAudio.readyState>=1 && Number.isFinite(previewAudio.duration)) {
    const target=st.loop && previewAudio.duration ? state.currentTime%previewAudio.duration : Math.min(state.currentTime,previewAudio.duration-.05)
    if (Math.abs(previewAudio.currentTime-target)>.35) previewAudio.currentTime=Math.max(0,target)
  }
  if (state.playing) previewAudio.play().catch(()=>{}); else previewAudio.pause()
}

function updatePlaybackUi() {
  const dur=projectDuration(), seek=$('#seekbar'), time=$('#timecode'), play=$('[data-action="play-toggle"]'), head=$('.playhead')
  if (seek) { seek.max=dur||1; seek.value=state.currentTime }
  if (time) time.textContent=`${fmtTime(state.currentTime)} / ${fmtTime(dur)}`
  if (play) { play.textContent=state.playing?'❚❚':'▶'; play.setAttribute('aria-label',state.playing?tr('pause'):tr('play')) }
  if (head) head.style.left=`${Math.max(0,state.currentTime*state.pxPerSec)+10}px`
}
function playbackLoop(now) {
  if (!state.playing) return
  const dur=projectDuration()
  state.currentTime=Math.min(dur,playStartTime+(now-playStartPerf)/1000)
  const row=activeAt(state.currentTime)
  if (!row || state.currentTime>=dur) { stopPlayback(true); return }
  ensureActiveMediaForPlayback(row)
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
  syncSoundtrack(); const row=activeAt(state.currentTime); if(row) ensureActiveMediaForPlayback(row)
  updatePlaybackUi(); cancelAnimationFrame(rafId); rafId=requestAnimationFrame(playbackLoop)
}
function stopPlayback(atEnd=false) {
  state.playing=false; cancelAnimationFrame(rafId); previewVideo.pause(); previewAudio.pause()
  if (atEnd) state.currentTime=projectDuration()
  updatePlaybackUi(); drawPreview()
}
function seekTo(value) {
  state.currentTime=clamp(value,0,projectDuration()); if(state.playing){playStartTime=state.currentTime;playStartPerf=performance.now()}
  const row=activeAt(state.currentTime); if(row) ensureActiveMediaForPlayback(row); syncSoundtrack(); updatePlaybackUi(); drawPreview()
}

function defaultProject(ratio='16:9') {
  const now=Date.now()
  return { id:uid(), name:state.language==='el'?'Νέο project':'Untitled project', createdAt:now, updatedAt:now, ratio, background:'#0b0d12', assets:[], clips:[], texts:[], soundtrack:null }
}
function normalizeProject(p) {
  p.background ||= '#0b0d12'; p.assets ||= []; p.clips ||= []; p.texts ||= p.textOverlays || []; p.soundtrack ||= null
  for (const c of p.clips) Object.assign(c,{brightness:100,contrast:100,saturation:100,hue:0,blur:0,grayscale:0,sepia:0,motion:'none',transition:'none',transitionDuration:.3,offsetX:0,offsetY:0,flipX:false,flipY:false},c)
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
async function importFiles(files, addVisuals=true) {
  if(!state.project || !files?.length) return
  const added=[]
  for(const file of files) {
    try {
      const meta=await mediaMetadata(file), id=uid()
      const asset={id,name:file.name,type:meta.type,mimeType:file.type,duration:meta.duration,width:meta.width,height:meta.height,size:file.size}
      await putBlob(id,file); state.project.assets.push(asset); state.urls[id]=URL.createObjectURL(file); added.push(asset)
      if(addVisuals && (asset.type==='video'||asset.type==='image')) state.project.clips.push(defaultClip(asset))
      if(asset.type==='audio' && !state.project.soundtrack) state.project.soundtrack={assetId:id,volume:.7,loop:true}
    } catch { toast(tr('unsupported'),'error') }
  }
  state.project.updatedAt=Date.now(); await saveProject(state.project); state.projects=await listProjects(); toast(tr('imported'),'success'); renderEditor()
}
function defaultClip(asset) {
  return { id:uid(),assetId:asset.id,start:0,end:asset.type==='image'?Math.max(1,asset.duration||4):Math.max(.1,asset.duration||4),speed:1,volume:1,scale:1,rotation:0,opacity:1,fit:'cover',offsetX:0,offsetY:0,flipX:false,flipY:false,brightness:100,contrast:100,saturation:100,hue:0,blur:0,grayscale:0,sepia:0,motion:'none',transition:'none',transitionDuration:.3 }
}
function addAssetToTimeline(id) { const asset=getAsset(id); if(!asset||asset.type==='audio')return; mutate(p=>p.clips.push(defaultClip(asset))); }
function setSoundtrack(id) { const asset=getAsset(id); if(!asset||asset.type!=='audio')return; mutate(p=>p.soundtrack={assetId:id,volume:.7,loop:true}); syncSoundtrack() }

function selectedClip() { return state.selected?.type==='clip' ? state.project?.clips.find(c=>c.id===state.selected.id) : null }
function selectedText() { return state.selected?.type==='text' ? state.project?.texts.find(t=>t.id===state.selected.id) : null }
function selectClip(id) { state.selected={type:'clip',id}; state.tool='effects'; state.sheet='effects'; renderEditor() }
function selectText(id) { state.selected={type:'text',id}; state.tool='text'; state.sheet='text'; renderEditor() }

function splitAtPlayhead() {
  const row=activeAt(state.currentTime); if(!row) return
  const clip=row.clip, source=sourceTime(row,state.currentTime)
  if(source<=clip.start+.08 || source>=clip.end-.08) return
  mutate(p=>{
    const idx=p.clips.findIndex(c=>c.id===clip.id), a={...clip,id:uid(),end:source}, b={...clip,id:uid(),start:source}
    p.clips.splice(idx,1,a,b); state.selected={type:'clip',id:b.id}
  })
}
function duplicateSelected() { const clip=selectedClip(); if(!clip)return; mutate(p=>{const idx=p.clips.findIndex(c=>c.id===clip.id); const c={...clone(clip),id:uid()};p.clips.splice(idx+1,0,c);state.selected={type:'clip',id:c.id}}) }
function deleteSelected() {
  if(state.selected?.type==='clip') mutate(p=>{p.clips=p.clips.filter(c=>c.id!==state.selected.id);state.selected=null})
  else if(state.selected?.type==='text') mutate(p=>{p.texts=p.texts.filter(t=>t.id!==state.selected.id);state.selected=null})
}
function moveSelected(delta) { const clip=selectedClip(); if(!clip)return; mutate(p=>{const i=p.clips.findIndex(c=>c.id===clip.id),j=clamp(i+delta,0,p.clips.length-1);if(i!==j){const [x]=p.clips.splice(i,1);p.clips.splice(j,0,x)}}) }

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
    original:{brightness:100,contrast:100,saturation:100,hue:0,blur:0,grayscale:0,sepia:0},
    vivid:{brightness:104,contrast:112,saturation:135,hue:0,blur:0,grayscale:0,sepia:0},
    warm:{brightness:104,contrast:105,saturation:115,hue:-8,blur:0,grayscale:0,sepia:12},
    cool:{brightness:101,contrast:108,saturation:108,hue:12,blur:0,grayscale:0,sepia:0},
    mono:{brightness:102,contrast:116,saturation:100,hue:0,blur:0,grayscale:100,sepia:0},
    film:{brightness:96,contrast:112,saturation:88,hue:-4,blur:0,grayscale:0,sepia:20},
    dream:{brightness:109,contrast:92,saturation:108,hue:5,blur:1.2,grayscale:0,sepia:6},
    crisp:{brightness:101,contrast:124,saturation:112,hue:0,blur:0,grayscale:0,sepia:0}
  }
  mutate(p=>Object.assign(p.clips.find(x=>x.id===c.id),presets[name]||presets.original))
}

function renderLogo() { return `<span class="logo-lockup"><img class="logo-img" src="./icons/icon-192.png?v=1.0.1" alt=""><span>Edituno</span></span>` }
function renderHome() {
  const app=$('#app'); const projects=state.projects
  app.innerHTML=`<div class="app-page">
    <header class="mobile-header">
      ${renderLogo()}
      <div class="header-actions">
        <button class="lang-pill" data-action="language">${state.language==='el'?'EN':'ΕΛ'}</button>
        <button class="text-btn desktop-only" data-action="install">${tr('install')}</button>
        <button class="icon-btn" aria-label="${tr('settings')}" data-action="settings">⚙</button>
      </div>
    </header>
    <main class="home-main">
      <section class="home-intro">
        <div><div class="home-kicker">Edituno · ${tr('local')}</div><h1>${tr('homeLead')}</h1></div>
        <div><p><strong>${tr('free')}</strong><br>${tr('homeBody')}</p></div>
      </section>

      <section class="create-card">
        <div class="create-card-top"><div class="create-badge">＋</div><div><h2>${tr('newProject')}</h2><p>${tr('privateSub')}</p></div></div>
        <div class="create-actions">
          <button class="primary-btn" data-action="create" data-ratio="16:9">＋ ${tr('create')}</button>
          <button class="secondary-btn" data-action="create-import">▣ ${tr('import')}</button>
        </div>
      </section>

      <section class="home-section">
        <div class="section-head"><div><h2>${tr('templates')}</h2><p>TikTok · Reels · Shorts · YouTube</p></div></div>
        <div class="template-scroller">
          ${templateCard('9:16','Vertical','TikTok · Reels','r916')}
          ${templateCard('16:9','Landscape','YouTube','r169')}
          ${templateCard('1:1','Square','Social','r11')}
          ${templateCard('4:5','Portrait','Feed','r45')}
        </div>
      </section>

      <section class="home-section" id="projects-section">
        <div class="section-head"><div><h2>${tr('recent')}</h2><p>${projects.length ? `${projects.length} ${tr('projects').toLowerCase()}` : tr('noProjects')}</p></div></div>
        <div class="project-list">
          ${projects.length ? projects.map(projectCard).join('') : `<div class="empty-state"><b>${tr('noProjects')}</b><span>${tr('create')}</span></div>`}
        </div>
      </section>

      <section class="home-section">
        <div class="trust-grid">
          ${trustCard('⌂',tr('private'),tr('privateSub'))}
          ${trustCard('↻',tr('offline'),tr('offlineSub'))}
          ${trustCard('○',tr('noAccount'),tr('noAccountSub'))}
        </div>
      </section>
    </main>
    <nav class="mobile-nav" aria-label="Main navigation">
      <button class="nav-btn active" data-action="home-top"><span class="nav-icon">⌂</span><span>Home</span></button>
      <button class="nav-btn" data-action="projects-scroll"><span class="nav-icon">▦</span><span>${tr('projects')}</span></button>
      <button class="nav-btn create-nav" data-action="create" data-ratio="16:9"><span class="nav-icon">＋</span><span>${tr('create')}</span></button>
      <button class="nav-btn" data-action="settings"><span class="nav-icon">⚙</span><span>${tr('settings')}</span></button>
    </nav>
    ${state.settingsOpen?settingsModal():''}${state.installOpen?installModal():''}
  </div><div class="toast-stack" id="toasts"></div>`
}
function templateCard(ratio,title,sub,cls){return `<button class="template-card" data-action="create" data-ratio="${ratio}"><span class="template-shape"><i class="${cls}"></i></span><strong>${title}</strong><span>${sub}</span></button>`}
function trustCard(icon,title,sub){return `<div class="trust-card"><div class="trust-icon">${icon}</div><div><strong>${title}</strong><span>${sub}</span></div></div>`}
function projectCard(p){return `<article class="project-card" data-action="open-project" data-id="${p.id}"><div class="project-thumb">▶</div><div class="project-copy"><strong>${escapeHtml(p.name)}</strong><span>${new Date(p.updatedAt).toLocaleDateString(state.language==='el'?'el-GR':'en-US')} · ${escapeHtml(p.ratio||'16:9')}</span></div><button class="project-more" data-action="delete-project" data-id="${p.id}" aria-label="${tr('delete')}">⋯</button></article>`}

function settingsModal(){return `<div class="modal-backdrop" data-action="settings-close"><section class="modal" onclick="event.stopPropagation()"><div class="modal-head"><h2>${tr('settings')}</h2><button class="sheet-close" data-action="settings-close">×</button></div><div class="modal-body"><div class="panel-grid">
  <div class="panel-section"><h3>${tr('language')}</h3><div class="format-grid"><button class="format-btn ${state.language==='el'?'active':''}" data-action="set-lang" data-value="el">Ελληνικά</button><button class="format-btn ${state.language==='en'?'active':''}" data-action="set-lang" data-value="en">English</button></div></div>
  <div class="install-card"><strong>${tr('installHint')}</strong><p>${tr('chromeInstall')}</p><button class="primary-btn full" data-action="install">${tr('installApp')}</button></div>
  <div class="panel-section"><h3>${tr('storage')}</h3><p class="helper">${tr('persistent')}</p><button class="secondary-btn" data-action="persist-storage">${tr('requestStorage')}</button></div>
  <div class="panel-section"><button class="danger-btn" data-action="clear-all">${tr('clearAll')}</button></div>
</div></div></section></div>`}
function installModal(){const ios=/iphone|ipad|ipod/i.test(navigator.userAgent);return `<div class="modal-backdrop" data-action="install-close"><section class="modal" onclick="event.stopPropagation()"><div class="modal-head"><h2>${tr('installTitle')}</h2><button class="sheet-close" data-action="install-close">×</button></div><div class="modal-body"><div class="install-card"><strong>Edituno</strong><p>${ios?tr('iosInstall'):tr('chromeInstall')}</p>${!ios&&state.installPrompt?`<button class="primary-btn full" data-action="install-confirm">${tr('installApp')}</button>`:''}</div></div></section></div>`}

function renderEditor() {
  if(!state.project) return
  const app=$('#app'), p=state.project, dur=projectDuration(), rows=clipTimeline()
  const totalWidth=Math.max(320,Math.ceil(dur*state.pxPerSec)+60)
  app.innerHTML=`<div class="editor-page">
    <header class="editor-header">
      <button class="icon-btn" data-action="back" aria-label="${tr('back')}">‹</button>
      <div class="editor-title-wrap"><input class="editor-title" id="project-name" aria-label="${tr('projectName')}" value="${escapeHtml(p.name)}" /></div>
      <span class="editor-save-state" id="save-state">${tr('save')}</span>
      <div class="editor-header-actions"><button class="primary-btn" data-action="export">${tr('export')}</button></div>
    </header>

    <main class="editor-body">
      <aside class="desktop-sidebar">${desktopSidebar()}</aside>
      <section class="preview-zone">
        <div class="preview-wrap"><div class="preview-frame"><canvas id="preview-canvas"></canvas><div class="preview-empty ${rows.length?'hidden':''}"><strong>${tr('emptyTimeline')}</strong><button class="secondary-btn" data-action="pick-media">＋ ${tr('addMedia')}</button></div><span class="preview-overlay-badge">${escapeHtml(p.ratio)}</span></div></div>
      </section>
      <div class="transport"><button class="icon-btn" data-action="jump-start" aria-label="Start">↤</button><button class="icon-btn" data-action="play-toggle" aria-label="${tr('play')}">▶</button><input id="seekbar" class="seekbar" type="range" min="0" max="${dur||1}" step="0.01" value="${state.currentTime}" /><span class="timecode" id="timecode">${fmtTime(state.currentTime)} / ${fmtTime(dur)}</span></div>
      <section class="timeline-panel">
        <div class="timeline-toolbar"><div class="timeline-toolbar-left"><strong style="font-size:11px">${tr('timeline')}</strong></div><div class="timeline-toolbar-right"><button data-action="undo" title="${tr('undo')}">↶</button><button data-action="redo" title="${tr('redo')}">↷</button><button data-action="split" title="${tr('split')}">✂</button></div></div>
        <div class="timeline-scroll" id="timeline-scroll"><div style="width:${totalWidth}px;position:relative;min-height:126px"><div class="timeline-ruler">${timelineRuler(dur,totalWidth)}</div><div class="timeline-track">${rows.length?rows.map(r=>timelineClip(r)).join(''):`<div style="width:100%;border:1px dashed var(--line-2);border-radius:12px;display:grid;place-items:center;color:var(--muted);font-size:10px">${tr('emptyTimeline')}</div>`}</div><div class="timeline-text-row">${(p.texts||[]).map(timelineText).join('')}</div><div class="playhead" style="left:${10+state.currentTime*state.pxPerSec}px"></div></div></div>
      </section>
      <aside class="desktop-inspector">${desktopInspector()}</aside>
    </main>

    <footer class="editor-bottom"><div class="editor-tools">
      ${toolButton('media','▣',tr('media'))}${toolButton('text','T',tr('text'))}${toolButton('audio','♫',tr('audio'))}${toolButton('effects','✦',tr('effects'))}${toolButton('canvas','▱',tr('canvas'))}
    </div></footer>
    <div class="sheet-backdrop ${state.sheet?'open':''}" data-action="sheet-close"></div>
    <section class="bottom-sheet ${state.sheet?'open':''}" aria-modal="true"><div class="sheet-handle"></div><div class="sheet-head"><strong>${sheetTitle()}</strong><button class="sheet-close" data-action="sheet-close">×</button></div><div class="sheet-content">${state.sheet?panelContent(state.sheet):''}</div></section>
    ${state.settingsOpen?settingsModal():''}${state.installOpen?installModal():''}
  </div><div class="toast-stack" id="toasts"></div>`
  requestAnimationFrame(()=>{ fitPreviewFrame(); updatePlaybackUi() })
}
function timelineRuler(dur,width){if(!dur)return'';const every=dur>180?30:dur>60?10:dur>20?5:2;let out='';for(let t=0;t<=dur+.001;t+=every)out+=`<span style="left:${10+t*state.pxPerSec}px">${fmtTime(t).slice(0,5)}</span>`;return out}
function timelineClip(row){const a=getAsset(row.clip.assetId),w=Math.max(64,row.duration*state.pxPerSec);return `<button class="timeline-clip ${a?.type==='image'?'image':''} ${state.selected?.type==='clip'&&state.selected.id===row.clip.id?'selected':''}" style="width:${w}px" data-action="select-clip" data-id="${row.clip.id}"><strong>${escapeHtml(a?.name||'Clip')}</strong><small>${fmtTime(row.duration)}</small></button>`}
function timelineText(t){const w=Math.max(54,(t.end-t.start)*state.pxPerSec);return `<button class="timeline-text ${state.selected?.type==='text'&&state.selected.id===t.id?'selected':''}" data-action="select-text" data-id="${t.id}" style="left:${10+t.start*state.pxPerSec}px;width:${w}px">${escapeHtml(t.text)}</button>`}
function toolButton(tool,icon,label){return `<button class="tool-btn ${state.tool===tool?'active':''}" data-action="tool" data-tool="${tool}"><span class="tool-icon">${icon}</span><span>${label}</span></button>`}
function sheetTitle(){if(state.sheet==='effects'&&selectedClip())return tr('selectedClip');if(state.sheet==='text'&&selectedText())return tr('selectedText');return tr(state.sheet||'project')}
function desktopSidebar(){return `<h3 class="desktop-panel-title">${tr('desktopMedia')}</h3><div class="desktop-tool-tabs"><button class="active" data-action="pick-media">＋ ${tr('media')}</button><button data-action="add-text" data-kind="title">T ${tr('text')}</button><button data-action="open-srt">CC</button></div>${mediaPanel()}`}
function desktopInspector(){return `<h3 class="desktop-panel-title">${tr('inspector')}</h3>${state.selected?.type==='clip'?clipPanel():state.selected?.type==='text'?textPanel():canvasPanel()}`}
function panelContent(tool){if(tool==='media')return mediaPanel();if(tool==='text')return textPanel(true);if(tool==='audio')return audioPanel();if(tool==='effects')return selectedClip()?clipPanel():effectsEmpty();if(tool==='canvas')return canvasPanel();return''}

function mediaPanel(){const list=state.project.assets||[];return `<div class="panel-grid"><button class="primary-btn full" data-action="pick-media">＋ ${tr('addMedia')}</button>${list.length?`<div class="media-list">${list.map(a=>`<div class="media-row ${a.type}"><div class="media-type">${a.type==='video'?'▶':a.type==='image'?'▧':'♫'}</div><div class="media-copy"><strong>${escapeHtml(a.name)}</strong><span>${a.type} · ${a.duration?fmtTime(a.duration):''} · ${fmtBytes(a.size)}</span></div><button class="media-action" data-action="${a.type==='audio'?'set-soundtrack':'add-asset'}" data-id="${a.id}">${tr(a.type==='audio'?'useSoundtrack':'add')}</button></div>`).join('')}</div>`:`<div class="empty-state"><b>${tr('noMedia')}</b></div>`}</div>`}
function textPanel(showAdd=true){const t=selectedText();return `<div class="panel-grid">${showAdd?`<div class="action-row"><button class="sheet-action" data-action="add-text" data-kind="title"><i>T</i>${tr('addTitle')}</button><button class="sheet-action" data-action="add-text" data-kind="caption"><i>CC</i>${tr('addCaption')}</button><button class="sheet-action" data-action="add-text" data-kind="sticker"><i>✨</i>${tr('addSticker')}</button></div><button class="secondary-btn" data-action="open-srt">CC ${tr('importSrt')}</button>`:''}${t?`<div class="panel-section"><h3>${tr('textStyle')}</h3><div class="field-grid"><label class="field"><span>${tr('textContent')}</span><textarea data-bind-text="text">${escapeHtml(t.text)}</textarea></label><div class="field-grid two"><label class="field"><span>${tr('fontSize')}</span><input data-bind-text="fontSize" type="number" min="12" max="180" value="${t.fontSize}"></label><label class="field"><span>${tr('weight')}</span><select data-bind-text="weight"><option ${t.weight==600?'selected':''}>600</option><option ${t.weight==700?'selected':''}>700</option><option ${t.weight==800?'selected':''}>800</option></select></label></div><div class="field-grid two"><label class="field"><span>${tr('color')}</span><input data-bind-text="color" type="color" value="${safeColor(t.color,'#ffffff')}"></label><label class="field"><span>${tr('textBackground')}</span><input data-bind-text="background" type="color" value="${safeColor(t.background,'#111827')}"></label></div><label class="field"><span>${tr('animation')}</span><select data-bind-text="animation"><option value="none" ${t.animation==='none'?'selected':''}>${tr('none')}</option><option value="fade" ${t.animation==='fade'?'selected':''}>Fade</option><option value="pop" ${t.animation==='pop'?'selected':''}>Pop</option><option value="slide" ${t.animation==='slide'?'selected':''}>Slide up</option></select></label></div></div><div class="panel-section"><h3>${tr('position')}</h3>${rangeField('x',t.x,0,1,.01,true,'text')}${rangeField('y',t.y,0,1,.01,true,'text')}<div class="field-grid two"><label class="field"><span>${tr('start')}</span><input data-bind-text="start" type="number" step="0.1" min="0" value="${t.start.toFixed(2)}"></label><label class="field"><span>${tr('end')}</span><input data-bind-text="end" type="number" step="0.1" min="0" value="${t.end.toFixed(2)}"></label></div></div><button class="danger-btn" data-action="delete-selected">${tr('delete')}</button>`:''}</div>`}
function safeColor(v,fallback){return /^#[0-9a-f]{6}$/i.test(v||'')?v:fallback}
function audioPanel(){const audios=state.project.assets.filter(a=>a.type==='audio'), st=state.project.soundtrack;return `<div class="panel-grid"><button class="primary-btn full" data-action="pick-media">＋ ${tr('addMedia')}</button>${audios.length?`<div class="media-list">${audios.map(a=>`<div class="media-row audio"><div class="media-type">♫</div><div class="media-copy"><strong>${escapeHtml(a.name)}</strong><span>${fmtTime(a.duration)}</span></div><button class="media-action" data-action="set-soundtrack" data-id="${a.id}">${st?.assetId===a.id?'✓':tr('useSoundtrack')}</button></div>`).join('')}</div>`:`<div class="empty-state"><b>${tr('noAudio')}</b></div>`}${st?`<div class="panel-section"><h3>${tr('soundtrack')}</h3>${rangeField('soundtrack.volume',st.volume,0,1,.01,true,'project')}<div class="switch-row"><span>${tr('loop')}</span><button class="switch ${st.loop?'on':''}" data-action="toggle-loop"></button></div><button class="danger-btn" data-action="remove-soundtrack">${tr('remove')}</button></div>`:''}</div>`}
function effectsEmpty(){return `<div class="empty-state"><b>${tr('effects')}</b><span>${state.language==='el'?'Επίλεξε clip από το timeline.':'Select a clip on the timeline.'}</span></div>`}
function clipPanel(){const c=selectedClip(),a=getAsset(c?.assetId);if(!c)return effectsEmpty();return `<div class="panel-grid"><div class="panel-section soft"><h3>${tr('selectedClip')}</h3><p class="helper">${escapeHtml(a?.name||'')}</p><div class="action-row"><button class="sheet-action" data-action="split"><i>✂</i>${tr('split')}</button><button class="sheet-action" data-action="duplicate"><i>▣</i>${tr('duplicate')}</button><button class="sheet-action danger" data-action="delete-selected"><i>⌫</i>${tr('delete')}</button></div></div>
<div class="panel-section"><h3>${tr('filter')}</h3><div class="preset-grid">${['original','vivid','warm','cool','mono','film','dream','crisp'].map(n=>`<button class="preset-card" data-action="filter" data-value="${n}"><div class="preset-preview" style="${filterPreviewStyle(n)}"></div><strong>${tr(n)}</strong></button>`).join('')}</div></div>
<div class="panel-section"><h3>${tr('effects')}</h3>${rangeField('brightness',c.brightness,50,150,1,false,'clip')}${rangeField('contrast',c.contrast,50,160,1,false,'clip')}${rangeField('saturation',c.saturation,0,200,1,false,'clip')}${rangeField('hue',c.hue,-180,180,1,false,'clip')}${rangeField('blur',c.blur,0,8,.1,false,'clip')}${rangeField('grayscale',c.grayscale,0,100,1,false,'clip')}${rangeField('sepia',c.sepia,0,100,1,false,'clip')}</div>
<div class="panel-section"><h3>${tr('motion')}</h3><div class="effect-chip-row">${[['none',tr('none')],['zoom',tr('zoom')],['zoomout',tr('zoomOut')],['panleft',tr('panLeft')],['panright',tr('panRight')],['shake',tr('shake')]].map(([v,l])=>`<button class="chip ${c.motion===v?'active':''}" data-action="clip-set" data-key="motion" data-value="${v}">${l}</button>`).join('')}</div></div>
<div class="panel-section"><h3>${tr('transition')}</h3><div class="effect-chip-row">${[['none',tr('none')],['fade',tr('fade')],['flash',tr('flash')]].map(([v,l])=>`<button class="chip ${c.transition===v?'active':''}" data-action="clip-set" data-key="transition" data-value="${v}">${l}</button>`).join('')}</div>${rangeField('transitionDuration',c.transitionDuration,.1,1,.05,true,'clip')}</div>
<div class="panel-section"><h3>${tr('trim')}</h3><div class="field-grid two"><label class="field"><span>${tr('start')}</span><input data-bind-clip="start" type="number" step="0.05" min="0" max="${Math.max(0,(a?.duration||c.end)-.05)}" value="${c.start.toFixed(2)}"></label><label class="field"><span>${tr('end')}</span><input data-bind-clip="end" type="number" step="0.05" min="${c.start+.05}" max="${a?.duration||c.end}" value="${c.end.toFixed(2)}"></label></div>${rangeField('speed',c.speed,.25,4,.05,true,'clip')}${a?.type==='video'?rangeField('volume',c.volume,0,1,.01,true,'clip'):''}</div>
<div class="panel-section"><h3>${tr('transform')}</h3>${rangeField('scale',c.scale,.2,3,.01,true,'clip')}${rangeField('rotation',c.rotation,-180,180,1,true,'clip')}${rangeField('opacity',c.opacity,0,1,.01,true,'clip')}${rangeField('offsetX',c.offsetX,-.7,.7,.01,true,'clip')}${rangeField('offsetY',c.offsetY,-.7,.7,.01,true,'clip')}<div class="format-grid"><button class="format-btn ${c.fit==='cover'?'active':''}" data-action="clip-set" data-key="fit" data-value="cover">${tr('cover')}</button><button class="format-btn ${c.fit==='contain'?'active':''}" data-action="clip-set" data-key="fit" data-value="contain">${tr('contain')}</button><button class="format-btn ${c.flipX?'active':''}" data-action="clip-toggle" data-key="flipX">↔</button><button class="format-btn ${c.flipY?'active':''}" data-action="clip-toggle" data-key="flipY">↕</button></div></div>
<div class="action-row"><button class="sheet-action" data-action="move" data-value="-1"><i>←</i>${tr('moveLeft')}</button><button class="sheet-action" data-action="move" data-value="1"><i>→</i>${tr('moveRight')}</button><button class="sheet-action danger" data-action="delete-selected"><i>⌫</i>${tr('delete')}</button></div></div>`}
function filterPreviewStyle(n){const f={original:'',vivid:'filter:saturate(1.4) contrast(1.1)',warm:'filter:sepia(.25) saturate(1.2)',cool:'filter:hue-rotate(18deg)',mono:'filter:grayscale(1) contrast(1.15)',film:'filter:sepia(.3) saturate(.8) contrast(1.1)',dream:'filter:brightness(1.15) saturate(1.05);opacity:.82',crisp:'filter:contrast(1.3) saturate(1.12)'};return f[n]||''}
function rangeField(key,value,min,max,step,show,scope){return `<label class="field"><span>${tr(key.split('.').pop())}<b>${show?Number(value).toFixed(step<1?2:0):Math.round(value)}</b></span><input data-bind-${scope}="${key}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"></label>`}
function canvasPanel(){const p=state.project;return `<div class="panel-grid"><div class="panel-section"><h3>${tr('projectCanvas')}</h3><div class="format-grid">${['16:9','9:16','1:1','4:5'].map(r=>`<button class="format-btn ${p.ratio===r?'active':''}" data-action="ratio" data-value="${r}">${r}</button>`).join('')}</div></div><div class="panel-section"><label class="field"><span>${tr('background')}</span><input data-bind-project="background" type="color" value="${safeColor(p.background,'#0b0d12')}"></label></div><div class="install-card"><strong>${tr('private')}</strong><p>${tr('privateSub')}</p></div></div>`}

function renderExportModal() {
  const old=$('.modal-backdrop.export-modal'); if(old)old.remove()
  const el=document.createElement('div');el.className='modal-backdrop export-modal';el.innerHTML=`<section class="modal"><div class="modal-head"><h2>${tr('exportTitle')}</h2><button class="sheet-close" data-action="export-close">×</button></div><div class="modal-body"><div class="panel-grid"><div class="panel-section"><div class="field-grid two"><label class="field"><span>${tr('quality')}</span><select id="export-quality"><option value="720">720p</option><option value="1080" selected>1080p</option></select></label><label class="field"><span>${tr('frameRate')}</span><select id="export-fps"><option>24</option><option selected>30</option><option>60</option></select></label></div><p class="helper">${tr('browserLimit')}</p></div><div class="install-card"><strong>${tr('exportLocal')}</strong><p>${tr('free')}</p></div><div id="export-progress-wrap" class="hidden"><div class="export-progress"><span id="export-progress"></span></div><div class="export-status" id="export-status">${tr('ready')}</div></div><div id="export-result" class="hidden"></div><button class="primary-btn full" data-action="export-start">${tr('startExport')}</button></div></div></section>`;document.body.append(el)
}

function render() { document.documentElement.lang=state.language; localStorage.setItem('edituno-language',state.language); state.view==='editor'?renderEditor():renderHome() }

function toast(message,type='') {
  let root=$('#toasts'); if(!root){root=document.createElement('div');root.id='toasts';root.className='toast-stack';document.body.append(root)}
  const el=document.createElement('div');el.className=`toast ${type}`;el.textContent=message;root.append(el);setTimeout(()=>el.remove(),2600)
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
  let soundtrack=null, soundtrackSource=null
  if(project.soundtrack){const url=state.urls[project.soundtrack.assetId];if(url){soundtrack=new Audio(url);soundtrack.loop=project.soundtrack.loop;soundtrack.volume=project.soundtrack.volume; soundtrackSource=audioContext.createMediaElementSource(soundtrack);soundtrackSource.connect(dest)}}
  await audioContext.resume();recorder.start(500);if(soundtrack)await soundtrack.play().catch(()=>{})
  let global=0,total=projectDuration(project)
  try {
    for(const clip of project.clips){if(signal?.aborted)throw new DOMException('Aborted','AbortError');const asset=getAsset(clip.assetId,project),url=state.urls[clip.assetId];if(!asset||!url)continue;const dur=clipDuration(clip)
      if(asset.type==='video'){
        const v=document.createElement('video');v.src=url;v.playsInline=true;v.preload='auto';await waitLoaded(v);v.currentTime=Math.min(clip.start,Math.max(0,(v.duration||asset.duration)-.03));await waitSeek(v);v.playbackRate=clamp(clip.speed,.25,4)
        const src=audioContext.createMediaElementSource(v),gain=audioContext.createGain();gain.gain.value=clamp(clip.volume,0,1);src.connect(gain).connect(dest);await v.play()
        await renderSegment(dur,fps,async elapsed=>{ctx.fillStyle=project.background||'#0b0d12';ctx.fillRect(0,0,w,h);const row={clip,start:global,end:global+dur,duration:dur};applyClipDrawing(ctx,v,asset,clip,w,h,elapsed/dur,transitionAlpha(row,global+elapsed));drawTransitionOverlay(ctx,row,global+elapsed,w,h);drawTexts(ctx,project,global+elapsed,w,h);onProgress((global+elapsed)/total)},signal);v.pause();src.disconnect();gain.disconnect()
      } else if(asset.type==='image'){
        const img=await loadImage(url);await renderSegment(dur,fps,async elapsed=>{ctx.fillStyle=project.background||'#0b0d12';ctx.fillRect(0,0,w,h);const row={clip,start:global,end:global+dur,duration:dur};applyClipDrawing(ctx,img,asset,clip,w,h,elapsed/dur,transitionAlpha(row,global+elapsed));drawTransitionOverlay(ctx,row,global+elapsed,w,h);drawTexts(ctx,project,global+elapsed,w,h);onProgress((global+elapsed)/total)},signal)
      }
      global+=dur
    }
  } finally { soundtrack?.pause(); if(recorder.state!=='inactive')recorder.stop(); await audioContext.close().catch(()=>{}) }
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
    const resultBox=$('#export-result');resultBox.classList.remove('hidden');resultBox.innerHTML=`<div class="action-row"><button class="sheet-action" data-action="download-export"><i>↓</i>${tr('download')}</button><button class="sheet-action" data-action="share-export"><i>↗</i>${tr('share')}</button><button class="sheet-action" data-action="export-close"><i>✓</i>${tr('close')}</button></div>`
  }catch(e){status.textContent=tr('exportFailed');toast(tr('exportFailed'),'error');console.error(e)}finally{btn.disabled=false;btn.textContent=tr('startExport')}
}
function exportFilename(){const name=(state.project?.name||'Edituno').replace(/[^a-z0-9\-_ ]/gi,'').trim().replace(/\s+/g,'-')||'Edituno';return `${name}.${state.exportResult?.extension||'webm'}`}
function downloadExport(){if(!state.exportUrl)return;const a=document.createElement('a');a.href=state.exportUrl;a.download=exportFilename();document.body.append(a);a.click();a.remove()}
async function shareExport(){if(!state.exportResult)return;const file=new File([state.exportResult.blob],exportFilename(),{type:state.exportResult.mime});if(navigator.canShare?.({files:[file]})){await navigator.share({files:[file],title:state.project?.name||'Edituno'}).catch(()=>{})}else downloadExport()}

function bindGlobalEvents() {
  document.addEventListener('click',async e=>{
    const el=e.target.closest('[data-action]');if(!el)return;const a=el.dataset.action
    if(a==='create')return createProject(el.dataset.ratio||'16:9')
    if(a==='create-import')return createProject('16:9',true)
    if(a==='open-project')return openProject(el.dataset.id)
    if(a==='delete-project'){e.stopPropagation();if(confirm(tr('delete')+'?')){await deleteProjectFull(el.dataset.id);state.projects=await listProjects();renderHome();toast(tr('deleted'))}return}
    if(a==='language'){state.language=state.language==='el'?'en':'el';render();return}
    if(a==='set-lang'){state.language=el.dataset.value;render();return}
    if(a==='settings'){state.settingsOpen=true;render();return}
    if(a==='settings-close'){state.settingsOpen=false;render();return}
    if(a==='install'){state.installOpen=true;render();return}
    if(a==='install-close'){state.installOpen=false;render();return}
    if(a==='install-confirm'&&state.installPrompt){await state.installPrompt.prompt();await state.installPrompt.userChoice;state.installPrompt=null;state.installOpen=false;render();return}
    if(a==='persist-storage'){const ok=await navigator.storage?.persist?.();toast(ok?'✓ '+tr('persistent'):tr('storage'));return}
    if(a==='clear-all'){if(confirm(tr('confirmClear'))){for(const p of await listProjects())await deleteProjectFull(p.id);state.projects=[];state.settingsOpen=false;render();}return}
    if(a==='home-top'){window.scrollTo({top:0,behavior:'smooth'});return}
    if(a==='projects-scroll'){$('#projects-section')?.scrollIntoView({behavior:'smooth'});return}
    if(a==='back')return goHome()
    if(a==='pick-media'){$('#media-picker')?.click();return}
    if(a==='add-asset')return addAssetToTimeline(el.dataset.id)
    if(a==='set-soundtrack')return setSoundtrack(el.dataset.id)
    if(a==='select-clip')return selectClip(el.dataset.id)
    if(a==='select-text')return selectText(el.dataset.id)
    if(a==='tool'){state.tool=el.dataset.tool;state.sheet=el.dataset.tool;renderEditor();return}
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
    if(a==='remove-soundtrack'){mutate(p=>p.soundtrack=null);syncSoundtrack();return}
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
    const clipKey=el.dataset.bindClip,textKey=el.dataset.bindText,projectKey=el.dataset.bindProject
    if(clipKey){const c=selectedClip();if(!c)return;const val=el.type==='range'||el.type==='number'?+el.value:el.value;const obj=state.project.clips.find(x=>x.id===c.id);obj[clipKey]=val;if(clipKey==='start')obj.start=Math.min(obj.start,obj.end-.05);if(clipKey==='end')obj.end=Math.max(obj.end,obj.start+.05);queueSave();drawPreview();updateRangeLabel(el);return}
    if(textKey){const t=selectedText();if(!t)return;let val=(el.type==='range'||el.type==='number')?+el.value:el.value;if(textKey==='weight')val=+val;const obj=state.project.texts.find(x=>x.id===t.id);obj[textKey]=val;if(textKey==='start')obj.start=Math.max(0,Math.min(obj.start,obj.end-.05));if(textKey==='end')obj.end=Math.max(obj.end,obj.start+.05);queueSave();drawPreview();updateRangeLabel(el);return}
    if(projectKey&&state.project){state.project[projectKey]=el.value;queueSave();drawPreview();return}
  })
  document.addEventListener('change',e=>{
    const el=e.target
    if(el.matches('[data-bind-clip],[data-bind-text],[data-bind-project]')&&state.view==='editor')setTimeout(()=>renderEditor(),0)
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
  try {
    try { state.projects=await listProjects() } catch { state.projects=[] }
    bindGlobalEvents()
    const launch = new URLSearchParams(location.search)
    if (launch.get('new') === '1') {
      history.replaceState({}, '', location.pathname)
      await createProject('16:9')
    } else {
      render()
    }
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' })
          .then(reg => reg.update().catch(()=>{}))
          .catch(()=>{})
      }, { once:true })
    }
  } catch (error) {
    console.error('Edituno initialization failed:', error)
    const app = $('#app')
    if (app && !app.innerHTML.trim()) {
      app.innerHTML = `<main class="startup-error"><div><strong>Edituno</strong><p>The app could not finish starting. Refresh once to load the latest version.</p><button onclick="location.reload()" class="primary-btn">Refresh</button></div></main>`
    }
  } finally {
    setTimeout(() => {
      if (typeof window.__dismissEditunoSplash === 'function') window.__dismissEditunoSplash()
      else { $('#splash')?.classList.add('hide'); setTimeout(()=>$('#splash')?.remove(),380) }
    }, 240)
  }
}
init()
