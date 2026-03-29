import Image from 'next/image'
import AnimatedSection from './AnimatedSection'

const PHOTOS = [
  { src: '/images/interieur.png', alt: 'Verre de vin blanc et huîtres' },
  { src: '/images/tireuse.png', alt: 'Ambiance bar, tireuse à bière' },
  { src: '/images/assiette.png', alt: 'Planche charcuterie et fromages' },
  { src: '/images/plats.png', alt: 'Assiettes gourmandes' },
  { src: '/images/facade.jpg', alt: "L'équipe de L'Arsouille devant la façade" },
  { src: '/images/bieres.webp', alt: 'Bières artisanales locales — Olga, Triple Noix, Porter Noisette' },
  { src: '/images/vins.png', alt: 'Vins nature sélectionnés' },
  { src: '/images/rhum.png', alt: 'Rhum artisanal An Angel Show' },
  { src: '/images/nouveaute.png', alt: "Ardoise 'Quoi de nouveau à L'Arsouille'" },
]

export default function GalerieSection() {
  return (
    <section id="galerie" className="py-20 md:py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <p className="font-script text-secondary text-lg mb-2">En images</p>
          <h2 className="font-heading text-4xl md:text-5xl text-ink mb-4">La galerie</h2>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
          {PHOTOS.map((photo, i) => (
            <AnimatedSection
              key={photo.src}
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
                />
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-300" />
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={2} className="text-center mt-10">
          <a
            href="https://www.instagram.com/cave_larsouille_brest"
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
