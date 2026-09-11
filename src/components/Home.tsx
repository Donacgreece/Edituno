import { Download, Film, Languages, LockKeyhole, MonitorDown, Plus, ShieldCheck, Sparkles, Trash2, WifiOff } from 'lucide-react'
import type { Language, Project } from '../types'
import { t } from '../lib/i18n'
import { Logo } from './Logo'

interface HomeProps {
  language: Language
  projects: Project[]
  installAvailable: boolean
  onLanguage: (language: Language) => void
  onCreate: () => void
  onOpen: (id: string) => void
  onDelete: (id: string) => void
  onInstall: () => void
}

export function Home({ language, projects, installAvailable, onLanguage, onCreate, onOpen, onDelete, onInstall }: HomeProps) {
  return (
    <main className="home-shell">
      <header className="home-header">
        <Logo />
        <div className="home-header-actions">
          <button className="ghost-button language-button" onClick={() => onLanguage(language === 'en' ? 'el' : 'en')}>
            <Languages size={18} /> {language === 'en' ? 'ΕΛ' : 'EN'}
          </button>
          {installAvailable && (
            <button className="ghost-button" onClick={onInstall}>
              <Download size={18} /> {t(language, 'install')}
            </button>
          )}
          <button className="primary-button" onClick={onCreate}>
            <Plus size={19} /> {t(language, 'newProject')}
          </button>
        </div>
      </header>

      <section className="hero-panel">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={15} /> {t(language, 'localFirst')}</div>
          <h1>{t(language, 'createTagline')}</h1>
          <p className="hero-subtitle">{t(language, 'freeNoWatermark')}</p>
          <p className="hero-body">{t(language, 'heroBody')}</p>
          <div className="hero-actions">
            <button className="primary-button large" onClick={onCreate}><Film size={20} /> {t(language, 'createProject')}</button>
          </div>
          <div className="trust-row">
            <span><ShieldCheck size={17} /> {t(language, 'privacy')}</span>
            <span><WifiOff size={17} /> {t(language, 'offline')}</span>
            <span><LockKeyhole size={17} /> {t(language, 'noAccount')}</span>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="mock-window">
            <div className="mock-topbar"><i /><i /><i /></div>
            <div className="mock-content">
              <div className="mock-sidebar">
                <b /> <span /> <span /> <span /> <span />
              </div>
              <div className="mock-stage">
                <div className="mock-player"><div className="mock-play">▶</div></div>
                <div className="mock-timeline">
                  <div className="mock-track azure" />
                  <div className="mock-track violet" />
                  <div className="mock-track soft" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="projects-section">
        <div className="section-title-row">
          <div>
            <p className="eyebrow plain">{t(language, 'home')}</p>
            <h2>{t(language, 'recentProjects')}</h2>
          </div>
        </div>
        {projects.length === 0 ? (
          <button className="empty-project-card" onClick={onCreate}>
            <div className="empty-project-icon"><Plus size={24} /></div>
            <strong>{t(language, 'newProject')}</strong>
            <span>{t(language, 'noProjects')}</span>
          </button>
        ) : (
          <div className="project-grid">
            {projects.map(project => (
              <article className="project-card" key={project.id}>
                <button className="project-open" onClick={() => onOpen(project.id)}>
                  <div className={`project-thumb ratio-${project.ratio.replace(':', '-')}`}>
                    <div className="project-thumb-play">▶</div>
                  </div>
                  <div className="project-card-copy">
                    <strong>{project.name}</strong>
                    <span>{new Date(project.updatedAt).toLocaleString(language === 'el' ? 'el-GR' : 'en-US', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                  </div>
                </button>
                <button className="icon-button danger-hover project-delete" title={t(language, 'deleteProject')} onClick={() => onDelete(project.id)}>
                  <Trash2 size={17} />
                </button>
              </article>
            ))}
          </div>
        )}
      </section>

      <div className="desktop-tip"><MonitorDown size={17} /> {t(language, 'desktopTip')}</div>
    </main>
  )
}
