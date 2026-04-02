import Image from 'next/image'
import AnimatedSection from './AnimatedSection'
import type { SiteContent } from '@/types'

interface Props {
  content: SiteContent
}

export default function HistoireSection({ content }: Props) {
  const histoireSrc = content.img_histoire || '/images/tireuse.png'

  return (
    <section id="histoire" className="py-20 md:py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Text */}
          <AnimatedSection>
            <p className="font-script text-secondary text-xl mb-3">Notre histoire</p>
            <h2 className="font-heading text-4xl md:text-5xl text-ink mb-6 leading-tight">
              L&apos;esprit<br />de l&apos;Arsenal
            </h2>
            <div className="w-12 h-0.5 bg-primary mb-6" />
            <p className="font-body text-ink/70 leading-relaxed text-base md:text-lg whitespace-pre-line">
              {content.histoire_text}
            </p>

            <div className="flex items-center gap-4 mt-10">
              <Image
                src="/images/motif-panier.png"
                alt=""
                width={72}
                height={72}
                className="shrink-0"
              />
              <div className="font-script text-primary/70 text-lg leading-snug">
                Vins nature · Bières craft · Produits locaux
              </div>
            </div>
          </AnimatedSection>

          {/* Photo */}
          <AnimatedSection delay={1}>
            <div className="relative">
              <div className="absolute -top-8 -right-6 z-10">
                <Image
                  src="/images/motif-megaphone.png"
                  alt=""
                  width={130}
                  height={130}
                />
              </div>

              <div className="relative aspect-[4/5] overflow-hidden shadow-lg">
                <Image
                  src={histoireSrc}
                  alt="Ambiance bar L'Arsouille"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized={histoireSrc.startsWith('http')}
                />
              </div>

              <div className="absolute -bottom-3 right-4 bg-primary text-cream font-script text-sm px-4 py-2 shadow-md">
                Brest, depuis 2024
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <div className="flex items-center justify-center mt-20 gap-6">
        <div className="flex-1 max-w-xs h-px bg-wood/60" />
        <Image src="/images/motif-megaphone.png" alt="" width={52} height={52} />
        <div className="flex-1 max-w-xs h-px bg-wood/60" />
      </div>
    </section>
  )
}
