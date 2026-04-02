import Image from 'next/image'
import AnimatedSection from './AnimatedSection'
import { imageSlots } from '@/lib/content'
import type { SiteContent } from '@/types'

const GALERIE_ALTS = [
  'Verre de vin blanc et huîtres',
  'Ambiance bar, tireuse à bière',
  'Planche charcuterie et fromages',
  'Assiettes gourmandes',
  "L'équipe de L'Arsouille devant la façade",
  'Bières artisanales locales — Olga, Triple Noix, Porter Noisette',
  'Vins nature sélectionnés',
  'Rhum artisanal An Angel Show',
  "Ardoise 'Quoi de nouveau à L'Arsouille'",
]

interface Props {
  content: SiteContent
}

export default function GalerieSection({ content }: Props) {
  const galerieSlots = imageSlots.filter(s => s.key.startsWith('img_galerie_'))
  const photos = galerieSlots.map((slot, i) => ({
    src: (content[slot.key as keyof SiteContent] as string) || slot.defaultSrc,
    alt: GALERIE_ALTS[i] ?? slot.label,
  }))

  return (
    <section id="galerie" className="py-20 md:py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <p className="font-script text-secondary text-lg mb-2">En images</p>
          <h2 className="font-heading text-4xl md:text-5xl text-ink mb-4">La galerie</h2>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
          {photos.map((photo, i) => (
            <AnimatedSection
              key={`${photo.src}-${i}`}
              delay={(i % 3) as 0 | 1 | 2 | 3}
              className={i === 0 ? 'col-span-2 md:col-span-1' : ''}
            >
              <div className="relative aspect-square overflow-hidden rounded-sm bg-wood/20 group">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  unoptimized={photo.src.startsWith('http')}
                />
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-300" />
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={2} className="text-center mt-10">
          <a
            href="https://www.instagram.com/bar_larsouille_brest/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-sm text-primary font-medium hover:underline"
          >
            Voir plus de photos sur Instagram →
          </a>
        </AnimatedSection>
      </div>
    </section>
  )
}
