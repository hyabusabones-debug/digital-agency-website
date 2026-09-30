"use client"

import { useState } from "react"
import type { FormEvent, ReactNode } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Plus, Trash2, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MarkdownContent } from "@/components/MarkdownContent"
import { SERVICE_ICONS, slugify } from "@/lib/service-input"
import type { Service } from "@/lib/content-types"

function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <section className="bg-card border border-border rounded-2xl p-6">
      <div className="mb-5">
        <h2 className="font-bold text-foreground">{title}</h2>
        {description && <p className="text-sm text-muted-foreground mt-0.5">{description}</p>}
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  )
}

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string
  htmlFor: string
  hint?: string
  children: ReactNode
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

export function ServiceForm({ service }: { service?: Service }) {
  const router = useRouter()
  const isEdit = Boolean(service)

  const [title, setTitle] = useState(service?.title ?? "")
  const [slug, setSlug] = useState(service?.slug ?? "")
  const [slugTouched, setSlugTouched] = useState(false)
  const [shortDescription, setShortDescription] = useState(service?.shortDescription ?? "")
  const [description, setDescription] = useState(service?.description ?? "")
  const [showPreview, setShowPreview] = useState(false)
  const [icon, setIcon] = useState<string>(service?.icon ?? SERVICE_ICONS[0])
  const [image, setImage] = useState(service?.image ?? "")
  const [order, setOrder] = useState(String(service?.order ?? 0))
  const [features, setFeatures] = useState<string[]>(service?.features ?? [])
  const [steps, setSteps] = useState<{ title: string; description: string }[]>(
    service?.processSteps ?? []
  )
  const [seoTitle, setSeoTitle] = useState(service?.seoTitle ?? "")
  const [seoDescription, setSeoDescription] = useState(service?.seoDescription ?? "")

  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState("")

  function handleTitleChange(value: string) {
    setTitle(value)
    // Keep the slug in step with the title until the user edits the slug themselves
    if (!isEdit && !slugTouched) setSlug(slugify(value))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError("")

    const url = isEdit ? `/api/admin/services/${service!.slug}` : "/api/admin/services"

    try {
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          shortDescription,
          description,
          icon,
          image,
          order,
          features,
          processSteps: steps,
          seoTitle,
          seoDescription,
        }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setError(data.error || "Could not save. Please try again.")
        setSaving(false)
        window.scrollTo({ top: 0, behavior: "smooth" })
        return
      }

      router.push("/admin/services")
      router.refresh()
    } catch {
      setError("Network error. Check your connection and try again.")
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!service) return
    const confirmed = window.confirm(
      `Delete "${service.title}"? This removes it from your website and can't be undone from here.`
    )
    if (!confirmed) return

    setDeleting(true)
    setError("")

    try {
      const res = await fetch(`/api/admin/services/${service.slug}`, { method: "DELETE" })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setError(data.error || "Could not delete. Please try again.")
        setDeleting(false)
        window.scrollTo({ top: 0, behavior: "smooth" })
        return
      }

      router.push("/admin/services")
      router.refresh()
    } catch {
      setError("Network error. Check your connection and try again.")
      setDeleting(false)
    }
  }

  const busy = saving || deleting

  return (
    <form onSubmit={handleSubmit}>
      <Link
        href="/admin/services"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        All services
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          {isEdit ? `Edit: ${service!.title}` : "New service"}
        </h1>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-6 p-4 rounded-2xl bg-destructive/10 border border-destructive/30 text-sm text-destructive"
        >
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6 items-start">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-6">
          <Section title="Basics">
            <Field label="Title" htmlFor="title">
              <Input
                id="title"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Web Development"
                maxLength={120}
                required
              />
            </Field>

            <Field
              label="URL slug"
              htmlFor="slug"
              hint={
                isEdit
                  ? "The slug can't be changed after creation, because that would break existing links."
                  : `Your page will live at /services/${slug || "your-slug"}`
              }
            >
              <Input
                id="slug"
                value={slug}
                onChange={(e) => {
                  setSlugTouched(true)
                  setSlug(slugify(e.target.value))
                }}
                disabled={isEdit}
                placeholder="web-development"
                required
              />
            </Field>

            <Field
              label="Short description"
              htmlFor="shortDescription"
              hint="Shown on service cards. Keep it to one line."
            >
              <Input
                id="shortDescription"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Responsive & scalable websites"
                maxLength={200}
                required
              />
            </Field>
          </Section>

          <Section
            title="Description"
            description="Shown on the service's own page. Markdown works: ## headings, **bold**, - bullet lists."
          >
            <div className="flex gap-1 p-1 bg-muted rounded-xl w-fit">
              {[
                { label: "Write", value: false },
                { label: "Preview", value: true },
              ].map((tab) => (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setShowPreview(tab.value)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    showPreview === tab.value
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {showPreview ? (
              <div className="min-h-[280px] rounded-xl border border-border p-6 bg-background">
                {description.trim() ? (
                  <MarkdownContent value={description} />
                ) : (
                  <p className="text-sm text-muted-foreground">Nothing to preview yet.</p>
                )}
              </div>
            ) : (
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[280px] font-mono text-sm"
                placeholder="Describe the service…"
                required
              />
            )}
          </Section>

          <Section title="Key features" description="Short bullet points shown on the service page.">
            {features.map((feature, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  aria-label={`Feature ${i + 1}`}
                  value={feature}
                  onChange={(e) =>
                    setFeatures((list) => list.map((f, idx) => (idx === i ? e.target.value : f)))
                  }
                  placeholder="e.g. Custom Web Applications"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label={`Remove feature ${i + 1}`}
                  onClick={() => setFeatures((list) => list.filter((_, idx) => idx !== i))}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => setFeatures((l) => [...l, ""])}>
              <Plus className="w-4 h-4 mr-1.5" />
              Add feature
            </Button>
          </Section>

          <Section title="Process steps" description="How you deliver this service, in order.">
            {steps.map((step, i) => (
              <div key={i} className="rounded-xl border border-border p-4 space-y-3 bg-background">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Step {i + 1}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setSteps((list) => list.filter((_, idx) => idx !== i))}
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                    Remove
                  </Button>
                </div>
                <Input
                  aria-label={`Step ${i + 1} title`}
                  value={step.title}
                  onChange={(e) =>
                    setSteps((list) =>
                      list.map((s, idx) => (idx === i ? { ...s, title: e.target.value } : s))
                    )
                  }
                  placeholder="Step title, e.g. Discovery"
                />
                <Textarea
                  aria-label={`Step ${i + 1} description`}
                  value={step.description}
                  onChange={(e) =>
                    setSteps((list) =>
                      list.map((s, idx) => (idx === i ? { ...s, description: e.target.value } : s))
                    )
                  }
                  placeholder="What happens in this step?"
                  className="min-h-[80px]"
                />
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setSteps((l) => [...l, { title: "", description: "" }])}
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Add step
            </Button>
          </Section>
        </div>

        {/* Side column */}
        <div className="space-y-6 lg:sticky lg:top-6">
          <Section title="Publish">
            <Button type="submit" className="w-full" disabled={busy}>
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving…
                </>
              ) : isEdit ? (
                "Save changes"
              ) : (
                "Create service"
              )}
            </Button>
            {isEdit && (
              <Button
                type="button"
                variant="outline"
                className="w-full text-destructive hover:text-destructive"
                onClick={handleDelete}
                disabled={busy}
              >
                {deleting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Deleting…
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete service
                  </>
                )}
              </Button>
            )}
          </Section>

          <Section title="Display">
            <Field label="Icon" htmlFor="icon">
              <select
                id="icon"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-full h-9 rounded-md border border-input bg-transparent px-3 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                {SERVICE_ICONS.map((name) => (
                  <option key={name} value={name} className="text-foreground bg-background">
                    {name}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              label="Image"
              htmlFor="image"
              hint="A path to a file in your /public folder, e.g. /images/services/web.jpg. File uploads are coming in a later step."
            >
              <Input
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="/images/services/web-development.jpg"
              />
            </Field>

            <Field
              label="Order"
              htmlFor="order"
              hint="Lower numbers appear first on your website."
            >
              <Input
                id="order"
                type="number"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
              />
            </Field>
          </Section>

          <Section title="Search engines" description="Optional. Falls back to the title and short description.">
            <Field label="SEO title" htmlFor="seoTitle">
              <Input id="seoTitle" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} />
            </Field>
            <Field label="SEO description" htmlFor="seoDescription">
              <Textarea
                id="seoDescription"
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                className="min-h-[80px]"
              />
            </Field>
          </Section>
        </div>
      </div>
    </form>
  )
}