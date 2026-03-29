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
