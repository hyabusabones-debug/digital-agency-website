import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Outfit } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { SmoothScroll } from '@/components/SmoothScroll'

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: {
    default: 'Digital Agency | Web Development & Digital Marketing Solutions',
    template: '%s | Digital Agency'
  },
  description: 'Empowering your business in the digital era with innovative web development, digital marketing, UI/UX design, and e-commerce solutions.',
  keywords: ['digital agency', 'web development', 'digital marketing', 'UI/UX design', 'e-commerce', 'mobile app development'],
  authors: [{ name: 'Digital Agency' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://digital.com',
    siteName: 'Digital Agency',
    title: 'Digital Agency | Web Development & Digital Marketing Solutions',
    description: 'Empowering your business in the digital era with innovative web development, digital marketing, UI/UX design, and e-commerce solutions.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Agency | Web Development & Digital Marketing Solutions',
    description: 'Empowering your business in the digital era with innovative solutions.',
  },
  robots: {
    index: true,
    follow: true,
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>
            <Header />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
