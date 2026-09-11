import { Trash2 } from 'lucide-react'
import type { Clip, Language, MediaAsset, SelectedItem, TextOverlay } from '../types'
import { t } from '../lib/i18n'

interface InspectorProps {
  language: Language
  selected: SelectedItem
  clips: Clip[]
  texts: TextOverlay[]
  assets: MediaAsset[]
  onClip: (clip: Clip) => void
  onText: (text: TextOverlay) => void
  onDelete: () => void
}

export function Inspector({ language, selected, clips, texts, assets, onClip, onText, onDelete }: InspectorProps) {
  if (selected.type === 'none') return <div className="inspector-empty"><span>{t(language, 'selectItem')}</span></div>

  if (selected.type === 'clip') {
    const clip = clips.find(item => item.id === selected.id)
    if (!clip) return null
    const asset = assets.find(item => item.id === clip.assetId)
    const max = asset?.duration || clip.end
    return (
      <div className="inspector-form">
        <div className="inspector-heading"><strong>{asset?.name ?? 'Clip'}</strong><span>{asset?.type}</span></div>
        <div className="field-grid two">
          <label><span>{t(language, 'start')}</span><input type="number" min="0" max={clip.end - 0.05} step="0.1" value={round(clip.start)} onChange={e => onClip({ ...clip, start: Math.min(Number(e.target.value), clip.end - 0.05) })} /></label>
          <label><span>{t(language, 'end')}</span><input type="number" min={clip.start + 0.05} max={max} step="0.1" value={round(clip.end)} onChange={e => onClip({ ...clip, end: Math.max(clip.start + 0.05, Math.min(Number(e.target.value), max)) })} /></label>
        </div>
        <Range label={t(language, 'speed')} value={clip.speed} min={0.25} max={4} step={0.05} suffix="x" onChange={speed => onClip({ ...clip, speed })} />
        <Range label={t(language, 'volume')} value={clip.volume} min={0} max={1} step={0.01} suffix="%" display={Math.round(clip.volume * 100)} onChange={volume => onClip({ ...clip, volume })} />
        <Range label={t(language, 'scale')} value={clip.scale} min={0.5} max={2} step={0.01} suffix="%" display={Math.round(clip.scale * 100)} onChange={scale => onClip({ ...clip, scale })} />
        <Range label={t(language, 'rotation')} value={clip.rotation} min={-180} max={180} step={1} suffix="°" onChange={rotation => onClip({ ...clip, rotation })} />
        <Range label={t(language, 'opacity')} value={clip.opacity} min={0} max={1} step={0.01} suffix="%" display={Math.round(clip.opacity * 100)} onChange={opacity => onClip({ ...clip, opacity })} />
        <label className="select-field"><span>{t(language, 'fit')}</span><select value={clip.fit} onChange={e => onClip({ ...clip, fit: e.target.value as Clip['fit'] })}><option value="contain">{t(language, 'contain')}</option><option value="cover">{t(language, 'cover')}</option></select></label>
        <button className="danger-button wide" onClick={onDelete}><Trash2 size={16} /> {t(language, 'delete')}</button>
      </div>
    )
  }

  const text = texts.find(item => item.id === selected.id)
  if (!text) return null
  return (
    <div className="inspector-form">
      <div className="inspector-heading"><strong>{t(language, 'textLabel')}</strong><span>Overlay</span></div>
      <label><span>{t(language, 'textLabel')}</span><textarea rows={3} value={text.text} onChange={e => onText({ ...text, text: e.target.value })} /></label>
      <div className="field-grid two">
        <label><span>{t(language, 'start')}</span><input type="number" min="0" step="0.1" value={round(text.start)} onChange={e => onText({ ...text, start: Math.max(0, Number(e.target.value)) })} /></label>
        <label><span>{t(language, 'end')}</span><input type="number" min={text.start + 0.1} step="0.1" value={round(text.end)} onChange={e => onText({ ...text, end: Math.max(text.start + 0.1, Number(e.target.value)) })} /></label>
      </div>
      <Range label={t(language, 'fontSize')} value={text.fontSize} min={18} max={120} step={1} suffix="px" onChange={fontSize => onText({ ...text, fontSize })} />
      <Range label={t(language, 'xPosition')} value={text.x} min={0.05} max={0.95} step={0.01} suffix="%" display={Math.round(text.x * 100)} onChange={x => onText({ ...text, x })} />
      <Range label={t(language, 'yPosition')} value={text.y} min={0.05} max={0.95} step={0.01} suffix="%" display={Math.round(text.y * 100)} onChange={y => onText({ ...text, y })} />
      <div className="field-grid two color-grid">
        <label><span>{t(language, 'color')}</span><input type="color" value={text.color} onChange={e => onText({ ...text, color: e.target.value })} /></label>
        <label><span>{t(language, 'background')}</span><select value={text.background} onChange={e => onText({ ...text, background: e.target.value })}><option value="transparent">Transparent</option><option value="#000000cc">Black</option><option value="#2455F5">Azure</option><option value="#F7DCFF">Violet</option></select></label>
      </div>
      <button className="danger-button wide" onClick={onDelete}><Trash2 size={16} /> {t(language, 'delete')}</button>
    </div>
  )
}

function Range({ label, value, min, max, step, suffix, display, onChange }: { label: string; value: number; min: number; max: number; step: number; suffix: string; display?: number; onChange: (value: number) => void }) {
  return <label className="range-field"><span>{label}<b>{display ?? round(value)}{suffix}</b></span><input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))} /></label>
}

const round = (value: number) => Math.round(value * 100) / 100
