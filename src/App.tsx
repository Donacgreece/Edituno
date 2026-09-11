import { useCallback, useEffect, useState } from 'react'
import type { Language, Project } from './types'
import { deleteProject, getBlob, getProject, listProjects, saveProject } from './lib/db'
import { uid } from './lib/media'
import { Home } from './components/Home'
import { Editor } from './components/Editor'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const languageFromStorage = (): Language => {
  const stored = localStorage.getItem('edituno-language')
  if (stored === 'el' || stored === 'en') return stored
  return navigator.language.toLowerCase().startsWith('el') ? 'el' : 'en'
}

function App() {
  const [language, setLanguage] = useState<Language>(languageFromStorage)
  const [projects, setProjects] = useState<Project[]>([])
  const [active, setActive] = useState<Project | null>(null)
  const [urls, setUrls] = useState<Record<string, string>>({})
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)

  const refreshProjects = useCallback(() => listProjects().then(setProjects).catch(() => setProjects([])), [])

  useEffect(() => { refreshProjects() }, [refreshProjects])
  useEffect(() => { localStorage.setItem('edituno-language', language); document.documentElement.lang = language }, [language])
  useEffect(() => {
    const listener = (event: Event) => { event.preventDefault(); setInstallPrompt(event as BeforeInstallPromptEvent) }
    window.addEventListener('beforeinstallprompt', listener)
    return () => window.removeEventListener('beforeinstallprompt', listener)
  }, [])

  const createProject = async () => {
    const now = Date.now()
    const project: Project = { id: uid(), name: language === 'el' ? 'Νέο project' : 'Untitled project', createdAt: now, updatedAt: now, ratio: '16:9', assets: [], clips: [], textOverlays: [] }
    await saveProject(project)
    setUrls({})
    setActive(project)
    await refreshProjects()
  }

  const openProject = async (id: string) => {
    const project = await getProject(id)
    if (!project) return
    const nextUrls: Record<string, string> = {}
    for (const asset of project.assets) {
      const blob = await getBlob(asset.id)
      if (blob) nextUrls[asset.id] = URL.createObjectURL(blob)
    }
    Object.values(urls).forEach(URL.revokeObjectURL)
    setUrls(nextUrls)
    setActive(project)
  }

  const removeProject = async (id: string) => {
    if (!window.confirm(language === 'el' ? 'Να διαγραφεί αυτό το project;' : 'Delete this project?')) return
    await deleteProject(id)
    await refreshProjects()
  }

  const goHome = async () => {
    Object.values(urls).forEach(URL.revokeObjectURL)
    setUrls({})
    setActive(null)
    await refreshProjects()
  }

  const install = async () => {
    if (!installPrompt) return
    await installPrompt.prompt()
    await installPrompt.userChoice
    setInstallPrompt(null)
  }

  if (active) return <Editor language={language} initialProject={active} initialUrls={urls} onLanguage={setLanguage} onHome={goHome} onSaved={project => { setActive(project); refreshProjects() }} />

  return <Home language={language} projects={projects} installAvailable={Boolean(installPrompt)} onLanguage={setLanguage} onCreate={createProject} onOpen={openProject} onDelete={removeProject} onInstall={install} />
}

export default App
