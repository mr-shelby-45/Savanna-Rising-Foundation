import Nav from '@/components/ui/Nav'
import Footer from '@/components/ui/Footer'
import ProgrammesHeader from '@/components/sections/ProgrammesHeader'
import ProgrammesSport from '@/components/sections/ProgrammesSport'
import ProgrammesConservation from '@/components/sections/ProgrammesConservation'
import ProgrammesCulture from '@/components/sections/ProgrammesCulture'
import ProgrammesSchools from '@/components/sections/ProgrammesSchools'

export const metadata = {
  title: 'Programmes — Savanna Rising Foundation',
  description: 'Three pillars. One living idea.',
}

export default function ProgrammesPage() {
  return (
    <>
      <Nav />
      <main>
        <ProgrammesHeader />
        <ProgrammesSport />
        <ProgrammesConservation />
        <ProgrammesCulture />
        <ProgrammesSchools />
      </main>
      <Footer />
    </>
  )
}