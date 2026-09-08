import { getGlobalSettings, getAllServices } from "@/sanity/lib/fetch"
import { Navbar } from "@/components/Navbar"

export async function Header() {
  const [settings, services] = await Promise.all([
    getGlobalSettings(),
    getAllServices(),
  ])

  const formattedServices = services?.map((s) => ({
    name: s.title || "",
    href: `/services/${s.slug}`,
  })) || []

  return <Navbar siteName={settings?.siteName} services={formattedServices} />
}


