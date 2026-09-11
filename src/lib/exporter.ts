import type { Project } from '../types'
import { clipDuration, drawMedia, drawText, getDimensions, pickRecorderMime, projectDuration } from './media'

interface ExportOptions {
  quality: 720 | 1080
  fps: 24 | 30 | 60
  urls: Record<string, string>
  onProgress: (value: number) => void
  signal?: AbortSignal
}

export async function exportProject(project: Project, options: ExportOptions): Promise<{ blob: Blob; extension: 'mp4' | 'webm' }> {
  if (!project.clips.length) throw new Error('empty-project')

  const dims = getDimensions(project.ratio, options.quality)
  const canvas = document.createElement('canvas')
  canvas.width = dims.width
  canvas.height = dims.height
  const ctx = canvas.getContext('2d', { alpha: false })
  if (!ctx) throw new Error('canvas-unavailable')

  const stream = canvas.captureStream(options.fps)
  const audioContext = new AudioContext()
  const audioDestination = audioContext.createMediaStreamDestination()
  stream.addTrack(audioDestination.stream.getAudioTracks()[0])

  const mimeType = pickRecorderMime()
  if (!mimeType) throw new Error('media-recorder-unavailable')
  const recorder = new MediaRecorder(stream, {
    mimeType,
    videoBitsPerSecond: options.quality === 1080 ? 10_000_000 : 6_000_000,
    audioBitsPerSecond: 192_000
  })
  const chunks: BlobPart[] = []
  recorder.ondataavailable = event => { if (event.data.size) chunks.push(event.data) }

  let soundtrack: HTMLAudioElement | undefined
  if (project.soundtrack) {
    const url = options.urls[project.soundtrack.assetId]
    if (url) {
      soundtrack = new Audio(url)
      soundtrack.crossOrigin = 'anonymous'
      soundtrack.loop = project.soundtrack.loop
      soundtrack.volume = project.soundtrack.volume
      const source = audioContext.createMediaElementSource(soundtrack)
      source.connect(audioDestination)
    }
  }

  const total = projectDuration(project)
  let globalTime = 0

  const done = new Promise<Blob>((resolve, reject) => {
    recorder.onerror = () => reject(new Error('recorder-error'))
    recorder.onstop = () => resolve(new Blob(chunks, { type: mimeType }))
  })

  await audioContext.resume()
  if (soundtrack) {
    soundtrack.currentTime = 0
    await soundtrack.play().catch(() => undefined)
  }
  recorder.start(1000)

  try {
    for (const clip of project.clips) {
      if (options.signal?.aborted) throw new DOMException('Aborted', 'AbortError')
      const asset = project.assets.find(item => item.id === clip.assetId)
      const url = options.urls[clip.assetId]
      if (!asset || !url) continue
      const duration = clipDuration(clip)
      const segmentStart = performance.now()

      if (asset.type === 'video') {
        const video = document.createElement('video')
        video.src = url
        video.preload = 'auto'
        video.playsInline = true
        video.volume = 1
        video.playbackRate = clip.speed
        await waitMedia(video)
        video.currentTime = Math.min(clip.start, Math.max(0, video.duration - 0.05))
        await waitSeek(video)
        const source = audioContext.createMediaElementSource(video)
        const gain = audioContext.createGain()
        gain.gain.value = clip.volume
        source.connect(gain).connect(audioDestination)
        await video.play()

        await renderForDuration(duration, options.fps, elapsed => {
          const nowGlobal = globalTime + elapsed
          drawFrame(ctx, canvas, project, clip, asset, video, nowGlobal)
          options.onProgress(Math.min(1, nowGlobal / Math.max(0.001, total)))
          if (video.currentTime >= clip.end) video.pause()
        }, options.signal)
        video.pause()
        source.disconnect()
        gain.disconnect()
      } else if (asset.type === 'image') {
        const image = new Image()
        image.src = url
        await image.decode()
        await renderForDuration(duration, options.fps, elapsed => {
          const nowGlobal = globalTime + elapsed
          drawFrame(ctx, canvas, project, clip, asset, image, nowGlobal)
          options.onProgress(Math.min(1, nowGlobal / Math.max(0.001, total)))
        }, options.signal)
      }

      globalTime += duration
      const actualElapsed = (performance.now() - segmentStart) / 1000
      if (actualElapsed < duration) await sleep((duration - actualElapsed) * 1000)
    }
  } finally {
    soundtrack?.pause()
    if (recorder.state !== 'inactive') recorder.stop()
    await audioContext.close().catch(() => undefined)
  }

  const blob = await done
  options.onProgress(1)
  return { blob, extension: mimeType.includes('mp4') ? 'mp4' : 'webm' }
}

function drawFrame(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  project: Project,
  clip: Project['clips'][number],
  asset: Project['assets'][number],
  source: CanvasImageSource,
  globalTime: number
) {
  ctx.fillStyle = '#070912'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  drawMedia(ctx, source, clip, asset.width || canvas.width, asset.height || canvas.height, canvas.width, canvas.height)
  const scale = canvas.width / 960
  project.textOverlays
    .filter(text => globalTime >= text.start && globalTime <= text.end)
    .forEach(text => drawText(ctx, text, canvas.width, canvas.height, scale))
}

function renderForDuration(duration: number, fps: number, draw: (elapsed: number) => void, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const start = performance.now()
    let lastFrame = 0
    const minFrame = 1000 / fps
    const tick = (now: number) => {
      if (signal?.aborted) return reject(new DOMException('Aborted', 'AbortError'))
      const elapsedMs = now - start
      if (elapsedMs - lastFrame >= minFrame - 1) {
        lastFrame = elapsedMs
        draw(Math.min(duration, elapsedMs / 1000))
      }
      if (elapsedMs >= duration * 1000) resolve()
      else requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  })
}

function waitMedia(media: HTMLMediaElement) {
  if (media.readyState >= 2) return Promise.resolve()
  return new Promise<void>((resolve, reject) => {
    media.onloadeddata = () => resolve()
    media.onerror = () => reject(new Error('media-load-failed'))
  })
}

function waitSeek(media: HTMLMediaElement) {
  if (!media.seeking) return Promise.resolve()
  return new Promise<void>(resolve => media.addEventListener('seeked', () => resolve(), { once: true }))
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
