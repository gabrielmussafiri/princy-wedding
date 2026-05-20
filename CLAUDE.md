# Site Mariage — Lihiolia & Princy

## Contexte
Site web de mariage pour **Lihiolia et Princy**, le **29 Août 2026**.
Déployé sur Vercel, connecté au repo GitHub `gabrielmussafiri/princy-wedding`.
URL de production : **https://lihioandprincy.com** (alias https://princy-wedding.vercel.app)
Mot de passe admin : `Princy2026@`

## Stack
- React 18 + Vite + Tailwind CSS 3
- React Router (SPA, routing géré par `vercel.json`)
- Supabase JS (RSVP + Livre d'or)
- Groq API via Vercel Function (`api/chat.js`) — modèle `llama-3.3-70b-versatile`
- i18n maison FR/EN (`src/i18n/`)

## Cérémonies
- **Civil** : 10h00 – 13h00
- **Coutumier** : 19h00 – à l'aube
- **Lieu** : non affiché sur le site (section supprimée)

## Structure clé
```
src/
  components/   Navbar, Hero, NotreHistoire, Details, Galerie, Interlude, RSVP, LivreOr, ChatBot, Footer
  context/      InviteContext.jsx  ← mode d'invitation (full | coutumier)
  i18n/         fr.js, en.js, LanguageContext.jsx
  lib/          supabase.js
  pages/        Home.jsx, Admin.jsx
api/
  chat.js       ← Vercel Function proxy Groq (clé server-side, non exposée au client)
public/
  images/gallery/   photos du couple (DSC01*.jpg.jpeg — comprimées mozjpeg 82)
  favicon.svg       favicon monogramme L♥P (+ favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png)
scripts/
  compress-dsc.mjs  ← script sharp pour recomprimer les DSC si ajout de nouvelles photos
```

## Variables d'environnement (`.env.local`)
```
VITE_SUPABASE_URL=https://auhpseewdoxgczmviqal.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_...
GROQ_API_KEY=gsk_...          ← server-side uniquement (pas de préfixe VITE_)
VITE_ADMIN_PASSWORD=Princy2026@
```
- Généré via `vercel env pull .env.local` (synchronisé avec Vercel cloud)
- Sans `.env.local`, le site s'affiche mais RSVP/Livre d'or et chatbot ne fonctionnent pas
- Pour le dev local avec chatbot : utiliser `vercel dev` (et non `npm run dev`)

## Supabase — Tables
### `rsvps`
| Colonne | Type | Notes |
|---|---|---|
| id | uuid | PK, gen_random_uuid() |
| created_at | timestamptz | default now() |
| name | text | not null |
| phone | text | |
| attending | boolean | not null default false |
| ceremony | text | 'civil' / 'coutumier' / 'both' |
| couple | boolean | not null default false |

### `guestbook`
| Colonne | Type | Notes |
|---|---|---|
| id | uuid | PK, gen_random_uuid() |
| created_at | timestamptz | default now() |
| name | text | not null |
| message | text | not null |

Les deux tables ont RLS activé avec policies `allow insert` et `allow select` publiques.

## Photos
- **Hero** : `public/images/gallery/DSC01101.jpg.jpeg`
- **Notre Histoire (slider)** : 24 photos — `old1.jpeg` … `old20.jpg` (dont variantes `old15s.jpeg`, `old15ss.jpeg`) + `DSC01125.jpg.jpeg` + `DSC01103.jpg.jpeg` en fin de liste — constante `STORY_IMAGES` dans `NotreHistoire.jsx`
- **Galerie** : 8 photos sélectionnées — constante `GALLERY_FILES` dans `src/components/Galerie.jsx` (DSC01130, 01133, 01139, 01142, 01145, 01158, 01161, 01166b)
- **Interlude** : `DSC01103.jpg.jpeg` (fond parallax, `bg-scroll md:bg-fixed`) — section entre Galerie et RSVP, texte centré uniquement
- **Compression DSC** : toutes les DSC01*.jpg.jpeg comprimées mozjpeg qualité 82 (~63 MB → ~15 MB, -73%). Relancer `node scripts/compress-dsc.mjs` si nouvelles photos DSC ajoutées.

## Routing
- `vercel.json` à la racine : rewrite `/*` → `/index.html` (fix 404 sur `/admin` et autres routes SPA)
- `api/chat.js` : Vercel Function, pas affectée par le rewrite (priorité automatique)
- Route `/admin` : dashboard protégé par mot de passe (`VITE_ADMIN_PASSWORD` = `Princy2026@`)
- **Les RSVPs de `/` et `/coutumier` vont dans la même table `rsvps`** — le champ `ceremony` distingue les invités (`'coutumier'` pré-rempli depuis `/coutumier`)

## Liens d'invitation (`InviteContext.jsx`)
Deux liens distincts selon les invités :

| URL | Mode | Contenu affiché |
|-----|------|-----------------|
| `/` | `full` | Civil + Coutumier — RSVP avec choix de cérémonie |
| `/coutumier` | `coutumier` | Coutumier uniquement — RSVP pré-rempli, pas de choix |

- `InviteContext` expose `useInvite()` → valeur `'full'` ou `'coutumier'`
- `Home.jsx` reçoit la prop `mode` et enveloppe tout dans `<InviteProvider>`
- **Hero** : sous-titre adapté (`'Mariage Coutumier'` vs `'Mariage Civil & Coutumier'`)
- **Details** : carte civile masquée en mode `coutumier`
- **RSVP** : `ceremony` pré-rempli à `'coutumier'`, sélection masquée en mode `coutumier`

## Déploiement
```bash
# Preview automatique à chaque push sur main
git push

# Production manuelle
vercel deploy --prod

# Dev local complet (RSVP + chatbot)
vercel dev

# Dev local sans chatbot
npm run dev
```

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

## RSVP (`RSVP.jsx`)
- Champs : Nom, Téléphone, Présence (oui/non), Cérémonie (civil/coutumier/les deux), **Couple** (checkbox)
- En mode `coutumier` : champ cérémonie pré-rempli à `'coutumier'`, sélection non affichée
- Dashboard `/admin` : colonne "Couple" dans le tableau et dans l'export CSV
- Admin stats par cérémonie : Civil / Coutumier / Les deux (3 blocs)
- Admin filtre : Tous / Civil / Coutumier / Les deux

## Chatbot (`ChatBot.jsx` + `api/chat.js`)
- Le composant appelle `/api/chat` (Vercel Function) — jamais l'API Groq directement
- La clé `GROQ_API_KEY` est server-side uniquement (non exposée dans le bundle JS)
- Modèle : `llama-3.3-70b-versatile`, max 400 tokens
- Prompt strict : répond uniquement aux questions sur le mariage, ne invente rien, renvoie vers les mariés si info inconnue
- Contexte injecté : dates, horaires cérémonies, RSVP, livre d'or, code vestimentaire

## Notes UI
- Section **Lieu** entièrement supprimée (carte Google Maps et adresse retirées)
- `.section-title` : `font-bold` global (tous les titres de section)
- `.input-elegant` : `text-base` (16px) — évite le zoom automatique iOS Safari sur les champs
- Textes secondaires blush : `blush-500` pour meilleure lisibilité

### Notre Histoire (`NotreHistoire.jsx`)
- Layout 2 colonnes : texte gauche + slider droite (`lg:grid-cols-2`)
- Slider 24 photos avec cross-fade `duration-700`, autoplay 4s, flèches + points
- Sur mobile : compteur `x / 24` à la place des 24 points (évite l'overflow)
- Photos : `old1.jpeg` … `old20.jpg` (dont `old15s.jpeg`, `old15ss.jpeg`) + `DSC01125.jpg.jpeg` + `DSC01103.jpg.jpeg`
- Texte : histoire authentique — rencontre Table Mountain Le Cap décembre 2017, fiançailles mai 2025 (FR + EN dans `src/i18n/`)

### Details (`Details.jsx`)
- Padding : `p-5 sm:p-8 md:p-12` sur les cartes, `gap-4 md:gap-8` sur la grille
- Titre cérémonie : `font-bold`, horaire : `text-sm font-semibold gold-500` (lisibilité améliorée)
- Titre adapté au mode : `"Les Cérémonies"` sur `/`, `"La Cérémonie"` sur `/coutumier` (FR/EN via `t.details.titleSingle`)

### Interlude (`Interlude.jsx`)
- Section entre Galerie et RSVP
- Fond parallax `bg-scroll md:bg-fixed` : `DSC01103.jpg.jpeg` + voile `bg-charcoal/65`
- Padding : `py-16 md:py-24 lg:py-40`
- Texte centré uniquement : date (`gold-200`), prénoms en `font-script text-4xl md:text-5xl`, filet gold `mx-auto`, citation en `font-serif italic`

### Galerie (`Galerie.jsx`)
- Padding : `py-16 px-2 md:px-6`, header : `mb-10`
- Layout : `grid grid-cols-2 md:grid-cols-4 gap-1` (CSS Grid partout, pas de masonry)
- Ratio : `aspect-[9/16]` uniforme sur toutes les images (portrait très tall, style paulelaurent)
- Border radius : `rounded-lg` sur chaque carte image

### Livre d'Or (`LivreOr.jsx`)
- Carousel auto-défilant (style reviews) — une carte à la fois, cross-fade `duration-700`
- Autoplay 5s, pause au survol, flèches ← →
- Indicateurs : points si ≤ 12 messages, sinon compteur `x / total`
- Nouveau message → apparaît immédiatement en premier (setCurrent(0))
- Charge jusqu'à 100 messages (Supabase `.limit(100)`)
- Formulaire en dessous du carousel : `p-4 sm:p-8`

## Favicon
- `public/favicon.svg` — monogramme L♥P, cœur gold sur fond crème
- `public/favicon-32x32.png`, `public/favicon-16x16.png` — PNG générés via sharp
- `public/apple-touch-icon.png` — 180×180px pour iOS
- Généré avec : `node -e "import sharp..." --input-type=module`

## Optimisation mobile
Toutes les corrections appliquées (commit `9e88b0f`) :
- Hero : countdown réduit sur mobile (`w-12 sm:w-16 md:w-20`)
- Navbar : cibles tactiles min-h-[44px] sur les liens du menu mobile
- ChatBot : fenêtre `w-[calc(100vw-2rem)] sm:w-80`, maxHeight 75vh
- `.input-elegant` : `text-base` 16px (supprime le zoom auto iOS Safari)

## Crédits
Développé par **Godlive Gabriel M.**
LinkedIn : https://www.linkedin.com/in/gabriel-godlive-m-7018aa244/
Tél : +27 60 121 4105
