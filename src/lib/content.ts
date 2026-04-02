import { createClient } from '@supabase/supabase-js'
import type { SiteContent, MenuItem, Event } from '@/types'

export const imageSlots = [
  {
    key: 'img_hero_bg',
    label: 'Image Hero (fond)',
    description: 'Grande photo en fond de la section héro',
    format: '16:9 recommandé',
    defaultSrc: '/images/facade-2.png',
  },
  {
    key: 'img_logo',
    label: 'Logo',
    description: 'Logo rond affiché en tête de page et dans l\'admin',
    format: 'Carré, min 200×200px',
    defaultSrc: '/images/logo.webp',
  },
  {
    key: 'img_histoire',
    label: 'Photo Notre histoire',
    description: 'Photo affichée dans la section Notre histoire',
    format: '4:5 recommandé',
    defaultSrc: '/images/tireuse.png',
  },
  {
    key: 'img_galerie_1',
    label: 'Galerie — Photo 1',
    description: 'Intérieur, verre de vin',
    format: '1:1',
    defaultSrc: '/images/interieur.png',
  },
  {
    key: 'img_galerie_2',
    label: 'Galerie — Photo 2',
    description: 'Ambiance bar, tireuse',
    format: '1:1',
    defaultSrc: '/images/tireuse.png',
  },
  {
    key: 'img_galerie_3',
    label: 'Galerie — Photo 3',
    description: 'Planche charcuterie',
    format: '1:1',
    defaultSrc: '/images/assiette.png',
  },
  {
    key: 'img_galerie_4',
    label: 'Galerie — Photo 4',
    description: 'Assiettes gourmandes',
    format: '1:1',
    defaultSrc: '/images/plats.png',
  },
  {
    key: 'img_galerie_5',
    label: 'Galerie — Photo 5',
    description: "L'équipe, façade",
    format: '1:1',
    defaultSrc: '/images/facade.jpg',
  },
  {
    key: 'img_galerie_6',
    label: 'Galerie — Photo 6',
    description: 'Bières artisanales',
    format: '1:1',
    defaultSrc: '/images/bieres.webp',
  },
  {
    key: 'img_galerie_7',
    label: 'Galerie — Photo 7',
    description: 'Vins nature',
    format: '1:1',
    defaultSrc: '/images/vins.png',
  },
  {
    key: 'img_galerie_8',
    label: 'Galerie — Photo 8',
    description: 'Rhum artisanal',
    format: '1:1',
    defaultSrc: '/images/rhum.png',
  },
  {
    key: 'img_galerie_9',
    label: 'Galerie — Photo 9',
    description: 'Ardoise nouveautés',
    format: '1:1',
    defaultSrc: '/images/nouveaute.png',
  },
]

const DEFAULT_CONTENT: SiteContent = {
  hero_title: "L'Arsouille",
  hero_subtitle: 'Bar de quartier brestois',
  hero_description:
    'Vins nature, bières craft et bonne humeur au cœur du Quartier des 4 Moulins.',
  histoire_text:
    "L'Arsouille, c'est l'esprit de Brest. Son nom évoque l'Arsenal, cœur battant de l'économie et de l'identité brestoise depuis des siècles. Un bar de quartier où se retrouvent les habitués, autour d'une sélection soignée de vins nature, bières artisanales locales et produits du terroir. Ici, on prend le temps. On partage une planche, on découvre un nouveau vin, on écoute de la musique live. Bienvenue chez vous.",
  adresse: 'Quartier des 4 Moulins, Brest',
  telephone: '',
  email: '',
  horaires: 'Horaires à venir — retrouvez-nous sur Instagram',
  instagram: '@cave_larsouille_brest',
  img_hero_bg: '',
  img_logo: '',
  img_histoire: '',
  img_galerie_1: '',
  img_galerie_2: '',
  img_galerie_3: '',
  img_galerie_4: '',
  img_galerie_5: '',
  img_galerie_6: '',
  img_galerie_7: '',
  img_galerie_8: '',
  img_galerie_9: '',
}

const DEFAULT_MENU: MenuItem[] = [
  { category: 'vins', nom: 'Sélection de vins nature', description: 'Vins naturels, biodynamiques et en agriculture biologique, choisis avec soin', position: 0 },
  { category: 'vins', nom: 'Vins au verre', description: 'Découverte par le verre selon les arrivages du moment', prix: 'dès 4€', position: 1 },
  { category: 'bieres', nom: 'Olga', description: 'Bière artisanale brestoise', position: 0 },
  { category: 'bieres', nom: 'Triple Noix', description: 'Bière artisanale aux noix', position: 1 },
  { category: 'bieres', nom: 'Porter Noisette', description: 'Porter artisanal à la noisette', position: 2 },
  { category: 'bieres', nom: 'Pressions du moment', description: 'Sélection tournante de bières locales en fût', position: 3 },
  { category: 'spiritueux', nom: 'An Angel Show', description: 'Rhum artisanal', position: 0 },
  { category: 'spiritueux', nom: 'Sélection du moment', description: 'Whisky, gin, vodka… sélection selon arrivages', position: 1 },
  { category: 'planches', nom: 'Planche charcuterie-fromages', description: 'Produits locaux et artisanaux, sélection du jour', position: 0 },
  { category: 'planches', nom: 'Assiette gourmande', description: 'Composée selon les arrivages du marché', position: 1 },
  { category: 'planches', nom: 'Salade', description: 'Salade fraîche de saison', position: 2 },
  { category: 'planches', nom: 'Croque-monsieur', description: 'Pain de campagne, fromage fondu', position: 3 },
  { category: 'planches', nom: 'Gâteau · Cookie', description: 'Douceur maison pour finir sur une note sucrée', position: 4 },
]

const DEFAULT_EVENTS: Event[] = [
  {
    titre: 'Concert Unplugged — My Jonas Cooking',
    date: 'À venir',
    heure: '20h',
    description: "Soirée musicale en format acoustique dans la salle de L'Arsouille.",
    contact: '@cave_larsouille_brest',
  },
  {
    titre: 'Soirée Vins & Fromages',
    date: 'À venir',
    heure: '18h',
    description: "Dégustation guidée de vins nature accompagnés d'une sélection de fromages artisanaux.",
    contact: '@cave_larsouille_brest',
  },
]

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return !!(url && key && url !== 'PROJECT_URL_ICI' && key !== 'ANON_KEY_ICI')
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function getSiteContent(): Promise<SiteContent> {
  if (!isSupabaseConfigured()) return DEFAULT_CONTENT
  try {
    const { data } = await getSupabase().from('site_content').select('*')
    if (!data?.length) return DEFAULT_CONTENT
    const result = { ...DEFAULT_CONTENT }
    data.forEach((row: { id: string; value: string }) => {
      if (row.id in result) (result as Record<string, string>)[row.id] = row.value
    })
    return result
  } catch {
    return DEFAULT_CONTENT
  }
}

export async function getMenuItems(): Promise<MenuItem[]> {
  if (!isSupabaseConfigured()) return DEFAULT_MENU
  try {
    const { data } = await getSupabase()
      .from('menu_items')
      .select('*')
      .eq('active', true)
      .order('position')
    return data?.length ? data : DEFAULT_MENU
  } catch {
    return DEFAULT_MENU
  }
}

export async function getEvents(): Promise<Event[]> {
  if (!isSupabaseConfigured()) return DEFAULT_EVENTS
  try {
    const { data } = await getSupabase()
      .from('events')
      .select('*')
      .eq('active', true)
      .order('date')
    return data?.length ? data : DEFAULT_EVENTS
  } catch {
    return DEFAULT_EVENTS
  }
}
