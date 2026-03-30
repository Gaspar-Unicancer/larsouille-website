import Image from 'next/image'
import AnimatedSection from './AnimatedSection'
import type { Event } from '@/types'

interface Props {
  events: Event[]
}

export default function EvenementsSection({ events }: Props) {
  return (
    <section id="evenements" className="py-20 md:py-28 bg-primary relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <Image src="/images/evenement-1.png" alt="" fill className="object-cover" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <p className="font-script text-secondary text-lg mb-2">Agenda</p>
          <h2 className="font-heading text-4xl md:text-5xl text-cream mb-4">Événements</h2>
          <p className="font-body text-cream/60 max-w-md mx-auto text-sm">
            Concerts, dégustations, soirées thématiques… suivez-nous sur Instagram pour ne rien manquer.
          </p>
        </AnimatedSection>

        {events.length === 0 ? (
          <AnimatedSection delay={1} className="text-center text-cream/50 font-body">
            Aucun événement à venir pour le moment. Restez connectés !
          </AnimatedSection>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event, i) => (
              <AnimatedSection key={i} delay={(i % 3) as 0 | 1 | 2 | 3}>
                <div className="bg-cream/10 border border-cream/20 rounded-sm p-6 hover:bg-cream/15 transition-colors duration-200">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-heading text-xl text-cream leading-snug">{event.titre}</h3>
                    <div className="text-right shrink-0">
                      <p className="font-body text-secondary font-medium text-sm">{event.date}</p>
                      {event.heure && (
                        <p className="font-body text-cream/60 text-xs">{event.heure}</p>
                      )}
                    </div>
                  </div>

                  {event.description && (
                    <p className="font-body text-cream/70 text-sm leading-relaxed mb-4">
                      {event.description}
                    </p>
                  )}

                  {event.contact && (
                    <a
                      href="https://www.instagram.com/bar_larsouille_brest/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-secondary text-sm font-medium hover:underline"
                    >
                      <span>→</span> {event.contact}
                    </a>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}

        <AnimatedSection delay={2} className="text-center mt-10">
          <a
            href="https://www.instagram.com/bar_larsouille_brest/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-cream/40 text-cream font-body text-sm font-medium px-6 py-3 rounded-sm hover:bg-cream/10 transition-colors duration-200"
          >
            Voir tous les événements sur Instagram
          </a>
        </AnimatedSection>
      </div>
    </section>
  )
}
