import Nav from '@/components/ui/Nav'
import Footer from '@/components/ui/Footer'
import GetInvolvedHeader from '@/components/sections/GetInvolvedHeader'
import GetInvolvedDonate from '@/components/sections/GetInvolvedDonate'
import GetInvolvedVolunteer from '@/components/sections/GetInvolvedVolunteer'
import GetInvolvedPartner from '@/components/sections/GetInvolvedPartner'

export const metadata = {
  title: 'Get Involved — Mwenda Kimathi Foundation',
  description: 'Join the movement. Donate, volunteer, or partner with us.',
}

export default function GetInvolvedPage() {
  return (
    <>
      <Nav />
      <main>
        <GetInvolvedHeader />
        <GetInvolvedDonate />
        <GetInvolvedVolunteer />
        <GetInvolvedPartner />
      </main>
      <Footer />
    </>
  )
}