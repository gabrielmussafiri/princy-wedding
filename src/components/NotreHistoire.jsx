import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext'

export default function NotreHistoire() {
  const { t } = useLang()
  const [hasPhoto, setHasPhoto] = useState(true)

  return (
    <section id="story" className="py-28 px-6 bg-cream">
      <div className="max-w-3xl mx-auto text-center">
        {/* Ornement top */}
        <div className="flex justify-center mb-8">
          <svg width="60" height="30" viewBox="0 0 60 30" fill="none" className="text-gold-300">
            <path d="M0 15 Q15 0 30 15 Q45 30 60 15" stroke="currentColor" strokeWidth="0.8" fill="none"/>
            <circle cx="30" cy="15" r="2" fill="currentColor"/>
          </svg>
        </div>

        <p className="section-subtitle mb-4">{t.story.subtitle}</p>
        <h2 className="section-title mb-2">{t.story.title}</h2>

        <div className="divider-gold">
          <svg className="w-4 h-4 text-gold-300 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
          </svg>
        </div>

        {/* Texte histoire */}
        <div className="space-y-6 text-left">
          {t.story.body.split('\n\n').map((para, i) => (
            <p key={i} className="font-serif text-lg md:text-xl text-charcoal/80 leading-relaxed italic">
              {para}
            </p>
          ))}
        </div>

        {/* Photo du couple */}
        <div className="mt-16 relative max-w-lg mx-auto">
          <div className="aspect-[4/3] overflow-hidden bg-blush-100 border border-gold-200">
            {hasPhoto ? (
              <img
                src="/images/gallery/DSC01103.jpg.jpeg"
                alt="Lihiolia & Princy"
                onError={() => setHasPhoto(false)}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="font-script text-5xl text-gold-300 mb-2">L & P</div>
                  <p className="font-sans text-xs uppercase tracking-widest text-blush-500">Photo à venir</p>
                </div>
              </div>
            )}
          </div>
          {/* Cadre décoratif */}
          <div className="absolute -top-3 -left-3 w-16 h-16 border-t border-l border-gold-300 pointer-events-none" />
          <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b border-r border-gold-300 pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
