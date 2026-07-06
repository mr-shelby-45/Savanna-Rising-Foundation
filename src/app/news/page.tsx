import Nav from '@/components/ui/Nav'
import Footer from '@/components/ui/Footer'
import NewsHeader from '@/components/sections/NewsHeader'
import NewsEvents from '@/components/sections/NewsEvents'
import NewsPosts from '@/components/sections/NewsPosts'

export const metadata = {
  title: 'News — Mwenda Kimathi Foundation',
  description: 'Latest from the pitch and the community.',
}

export default function NewsPage() {
  return (
    <>
      <Nav />
      <main>
        <NewsHeader />
        <NewsEvents />
        <NewsPosts />
      </main>
      <Footer />
    </>
  )
}