import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import HistoireSection from '@/components/HistoireSection'
import CarteSection from '@/components/CarteSection'
import EvenementsSection from '@/components/EvenementsSection'
import GalerieSection from '@/components/GalerieSection'
import ContactSection from '@/components/ContactSection'
import { getSiteContent, getMenuItems, getEvents } from '@/lib/content'

export default async function Home() {
  const [content, menuItems, events] = await Promise.all([
    getSiteContent(),
    getMenuItems(),
    getEvents(),
  ])

  return (
    <>
      <NavBar />
      <main>
        <HeroSection content={content} />
        <HistoireSection content={content} />
        <CarteSection items={menuItems} content={content} />
        <EvenementsSection events={events} />
        <GalerieSection content={content} />
        <ContactSection content={content} />
      </main>
      <Footer />
    </>
  )
}
