import { Music2, Trash2 } from 'lucide-react'
import type { Language, MediaAsset, Soundtrack } from '../types'
import { t } from '../lib/i18n'

export function AudioPanel({ language, soundtrack, assets, onUpdate, onRemove }: {
  language: Language
  soundtrack?: Soundtrack
  assets: MediaAsset[]
  onUpdate: (value: Soundtrack) => void
  onRemove: () => void
}) {
  const asset = soundtrack ? assets.find(a => a.id === soundtrack.assetId) : undefined
  return (
    <div className="panel-content">
      <div className="audio-card">
        <div className="audio-card-icon"><Music2 size={21} /></div>
        {asset && soundtrack ? (
          <>
            <div className="asset-meta"><strong>{asset.name}</strong><span>{t(language, 'soundtrack')}</span></div>
            <label className="range-field compact"><span>{t(language, 'volume')} {Math.round(soundtrack.volume * 100)}%</span><input type="range" min="0" max="1" step="0.01" value={soundtrack.volume} onChange={e => onUpdate({ ...soundtrack, volume: Number(e.target.value) })} /></label>
            <label className="toggle-field"><input type="checkbox" checked={soundtrack.loop} onChange={e => onUpdate({ ...soundtrack, loop: e.target.checked })} /><span>{t(language, 'loop')}</span></label>
            <button className="danger-button" onClick={onRemove}><Trash2 size={16} /> {t(language, 'removeSoundtrack')}</button>
          </>
        ) : (
          <div className="asset-meta"><strong>{t(language, 'soundtrack')}</strong><span>{language === 'el' ? 'Επίλεξε ένα audio αρχείο από τα Πολυμέσα.' : 'Choose an audio file from Media.'}</span></div>
        )}
      </div>
    </div>
  )
}
