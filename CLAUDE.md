# Site Mariage — Lihiolia & Princy

## Contexte
Site web de mariage pour **Lihiolia et Princy**, le **29 Août 2026**.
Déployé sur Vercel, connecté au repo GitHub `gabrielmussafiri/princy-wedding`.

## Stack
- React 18 + Vite + Tailwind CSS 3
- React Router (SPA, `public/_redirects` pour Netlify legacy)
- Supabase JS (RSVP + Livre d'or)
- API Claude Haiku (chatbot invités)
- i18n maison FR/EN (`src/i18n/`)

## Cérémonies
- **Civil** : 10h00 – 13h00
- **Coutumier** : 19h00 – à l'aube
- **Lieu** : non affiché sur le site (section supprimée)

## Structure clé
```
src/
  components/   Navbar, Hero, NotreHistoire, Details, Galerie, RSVP, LivreOr, ChatBot, Footer
  i18n/         fr.js, en.js, LanguageContext.jsx
  lib/          supabase.js
  pages/        Home.jsx, Admin.jsx
public/
  images/gallery/   photos du couple (DSC01*.jpg.jpeg)
```

## Variables d'environnement (`.env.local`)
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_CLAUDE_API_KEY=
VITE_ADMIN_PASSWORD=
```
Sans `.env.local`, le site s'affiche mais RSVP/Livre d'or et chatbot ne fonctionnent pas.

## Photos
- **Hero** : `public/images/gallery/DSC01101.jpg.jpeg`
- **Portrait (Notre Histoire)** : `public/images/gallery/DSC01103.jpg.jpeg`
- **Galerie** : liste dans `src/components/Galerie.jsx` → constante `GALLERY_FILES`

## Déploiement
```bash
# Preview automatique à chaque push sur main
git push

# Production manuelle
vercel --prod
```
URL live : https://princy-wedding.vercel.app

## Palette
| Token Tailwind | Hex | Usage |
|---|---|---|
| `cream` | `#FAF6F0` | fond principal |
| `blush-*` | `#F9E8E0` → `#C96E5C` | accents doux (textes secondaires en `blush-500`) |
| `gold-*` | `#F5ECD1` → `#A07830` | ornements, titres, sous-titres |
| `charcoal` | `#3D3535` | texte principal, footer |

## Polices
- `font-script` → Great Vibes (noms, monogramme)
- `font-serif` → Cormorant Garamond (titres — `font-bold` sur `.section-title`)
- `font-sans` → Montserrat (corps, labels)

## Notes UI
- Section **Lieu** entièrement supprimée (carte Google Maps et adresse retirées)
- Hero : textes "NOUS VOUS INVITONS..." et "Mariage Civil & Coutumier" en `font-bold`
- Hero : date "29 Août 2026" en `font-bold`, couleur `gold-200`
- Hero : `pt-20` sur le conteneur pour espacer de la navbar

## Crédits
Développé par **Godlive Gabriel M.**
LinkedIn : https://www.linkedin.com/in/gabriel-godlive-m-7018aa244/
Tél : +27 60 121 4105
