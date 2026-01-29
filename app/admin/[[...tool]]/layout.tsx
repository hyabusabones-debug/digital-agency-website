import React from "react"
import type { Metadata, Viewport } from "next"

export const metadata: Metadata = {
  title: "Admin | Digital Agency CMS",
  description: "Content Management System for Digital Agency",
  robots: {
    index: false,
    follow: false,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
