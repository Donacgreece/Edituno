import type { AspectRatio, Clip, MediaAsset, Project, TextOverlay } from '../types'

export const uid = () => crypto.randomUUID()

export function getDimensions(ratio: AspectRatio, quality: 720 | 1080) {
  const long = quality === 1080 ? 1920 : 1280
  const short = quality === 1080 ? 1080 : 720
  switch (ratio) {
    case '9:16': return { width: short, height: long }
    case '1:1': return { width: quality, height: quality }
    case '4:5': return quality === 1080 ? { width: 1080, height: 1350 } : { width: 720, height: 900 }
    default: return { width: long, height: short }
  }
}

export function clipDuration(clip: Clip) {
  return Math.max(0, clip.end - clip.start) / Math.max(0.1, clip.speed)
}

export function projectDuration(project: Pick<Project, 'clips'>) {
  return project.clips.reduce((sum, clip) => sum + clipDuration(clip), 0)
}

export function locateTime(project: Pick<Project, 'clips'>, globalTime: number) {
  let cursor = 0
  for (let index = 0; index < project.clips.length; index++) {
    const clip = project.clips[index]
    const duration = clipDuration(clip)
    if (globalTime <= cursor + duration || index === project.clips.length - 1) {
      return {
        clip,
        index,
        timelineStart: cursor,
        localTimelineTime: Math.max(0, globalTime - cursor),
        sourceTime: clip.start + Math.max(0, globalTime - cursor) * clip.speed
      }
    }
    cursor += duration
  }
  return undefined
}

export async function inspectFile(file: File): Promise<Pick<MediaAsset, 'type' | 'duration' | 'width' | 'height'>> {
  if (file.type.startsWith('image/')) {
    const url = URL.createObjectURL(file)
    try {
      const img = new Image()
      img.src = url
      await img.decode()
      return { type: 'image', duration: 5, width: img.naturalWidth, height: img.naturalHeight }
    } finally { URL.revokeObjectURL(url) }
  }

  if (file.type.startsWith('audio/')) {
    const url = URL.createObjectURL(file)
    try {
      const audio = document.createElement('audio')
      audio.preload = 'metadata'
      audio.src = url
      await waitMetadata(audio)
      return { type: 'audio', duration: Number.isFinite(audio.duration) ? audio.duration : 0 }
    } finally { URL.revokeObjectURL(url) }
  }

  if (file.type.startsWith('video/')) {
    const url = URL.createObjectURL(file)
    try {
      const video = document.createElement('video')
      video.preload = 'metadata'
      video.src = url
      await waitMetadata(video)
      return {
        type: 'video',
        duration: Number.isFinite(video.duration) ? video.duration : 0,
        width: video.videoWidth,
        height: video.videoHeight
      }
    } finally { URL.revokeObjectURL(url) }
  }

  throw new Error('unsupported')
}

function waitMetadata(media: HTMLMediaElement) {
  return new Promise<void>((resolve, reject) => {
    const done = () => { cleanup(); resolve() }
    const failed = () => { cleanup(); reject(new Error('unsupported')) }
    const cleanup = () => {
      media.removeEventListener('loadedmetadata', done)
      media.removeEventListener('error', failed)
    }
    media.addEventListener('loadedmetadata', done)
    media.addEventListener('error', failed)
  })
}

export function formatTime(value: number) {
  if (!Number.isFinite(value)) return '00:00.0'
  const minutes = Math.floor(value / 60)
  const seconds = Math.floor(value % 60)
  const tenths = Math.floor((value % 1) * 10)
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${tenths}`
}

export function drawMedia(
  ctx: CanvasRenderingContext2D,
  source: CanvasImageSource,
  clip: Clip,
  sourceWidth: number,
  sourceHeight: number,
  canvasWidth: number,
  canvasHeight: number
) {
  ctx.save()
  ctx.globalAlpha = clip.opacity
  ctx.translate(canvasWidth / 2, canvasHeight / 2)
  ctx.rotate((clip.rotation * Math.PI) / 180)

  const sourceRatio = sourceWidth / sourceHeight
  const targetRatio = canvasWidth / canvasHeight
  let drawWidth: number
  let drawHeight: number

  if ((clip.fit === 'cover' && sourceRatio > targetRatio) || (clip.fit === 'contain' && sourceRatio < targetRatio)) {
    drawHeight = canvasHeight
    drawWidth = drawHeight * sourceRatio
  } else {
    drawWidth = canvasWidth
    drawHeight = drawWidth / sourceRatio
  }

  drawWidth *= clip.scale
  drawHeight *= clip.scale
  ctx.drawImage(source, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight)
  ctx.restore()
}

export function drawText(ctx: CanvasRenderingContext2D, overlay: TextOverlay, width: number, height: number, scale = 1) {
  const x = overlay.x * width
  const y = overlay.y * height
  const fontSize = overlay.fontSize * scale
  ctx.save()
  ctx.font = `${overlay.weight} ${fontSize}px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
  ctx.textAlign = overlay.align
  ctx.textBaseline = 'middle'
  const metrics = ctx.measureText(overlay.text)
  const padX = 14 * scale
  const padY = 9 * scale
  let left = x
  if (overlay.align === 'center') left -= metrics.width / 2
  if (overlay.align === 'right') left -= metrics.width
  if (overlay.background !== 'transparent') {
    ctx.fillStyle = overlay.background
    roundRect(ctx, left - padX, y - fontSize / 2 - padY, metrics.width + padX * 2, fontSize + padY * 2, 12 * scale)
    ctx.fill()
  }
  ctx.fillStyle = overlay.color
  ctx.fillText(overlay.text, x, y)
  ctx.restore()
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const radius = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.arcTo(x + w, y, x + w, y + h, radius)
  ctx.arcTo(x + w, y + h, x, y + h, radius)
  ctx.arcTo(x, y + h, x, y, radius)
  ctx.arcTo(x, y, x + w, y, radius)
  ctx.closePath()
}

export function pickRecorderMime() {
  const candidates = [
    'video/mp4;codecs=avc1.42E01E,mp4a.40.2',
    'video/mp4',
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm'
  ]
  return candidates.find(type => MediaRecorder.isTypeSupported(type)) ?? ''
}
