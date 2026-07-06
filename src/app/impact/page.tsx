import Nav from '@/components/ui/Nav'
import Footer from '@/components/ui/Footer'
import ImpactHeader from '@/components/sections/ImpactHeader'
import ImpactStats from '@/components/sections/ImpactStats'
import ImpactStories from '@/components/sections/ImpactStories'
import ImpactReports from '@/components/sections/ImpactReports'

export const metadata = {
  title: 'Impact — Mwenda Kimathi Foundation',
  description: 'The work in numbers and stories.',
}

export default function ImpactPage() {
  return (
    <>
      <Nav />
      <main>
        <ImpactHeader />
        <ImpactStats />
        <ImpactStories />
        <ImpactReports />
      </main>
      <Footer />
    </>
  )
}