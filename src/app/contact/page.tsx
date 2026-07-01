import Nav from '@/components/ui/Nav'
import Footer from '@/components/ui/Footer'
import ContactHeader from '@/components/sections/ContactHeader'
import ContactBlock from '@/components/sections/ContactBlock'

export const metadata = {
  title: 'Contact — Savanna Rising Foundation',
  description: 'Get in touch with the Savanna Rising Foundation team.',
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