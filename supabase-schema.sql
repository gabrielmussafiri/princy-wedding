-- Table RSVP
create table if not exists rsvps (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  phone       text,
  attending   boolean not null default true,
  ceremony    text check (ceremony in ('civil', 'coutumier', 'both')),
  created_at  timestamptz default now()
);

-- Table Livre d'or
create table if not exists guestbook (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  message     text not null,
  created_at  timestamptz default now()
);

-- Autoriser la lecture publique (pour afficher les messages)
alter table guestbook enable row level security;
alter table rsvps enable row level security;

create policy "public read guestbook"  on guestbook for select using (true);
create policy "public insert guestbook" on guestbook for insert with check (true);
create policy "public insert rsvp"      on rsvps    for insert with check (true);

-- Lecture des RSVPs réservée à l'authentification Supabase (admin uniquement)
-- La page admin utilise la clé anon avec le mot de passe côté client.
-- Pour une sécurité renforcée, utilisez une clé service_role côté serveur.
