import { notFound } from "next/navigation"
import { getServiceBySlug } from "@/lib/content"
import { isValidSlug } from "@/lib/service-input"
import { ServiceForm } from "../service-form"

export const dynamic = "force-dynamic"

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!isValidSlug(slug)) notFound()

  const service = await getServiceBySlug(slug)
  if (!service) notFound()

  return <ServiceForm service={service} />
}