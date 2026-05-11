import { createContext, useContext, useState } from 'react'
import { fr } from './fr'
import { en } from './en'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('fr')
  const t = lang === 'fr' ? fr : en
  const toggle = () => setLang(l => l === 'fr' ? 'en' : 'fr')

  return (
    <LanguageContext.Provider value={{ lang, t, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
