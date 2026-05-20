import { useLang } from '../i18n/LanguageContext'
import { useInvite } from '../context/InviteContext'

function CeremonyCard({ icon, title, time, desc, location, index }) {
  return (
    <div
      className="relative bg-cream border border-gold-200 p-8 md:p-12 text-center group hover:border-gold-300 transition-colors duration-300"
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      {/* Coins décoratifs */}
      <span className="absolute top-2 left-2 w-4 h-4 border-t border-l border-gold-300 opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="absolute top-2 right-2 w-4 h-4 border-t border-r border-gold-300 opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-gold-300 opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-gold-300 opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Icône */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full border border-gold-200 flex items-center justify-center">
          {icon}
        </div>
      </div>

      <h3 className="font-serif text-2xl md:text-3xl font-bold text-charcoal mb-2">{title}</h3>
      <p className="font-sans text-sm font-semibold uppercase tracking-[0.3em] text-gold-500 mb-4">{time}</p>
      <div className="w-8 h-px bg-gold-200 mx-auto mb-4" />
      <p className="font-serif text-base text-charcoal/85 italic leading-relaxed mb-4">{desc}</p>
      <p className="font-sans text-xs font-medium uppercase tracking-widest text-blush-500">{location}</p>
    </div>
  )
}

export default function Details() {
  const { t } = useLang()
  const invite = useInvite()

  const allCeremonies = [
    {
      icon: (
        <svg className="w-7 h-7 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      key: 'civil',
      ...t.details.civil,
    },
    {
      icon: (
        <svg className="w-7 h-7 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      key: 'coutumier',
      ...t.details.coutumier,
    },
  ]

  const ceremonies = invite === 'coutumier'
    ? allCeremonies.filter(c => c.key === 'coutumier')
    : allCeremonies

  return (
    <section id="details" className="py-16 px-6 bg-blush-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="section-subtitle">{t.details.subtitle}</p>
          <h2 className="section-title mt-2">{t.details.title}</h2>
          <div className="divider-gold mt-6">
            <svg className="w-4 h-4 text-gold-300 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        </div>

        <div className={`grid gap-8 ${ceremonies.length === 1 ? 'max-w-md mx-auto' : 'md:grid-cols-2'}`}>
          {ceremonies.map((c, i) => (
            <CeremonyCard key={c.key} index={i} {...c} />
          ))}
        </div>

        {/* Date centrale */}
        <div className="text-center mt-10 mb-8">
          <p className="font-script text-4xl text-gold-400">29 Août 2026</p>
        </div>

      </div>
    </section>
  )
}
