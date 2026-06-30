import Nav from '@/components/ui/Nav'
import HeroCarousel from '@/components/sections/HeroCarousel'
import Mission from '@/components/sections/Mission'
import Pillars from '@/components/sections/Pillars'
import Impact from '@/components/sections/Impact'
import Story from '@/components/sections/Story'
import CtaBand from '@/components/sections/CtaBand'
import Footer from '@/components/ui/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroCarousel />
        <Mission />
        <Pillars />
        <Impact />
        <Story />
        <CtaBand />
      </main>
      <Footer />
    </>
  )
}