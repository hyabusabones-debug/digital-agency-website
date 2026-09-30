"use client"

import { useState } from "react"
import type { FormEvent, ReactNode } from "react"
import { useRouter } from "next/navigation"
import { Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { GlobalSettings } from "@/lib/content-types"

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

export function SettingsForm({
  settings,
  storageMode,
}: {
  settings: GlobalSettings | null
  storageMode: "local" | "github"
}) {
  const router = useRouter()

  const [siteName, setSiteName] = useState(settings?.siteName ?? "ICTSERVE")
  const [footerText, setFooterText] = useState(settings?.footerText ?? "")
  const [email, setEmail] = useState(settings?.contactInfo?.email ?? "")
  const [phone, setPhone] = useState(settings?.contactInfo?.phone ?? "")
  const [address, setAddress] = useState(settings?.contactInfo?.address ?? "")
  const [facebook, setFacebook] = useState(settings?.socialLinks?.facebook ?? "")
  const [twitter, setTwitter] = useState(settings?.socialLinks?.twitter ?? "")
  const [linkedin, setLinkedin] = useState(settings?.socialLinks?.linkedin ?? "")
  const [instagram, setInstagram] = useState(settings?.socialLinks?.instagram ?? "")
  const [seoTitle, setSeoTitle] = useState(settings?.defaultSEO?.title ?? "")
  const [seoDescription, setSeoDescription] = useState(settings?.defaultSEO?.description ?? "")

  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setSaved(false)
    setError("")

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteName,
          footerText,
          email,
          phone,
          address,
          socialLinks: { facebook, twitter, linkedin, instagram },
          seoTitle,
          seoDescription,
        }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setError(data.error || "Could not save. Please try again.")
        window.scrollTo({ top: 0, behavior: "smooth" })
      } else {
        setSaved(true)
        router.refresh()
      }
    } catch {
      setError("Network error. Check your connection and try again.")
    }

    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {error && (
        <div
          role="alert"
          className="p-4 rounded-2xl bg-destructive/10 border border-destructive/30 text-sm text-destructive"
        >
          {error}
        </div>
      )}

      {saved && (
        <div
          role="status"
          className="flex items-start gap-3 p-4 rounded-2xl bg-primary/10 border border-primary/20 text-sm text-foreground"
        >
          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold">Settings saved</div>
            <div className="text-muted-foreground">
              {storageMode === "github"
                ? "Committed to GitHub. Your live site updates once the redeploy finishes, usually within a minute or two."
                : "Saved to your local /content folder. Refresh your site to see it."}
            </div>
          </div>
        </div>
      )}

      <Section title="General">
        <Field label="Site name" htmlFor="siteName">
          <Input
            id="siteName"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            maxLength={80}
            required
          />
        </Field>
        <Field
          label="Footer text"
          htmlFor="footerText"
          hint="A short blurb about your company, shown in the footer."
        >
          <Textarea
            id="footerText"
            value={footerText}
            onChange={(e) => setFooterText(e.target.value)}
            className="min-h-[100px]"
            maxLength={500}
          />
        </Field>
      </Section>

      <Section title="Contact details" description="Leave a field empty to hide it from the site.">
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Email" htmlFor="email">
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hello@yourcompany.com"
            />
          </Field>
          <Field label="Phone" htmlFor="phone">
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+234 800 000 0000"
            />
          </Field>
        </div>
        <Field label="Address" htmlFor="address">
          <Input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Street, city, country"
          />
        </Field>
      </Section>

      <Section
        title="Social links"
        description="Full links starting with https://. Empty ones won't be shown."
      >
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Facebook" htmlFor="facebook">
            <Input
              id="facebook"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              placeholder="https://facebook.com/yourpage"
            />
          </Field>
          <Field label="Twitter / X" htmlFor="twitter">
            <Input
              id="twitter"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              placeholder="https://x.com/yourhandle"
            />
          </Field>
          <Field label="LinkedIn" htmlFor="linkedin">
            <Input
              id="linkedin"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="https://linkedin.com/company/yourcompany"
            />
          </Field>
          <Field label="Instagram" htmlFor="instagram">
            <Input
              id="instagram"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="https://instagram.com/yourhandle"
            />
          </Field>
        </div>
      </Section>

      <Section title="Default search engine info" description="Used when a page doesn't set its own.">
        <Field label="Title" htmlFor="seoTitle">
          <Input id="seoTitle" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} />
        </Field>
        <Field label="Description" htmlFor="seoDescription">
          <Textarea
            id="seoDescription"
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
            className="min-h-[80px]"
          />
        </Field>
      </Section>

      <div className="flex justify-end">
        <Button type="submit" disabled={saving} className="min-w-[140px]">
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving…
            </>
          ) : (
            "Save settings"
          )}
        </Button>
      </div>
    </form>
  )
}