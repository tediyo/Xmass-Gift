import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Christmas Gift Cards - Spread Holiday Joy',
  description: 'Create beautiful personalized Christmas gift cards',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

