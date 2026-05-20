import { useState, useEffect } from 'react'
import { useLang } from '../i18n/LanguageContext'

export default function Navbar() {
  const { t, lang, toggle } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#story',     label: t.nav.story },
    { href: '#details',   label: t.nav.details },
    { href: '#gallery',   label: t.nav.gallery },
    { href: '#rsvp',      label: t.nav.rsvp },
    { href: '#guestbook', label: t.nav.guestbook },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-cream/95 backdrop-blur-sm shadow-sm py-3' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Monogramme */}
        <a href="#hero" className="font-script text-2xl text-gold-400 hover:text-gold-500 transition-colors">
          L & P
        </a>

        {/* Liens desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="font-sans text-xs uppercase tracking-widest text-charcoal hover:text-gold-400 transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Bouton langue + burger */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggle}
            className="font-sans text-xs uppercase tracking-widest border border-gold-300 text-gold-400 hover:bg-gold-300 hover:text-cream px-3 py-2 min-h-[36px] transition-all duration-200"
          >
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>

          {/* Burger mobile */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
          >
            <span className={`block w-6 h-px bg-charcoal transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-px bg-charcoal transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-charcoal transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden bg-cream/98 backdrop-blur-sm border-t border-gold-100 px-6 py-6 flex flex-col gap-5">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="font-sans text-xs uppercase tracking-widest text-charcoal hover:text-gold-400 transition-colors py-3 min-h-[44px] flex items-center"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
