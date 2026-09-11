import type { Project } from '../types'

const DB_NAME = 'edituno-db'
const DB_VERSION = 1
const PROJECTS = 'projects'
const BLOBS = 'blobs'

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(PROJECTS)) db.createObjectStore(PROJECTS, { keyPath: 'id' })
      if (!db.objectStoreNames.contains(BLOBS)) db.createObjectStore(BLOBS)
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export async function saveProject(project: Project): Promise<void> {
  const db = await openDb()
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(PROJECTS, 'readwrite')
    tx.objectStore(PROJECTS).put(project)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
  db.close()
}

export async function getProject(id: string): Promise<Project | undefined> {
  const db = await openDb()
  const result = await new Promise<Project | undefined>((resolve, reject) => {
    const req = db.transaction(PROJECTS, 'readonly').objectStore(PROJECTS).get(id)
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
  db.close()
  return result
}

export async function listProjects(): Promise<Project[]> {
  const db = await openDb()
  const result = await new Promise<Project[]>((resolve, reject) => {
    const req = db.transaction(PROJECTS, 'readonly').objectStore(PROJECTS).getAll()
    req.onsuccess = () => resolve(req.result ?? [])
    req.onerror = () => reject(req.error)
  })
  db.close()
  return result.sort((a, b) => b.updatedAt - a.updatedAt)
}

export async function deleteProject(id: string): Promise<void> {
  const project = await getProject(id)
  const db = await openDb()
  const tx = db.transaction([PROJECTS, BLOBS], 'readwrite')
  tx.objectStore(PROJECTS).delete(id)
  project?.assets.forEach(asset => tx.objectStore(BLOBS).delete(asset.id))
  await new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
  db.close()
}

export async function putBlob(id: string, blob: Blob): Promise<void> {
  const db = await openDb()
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(BLOBS, 'readwrite')
    tx.objectStore(BLOBS).put(blob, id)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
  db.close()
}

export async function getBlob(id: string): Promise<Blob | undefined> {
  const db = await openDb()
  const result = await new Promise<Blob | undefined>((resolve, reject) => {
    const req = db.transaction(BLOBS, 'readonly').objectStore(BLOBS).get(id)
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
  db.close()
  return result
}
