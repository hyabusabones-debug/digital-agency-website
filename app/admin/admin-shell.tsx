"use client"

import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Layers,
  HelpCircle,
  Home,
  Users,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

type NavItem = {
  label: string
  href: string
  icon: LucideIcon
  ready: boolean
}

const navGroups: { heading?: string; items: NavItem[] }[] = [
  {
    items: [{ label: "Dashboard", href: "/admin", icon: LayoutDashboard, ready: true }],
  },
  {
    heading: "Content",
    items: [
      { label: "Services", href: "/admin/services", icon: Briefcase, ready: true },
      { label: "Blog Posts", href: "/admin/blog", icon: FileText, ready: false },
      { label: "Case Studies", href: "/admin/case-studies", icon: Layers, ready: false },
      { label: "FAQs", href: "/admin/faqs", icon: HelpCircle, ready: true },
    ],
  },
  {
    heading: "Pages",
    items: [
      { label: "Homepage", href: "/admin/homepage", icon: Home, ready: false },
      { label: "About Page", href: "/admin/about", icon: Users, ready: false },
    ],
  },
  {
    heading: "Site",
    items: [{ label: "Settings", href: "/admin/settings", icon: Settings, ready: true }],
  },
]

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin"
  return pathname === href || pathname.startsWith(href + "/")
}

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? ""
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [signingOut, setSigningOut] = useState(false)

  // Close the mobile drawer whenever the page changes
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // The login screen is a standalone page: no sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  async function handleSignOut() {
    setSigningOut(true)
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between bg-[#0a0a0a] text-white px-4 h-14 border-b border-white/10">
        <div className="font-heading font-bold tracking-tight">
          ICT<span className="text-primary">SERVE</span>{" "}
          <span className="text-xs font-medium text-white/50 ml-1">Admin</span>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="lg:hidden fixed inset-0 z-30 bg-black/50"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0a0a0a] text-white flex flex-col border-r border-white/10 transition-transform duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 flex items-center gap-3 px-6 border-b border-white/10 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Layers className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <div className="font-heading font-bold tracking-tight">
              ICT<span className="text-primary">SERVE</span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">Admin</div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-6">
          {navGroups.map((group, i) => (
            <div key={group.heading ?? i}>
              {group.heading && (
                <div className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/35">
                  {group.heading}
                </div>
              )}
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const active = item.ready && isActive(pathname, item.href)

                  if (!item.ready) {
                    return (
                      <li key={item.href}>
                        <span
                          aria-disabled="true"
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/30 cursor-not-allowed select-none"
                        >
                          <item.icon className="w-4 h-4 shrink-0" />
                          <span className="flex-1">{item.label}</span>
                          <span className="text-[10px] uppercase tracking-wider bg-white/5 text-white/40 px-2 py-0.5 rounded-full">
                            Soon
                          </span>
                        </span>
                      </li>
                    )
                  }

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                          active
                            ? "bg-primary/15 text-white"
                            : "text-white/65 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {active && (
                          <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-primary" />
                        )}
                        <item.icon className={`w-4 h-4 shrink-0 ${active ? "text-primary" : ""}`} />
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10 space-y-1 shrink-0">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/65 hover:text-white hover:bg-white/5 transition-colors"
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            View site
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/65 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-50"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {signingOut ? "Signing out…" : "Sign out"}
          </button>
        </div>
      </aside>

      {/* Page content */}
      <div className="lg:pl-64">
        <main className="px-4 sm:px-8 py-8 lg:py-10 max-w-6xl">{children}</main>
      </div>
    </div>
  )
}