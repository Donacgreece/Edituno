import { CheckCircle2, Download, LoaderCircle, X } from 'lucide-react'
import { useRef, useState } from 'react'
import type { Language, Project } from '../types'
import { t } from '../lib/i18n'
import { exportProject } from '../lib/exporter'

export function ExportModal({ language, project, urls, onClose }: { language: Language; project: Project; urls: Record<string, string>; onClose: () => void }) {
  const [quality, setQuality] = useState<720 | 1080>(1080)
  const [fps, setFps] = useState<24 | 30 | 60>(30)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<'idle' | 'running' | 'done' | 'error'>('idle')
  const controller = useRef<AbortController | null>(null)

  const start = async () => {
    setStatus('running')
    setProgress(0)
    controller.current = new AbortController()
    try {
      const result = await exportProject(project, { quality, fps, urls, onProgress: setProgress, signal: controller.current.signal })
      const href = URL.createObjectURL(result.blob)
      const link = document.createElement('a')
      link.href = href
      link.download = `${sanitize(project.name)}-${quality}p.${result.extension}`
      link.click()
      setTimeout(() => URL.revokeObjectURL(href), 60_000)
      setStatus('done')
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') setStatus('idle')
      else setStatus('error')
    }
  }

  const close = () => {
    controller.current?.abort()
    onClose()
  }

  return (
    <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && status !== 'running' && close()}>
      <div className="export-modal">
        <div className="modal-header"><div><span className="eyebrow plain">Edituno</span><h2>{t(language, 'exportTitle')}</h2></div><button className="icon-button" onClick={close}><X size={20} /></button></div>
        {status === 'running' ? (
          <div className="export-progress-state">
            <LoaderCircle size={34} className="spin" />
            <strong>{t(language, 'exporting')} {Math.round(progress * 100)}%</strong>
            <div className="progress-bar"><i style={{ width: `${progress * 100}%` }} /></div>
            <p>{t(language, 'exportNote')}</p>
            <button className="ghost-button" onClick={() => controller.current?.abort()}>{t(language, 'cancel')}</button>
          </div>
        ) : status === 'done' ? (
          <div className="export-progress-state success"><CheckCircle2 size={42} /><strong>{t(language, 'exportDone')}</strong><button className="primary-button" onClick={onClose}>{t(language, 'close')}</button></div>
        ) : (
          <>
            <div className="export-options">
              <label><span>{t(language, 'quality')}</span><div className="segmented"><button className={quality === 720 ? 'active' : ''} onClick={() => setQuality(720)}>720p</button><button className={quality === 1080 ? 'active' : ''} onClick={() => setQuality(1080)}>1080p</button></div></label>
              <label><span>{t(language, 'fps')}</span><div className="segmented"><button className={fps === 24 ? 'active' : ''} onClick={() => setFps(24)}>24</button><button className={fps === 30 ? 'active' : ''} onClick={() => setFps(30)}>30</button><button className={fps === 60 ? 'active' : ''} onClick={() => setFps(60)}>60</button></div></label>
              <div className="format-note"><Download size={17} /><div><strong>{t(language, 'formatAuto')}</strong><span>MP4 when available, otherwise WebM</span></div></div>
              {status === 'error' && <div className="error-banner">{t(language, 'exportFailed')}</div>}
            </div>
            <div className="modal-actions"><button className="ghost-button" onClick={close}>{t(language, 'cancel')}</button><button className="primary-button" onClick={start} disabled={!project.clips.length}><Download size={18} /> {t(language, 'startExport')}</button></div>
          </>
        )}
      </div>
    </div>
  )
}

const sanitize = (name: string) => name.trim().replace(/[^a-z0-9-_]+/gi, '-').replace(/^-|-$/g, '') || 'edituno-export'
