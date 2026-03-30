import AnimatedSection from './AnimatedSection'
import type { SiteContent } from '@/types'

interface Props {
  content: SiteContent
}

export default function ContactSection({ content }: Props) {
  return (
    <section id="contact" className="py-20 md:py-28 bg-cream-dark">
      <div className="max-w-4xl mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <p className="font-script text-secondary text-lg mb-2">Nous retrouver</p>
          <h2 className="font-heading text-4xl md:text-5xl text-ink mb-4">Infos pratiques</h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Adresse */}
          <AnimatedSection delay={1} className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              📍
            </div>
            <h3 className="font-heading text-lg text-ink mb-2">Adresse</h3>
            <p className="font-body text-sm text-ink/60 leading-relaxed">
              {content.adresse}
            </p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(content.adresse)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 font-body text-xs text-primary font-medium hover:underline"
            >
              Ouvrir dans Maps →
            </a>
          </AnimatedSection>

          {/* Horaires */}
          <AnimatedSection delay={2} className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              🕐
            </div>
            <h3 className="font-heading text-lg text-ink mb-2">Horaires</h3>
            <p className="font-body text-sm text-ink/60 leading-relaxed whitespace-pre-line">
              {content.horaires}
            </p>
          </AnimatedSection>

          {/* Instagram */}
          <AnimatedSection delay={3} className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              📸
            </div>
            <h3 className="font-heading text-lg text-ink mb-2">Instagram</h3>
            <a
              href="https://www.instagram.com/bar_larsouille_brest/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-primary font-medium hover:underline"
            >
              {content.instagram}
            </a>
            <p className="font-body text-xs text-ink/40 mt-1">
              Événements · Actualités · Nouveautés
            </p>
            {content.telephone && (
              <a
                href={`tel:${content.telephone}`}
                className="block mt-2 font-body text-sm text-ink/60 hover:text-primary"
              >
                {content.telephone}
              </a>
            )}
          </AnimatedSection>
        </div>

        {/* Map placeholder */}
        <AnimatedSection delay={2} className="mt-12">
          <div className="w-full rounded-sm overflow-hidden bg-wood/20 border border-wood/30">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2628.6!2d-4.48!3d48.39!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4816945!2sQuartier+des+4+Moulins+Brest!5e0!3m2!1sfr!2sfr!4v1"
              width="100%"
              height="280"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="L'Arsouille — Brest, Quartier des 4 Moulins"
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
