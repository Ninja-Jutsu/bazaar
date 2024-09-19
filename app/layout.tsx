import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

import Navbar from '../components/navbar/Navbar'
import Container from '../components/global/Container'

import Providers from './providers'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Next Bazaar',
  description: 'A nifty bazaar built with Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          <Container className='pb-20'>{children}</Container>
        </Providers>
      </body>
    </html>
  )
}
