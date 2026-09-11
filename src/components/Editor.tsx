import { ArrowLeft, Download, Languages, Music2, Pause, Play, Ratio, Save, Type, UploadCloud } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { AspectRatio, Clip, Language, MediaAsset, Project, SelectedItem, TextOverlay } from '../types'
import { t } from '../lib/i18n'
import { putBlob, saveProject } from '../lib/db'
import { clipDuration, formatTime, inspectFile, projectDuration, uid } from '../lib/media'
import { Logo } from './Logo'
import { MediaPanel } from './MediaPanel'
import { TextPanel } from './TextPanel'
import { AudioPanel } from './AudioPanel'
import { Inspector } from './Inspector'
import { PreviewCanvas } from './PreviewCanvas'
import { Timeline } from './Timeline'
import { ExportModal } from './ExportModal'

interface EditorProps {
  language: Language
  initialProject: Project
  initialUrls: Record<string, string>
  onLanguage: (language: Language) => void
  onHome: () => void
  onSaved: (project: Project) => void
}

type Tab = 'media' | 'text' | 'audio'

export function Editor({ language, initialProject, initialUrls, onLanguage, onHome, onSaved }: EditorProps) {
  const [project, setProject] = useState(initialProject)
  const [urls, setUrls] = useState(initialUrls)
  const [tab, setTab] = useState<Tab>('media')
  const [selected, setSelected] = useState<SelectedItem>({ type: 'none' })
  const [currentTime, setCurrentTime] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [savedState, setSavedState] = useState(true)
  const [exporting, setExporting] = useState(false)
  const [toast, setToast] = useState<string>('')

  const total = useMemo(() => projectDuration(project), [project])
  const soundtrackAsset = project.soundtrack ? project.assets.find(a => a.id === project.soundtrack?.assetId) : undefined

  const mutate = useCallback((updater: (current: Project) => Project) => {
    setProject(current => ({ ...updater(current), updatedAt: Date.now() }))
    setSavedState(false)
  }, [])

  const persist = useCallback(async () => {
    await saveProject(project)
    setSavedState(true)
    onSaved(project)
  }, [project, onSaved])

  useEffect(() => {
    const timer = setTimeout(() => { if (!savedState) persist().catch(() => undefined) }, 900)
    return () => clearTimeout(timer)
  }, [project, savedState, persist])

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.code === 'Space' && !(event.target instanceof HTMLInputElement) && !(event.target instanceof HTMLTextAreaElement)) {
        event.preventDefault()
        if (project.clips.length) setPlaying(value => !value)
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
        event.preventDefault(); persist().catch(() => undefined)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [persist, project.clips.length])

  const importFiles = async (files: FileList | File[]) => {
    const list = Array.from(files)
    for (const file of list) {
      try {
        const inspected = await inspectFile(file)
        const id = uid()
        const asset: MediaAsset = { id, name: file.name, mimeType: file.type, size: file.size, ...inspected }
        await putBlob(id, file)
        setUrls(current => ({ ...current, [id]: URL.createObjectURL(file) }))
        mutate(current => ({ ...current, assets: [...current.assets, asset] }))
      } catch {
        setToast(t(language, 'unsupported'))
        setTimeout(() => setToast(''), 2800)
      }
    }
  }

  const addClip = (asset: MediaAsset) => {
    const end = asset.type === 'image' ? 5 : Math.max(0.1, asset.duration)
    const clip: Clip = { id: uid(), assetId: asset.id, start: 0, end, speed: 1, volume: 1, scale: 1, rotation: 0, opacity: 1, fit: 'contain' }
    mutate(current => ({ ...current, clips: [...current.clips, clip] }))
    setSelected({ type: 'clip', id: clip.id })
  }

  const addText = (preset: 'title' | 'caption' | 'label') => {
    const duration = Math.max(3, total || 5)
    const styles = preset === 'title'
      ? { fontSize: 64, y: 0.25, weight: 800 as const, background: 'transparent' }
      : preset === 'caption'
        ? { fontSize: 42, y: 0.82, weight: 700 as const, background: '#000000cc' }
        : { fontSize: 32, y: 0.15, weight: 700 as const, background: '#2455F5' }
    const overlay: TextOverlay = { id: uid(), text: preset === 'caption' ? 'Your caption' : preset === 'title' ? 'Your title' : 'Label', start: Math.min(currentTime, Math.max(0, duration - 1)), end: Math.min(duration, Math.max(currentTime + 3, 3)), x: 0.5, color: preset === 'label' ? '#ffffff' : '#ffffff', align: 'center', ...styles }
    mutate(current => ({ ...current, textOverlays: [...current.textOverlays, overlay] }))
    setSelected({ type: 'text', id: overlay.id })
  }

  const updateClip = (clip: Clip) => mutate(current => ({ ...current, clips: current.clips.map(item => item.id === clip.id ? clip : item) }))
  const updateText = (text: TextOverlay) => mutate(current => ({ ...current, textOverlays: current.textOverlays.map(item => item.id === text.id ? text : item) }))

  const deleteSelected = () => {
    if (selected.type === 'clip') mutate(current => ({ ...current, clips: current.clips.filter(item => item.id !== selected.id) }))
    if (selected.type === 'text') mutate(current => ({ ...current, textOverlays: current.textOverlays.filter(item => item.id !== selected.id) }))
    setSelected({ type: 'none' })
    setPlaying(false)
    setCurrentTime(time => Math.min(time, projectDuration(project)))
  }

  const moveClip = (id: string, direction: -1 | 1) => mutate(current => {
    const index = current.clips.findIndex(c => c.id === id)
    const target = index + direction
    if (index < 0 || target < 0 || target >= current.clips.length) return current
    const clips = [...current.clips]
    ;[clips[index], clips[target]] = [clips[target], clips[index]]
    return { ...current, clips }
  })

  const ratio = (value: AspectRatio) => mutate(current => ({ ...current, ratio: value }))
  const handleEnded = useCallback(() => setPlaying(false), [])

  return (
    <main className="editor-shell">
      <header className="editor-topbar">
        <div className="editor-top-left">
          <button className="icon-button" onClick={onHome}><ArrowLeft size={19} /></button>
          <Logo />
          <span className="topbar-divider" />
          <input className="project-name-input" value={project.name} onChange={e => mutate(current => ({ ...current, name: e.target.value }))} aria-label={t(language, 'projectName')} />
        </div>
        <div className="editor-top-actions">
          <button className="ghost-button slim" onClick={() => onLanguage(language === 'en' ? 'el' : 'en')}><Languages size={17} /> {language === 'en' ? 'ΕΛ' : 'EN'}</button>
          <button className="ghost-button slim" onClick={persist}><Save size={17} /> {savedState ? t(language, 'saved') : t(language, 'save')}</button>
          <button className="primary-button slim" onClick={() => setExporting(true)} disabled={!project.clips.length}><Download size={17} /> {t(language, 'export')}</button>
        </div>
      </header>

      <section className="editor-workspace">
        <aside className="tool-rail">
          <button className={tab === 'media' ? 'active' : ''} onClick={() => setTab('media')}><UploadCloud size={21} /><span>{t(language, 'media')}</span></button>
          <button className={tab === 'text' ? 'active' : ''} onClick={() => setTab('text')}><Type size={21} /><span>{t(language, 'text')}</span></button>
          <button className={tab === 'audio' ? 'active' : ''} onClick={() => setTab('audio')}><Music2 size={21} /><span>{t(language, 'audio')}</span></button>
        </aside>

        <aside className="asset-panel">
          <div className="panel-title"><strong>{t(language, tab)}</strong></div>
          {tab === 'media' && <MediaPanel language={language} assets={project.assets} onImport={importFiles} onAddClip={addClip} onSoundtrack={asset => mutate(current => ({ ...current, soundtrack: { assetId: asset.id, volume: 0.55, loop: true } }))} />}
          {tab === 'text' && <TextPanel language={language} onAddText={addText} />}
          {tab === 'audio' && <AudioPanel language={language} soundtrack={project.soundtrack} assets={project.assets} onUpdate={soundtrack => mutate(current => ({ ...current, soundtrack }))} onRemove={() => mutate(current => ({ ...current, soundtrack: undefined }))} />}
        </aside>

        <section className="stage-column">
          <div className="stage-toolbar">
            <div className="ratio-picker"><Ratio size={16} /><span>{t(language, 'ratio')}</span>{(['16:9', '9:16', '1:1', '4:5'] as AspectRatio[]).map(item => <button className={project.ratio === item ? 'active' : ''} key={item} onClick={() => ratio(item)}>{item}</button>)}</div>
          </div>
          <div className="stage-area">
            {project.clips.length ? <PreviewCanvas project={project} urls={urls} currentTime={currentTime} isPlaying={playing} onTime={setCurrentTime} onEnded={handleEnded} /> : <div className="empty-stage"><UploadCloud size={38} /><strong>{t(language, 'noTimeline')}</strong><button className="primary-button" onClick={() => setTab('media')}>{t(language, 'import')}</button></div>}
          </div>
          <div className="transport-bar">
            <button className="transport-play" onClick={() => project.clips.length && setPlaying(value => !value)}>{playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}</button>
            <span>{formatTime(currentTime)} / {formatTime(total)}</span>
            <input type="range" min="0" max={Math.max(total, 0.01)} step="0.01" value={Math.min(currentTime, total)} onChange={e => { setPlaying(false); setCurrentTime(Number(e.target.value)) }} />
          </div>
        </section>

        <aside className="inspector-panel">
          <div className="panel-title"><strong>{t(language, 'inspector')}</strong></div>
          <Inspector language={language} selected={selected} clips={project.clips} texts={project.textOverlays} assets={project.assets} onClip={updateClip} onText={updateText} onDelete={deleteSelected} />
        </aside>
      </section>

      <section className="timeline-area">
        <Timeline language={language} clips={project.clips} texts={project.textOverlays} assets={project.assets} soundtrackName={soundtrackAsset?.name} currentTime={currentTime} selected={selected} onSelect={setSelected} onSeek={time => { setPlaying(false); setCurrentTime(time) }} onMove={moveClip} />
      </section>

      {exporting && <ExportModal language={language} project={project} urls={urls} onClose={() => setExporting(false)} />}
      {toast && <div className="toast">{toast}</div>}
    </main>
  )
}
