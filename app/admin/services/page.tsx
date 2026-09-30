import Link from "next/link"
import { Plus, Pencil, ExternalLink, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAllServices } from "@/lib/content"

export const dynamic = "force-dynamic"

export default async function AdminServicesPage() {
  const services = await getAllServices()

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Services</h1>
          <p className="text-muted-foreground mt-1">
            {services.length} {services.length === 1 ? "service" : "services"} shown on your website.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/services/new">
            <Plus className="w-4 h-4 mr-2" />
            New service
          </Link>
        </Button>
      </div>

      {services.length === 0 ? (
        <div className="bg-card border border-dashed border-border rounded-2xl p-12 text-center">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-5 h-5 text-primary" />
          </div>
          <h2 className="font-bold text-foreground">No services yet</h2>
          <p className="text-sm text-muted-foreground mt-1 mb-6">
            Add your first service and it will appear on the Services page.
          </p>
          <Button asChild>
            <Link href="/admin/services/new">
              <Plus className="w-4 h-4 mr-2" />
              New service
            </Link>
          </Button>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl overflow-hidden divide-y divide-border">
          {services.map((service) => (
            <div
              key={service.slug}
              className="flex flex-wrap items-center gap-4 px-5 py-4 hover:bg-muted/30 transition-colors"
            >
              <div className="w-8 text-center text-sm font-semibold text-muted-foreground tabular-nums">
                {service.order ?? 0}
              </div>
              <div className="flex-1 min-w-[200px]">
                <div className="font-semibold text-foreground">{service.title}</div>
                <div className="text-sm text-muted-foreground line-clamp-1">
                  {service.shortDescription}
                </div>
                <div className="text-xs text-muted-foreground/70 mt-0.5">/services/{service.slug}</div>
              </div>
              <div className="flex items-center gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/services/${service.slug}`} target="_blank">
                    <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                    View
                  </Link>
                </Button>
                <Button asChild size="sm">
                  <Link href={`/admin/services/${service.slug}`}>
                    <Pencil className="w-3.5 h-3.5 mr-1.5" />
                    Edit
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}