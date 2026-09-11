import { useCallback, useEffect, useMemo, useRef } from 'react'
import type { Project } from '../types'
import { drawMedia, drawText, locateTime, projectDuration } from '../lib/media'

interface PreviewCanvasProps {
  project: Project
  urls: Record<string, string>
  currentTime: number
  isPlaying: boolean
  onTime: (time: number) => void
  onEnded: () => void
}

export function PreviewCanvas({ project, urls, currentTime, isPlaying, onTime, onEnded }: PreviewCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const loadedAssetRef = useRef<string>('')
  const rafRef = useRef<number>(0)
  const playStartRef = useRef(0)
  const globalStartRef = useRef(0)
  const total = useMemo(() => projectDuration(project), [project])

  const ratioStyle = useMemo(() => {
    const [w, h] = project.ratio.split(':').map(Number)
    return { aspectRatio: `${w} / ${h}` }
  }, [project.ratio])

  const render = useCallback(async (time: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const location = locateTime(project, Math.max(0, Math.min(time, total)))
    ctx.fillStyle = '#070912'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    if (!location) return
    const asset = project.assets.find(a => a.id === location.clip.assetId)
    const url = urls[location.clip.assetId]
    if (!asset || !url) return

    if (asset.type === 'video') {
      const video = videoRef.current
      if (!video) return
      if (loadedAssetRef.current !== asset.id) {
        loadedAssetRef.current = asset.id
        video.src = url
        video.load()
        await new Promise<void>(resolve => {
          if (video.readyState >= 2) return resolve()
          video.addEventListener('loadeddata', () => resolve(), { once: true })
        })
      }
      video.playbackRate = location.clip.speed
      video.volume = location.clip.volume
      if (!isPlaying || Math.abs(video.currentTime - location.sourceTime) > 0.2) {
        try { video.currentTime = Math.min(location.sourceTime, Math.max(0, video.duration - 0.03)) } catch {}
      }
      if (video.readyState >= 2) {
        drawMedia(ctx, video, location.clip, asset.width || video.videoWidth || 1, asset.height || video.videoHeight || 1, canvas.width, canvas.height)
      }
    } else if (asset.type === 'image') {
      if (loadedAssetRef.current !== asset.id) {
        loadedAssetRef.current = asset.id
        const image = new Image()
        image.src = url
        await image.decode().catch(() => undefined)
        imageRef.current = image
      }
      const image = imageRef.current
      if (image) drawMedia(ctx, image, location.clip, asset.width || image.naturalWidth || 1, asset.height || image.naturalHeight || 1, canvas.width, canvas.height)
    }

    project.textOverlays
      .filter(text => time >= text.start && time <= text.end)
      .forEach(text => drawText(ctx, text, canvas.width, canvas.height, canvas.width / 960))
  }, [isPlaying, project, total, urls])

  useEffect(() => {
    render(currentTime)
  }, [currentTime, render])

  useEffect(() => {
    const video = videoRef.current
    if (!isPlaying) {
      video?.pause()
      cancelAnimationFrame(rafRef.current)
      return
    }

    playStartRef.current = performance.now()
    globalStartRef.current = currentTime
    const location = locateTime(project, currentTime)
    if (location) {
      const asset = project.assets.find(a => a.id === location.clip.assetId)
      if (asset?.type === 'video') {
        setTimeout(() => videoRef.current?.play().catch(() => undefined), 0)
      }
    }

    const tick = (now: number) => {
      const next = globalStartRef.current + (now - playStartRef.current) / 1000
      if (next >= total) {
        onTime(total)
        onEnded()
        return
      }
      onTime(next)
      render(next)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isPlaying, project, total, onTime, onEnded, render])


  useEffect(() => {
    const audio = audioRef.current
    const soundtrack = project.soundtrack
    if (!audio || !soundtrack) {
      if (audio) audio.pause()
      return
    }
    const url = urls[soundtrack.assetId]
    if (!url) return
    if (audio.src !== url) audio.src = url
    audio.volume = soundtrack.volume
    audio.loop = soundtrack.loop
    if (!isPlaying) {
      audio.pause()
      if (Math.abs(audio.currentTime - currentTime) > 0.08) {
        try { audio.currentTime = currentTime % Math.max(audio.duration || 1, 1) } catch {}
      }
      return
    }
    if (Math.abs(audio.currentTime - currentTime) > 0.4) {
      try { audio.currentTime = currentTime % Math.max(audio.duration || 1, 1) } catch {}
    }
    audio.play().catch(() => undefined)
  }, [currentTime, isPlaying, project.soundtrack, urls])

  useEffect(() => {
    const location = locateTime(project, currentTime)
    const video = videoRef.current
    if (!location || !video) return
    const asset = project.assets.find(a => a.id === location.clip.assetId)
    if (isPlaying && asset?.type === 'video' && video.paused) video.play().catch(() => undefined)
  }, [currentTime, isPlaying, project])

  return (
    <div className="preview-frame" style={ratioStyle}>
      <canvas ref={canvasRef} width={960} height={project.ratio === '9:16' ? 1707 : project.ratio === '1:1' ? 960 : project.ratio === '4:5' ? 1200 : 540} />
      <video ref={videoRef} playsInline className="preview-media-hidden" />
      <audio ref={audioRef} className="preview-media-hidden" />
    </div>
  )
}
