"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { SmoothScroll } from "@/components/SmoothScroll"

/**
 * Wraps every page with the public site chrome (Header, Footer, smooth scrolling),
 * except /admin pages, which render their own layout with a sidebar.
 *
 * Header and Footer are passed in as props (already rendered on the server) so this
 * client component can decide whether to show them.
 */
export function SiteShell({
  header,
  footer,
  children,
}: {
  header: ReactNode
  footer: ReactNode
  children: ReactNode
}) {
  const pathname = usePathname()

  if (pathname?.startsWith("/admin")) {
    return <>{children}</>
  }

  return (
    <SmoothScroll>
      {header}
      <main>{children}</main>
      {footer}
    </SmoothScroll>
  )
}