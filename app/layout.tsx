import './globals.css'
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import Header from '@/components/Header'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'toolbox',
  description: 'Find the right tools for your job',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={font.className}>
        <Header/>
        {children}
      </body>
    </html>
  )
}
