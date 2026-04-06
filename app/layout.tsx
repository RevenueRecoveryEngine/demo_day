import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Revenue Recovery Engine — RRE',
  description: 'RRE detects what your listing fails to say. A system that understands why revenue is lost — and precisely how to recover it.',
  keywords: ['revenue recovery', 'ecommerce', 'listing optimization', 'RRE', 'SaaS'],
  openGraph: {
    title: 'Revenue Recovery Engine — RRE',
    description: 'From guesswork to precision. From loss to recovered revenue.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}
