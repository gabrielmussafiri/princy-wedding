import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { useLang } from '../i18n/LanguageContext'

const AUTOPLAY_DELAY = 5000

export default function LivreOr() {
  const { t } = useLang()
  const [messages, setMessages] = useState([])
  const [current, setCurrent] = useState(0)
  const [form, setForm] = useState({ name: '', message: '' })
  const [status, setStatus] = useState(null)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)
      .then(({ data }) => data && setMessages(data))
  }, [])

  useEffect(() => {
    if (messages.length <= 1 || paused) return
    timerRef.current = setInterval(() => {
      setCurrent(i => (i + 1) % messages.length)
    }, AUTOPLAY_DELAY)
    return () => clearInterval(timerRef.current)
  }, [messages.length, paused])

  const prev = () => setCurrent(i => (i - 1 + messages.length) % messages.length)
  const next = () => setCurrent(i => (i + 1) % messages.length)

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    const { data, error } = await supabase
      .from('guestbook')
      .insert([{ name: form.name, message: form.message }])
      .select()
    if (!error && data) {
      setMessages(m => [data[0], ...m])
      setCurrent(0)
      setForm({ name: '', message: '' })
      setStatus('success')
      setTimeout(() => setStatus(null), 3000)
    } else {
      setStatus('error')
    }
  }

  return (
    <section id="guestbook" className="py-28 px-6 bg-cream">
      <div className="max-w-3xl mx-auto">

        {/* En-tête */}
        <div className="text-center mb-16">
          <p className="section-subtitle">{t.guestbook.subtitle}</p>
          <h2 className="section-title mt-2">{t.guestbook.title}</h2>
          <div className="divider-gold mt-6">
            <svg className="w-4 h-4 text-gold-300 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
            </svg>
          </div>
        </div>

        {/* Carousel */}
        {messages.length > 0 && (
          <div
            className="mb-16"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Carte */}
            <div className="relative overflow-hidden border border-gold-200 px-6 sm:px-12 py-10 min-h-[200px] flex items-center">
              {messages.map((msg, i) => (
                <div
                  key={msg.id}
                  className={`absolute inset-0 flex flex-col items-center justify-center px-12 py-10 transition-opacity duration-700 ${
                    i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <p className="font-script text-3xl sm:text-5xl text-gold-200 leading-none mb-4 select-none">"</p>
                  <p className="font-serif text-base sm:text-lg text-charcoal/80 italic leading-relaxed text-center mb-6">
                    {msg.message}
                  </p>
                  <div className="w-8 h-px bg-gold-300 mb-4" />
                  <p className="font-sans text-xs uppercase tracking-widest text-gold-400">{msg.name}</p>
                </div>
              ))}

              {/* Flèches */}
              {messages.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gold-300 hover:text-gold-500 transition-colors"
                    aria-label="Précédent"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7"/>
                    </svg>
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gold-300 hover:text-gold-500 transition-colors"
                    aria-label="Suivant"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7"/>
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Indicateurs */}
            {messages.length > 1 && (
              <div className="flex justify-center mt-4">
                {messages.length <= 12 ? (
                  <div className="flex gap-2">
                    {messages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`transition-all duration-300 rounded-full ${
                          i === current
                            ? 'w-5 h-1.5 bg-gold-400'
                            : 'w-1.5 h-1.5 bg-gold-200 hover:bg-gold-300'
                        }`}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="font-sans text-xs text-charcoal/40 tracking-widest">
                    {current + 1} / {messages.length}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {messages.length === 0 && (
          <p className="text-center font-serif italic text-charcoal/50 mb-16">{t.guestbook.empty}</p>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="border border-gold-200 p-4 sm:p-8 space-y-6">
          <div>
            <label className="font-sans text-xs uppercase tracking-widest text-gold-400 block mb-2">
              {t.guestbook.name}
            </label>
            <input
              required
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder={t.guestbook.name}
              className="input-elegant"
            />
          </div>
          <div>
            <label className="font-sans text-xs uppercase tracking-widest text-gold-400 block mb-2">
              {t.guestbook.message}
            </label>
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              placeholder={t.guestbook.message}
              className="input-elegant resize-none"
            />
          </div>
          {status === 'success' && (
            <p className="font-sans text-xs text-gold-400 text-center">{t.guestbook.success}</p>
          )}
          {status === 'error' && (
            <p className="font-sans text-xs text-red-400 text-center">{t.guestbook.error}</p>
          )}
          <div className="text-center">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-outline disabled:opacity-50"
            >
              {status === 'loading' ? '…' : t.guestbook.submit}
            </button>
          </div>
        </form>

      </div>
    </section>
  )
}
