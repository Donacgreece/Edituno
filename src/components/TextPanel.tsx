import { Captions, Heading1, Plus, Type } from 'lucide-react'
import type { Language } from '../types'
import { t } from '../lib/i18n'

export function TextPanel({ language, onAddText }: { language: Language; onAddText: (preset: 'title' | 'caption' | 'label') => void }) {
  return (
    <div className="panel-content">
      <button className="import-button" onClick={() => onAddText('title')}><Plus size={17} /> {t(language, 'addText')}</button>
      <p className="panel-help">{t(language, 'textHint')}</p>
      <div className="preset-grid">
        <button className="text-preset" onClick={() => onAddText('title')}><Heading1 size={20} /><strong>{language === 'el' ? 'Τίτλος' : 'Title'}</strong><span>{language === 'el' ? 'Μεγάλος τίτλος' : 'Large headline'}</span></button>
        <button className="text-preset" onClick={() => onAddText('caption')}><Captions size={20} /><strong>Caption</strong><span>{language === 'el' ? 'Για ομιλία και subtitles' : 'For speech and subtitles'}</span></button>
        <button className="text-preset" onClick={() => onAddText('label')}><Type size={20} /><strong>{language === 'el' ? 'Ετικέτα' : 'Label'}</strong><span>{language === 'el' ? 'Μικρό callout' : 'Small callout'}</span></button>
      </div>
    </div>
  )
}
