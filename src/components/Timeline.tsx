import { ChevronLeft, ChevronRight, Music2, Type } from 'lucide-react'
import type { Clip, Language, MediaAsset, SelectedItem, TextOverlay } from '../types'
import { clipDuration, formatTime, projectDuration } from '../lib/media'

interface TimelineProps {
  language: Language
  clips: Clip[]
  texts: TextOverlay[]
  assets: MediaAsset[]
  soundtrackName?: string
  currentTime: number
  selected: SelectedItem
  onSelect: (selected: SelectedItem) => void
  onSeek: (time: number) => void
  onMove: (id: string, direction: -1 | 1) => void
}

export function Timeline({ clips, texts, assets, soundtrackName, currentTime, selected, onSelect, onSeek, onMove }: TimelineProps) {
  const total = projectDuration({ clips })
  const safeTotal = Math.max(total, 1)
  let cursor = 0

  return (
    <div className="timeline-shell">
      <div className="timeline-ruler" onClick={e => {
        const rect = e.currentTarget.getBoundingClientRect()
        onSeek(((e.clientX - rect.left) / rect.width) * safeTotal)
      }}>
        <span>00:00</span><span>{formatTime(safeTotal / 2)}</span><span>{formatTime(safeTotal)}</span>
        <i className="timeline-playhead" style={{ left: `${Math.min(100, (currentTime / safeTotal) * 100)}%` }} />
      </div>

      <div className="timeline-track video-track">
        {clips.length === 0 && <div className="timeline-empty">+</div>}
        {clips.map((clip, index) => {
          const width = Math.max(7, clipDuration(clip) / safeTotal * 100)
          const asset = assets.find(a => a.id === clip.assetId)
          cursor += width
          return (
            <button
              key={clip.id}
              className={`timeline-clip ${selected.type === 'clip' && selected.id === clip.id ? 'selected' : ''}`}
              style={{ width: `${width}%` }}
              onClick={() => onSelect({ type: 'clip', id: clip.id })}
              title={asset?.name}
            >
              <span>{asset?.name ?? 'Clip'}</span>
              <small>{formatTime(clipDuration(clip))}</small>
              <span className="clip-movers">
                {index > 0 && <i onClick={e => { e.stopPropagation(); onMove(clip.id, -1) }}><ChevronLeft size={13} /></i>}
                {index < clips.length - 1 && <i onClick={e => { e.stopPropagation(); onMove(clip.id, 1) }}><ChevronRight size={13} /></i>}
              </span>
            </button>
          )
        })}
      </div>

      <div className="timeline-track text-track">
        <div className="track-label"><Type size={14} /></div>
        {texts.map(text => {
          const left = Math.max(0, text.start / safeTotal * 100)
          const width = Math.max(4, (text.end - text.start) / safeTotal * 100)
          return <button key={text.id} className={`timeline-overlay ${selected.type === 'text' && selected.id === text.id ? 'selected' : ''}`} style={{ left: `${left}%`, width: `${Math.min(width, 100 - left)}%` }} onClick={() => onSelect({ type: 'text', id: text.id })}>{text.text || 'Text'}</button>
        })}
      </div>

      {soundtrackName && <div className="timeline-track audio-track"><div className="track-label"><Music2 size={14} /></div><div className="timeline-audio"><span>{soundtrackName}</span><i /><i /><i /><i /><i /><i /></div></div>}
    </div>
  )
}
