import Image from 'next/image'
import AnimatedSection from './AnimatedSection'
import type { MenuItem, SiteContent } from '@/types'

interface Props {
  items: MenuItem[]
  content: SiteContent
}

type SectionKey = 'bar' | 'cave' | 'epicerie'

interface SectionDef {
  key: SectionKey
  titleKey: keyof SiteContent
  subtitleKey: keyof SiteContent
  descKey: keyof SiteContent
  imgKey: keyof SiteContent
  defaultImg: string
  defaultTitle: string
  defaultSubtitle: string
  defaultDesc: string
  flip: boolean
  bg: string
}

const SECTIONS: SectionDef[] = [
  {
    key: 'bar',
    titleKey: 'bar_title',
    subtitleKey: 'bar_subtitle',
    descKey: 'bar_description',
    imgKey: 'img_bar',
    defaultImg: '/images/bieres.webp',
    defaultTitle: 'Le Bar',
    defaultSubtitle: 'Bi\u00e8res craft & Spiritueux',
    defaultDesc: 'Une s\u00e9lection de bi\u00e8res artisanales locales et de spiritueux choisis avec soin. Olga, Triple Noix, Porter Noisette \u2014 les classiques brestois sont l\u00e0.',
    flip: false,
    bg: 'bg-cream',
  },
  {
    key: 'cave',
    titleKey: 'cave_title',
    subtitleKey: 'cave_subtitle',
    descKey: 'cave_description',
    imgKey: 'img_cave',
    defaultImg: '/images/vins.png',
    defaultTitle: 'La Cave \u00e0 Vins',
    defaultSubtitle: 'Vins nature & Biodynamiques',
    defaultDesc: 'Des vins vivants, naturels, biodynamiques. Une s\u00e9lection qui change au fil des arrivages, pour d\u00e9couvrir \u00e0 chaque verre quelque chose de nouveau.',
    flip: true,
    bg: 'bg-cream-dark',
  },
  {
    key: 'epicerie',
    titleKey: 'epicerie_title',
    subtitleKey: 'epicerie_subtitle',
    descKey: 'epicerie_description',
    imgKey: 'img_epicerie',
    defaultImg: '/images/assiette.png',
    defaultTitle: "L'\u00c9picerie",
    defaultSubtitle: 'Planches & Bouch\u00e9es',
    defaultDesc: 'Pour accompagner votre verre\u00a0: planches charcuterie-fromages, assiettes gourmandes et douceurs maison. Tout est local, tout est artisanal.',
    flip: false,
    bg: 'bg-cream',
  },
]

export default function CarteSection({ items, content }: Props) {
  return (
    <>
      {SECTIONS.map((section) => {
        const sectionItems = items.filter((i) => i.category === section.key)
        const imgSrc = (content[section.imgKey] as string) || section.defaultImg
        const title = (content[section.titleKey] as string) || section.defaultTitle
        const subtitle = (content[section.subtitleKey] as string) || section.defaultSubtitle
        const desc = (content[section.descKey] as string) || section.defaultDesc

        return (
          <section key={section.key} id={section.key} className={`py-20 md:py-28 ${section.bg}`}>
            <div className="max-w-6xl mx-auto px-4">

              {/* Header section : image + texte */}
              <AnimatedSection>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                  <div className={`relative aspect-[4/3] overflow-hidden shadow-lg ${section.flip ? 'md:order-2' : ''}`}>
                    <Image
                      src={imgSrc}
                      alt={title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized={imgSrc.startsWith('http')}
                    />
                  </div>
                  <div className={section.flip ? 'md:order-1' : ''}>
                    <p className="font-script text-secondary text-xl mb-2">{subtitle}</p>
                    <h2 className="font-heading text-4xl md:text-5xl text-ink mb-4">{title}</h2>
                    <div className="w-10 h-0.5 bg-primary mb-5" />
                    <p className="font-body text-ink/70 leading-relaxed text-base">{desc}</p>
                  </div>
                </div>
              </AnimatedSection>

              {/* Grille produits */}
              {sectionItems.length > 0 && (
                <AnimatedSection delay={1}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {sectionItems.map((item, i) => (
                      <div
                        key={item.id ?? i}
                        className="bg-white border border-wood/20 hover:shadow-md transition-shadow duration-200 overflow-hidden"
                      >
                        {item.img && (
                          <div className="relative aspect-video overflow-hidden bg-cream/50">
                            <Image
                              src={item.img}
                              alt={item.nom}
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 640px) 100vw, 33vw"
                              unoptimized={item.img.startsWith('http')}
                            />
                          </div>
                        )}
                        <div className="p-4">
                          <div className="flex justify-between items-start gap-2">
                            <h3 className="font-heading text-lg text-ink leading-snug">{item.nom}</h3>
                            {item.prix && (
                              <span className="font-body text-xs text-primary font-medium whitespace-nowrap mt-1">
                                {item.prix}
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p className="font-body text-sm text-ink/60 mt-2 leading-relaxed">{item.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              )}
            </div>

            <div className="flex items-center justify-center mt-16 gap-6">
              <div className="flex-1 max-w-xs h-px bg-wood/40" />
              <Image src="/images/motif-panier.png" alt="" width={40} height={40} />
              <div className="flex-1 max-w-xs h-px bg-wood/40" />
            </div>
          </section>
        )
      })}
    </>
  )
}
