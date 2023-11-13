import LayoutClient from '@/components/layout/Layout'
import type { Metadata } from 'next'
import { Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Social chat',
  description: 'Social media web app',
  icons: '/logo.svg'
}

export const viewport: Viewport = {
  themeColor: '#0E0B18',
  colorScheme: 'dark',

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutClient>
          {children}
        </LayoutClient>
      </body>
    </html>
  )
}
