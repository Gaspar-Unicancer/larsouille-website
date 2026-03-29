'use client'
import { useState } from 'react'
import Image from 'next/image'
import AnimatedSection from './AnimatedSection'
import type { MenuItem } from '@/types'

const TABS: { key: MenuItem['category']; label: string; icon: string }[] = [
  { key: 'vins', label: 'Vins nature', icon: '🍷' },
  { key: 'bieres', label: 'Bières craft', icon: '🍺' },
  { key: 'spiritueux', label: 'Spiritueux', icon: '🥃' },
  { key: 'planches', label: 'Planches & Bouchées', icon: '🧀' },
]

interface Props {
  items: MenuItem[]
}

export default function CarteSection({ items }: Props) {
  const [activeTab, setActiveTab] = useState<MenuItem['category']>('vins')

  const filtered = items.filter((i) => i.category === activeTab)

  return (
    <section id="carte" className="py-20 md:py-28 bg-cream-dark">
      <div className="max-w-6xl mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <p className="font-script text-secondary text-lg mb-2">Ce qu&apos;on propose</p>
          <h2 className="font-heading text-4xl md:text-5xl text-ink mb-4">La carte</h2>
          <p className="font-body text-ink/60 max-w-md mx-auto text-sm">
            Sélection soignée, produits locaux et artisanaux. Le contenu varie selon les arrivages.
          </p>
        </AnimatedSection>

        {/* Tabs */}
        <AnimatedSection delay={1}>
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-sm font-body text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'bg-primary text-cream shadow-sm'
                    : 'bg-white text-ink/70 hover:bg-cream border border-wood/40'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Items grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item, i) => (
              <div
                key={i}
                className="bg-cream/80 rounded-sm border border-wood/30 p-5 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-heading text-lg text-ink leading-snug">{item.nom}</h3>
                  {item.prix && (
                    <span className="font-body text-xs text-primary font-medium whitespace-nowrap mt-1">
                      {item.prix}
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className="font-body text-sm text-ink/60 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Photo accent */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { src: '/images/vins.png', alt: 'Vins nature sélectionnés' },
              { src: '/images/bieres.webp', alt: 'Bières artisanales locales' },
              { src: '/images/assiette.png', alt: 'Planche gourmande' },
              { src: '/images/rhum.png', alt: 'Rhum artisanal' },
            ].map((photo) => (
              <div key={photo.src} className="relative aspect-square rounded-sm overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>

      {/* Divider */}
      <div className="flex items-center justify-center mt-20 gap-4 opacity-20">
        <div className="flex-1 max-w-xs h-px bg-wood" />
        <Image src="/images/motif-panier.png" alt="" width={32} height={32} />
        <div className="flex-1 max-w-xs h-px bg-wood" />
      </div>
    </section>
  )
}
