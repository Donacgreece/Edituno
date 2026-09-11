export type Language = 'en' | 'el'
export type AspectRatio = '16:9' | '9:16' | '1:1' | '4:5'
export type AssetType = 'video' | 'image' | 'audio'

export interface MediaAsset {
  id: string
  name: string
  type: AssetType
  mimeType: string
  duration: number
  width?: number
  height?: number
  size: number
}

export interface Clip {
  id: string
  assetId: string
  start: number
  end: number
  speed: number
  volume: number
  scale: number
  rotation: number
  opacity: number
  fit: 'contain' | 'cover'
}

export interface TextOverlay {
  id: string
  text: string
  start: number
  end: number
  x: number
  y: number
  fontSize: number
  color: string
  background: string
  weight: 400 | 600 | 700 | 800
  align: 'left' | 'center' | 'right'
}

export interface Soundtrack {
  assetId: string
  volume: number
  loop: boolean
}

export interface Project {
  id: string
  name: string
  createdAt: number
  updatedAt: number
  ratio: AspectRatio
  assets: MediaAsset[]
  clips: Clip[]
  textOverlays: TextOverlay[]
  soundtrack?: Soundtrack
}

export type SelectedItem =
  | { type: 'clip'; id: string }
  | { type: 'text'; id: string }
  | { type: 'none' }
