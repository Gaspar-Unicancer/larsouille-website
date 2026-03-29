import Image from 'next/image'
import type { SiteContent } from '@/types'

interface Props {
  content: SiteContent
}

export default function HeroSection({ content }: Props) {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/facade.jpg"
        alt="L'Arsouille, bar de quartier brestois"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Warm gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-ink/40 to-ink/70" />

      {/* Decorative croquis motif */}
      <div className="absolute top-1/4 right-8 md:right-16 opacity-10 hidden md:block">
        <Image
          src="/images/motif-megaphone.png"
          alt=""
          width={120}
          height={120}
          className="brightness-0 invert"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        {/* Script accent */}
        <p className="font-script text-secondary text-xl md:text-2xl mb-2 opacity-90">
          Brest · Quartier des 4 Moulins
        </p>

        {/* Main title */}
        <h1 className="font-heading text-5xl md:text-7xl font-bold text-cream mb-4 leading-tight">
          {content.hero_title}
        </h1>

        {/* Subtitle */}
        <p className="font-body text-lg md:text-xl text-cream/90 mb-2 font-light tracking-wide">
          {content.hero_subtitle}
        </p>
        <p className="font-body text-base text-cream/70 mb-8 max-w-md mx-auto">
          {content.hero_description}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#carte"
            className="bg-primary text-cream font-body font-medium px-7 py-3 rounded-sm hover:bg-[#7A1515] transition-colors duration-200 text-sm tracking-wide"
          >
            Voir la carte
          </a>
          <a
            href="#contact"
            className="border border-cream/70 text-cream font-body font-medium px-7 py-3 rounded-sm hover:bg-cream/10 transition-colors duration-200 text-sm tracking-wide"
          >
            Nous retrouver
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-cream/50">
        <span className="font-body text-xs tracking-widest uppercase">Découvrir</span>
        <span className="block w-px h-8 bg-cream/30 animate-pulse" />
      </div>
    </section>
  )
}
