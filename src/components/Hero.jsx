import { useState, useEffect } from 'react'
import { useLang } from '../i18n/LanguageContext'

const WEDDING_DATE = new Date('2026-08-29T10:00:00')

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft())

  function getTimeLeft() {
    const diff = WEDDING_DATE - Date.now()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    }
  }

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return timeLeft
}

function CountdownBlock({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <div className="w-16 h-16 md:w-20 md:h-20 border border-gold-300/50 bg-cream/10 backdrop-blur-sm flex items-center justify-center">
          <span className="font-serif text-3xl md:text-4xl text-cream font-light">
            {String(value).padStart(2, '0')}
          </span>
        </div>
      </div>
      <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold-200">
        {label}
      </span>
    </div>
  )
}

export default function Hero() {
  const { t } = useLang()
  const countdown = useCountdown()

  const [hasPhoto, setHasPhoto] = useState(true)

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Photo de fond plein écran */}
      {hasPhoto ? (
        <img
          src="/images/gallery/DSC01101.jpg.jpeg"
          alt=""
          onError={() => setHasPhoto(false)}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      ) : null}

      {/* Voile sombre par-dessus la photo (ou fond de secours) */}
      <div className={`absolute inset-0 ${hasPhoto
        ? 'bg-gradient-to-b from-black/55 via-black/40 to-black/65'
        : 'bg-gradient-to-br from-charcoal via-[#2C1F1F] to-[#3D2B2B]'
      }`} />

      {/* Texture florale subtile (visible uniquement sans photo) */}
      {!hasPhoto && (
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF6A' fill-opacity='1'%3E%3Cpath d='M40 0 Q50 20 40 40 Q30 20 40 0Z'/%3E%3Cpath d='M40 80 Q50 60 40 40 Q30 60 40 80Z'/%3E%3Cpath d='M0 40 Q20 50 40 40 Q20 30 0 40Z'/%3E%3Cpath d='M80 40 Q60 50 40 40 Q60 30 80 40Z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px',
          }}
        />
      )}

      {/* Liseré or haut */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent" />

      {/* Contenu */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 animate-fade-in">
        {/* Invitation */}
        <p className="font-sans text-xs uppercase tracking-[0.4em] text-gold-200 mb-8">
          {t.hero.invitation}
        </p>

        {/* Ornement */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-px bg-gold-300/60" />
          <svg className="w-4 h-4 text-gold-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
          </svg>
          <div className="w-12 h-px bg-gold-300/60" />
        </div>

        {/* Noms */}
        <h1 className="font-script text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-cream leading-none mb-2">
          Lihiolia
        </h1>
        <div className="font-serif text-gold-300 text-2xl md:text-3xl italic my-2">&amp;</div>
        <h1 className="font-script text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-cream leading-none mb-8">
          Princy
        </h1>

        {/* Séparateur */}
        <div className="flex items-center gap-6 mb-6">
          <div className="w-20 md:w-32 h-px bg-gradient-to-r from-transparent to-gold-300/60" />
          <div className="flex gap-1.5">
            <span className="block w-1 h-1 rounded-full bg-gold-300" />
            <span className="block w-1.5 h-1.5 rounded-full bg-gold-300" />
            <span className="block w-1 h-1 rounded-full bg-gold-300" />
          </div>
          <div className="w-20 md:w-32 h-px bg-gradient-to-l from-transparent to-gold-300/60" />
        </div>

        {/* Sous-titre et date */}
        <p className="font-sans text-sm uppercase tracking-[0.4em] text-white font-semibold mb-2">
          {t.hero.subtitle}
        </p>
        <p className="font-serif text-xl md:text-2xl text-gold-200 italic mb-16">
          {t.hero.date}
        </p>

        {/* Compte à rebours */}
        <div className="flex gap-4 md:gap-8">
          <CountdownBlock value={countdown.days}    label={t.hero.countdown.days} />
          <div className="self-center font-serif text-gold-300 text-2xl mb-6">:</div>
          <CountdownBlock value={countdown.hours}   label={t.hero.countdown.hours} />
          <div className="self-center font-serif text-gold-300 text-2xl mb-6">:</div>
          <CountdownBlock value={countdown.minutes} label={t.hero.countdown.minutes} />
          <div className="self-center font-serif text-gold-300 text-2xl mb-6">:</div>
          <CountdownBlock value={countdown.seconds} label={t.hero.countdown.seconds} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-10 bg-gradient-to-b from-gold-300/0 to-gold-300/60" />
        <svg className="w-3 h-3 text-gold-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Liseré or bas */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent" />
    </section>
  )
}
