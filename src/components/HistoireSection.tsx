import Image from 'next/image'
import AnimatedSection from './AnimatedSection'
import type { SiteContent } from '@/types'

interface Props {
  content: SiteContent
}

export default function HistoireSection({ content }: Props) {
  return (
    <section id="histoire" className="py-20 md:py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Text */}
          <AnimatedSection>
            <p className="font-script text-secondary text-lg mb-3">Notre histoire</p>
            <h2 className="font-heading text-4xl md:text-5xl text-ink mb-6 leading-tight">
              L&apos;esprit<br />de l&apos;Arsenal
            </h2>
            <div className="w-12 h-0.5 bg-primary mb-6" />
            <p className="font-body text-ink/70 leading-relaxed text-base md:text-lg whitespace-pre-line">
              {content.histoire_text}
            </p>

            {/* Values */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { label: 'Vins nature', icon: '🍷' },
                { label: 'Local & artisan', icon: '🌿' },
                { label: 'Bar de quartier', icon: '🏘️' },
              ].map((v) => (
                <div key={v.label} className="text-center">
                  <div className="text-2xl mb-1">{v.icon}</div>
                  <p className="font-body text-xs text-ink/60 font-medium">{v.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Photo */}
          <AnimatedSection delay={1}>
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-lg">
                <Image
                  src="/images/tireuse.png"
                  alt="Ambiance bar L'Arsouille — tireuse à bière"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Decorative motif */}
              <div className="absolute -bottom-6 -left-6 opacity-20">
                <Image
                  src="/images/motif-panier.png"
                  alt=""
                  width={100}
                  height={100}
                />
              </div>
              {/* Caption badge */}
              <div className="absolute -bottom-3 right-4 bg-primary text-cream font-script text-sm px-4 py-2 shadow-md">
                Brest, depuis 2024
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Decorative divider */}
      <div className="flex items-center justify-center mt-20 gap-4 opacity-20">
        <div className="flex-1 max-w-xs h-px bg-wood" />
        <Image src="/images/motif-megaphone.png" alt="" width={32} height={32} />
        <div className="flex-1 max-w-xs h-px bg-wood" />
      </div>
    </section>
  )
}
