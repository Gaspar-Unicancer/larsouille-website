-- ============================================================
-- L'Arsouille — Migration initiale
-- À exécuter dans Supabase > SQL Editor après création du projet
-- ============================================================

-- Contenu éditables (textes, horaires, coordonnées)
CREATE TABLE IF NOT EXISTS site_content (
  id TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Événements
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titre TEXT NOT NULL,
  date TEXT NOT NULL,
  heure TEXT,
  description TEXT,
  contact TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Articles de la carte / menu
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('vins', 'bieres', 'spiritueux', 'planches')),
  nom TEXT NOT NULL,
  description TEXT,
  prix TEXT,
  position INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT TRUE
);

-- Contenu par défaut
INSERT INTO site_content (id, value) VALUES
  ('hero_title', 'L''Arsouille'),
  ('hero_subtitle', 'Bar de quartier brestois'),
  ('hero_description', 'Vins nature, bières craft et bonne humeur au cœur du Quartier des 4 Moulins.'),
  ('histoire_text', 'L''Arsouille, c''est l''esprit de Brest. Son nom évoque l''Arsenal, cœur battant de l''économie et de l''identité brestoise depuis des siècles. Un bar de quartier où se retrouvent les habitués, autour d''une sélection soignée de vins nature, bières artisanales locales et produits du terroir.'),
  ('adresse', 'Quartier des 4 Moulins, Brest'),
  ('telephone', ''),
  ('email', ''),
  ('horaires', 'Horaires à venir — retrouvez-nous sur Instagram'),
  ('instagram', '@cave_larsouille_brest')
ON CONFLICT (id) DO NOTHING;
