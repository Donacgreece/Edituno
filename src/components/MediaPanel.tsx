import { FileAudio, FileImage, Film, Music2, Plus, Upload } from 'lucide-react'
import { useRef, useState } from 'react'
import type { Language, MediaAsset } from '../types'
import { t } from '../lib/i18n'

interface MediaPanelProps {
  language: Language
  assets: MediaAsset[]
  onImport: (files: FileList | File[]) => Promise<void>
  onAddClip: (asset: MediaAsset) => void
  onSoundtrack: (asset: MediaAsset) => void
}

export function MediaPanel({ language, assets, onImport, onAddClip, onSoundtrack }: MediaPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  return (
    <div className="panel-content">
      <button className="import-button" onClick={() => inputRef.current?.click()}><Upload size={17} /> {t(language, 'import')}</button>
      <input ref={inputRef} hidden multiple type="file" accept="video/*,image/*,audio/*" onChange={e => e.target.files && onImport(e.target.files)} />
      <button
        className={`drop-zone ${dragging ? 'dragging' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); onImport(Array.from(e.dataTransfer.files)) }}
      >
        <Upload size={22} /><span>{t(language, 'drop')}</span>
      </button>

      <div className="asset-list">
        {assets.map(asset => (
          <div className="asset-row" key={asset.id}>
            <div className="asset-type-icon">
              {asset.type === 'video' ? <Film size={17} /> : asset.type === 'audio' ? <FileAudio size={17} /> : <FileImage size={17} />}
            </div>
            <div className="asset-meta"><strong title={asset.name}>{asset.name}</strong><span>{asset.type} · {Math.max(1, Math.round(asset.size / 1024 / 1024))} MB</span></div>
            {asset.type === 'audio' ? (
              <button className="icon-button" title={t(language, 'useAsSoundtrack')} onClick={() => onSoundtrack(asset)}><Music2 size={17} /></button>
            ) : (
              <button className="icon-button" title={t(language, 'addToTimeline')} onClick={() => onAddClip(asset)}><Plus size={18} /></button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
