import Image from 'next/image'
import type { SiteContent } from '@/types'

interface Props {
  content: SiteContent
}

export default function HeroSection({ content }: Props) {
  const logoSrc = content.img_logo || '/images/logo.webp'
  const heroBgSrc = content.img_hero_bg || '/images/facade-2.png'

  return (
    <section className="flex flex-col min-h-screen">

      <div className="bg-cream flex flex-col items-center justify-center flex-1 pt-20 pb-10 px-4 relative overflow-hidden">

        <Image
          src={logoSrc}
          alt="L'Arsouille"
          width={88}
          height={88}
          className="rounded-full mb-5 shadow-sm"
          priority
          unoptimized={logoSrc.startsWith('http')}
        />

        <div className="flex items-center gap-3 mb-6 w-full max-w-md">
          <div className="flex-1 h-px bg-primary/25" />
          <span className="font-script text-primary text-base leading-none">Brest \u00b7 Quartier des 4 Moulins</span>
          <div className="flex-1 h-px bg-primary/25" />
        </div>

        <div className="flex items-center gap-6 lg:gap-12 mb-4">
          <div className="hidden md:block shrink-0">
            <Image src="/images/motif-megaphone.png" alt="" width={190} height={190} />
          </div>
          <h1
            className="font-heading text-primary font-bold leading-none text-center tracking-tight"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 7.5rem)' }}
          >
            {content.hero_title}
          </h1>
          <div className="hidden md:block shrink-0">
            <Image src="/images/motif-panier.png" alt="" width={190} height={190} />
          </div>
        </div>

        <div className="flex md:hidden gap-10 mt-2 mb-4">
          <Image src="/images/motif-megaphone.png" alt="" width={90} height={90} />
          <Image src="/images/motif-panier.png" alt="" width={90} height={90} />
        </div>

        <p className="font-script text-secondary text-2xl md:text-3xl mb-2 leading-snug text-center">
          {content.hero_subtitle}
        </p>
        <p className="font-body text-ink/55 text-sm md:text-base max-w-xs md:max-w-sm text-center leading-relaxed mb-8">
          {content.hero_description}
        </p>

        {/* 3 CTAs sections */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <a
            href="#bar"
            className="bg-primary text-cream font-body font-medium px-6 py-3 text-sm tracking-wide hover:bg-[#7A1515] transition-colors text-center"
          >
            \ud83c\udf7a Le Bar
          </a>
          <a
            href="#cave"
            className="border border-primary text-primary font-body font-medium px-6 py-3 text-sm tracking-wide hover:bg-primary/5 transition-colors text-center"
          >
            \ud83c\udf77 La Cave
          </a>
          <a
            href="#epicerie"
            className="border border-primary text-primary font-body font-medium px-6 py-3 text-sm tracking-wide hover:bg-primary/5 transition-colors text-center"
          >
            \ud83e\uddc0 L&apos;\u00c9picerie
          </a>
        </div>
        <a
          href="https://www.instagram.com/bar_larsouille_brest/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-xs text-primary/60 hover:text-primary transition-colors"
        >
          Nous suivre sur Instagram \u2192
        </a>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <span className="block w-px h-7 bg-primary/30 animate-pulse" />
        </div>
      </div>

      <div className="relative shrink-0 overflow-hidden" style={{ height: '44vh' }}>
        <Image
          src={heroBgSrc}
          alt="L'Arsouille \u2014 facade et equipe, Brest"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          unoptimized={heroBgSrc.startsWith('http')}
        />
        <div className="absolute inset-0 bg-ink/15" />
        <a
          href="https://www.instagram.com/bar_larsouille_brest/"
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
