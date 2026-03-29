import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-ink text-cream/80 font-body">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div className="flex flex-col gap-3">
          <Image
            src="/images/logo.webp"
            alt="L'Arsouille"
            width={64}
            height={64}
            className="rounded-full"
          />
          <p className="font-heading text-xl text-cream">L&apos;Arsouille</p>
          <p className="text-sm text-cream/60 leading-relaxed">
            Bar de quartier brestois<br />
            Vins nature · Bières craft · Partage
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-heading text-sm text-cream/40 uppercase tracking-wider mb-4">Navigation</h3>
          <ul className="flex flex-col gap-2 text-sm">
            {['Notre histoire', 'La carte', 'Événements', 'Galerie', 'Nous trouver'].map((label, i) => {
              const hrefs = ['#histoire', '#carte', '#evenements', '#galerie', '#contact']
              return (
                <li key={label}>
                  <a href={hrefs[i]} className="hover:text-cream transition-colors duration-200">
                    {label}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-heading text-sm text-cream/40 uppercase tracking-wider mb-4">Contact</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li>Quartier des 4 Moulins, Brest</li>
            <li>
              <a
                href="https://www.instagram.com/cave_larsouille_brest"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cream transition-colors"
              >
                @cave_larsouille_brest
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10 px-4 py-4 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-cream/30">
        <span>© {new Date().getFullYear()} L&apos;Arsouille — Brest</span>
      </div>
    </footer>
  )
}
