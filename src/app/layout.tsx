import type { Metadata } from 'next'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://savanna-rising-foundation.vercel.app'

export const metadata: Metadata = {
  // Required for OG/Twitter image URLs below to resolve to full absolute
  // URLs rather than relative paths, which social platforms won't accept.
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Mwenda Kimathi Foundation',
    // Lets child pages set just their own bit, e.g. title: 'About' becomes
    // "About | Mwenda Kimathi Foundation" - not used yet since existing
    // pages already write out the full string themselves, but available
    // if that changes later.
    template: '%s | Mwenda Kimathi Foundation',
  },
  description: 'We use football and rugby to build futures for young Kenyans — on the pitch and far beyond it.',
  openGraph: {
    title: 'Mwenda Kimathi Foundation',
    description: 'We use football and rugby to build futures for young Kenyans — on the pitch and far beyond it.',
    url: siteUrl,
    siteName: 'Mwenda Kimathi Foundation',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mwenda Kimathi Foundation',
    description: 'We use football and rugby to build futures for young Kenyans — on the pitch and far beyond it.',
    images: ['/opengraph-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
