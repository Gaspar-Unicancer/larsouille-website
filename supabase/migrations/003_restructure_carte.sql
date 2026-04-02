-- ============================================================
-- L'Arsouille -- Migration 003 : Restructuration carte
-- Bar / Cave à Vins / Épicerie
-- Déjà appliquée via Supabase MCP
-- ============================================================

-- Ajouter la colonne photo aux produits
ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS img TEXT;

-- Mise à jour du constraint de catégorie
ALTER TABLE menu_items DROP CONSTRAINT IF EXISTS menu_items_category_check;
ALTER TABLE menu_items ADD CONSTRAINT menu_items_category_check
  CHECK (category IN ('bar', 'cave', 'epicerie'));

-- Nouveaux champs de contenu
INSERT INTO site_content (id, value) VALUES
  ('bar_title', 'Le Bar'),
  ('bar_subtitle', 'Bières craft & Spiritueux'),
  ('bar_description', 'Une sélection de bières artisanales locales et de spiritueux choisis avec soin.'),
  ('img_bar', ''),
  ('cave_title', 'La Cave à Vins'),
  ('cave_subtitle', 'Vins nature & Biodynamiques'),
  ('cave_description', 'Des vins vivants, naturels, biodynamiques. Une sélection qui change au fil des arrivages.'),
  ('img_cave', ''),
  ('epicerie_title', 'L''Épicerie'),
  ('epicerie_subtitle', 'Planches & Bouchées'),
  ('epicerie_description', 'Pour accompagner votre verre : planches, assiettes gourmandes et douceurs maison.'),
  ('img_epicerie', '')
ON CONFLICT (id) DO NOTHING;
