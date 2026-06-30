import Nav from '@/components/ui/Nav'
import Footer from '@/components/ui/Footer'
import AboutHeader from '@/components/sections/AboutHeader'
import AboutStory from '@/components/sections/AboutStory'
import AboutValues from '@/components/sections/AboutValues'
import AboutTeam from '@/components/sections/AboutTeam'
import AboutGovernance from '@/components/sections/AboutGovernance'

export const metadata = {
  title: 'About — Savanna Rising Foundation',
  description: 'Sport is how we show up. Community is what we build.',
}

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        <AboutHeader />
        <AboutStory />
        <AboutValues />
        <AboutTeam />
        <AboutGovernance />
      </main>
      <Footer />
    </>
  )
}