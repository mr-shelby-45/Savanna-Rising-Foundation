import Nav from '@/components/ui/Nav'
import Footer from '@/components/ui/Footer'
import ContactHeader from '@/components/sections/ContactHeader'
import ContactBlock from '@/components/sections/ContactBlock'

export const metadata = {
  title: 'Contact — Mwenda Kimathi Foundation',
  description: 'Get in touch with the Mwenda Kimathi Foundation team.',
}

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main>
        <ContactHeader />
        <ContactBlock />
      </main>
      <Footer />
    </>
  )
}