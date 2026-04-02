import { createClient } from '@supabase/supabase-js'
import type { SiteContent, MenuItem, Event } from '@/types'

export const imageSlots = [
  {
    key: 'img_hero_bg',
    label: 'Image Hero (fond)',
    description: 'Grande photo en fond de la section h\u00e9ro',
    format: '16:9 recommand\u00e9',
    defaultSrc: '/images/facade-2.png',
  },
  {
    key: 'img_logo',
    label: 'Logo',
    description: 'Logo rond affich\u00e9 en t\u00eate de page',
    format: 'Carr\u00e9, min 200\u00d7200px',
    defaultSrc: '/images/logo.webp',
  },
  {
    key: 'img_histoire',
    label: 'Photo Notre histoire',
    description: 'Photo affich\u00e9e dans la section Notre histoire',
    format: '4:5 recommand\u00e9',
    defaultSrc: '/images/tireuse.png',
  },
  {
    key: 'img_galerie_1',
    label: 'Galerie \u2014 Photo 1',
    description: 'Int\u00e9rieur, verre de vin',
    format: '1:1',
    defaultSrc: '/images/interieur.png',
  },
  {
    key: 'img_galerie_2',
    label: 'Galerie \u2014 Photo 2',
    description: 'Ambiance bar, tireuse',
    format: '1:1',
    defaultSrc: '/images/tireuse.png',
  },
  {
    key: 'img_galerie_3',
    label: 'Galerie \u2014 Photo 3',
    description: 'Planche charcuterie',
    format: '1:1',
    defaultSrc: '/images/assiette.png',
  },
  {
    key: 'img_galerie_4',
    label: 'Galerie \u2014 Photo 4',
    description: 'Assiettes gourmandes',
    format: '1:1',
    defaultSrc: '/images/plats.png',
  },
  {
    key: 'img_galerie_5',
    label: 'Galerie \u2014 Photo 5',
    description: "L'\u00e9quipe, fa\u00e7ade",
    format: '1:1',
    defaultSrc: '/images/facade.jpg',
  },
  {
    key: 'img_galerie_6',
    label: 'Galerie \u2014 Photo 6',
    description: 'Bi\u00e8res artisanales',
    format: '1:1',
    defaultSrc: '/images/bieres.webp',
  },
  {
    key: 'img_galerie_7',
    label: 'Galerie \u2014 Photo 7',
    description: 'Vins nature',
    format: '1:1',
    defaultSrc: '/images/vins.png',
  },
  {
    key: 'img_galerie_8',
    label: 'Galerie \u2014 Photo 8',
    description: 'Rhum artisanal',
    format: '1:1',
    defaultSrc: '/images/rhum.png',
  },
  {
    key: 'img_galerie_9',
    label: 'Galerie \u2014 Photo 9',
    description: 'Ardoise nouveaut\u00e9s',
    format: '1:1',
    defaultSrc: '/images/nouveaute.png',
  },
]

