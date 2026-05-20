import Groq from 'groq-sdk'

const WEDDING_CONTEXT = `Tu es l'assistante officielle du mariage de Lihiolia et Princy, le 29 Août 2026.
Voici les informations que tu connais :
- Mariage Civil : 10h00 à 13h00 (lieu à confirmer)
- Mariage Coutumier : 19h00 jusqu'à l'aube (lieu à confirmer)
- Les invités peuvent confirmer leur présence via le formulaire RSVP sur le site
- Ils peuvent laisser un message dans le livre d'or
- Code vestimentaire : élégant, couleurs claires, festif
- Pour toute question sur les détails logistiques non encore confirmés, invite les invités à contacter les mariés directement.
Ton ton est chaleureux, romantique, bienveillant et enthousiaste. Tu réponds en français par défaut, en anglais si l'invité t'écrit en anglais.`

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' })
    }

    const { messages } = req.body
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages required' })
    }

    const client = new Groq({ apiKey: process.env.GROQ_API_KEY })

    const completion = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 400,
      messages: [
        { role: 'system', content: WEDDING_CONTEXT },
        ...messages,
      ],
    })

    const text = completion.choices[0]?.message?.content || '…'
    res.json({ content: [{ text }] })
  } catch {
    res.status(500).json({ error: 'Une erreur est survenue. Réessayez.' })
  }
}
