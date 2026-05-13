import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useLang } from '../i18n/LanguageContext'

function MessageCard({ name, message, created_at }) {
  const date = new Date(created_at).toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'long', year: 'numeric',
  })
  return (
    <div className="border border-gold-200 p-6 relative">
      <div className="absolute top-3 left-4 font-script text-4xl text-gold-200 leading-none select-none">"</div>
      <p className="font-serif text-base text-charcoal/80 italic leading-relaxed mt-4 mb-4 pl-4">
        {message}
      </p>
      <div className="flex items-center justify-between">
        <p className="font-sans text-xs uppercase tracking-widest text-gold-400">{name}</p>
        <p className="font-sans text-xs text-blush-500">{date}</p>
      </div>
    </div>
  )
}

export default function LivreOr() {
  const { t } = useLang()
  const [messages, setMessages] = useState([])
  const [form, setForm] = useState({ name: '', message: '' })
  const [status, setStatus] = useState(null)

  useEffect(() => {
    supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => data && setMessages(data))
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    const { data, error } = await supabase
      .from('guestbook')
      .insert([{ name: form.name, message: form.message }])
      .select()
    if (!error && data) {
      setMessages(m => [data[0], ...m])
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
        <div className="text-center mb-16">
          <p className="section-subtitle">{t.guestbook.subtitle}</p>
          <h2 className="section-title mt-2">{t.guestbook.title}</h2>
          <div className="divider-gold mt-6">
            <svg className="w-4 h-4 text-gold-300 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
            </svg>
          </div>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="border border-gold-200 p-8 mb-12 space-y-6">
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

        {/* Messages */}
        {messages.length === 0 ? (
          <p className="text-center font-serif italic text-charcoal/50">{t.guestbook.empty}</p>
        ) : (
          <div className="grid gap-6">
            {messages.map(msg => (
              <MessageCard key={msg.id} {...msg} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
