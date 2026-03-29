import Image from 'next/image'

interface Props {
  motif?: 'megaphone' | 'panier'
  bg?: string
}

export default function SectionDivider({ motif = 'panier', bg = 'bg-cream-dark' }: Props) {
  const src = motif === 'megaphone' ? '/images/motif-megaphone.png' : '/images/motif-panier.png'
  return (
    <div className={`${bg} flex items-center justify-center py-2 gap-6`}>
      <div className="flex-1 max-w-sm h-px bg-wood/50" />
      <Image src={src} alt="" width={48} height={48} className="" />
      <div className="flex-1 max-w-sm h-px bg-wood/50" />
    </div>
  )
}
