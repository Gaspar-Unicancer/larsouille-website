export interface SiteContent {
  hero_title: string
  hero_subtitle: string
  hero_description: string
  histoire_text: string
  adresse: string
  telephone: string
  email: string
  horaires: string
  instagram: string
  // Images
  img_hero_bg: string
  img_logo: string
  img_histoire: string
  img_galerie_1: string
  img_galerie_2: string
  img_galerie_3: string
  img_galerie_4: string
  img_galerie_5: string
  img_galerie_6: string
  img_galerie_7: string
  img_galerie_8: string
  img_galerie_9: string
}

export interface MenuItem {
  id?: string
  category: 'vins' | 'bieres' | 'spiritueux' | 'planches'
  nom: string
  description?: string
  prix?: string
  position?: number
  active?: boolean
}

export interface Event {
  id?: string
  titre: string
  date: string
  heure?: string
  description?: string
  contact?: string
  active?: boolean
}
