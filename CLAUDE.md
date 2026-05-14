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
- **Notre Histoire (slider)** : 6 photos — `DSC01103`, `DSC01125`, `DSC01133`, `DSC01142`, `DSC01158`, `DSC01166` — constante `STORY_IMAGES` dans `NotreHistoire.jsx`
- **Galerie** : 8 photos sélectionnées — constante `GALLERY_FILES` dans `src/components/Galerie.jsx` (DSC01130, 01133, 01139, 01142, 01145, 01158, 01161, 01166b)

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
- Hero : textes "NOUS VOUS INVITONS...", "Mariage Civil & Coutumier" et date en `font-bold`
- Hero : date `gold-200`, invitation/sous-titre `white` / `gold-200`, `pt-20` pour espacer de la navbar
- `.section-title` : `font-bold` global (tous les titres de section)
- Textes secondaires blush : `blush-500` pour meilleure lisibilité

### Notre Histoire (`NotreHistoire.jsx`)
- Layout 2 colonnes : texte gauche + slider droite (`lg:grid-cols-2`)
- Slider 6 photos avec cross-fade `duration-700`, autoplay 4s, flèches + points
- Padding : `pt-20 pb-16` (réduit vs ancien `py-28`)

### Details (`Details.jsx`)
- Padding : `py-16` (réduit vs `py-28`)
- Header : `mb-10`, date "29 Août 2026" : `mt-10 mb-8`

### Galerie (`Galerie.jsx`)
- Padding : `py-16 px-2 md:px-6`, header : `mb-10`
- Layout : `grid grid-cols-2 md:grid-cols-4 gap-1` (CSS Grid partout, pas de masonry)
- Ratio : `aspect-[9/16]` uniforme sur toutes les images (portrait très tall, style paulelaurent)
- Border radius : `rounded-lg` sur chaque carte image

## Crédits
Développé par **Godlive Gabriel M.**
LinkedIn : https://www.linkedin.com/in/gabriel-godlive-m-7018aa244/
Tél : +27 60 121 4105
