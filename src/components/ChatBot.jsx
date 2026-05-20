import { useState, useRef, useEffect } from 'react'
import { useLang } from '../i18n/LanguageContext'

export default function ChatBot() {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: t.chatbot.welcome },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  // Mettre à jour le message de bienvenue si la langue change
  useEffect(() => {
    setMessages([{ role: 'assistant', content: t.chatbot.welcome }])
  }, [t.chatbot.welcome])

  async function sendMessage(e) {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMsg = { role: 'user', content: input.trim() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const history = newMessages.map(m => ({ role: m.role, content: m.content }))

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })

      const data = await res.json()
      const reply = data?.content?.[0]?.text || '…'
      setMessages(m => [...m, { role: 'assistant', content: reply }])
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: 'Désolée, une erreur est survenue. Réessayez !' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Bulle flottante */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gold-400 hover:bg-gold-500 text-cream rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105"
        aria-label="Assistant mariage"
      >
        {open ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
        )}
      </button>

      {/* Fenêtre chat */}
      {open && (
        <div className="fixed bottom-24 right-4 z-50 w-[calc(100vw-2rem)] sm:w-80 md:w-96 bg-cream border border-gold-200 shadow-2xl flex flex-col"
          style={{ maxHeight: '75vh' }}>
          {/* Header */}
          <div className="bg-charcoal px-5 py-4 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-gold-300 animate-pulse" />
            <p className="font-sans text-xs uppercase tracking-widest text-cream">{t.chatbot.title}</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-3 text-sm font-serif leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-gold-300 text-cream'
                    : 'bg-blush-100 text-charcoal border border-gold-100'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-blush-100 border border-gold-100 px-4 py-3">
                  <div className="flex gap-1">
                    {[0,1,2].map(i => (
                      <span key={i} className="block w-1.5 h-1.5 bg-gold-300 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="border-t border-gold-100 flex">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={t.chatbot.placeholder}
              className="flex-1 bg-transparent px-4 py-3 font-sans text-sm text-charcoal placeholder-blush-200 outline-none"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-4 text-gold-400 hover:text-gold-500 disabled:opacity-30 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  )
}
