import Image from 'next/image'
import type { SiteContent } from '@/types'

interface Props {
  content: SiteContent
}

export default function HeroSection({ content }: Props) {
  return (
    <section className="flex flex-col min-h-screen">

      {/* PARTIE BRAND creme, DA au premier plan */}
      <div className="bg-cream flex flex-col items-center justify-center flex-1 pt-20 pb-10 px-4 relative overflow-hidden">

        {/* Logo */}
        <Image
          src="/images/logo.webp"
          alt="L'Arsouille"
          width={88}
          height={88}
          className="rounded-full mb-5 shadow-sm"
          priority
        />

        {/* Filet decoratif */}
        <div className="flex items-center gap-3 mb-6 w-full max-w-md">
          <div className="flex-1 h-px bg-primary/25" />
          <span className="font-script text-primary text-base leading-none">Brest · Quartier des 4 Moulins</span>
          <div className="flex-1 h-px bg-primary/25" />
        </div>

        {/* Titre flanque des motifs croquis desktop */}
        <div className="flex items-center gap-6 lg:gap-12 mb-4">
          <div className="hidden md:block shrink-0">
            <Image
              src="/images/motif-megaphone.png"
              alt=""
              width={190}
              height={190}
              className=""
            />
          </div>

          <h1 className="font-heading text-primary font-bold leading-none text-center tracking-tight"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 7.5rem)' }}>
            {content.hero_title}
          </h1>

          <div className="hidden md:block shrink-0">
            <Image
              src="/images/motif-panier.png"
              alt=""
              width={190}
              height={190}
              className=""
            />
          </div>
        </div>

        {/* Motifs mobile sous le titre */}
        <div className="flex md:hidden gap-10 mt-2 mb-4">
          <Image src="/images/motif-megaphone.png" alt="" width={90} height={90} className="" />
          <Image src="/images/motif-panier.png"    alt="" width={90} height={90} className="" />
        </div>

        {/* Sous-titre */}
        <p className="font-script text-secondary text-2xl md:text-3xl mb-2 leading-snug text-center">
          {content.hero_subtitle}
        </p>
        <p className="font-body text-ink/55 text-sm md:text-base max-w-xs md:max-w-sm text-center leading-relaxed mb-8">
          {content.hero_description}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="#carte"
            className="bg-primary text-cream font-body font-medium px-7 py-3 text-sm tracking-wide hover:bg-[#7A1515] transition-colors"
          >
            Voir la carte
          </a>
          <a
            href="https://www.instagram.com/cave_larsouille_brest"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-primary text-primary font-body font-medium px-7 py-3 text-sm tracking-wide hover:bg-primary/5 transition-colors"
          >
            Nous suivre
          </a>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <span className="block w-px h-7 bg-primary/30 animate-pulse" />
        </div>
      </div>

      {/* BANDE PHOTO contexte, ancrage lieu */}
      <div className="relative shrink-0 overflow-hidden" style={{ height: '44vh' }}>
        <Image
          src="/images/facade.jpg"
          alt="L'Arsouille — facade et equipe, Brest"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-ink/15" />
        <a
          href="https://www.instagram.com/cave_larsouille_brest"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 bg-cream/90 text-ink font-body text-xs font-medium px-3 py-1.5 hover:bg-cream transition-colors"
        >
          @cave_larsouille_brest
        </a>
      </div>

    </section>
  )
}