const DEFAULT_CONTENT: SiteContent = {
  hero_title: "L'Arsouille",
  hero_subtitle: 'Bar de quartier brestois',
  hero_description: 'Vins nature, bi\u00e8res craft et bonne humeur au c\u0153ur du Quartier des 4 Moulins.',
  histoire_text: "L'Arsouille, c'est l'esprit de Brest. Son nom \u00e9voque l'Arsenal, c\u0153ur battant de l'\u00e9conomie et de l'identit\u00e9 brestoise depuis des si\u00e8cles. Un bar de quartier o\u00f9 se retrouvent les habitu\u00e9s, autour d'une s\u00e9lection soign\u00e9e de vins nature, bi\u00e8res artisanales locales et produits du terroir. Ici, on prend le temps. On partage une planche, on d\u00e9couvre un nouveau vin, on \u00e9coute de la musique live. Bienvenue chez vous.",
  adresse: 'Quartier des 4 Moulins, Brest',
  telephone: '',
  email: '',
  horaires: 'Horaires \u00e0 venir \u2014 retrouvez-nous sur Instagram',
  instagram: '@cave_larsouille_brest',
  bar_title: 'Le Bar',
  bar_subtitle: 'Bi\u00e8res craft & Spiritueux',
  bar_description: 'Une s\u00e9lection de bi\u00e8res artisanales locales et de spiritueux choisis avec soin. Olga, Triple Noix, Porter Noisette \u2014 les classiques brestois sont l\u00e0.',
  cave_title: 'La Cave \u00e0 Vins',
  cave_subtitle: 'Vins nature & Biodynamiques',
  cave_description: 'Des vins vivants, naturels, biodynamiques. Une s\u00e9lection qui change au fil des arrivages, pour d\u00e9couvrir \u00e0 chaque verre quelque chose de nouveau.',
  epicerie_title: "L'\u00c9picerie",
  epicerie_subtitle: 'Planches & Bouch\u00e9es',
  epicerie_description: 'Pour accompagner votre verre\u00a0: planches charcuterie-fromages, assiettes gourmandes et douceurs maison. Tout est local, tout est artisanal.',
  img_hero_bg: '',
  img_logo: '',
  img_histoire: '',
  img_bar: '',
  img_cave: '',
  img_epicerie: '',
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
  { category: 'bar', nom: 'Olga', description: 'Bi\u00e8re artisanale brestoise', prix: '4\u20ac', position: 0 },
  { category: 'bar', nom: 'Triple Noix', description: 'Bi\u00e8re artisanale aux noix', prix: '5\u20ac', position: 1 },
  { category: 'bar', nom: 'Porter Noisette', description: 'Porter artisanal \u00e0 la noisette', prix: '5\u20ac', position: 2 },
  { category: 'bar', nom: 'Pressions du moment', description: 'S\u00e9lection tournante de bi\u00e8res locales en f\u00fbt', position: 3 },
  { category: 'bar', nom: 'An Angel Show', description: 'Rhum artisanal \u2014 s\u00e9lection premium', position: 4 },
  { category: 'cave', nom: 'Vins nature', description: 'Vins naturels, biodynamiques et en agriculture biologique, choisis avec soin', prix: 'd\u00e8s 4\u20ac', position: 0 },
  { category: 'cave', nom: 'Vins au verre', description: 'D\u00e9couverte par le verre selon les arrivages du moment', prix: 'd\u00e8s 4\u20ac', position: 1 },
  { category: 'cave', nom: 'Bouteilles \u00e0 emporter', description: 'S\u00e9lection de vins nature disponibles \u00e0 la vente', position: 2 },
  { category: 'epicerie', nom: 'Planche charcuterie-fromages', description: 'Produits locaux et artisanaux, s\u00e9lection du jour', position: 0 },
  { category: 'epicerie', nom: 'Assiette gourmande', description: 'Compos\u00e9e selon les arrivages du march\u00e9', position: 1 },
  { category: 'epicerie', nom: 'Salade fra\u00eeche', description: 'Salade de saison', position: 2 },
  { category: 'epicerie', nom: 'Croque-monsieur', description: 'Pain de campagne, fromage fondu', position: 3 },
  { category: 'epicerie', nom: 'G\u00e2teau \u00b7 Cookie', description: 'Douceur maison pour finir sur une note sucr\u00e9e', position: 4 },
]

const DEFAULT_EVENTS: Event[] = [
  {
    titre: 'Concert Unplugged \u2014 My Jonas Cooking',
    date: '\u00c0 venir',
    heure: '20h',
    description: "Soir\u00e9e musicale en format acoustique dans la salle de L'Arsouille.",
    contact: '@cave_larsouille_brest',
  },
  {
    titre: 'Soir\u00e9e Vins & Fromages',
    date: '\u00c0 venir',
    heure: '18h',
    description: "D\u00e9gustation guid\u00e9e de vins nature accompagn\u00e9s d'une s\u00e9lection de fromages artisanaux.",
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
      .order('category')
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
