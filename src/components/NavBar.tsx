'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const LINKS = [
  { href: '#histoire', label: 'Notre histoire' },
  { href: '#carte', label: 'La carte' },
  { href: '#evenements', label: 'Événements' },
  { href: '#galerie', label: 'Galerie' },
  { href: '#contact', label: 'Nous trouver' },
]

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/images/logo.webp"
            alt="L'Arsouille"
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6 font-body text-sm font-medium text-ink">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="hover:text-primary transition-colors duration-200"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="https://www.instagram.com/cave_larsouille_brest"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1.5 bg-primary text-cream text-sm font-medium px-4 py-2 rounded-sm hover:bg-[#7A1515] transition-colors duration-200"
        >
          Instagram
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8"
          aria-label="Menu"
        >
          <span className={`block h-0.5 bg-ink transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 bg-ink transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 bg-ink transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-cream/98 backdrop-blur-sm overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col px-4 pb-4 font-body text-base font-medium text-ink">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 border-b border-wood/40 hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-4">
            <a
              href="https://www.instagram.com/cave_larsouille_brest"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-cream text-sm font-medium px-4 py-2 rounded-sm"
            >
              Nous suivre sur Instagram
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
