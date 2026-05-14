import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useLang } from '../i18n/LanguageContext'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'lihioliaprincy2026'

export default function Admin() {
  const { t } = useLang()
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [rsvps, setRsvps] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  function handleLogin(e) {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
      setError('')
    } else {
      setError(t.admin.wrong)
    }
  }

  useEffect(() => {
    if (!authenticated) return
    setLoading(true)
    supabase
      .from('rsvps')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setRsvps(data || [])
        setLoading(false)
      })
  }, [authenticated])

  function exportCSV() {
    const headers = ['Nom', 'Téléphone', 'Présent', 'Couple', 'Cérémonie', 'Date']
    const rows = rsvps.map(r => [
      r.name,
      r.phone || '',
      r.attending ? 'Oui' : 'Non',
      r.couple    ? 'Oui' : 'Non',
      r.ceremony || '',
      new Date(r.created_at).toLocaleDateString('fr-FR'),
    ])
    const csv = [headers, ...rows].map(row => row.map(v => `"${v}"`).join(',')).join('\n')
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `rsvp-lihiolia-princy-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <p className="font-script text-4xl text-gold-400 mb-2">L & P</p>
            <h1 className="font-serif text-2xl text-charcoal">{t.admin.title}</h1>
          </div>
          <form onSubmit={handleLogin} className="border border-gold-200 p-8 space-y-6">
            <div>
              <label className="font-sans text-xs uppercase tracking-widest text-gold-400 block mb-2">
                {t.admin.password}
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="input-elegant"
                required
              />
            </div>
            {error && <p className="font-sans text-xs text-red-400">{error}</p>}
            <button type="submit" className="btn-primary w-full text-center">
              {t.admin.login}
            </button>
          </form>
        </div>
      </div>
    )
  }

  const attending    = rsvps.filter(r => r.attending)
  const notAttending = rsvps.filter(r => !r.attending)
  const civil        = rsvps.filter(r => r.ceremony === 'civil')
  const coutumier    = rsvps.filter(r => r.ceremony === 'coutumier')

  const filtered = rsvps
    .filter(r => filter === 'all' || r.ceremony === filter)
    .filter(r => r.name?.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="min-h-screen bg-cream px-6 py-12">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="font-script text-3xl text-gold-400">L & P</p>
            <h1 className="font-serif text-2xl text-charcoal">{t.admin.title}</h1>
          </div>
          <div className="flex gap-3">
            <button onClick={exportCSV} className="btn-outline text-sm">
              ↓ Export CSV
            </button>
            <button onClick={() => setAuthenticated(false)} className="btn-outline text-sm">
              {t.admin.logout}
            </button>
          </div>
        </div>

        {/* Stats globales */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {[
            { label: 'Total RSVP', value: rsvps.length },
            { label: 'Présents',   value: attending.length },
            { label: 'Absents',    value: notAttending.length },
          ].map(({ label, value }) => (
            <div key={label} className="border border-gold-200 p-6 text-center">
              <p className="font-serif text-4xl text-gold-400 mb-1">{value}</p>
              <p className="font-sans text-xs uppercase tracking-widest text-charcoal/50">{label}</p>
            </div>
          ))}
        </div>

        {/* Stats par cérémonie */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          {[
            { label: 'Mariage Civil',      data: civil },
            { label: 'Mariage Coutumier',  data: coutumier },
          ].map(({ label, data }) => (
            <div key={label} className="border border-gold-100 bg-blush-50/30 p-4 text-center">
              <p className="font-sans text-xs uppercase tracking-widest text-gold-400 mb-2">{label}</p>
              <div className="flex justify-center gap-6">
                <div>
                  <p className="font-serif text-2xl text-gold-400">{data.filter(r => r.attending).length}</p>
                  <p className="font-sans text-[10px] uppercase tracking-wide text-charcoal/40">Présents</p>
                </div>
                <div className="w-px bg-gold-100" />
                <div>
                  <p className="font-serif text-2xl text-blush-400">{data.filter(r => !r.attending).length}</p>
                  <p className="font-sans text-[10px] uppercase tracking-wide text-charcoal/40">Absents</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recherche + filtre */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Rechercher un invité…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-elegant max-w-xs flex-1"
          />
          <div className="flex gap-2">
            {[
              { key: 'all',       label: 'Tous' },
              { key: 'civil',     label: 'Civil' },
              { key: 'coutumier', label: 'Coutumier' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`font-sans text-xs uppercase tracking-widest px-4 py-2 border transition-all duration-200 ${
                  filter === key
                    ? 'bg-gold-300 border-gold-300 text-cream'
                    : 'border-gold-300 text-gold-400 hover:bg-gold-300 hover:text-cream'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tableau */}
        <h2 className="font-serif text-xl text-charcoal mb-4">
          {t.admin.rsvps}
          {filtered.length !== rsvps.length && (
            <span className="font-sans text-sm text-charcoal/40 ml-2">({filtered.length} résultat{filtered.length > 1 ? 's' : ''})</span>
          )}
        </h2>

        {loading ? (
          <p className="font-sans text-sm text-charcoal/50 text-center py-10">Chargement…</p>
        ) : filtered.length === 0 ? (
          <p className="font-sans text-sm text-charcoal/50 text-center py-10 border border-gold-100">
            {search || filter !== 'all' ? 'Aucun résultat pour cette recherche.' : t.admin.noData}
          </p>
        ) : (
          <div className="overflow-x-auto border border-gold-200">
            <table className="w-full">
              <thead className="bg-blush-50">
                <tr>
                  {[t.admin.name, t.admin.phone, t.admin.attending, 'Couple', t.admin.ceremony, t.admin.date].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-sans text-xs uppercase tracking-widest text-gold-400 border-b border-gold-100">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr key={r.id} className={i % 2 === 0 ? 'bg-cream' : 'bg-blush-50/30'}>
                    <td className="px-4 py-3 font-serif text-sm text-charcoal">{r.name}</td>
                    <td className="px-4 py-3 font-sans text-xs text-charcoal/70">{r.phone || '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`font-sans text-xs uppercase tracking-wide px-2 py-1 ${
                        r.attending ? 'bg-gold-100 text-gold-500' : 'bg-blush-100 text-blush-400'
                      }`}>
                        {r.attending ? t.admin.yes : t.admin.no}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`font-sans text-xs uppercase tracking-wide px-2 py-1 ${
                        r.couple ? 'bg-gold-100 text-gold-500' : 'bg-blush-50 text-charcoal/30'
                      }`}>
                        {r.couple ? 'Oui' : 'Non'}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-sans text-xs text-charcoal/70 capitalize">
                      {r.ceremony || '—'}
                    </td>
                    <td className="px-4 py-3 font-sans text-xs text-charcoal/40">
                      {new Date(r.created_at).toLocaleDateString('fr-FR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  )
}
