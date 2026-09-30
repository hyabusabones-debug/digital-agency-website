import Link from "next/link"
import {
  Briefcase,
  FileText,
  Layers,
  HelpCircle,
  Home,
  Users,
  Settings,
  ArrowRight,
  HardDrive,
  GitBranch,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { getAllServices, getFAQs } from "@/lib/content"
import { getStorageMode } from "@/lib/content-store"

export const dynamic = "force-dynamic"

type Section = {
  name: string
  description: string
  href: string
  icon: LucideIcon
  ready: boolean
  count?: number
}

export default async function AdminDashboardPage() {
  const services = await getAllServices()
  const faqs = await getFAQs()
  const storageMode = getStorageMode()

  const sections: Section[] = [
    {
      name: "Services",
      description: "The services you offer, with details, features and process.",
      href: "/admin/services",
      icon: Briefcase,
      ready: true,
      count: services.length,
    },
    {
      name: "Site Settings",
      description: "Site name, footer text, contact details and social links.",
      href: "/admin/settings",
      icon: Settings,
      ready: true,
    },
    {
      name: "Blog Posts",
      description: "Articles and news for your blog.",
      href: "/admin/blog",
      icon: FileText,
      ready: false,
    },
    {
      name: "Case Studies",
      description: "Client projects and results.",
      href: "/admin/case-studies",
      icon: Layers,
      ready: false,
    },
    {
      name: "FAQs",
      description: "Frequently asked questions.",
      href: "/admin/faqs",
      icon: HelpCircle,
      ready: true,
      count: faqs.length,
    },
    {
      name: "Homepage",
      description: "Hero text, calls to action and homepage sections.",
      href: "/admin/homepage",
      icon: Home,
      ready: false,
    },
    {
      name: "About Page",
      description: "Company story, mission, values and team.",
      href: "/admin/about",
      icon: Users,
      ready: false,
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage the content that appears on your website.</p>
      </div>

      <div className="mb-8 flex items-start gap-3 p-4 rounded-2xl bg-card border border-border text-sm">
        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          {storageMode === "github" ? (
            <GitBranch className="w-4 h-4 text-primary" />
          ) : (
            <HardDrive className="w-4 h-4 text-primary" />
          )}
        </div>
        <div>
          <div className="font-semibold text-foreground">
            {storageMode === "github" ? "Saving to GitHub" : "Saving to local files"}
          </div>
          <div className="text-muted-foreground">
            {storageMode === "github"
              ? "Each save is committed to your repository. The live site updates after it finishes redeploying, usually within a minute or two."
              : "Development mode: each save writes to the /content folder on your computer and shows up immediately. Commit those files to git to publish them."}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sections.map((section) => {
          const body = (
            <>
              <div className="flex items-start justify-between gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <section.icon className="w-5 h-5 text-primary" />
                </div>
                {section.ready ? (
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all mt-1" />
                ) : (
                  <span className="text-[10px] uppercase tracking-wider bg-muted text-muted-foreground px-2 py-1 rounded-full">
                    Coming soon
                  </span>
                )}
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <h2 className="text-lg font-bold text-foreground">{section.name}</h2>
                {typeof section.count === "number" && (
                  <span className="text-sm text-muted-foreground">
                    {section.count} {section.count === 1 ? "item" : "items"}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{section.description}</p>
            </>
          )

          return section.ready ? (
            <Link
              key={section.name}
              href={section.href}
              className="group block bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-lg transition-all"
            >
              {body}
            </Link>
          ) : (
            <div
              key={section.name}
              className="bg-card/60 border border-dashed border-border rounded-2xl p-6 opacity-70"
            >
              {body}
            </div>
          )
        })}
      </div>
    </div>
  )
}