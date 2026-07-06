import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mwenda Kimathi Foundation',
  description: 'We use football and rugby to build futures for young Kenyans — on the pitch and far beyond it.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
