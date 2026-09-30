import { getGlobalSettings } from "@/lib/content"
import { getStorageMode } from "@/lib/content-store"
import { SettingsForm } from "./settings-form"

export const dynamic = "force-dynamic"

export default async function AdminSettingsPage() {
  const settings = await getGlobalSettings()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Site settings</h1>
        <p className="text-muted-foreground mt-1">
          Shown in your website's footer, navigation and contact details.
        </p>
      </div>
      <SettingsForm settings={settings} storageMode={getStorageMode()} />
    </div>
  )
}