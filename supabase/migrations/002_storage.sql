-- ============================================================
-- L'Arsouille — Bucket Storage pour les images du site
-- Déjà appliqué via Supabase MCP
-- ============================================================

-- Bucket public pour les images du site
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-images', 'site-images', true)
ON CONFLICT (id) DO NOTHING;

-- Lecture publique (toutes les images sont accessibles)
CREATE POLICY "Public read site-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'site-images');

-- Upload depuis l'API admin (contrôle JWT fait côté serveur Next.js)
CREATE POLICY "Allow insert site-images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'site-images');

CREATE POLICY "Allow update site-images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'site-images');
