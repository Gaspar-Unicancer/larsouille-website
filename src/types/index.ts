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
  // Sections carte
  bar_title: string
  bar_subtitle: string
  bar_description: string
  cave_title: string
  cave_subtitle: string
  cave_description: string
  epicerie_title: string
  epicerie_subtitle: string
  epicerie_description: string
  // Images
  img_hero_bg: string
  img_logo: string
  img_histoire: string
  img_bar: string
  img_cave: string
  img_epicerie: string
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
  category: 'bar' | 'cave' | 'epicerie'
  nom: string
  description?: string
  prix?: string
  img?: string
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
