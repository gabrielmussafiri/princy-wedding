import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useLang } from '../i18n/LanguageContext'
import { useInvite } from '../context/InviteContext'

export default function RSVP() {
  const { t } = useLang()
  const invite = useInvite()
  const INITIAL = { name: '', phone: '', attending: '', ceremony: invite === 'civil' ? 'civil' : '', couple: false }
  const [form, setForm] = useState(INITIAL)
  const [status, setStatus] = useState(null) // null | 'loading' | 'success' | 'error'

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    const { error } = await supabase.from('rsvps').insert([{
      name:      form.name,
      phone:     form.phone,
      attending: form.attending === 'yes',
      ceremony:  form.ceremony,
      couple:    form.couple,
    }])
    setStatus(error ? 'error' : 'success')
    if (!error) setForm(INITIAL)
  }

  return (
    <section id="rsvp" className="py-28 px-6 bg-blush-50">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-16">
          <p className="section-subtitle">{t.rsvp.subtitle}</p>
          <h2 className="section-title mt-2">{t.rsvp.title}</h2>
          <div className="divider-gold mt-6">
            <svg className="w-4 h-4 text-gold-300 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </div>
        </div>

        {status === 'success' ? (
          <div className="text-center py-16 border border-gold-200">
            <svg className="w-12 h-12 text-gold-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p className="font-serif text-xl text-charcoal italic">{t.rsvp.success}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Nom */}
            <div>
              <label className="font-sans text-xs uppercase tracking-widest text-gold-400 block mb-2">
                {t.rsvp.name}
              </label>
              <input
                required
                value={form.name}
                onChange={e => set('name', e.target.value)}
                placeholder={t.rsvp.name}
                className="input-elegant"
              />
            </div>

            {/* Téléphone */}
            <div>
              <label className="font-sans text-xs uppercase tracking-widest text-gold-400 block mb-2">
                {t.rsvp.phone}
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => set('phone', e.target.value)}
                placeholder={t.rsvp.phone}
                className="input-elegant"
              />
            </div>

            {/* Présence */}
            <div>
              <label className="font-sans text-xs uppercase tracking-widest text-gold-400 block mb-4">
                {t.rsvp.attendance}
              </label>
              <div className="flex gap-4">
                {[
                  { value: 'yes', label: t.rsvp.yes },
                  { value: 'no',  label: t.rsvp.no  },
                ].map(({ value, label }) => (
                  <label key={value} className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="attending"
                      value={value}
                      checked={form.attending === value}
                      onChange={() => set('attending', value)}
                      className="sr-only"
                      required
                    />
                    <div className={`text-center border py-3 font-sans text-xs uppercase tracking-widest transition-all duration-200 ${
                      form.attending === value
                        ? 'border-gold-400 bg-gold-300 text-cream'
                        : 'border-gold-200 text-charcoal hover:border-gold-300'
                    }`}>
                      {label}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Cérémonie (visible seulement si présent et pas en mode civil exclusif) */}
            {form.attending === 'yes' && invite !== 'civil' && (
              <div>
                <label className="font-sans text-xs uppercase tracking-widest text-gold-400 block mb-4">
                  {t.rsvp.ceremony}
                </label>
                <div className="flex flex-col gap-3">
                  {[
                    { value: 'civil',      label: t.rsvp.civil },
                    { value: 'coutumier',  label: t.rsvp.coutumier },
                    { value: 'both',       label: t.rsvp.both },
                  ].map(({ value, label }) => (
                    <label key={value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="ceremony"
                        value={value}
                        checked={form.ceremony === value}
                        onChange={() => set('ceremony', value)}
                        className="sr-only"
                        required
                      />
                      <div className={`text-center border py-3 font-sans text-xs uppercase tracking-widest transition-all duration-200 ${
                        form.ceremony === value
                          ? 'border-gold-400 bg-gold-300 text-cream'
                          : 'border-gold-200 text-charcoal hover:border-gold-300'
                      }`}>
                        {label}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Couple */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div
                  onClick={() => set('couple', !form.couple)}
                  className={`w-5 h-5 flex-shrink-0 border transition-all duration-200 flex items-center justify-center ${
                    form.couple ? 'border-gold-400 bg-gold-300' : 'border-gold-200 group-hover:border-gold-300'
                  }`}
                >
                  {form.couple && (
                    <svg className="w-3 h-3 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="font-sans text-xs uppercase tracking-widest text-charcoal/70">
                  {t.rsvp.couple}
                </span>
              </label>
            </div>

            {status === 'error' && (
              <p className="font-sans text-xs text-red-400 text-center">{t.rsvp.error}</p>
            )}

            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? '…' : t.rsvp.submit}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
