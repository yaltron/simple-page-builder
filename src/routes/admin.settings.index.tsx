import { useEffect, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { toast } from "sonner"
import { AdminShell, AdminLoading } from "@/components/admin/admin-shell"
import { useAdminAuth } from "@/lib/use-admin-auth"
import { supabase } from "@/integrations/supabase/client"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export const Route = createFileRoute("/admin/settings/")({
  component: AdminSettingsPage,
})

const KEYS = ["announcement_bar", "analytics", "cookie_consent", "patient_portal"] as const
type Key = typeof KEYS[number]

const DEFAULTS: Record<Key, any> = {
  announcement_bar: { is_active: false, message: "", link_text: "", link_url: "", background_color: "#E6007E", text_color: "#FFFFFF" },
  analytics: { ga4_id: "", tawk_property_id: "", tawk_widget_id: "" },
  cookie_consent: { is_active: false, message: "", policy_url: "" },
  patient_portal: { is_active: false, title: "", description: "", cta_text: "Notify Me" },
}

function AdminSettingsPage() {
  const { loading, isAdmin } = useAdminAuth()
  const [data, setData] = useState<Record<Key, any>>(() => ({ ...DEFAULTS }))
  const [saving, setSaving] = useState<Key | null>(null)

  useEffect(() => {
    if (!isAdmin) return
    ;(async () => {
      try {
        const { data: rows } = await supabase.from("site_settings").select("key,value").in("key", KEYS as any)
        const merged: any = { ...DEFAULTS }
        for (const r of rows || []) {
          const v = r?.value
          if (v && typeof v === "object" && !Array.isArray(v)) {
            merged[r.key] = { ...DEFAULTS[r.key as Key], ...(v as any) }
          }
        }
        setData(merged)
      } catch (e: any) {
        toast.error(e?.message || "Failed to load settings")
      }
    })()
  }, [isAdmin])

  if (loading || !isAdmin) return <AdminLoading />

  const update = (key: Key, patch: any) => setData((p) => ({ ...p, [key]: { ...(p[key] || DEFAULTS[key]), ...patch } }))

  const save = async (key: Key) => {
    setSaving(key)
    const value = { ...DEFAULTS[key], ...(data[key] || {}) }
    const { error } = await supabase.from("site_settings").upsert({ key, value }, { onConflict: "key" })
    setSaving(null)
    if (error) toast.error(error.message); else toast.success("Saved")
  }

  const ann = data.announcement_bar || {}
  const an = data.analytics || {}
  const cc = data.cookie_consent || {}
  const pp = data.patient_portal || {}

  return (
    <AdminShell title="Site Settings" breadcrumb="Admin / Settings">
      <Tabs defaultValue="announcement">
        <TabsList>
          <TabsTrigger value="announcement">Announcement</TabsTrigger>
          <TabsTrigger value="analytics">Analytics & Chat</TabsTrigger>
          <TabsTrigger value="cookies">Cookie Consent</TabsTrigger>
          <TabsTrigger value="portal">Patient Portal</TabsTrigger>
        </TabsList>

        <TabsContent value="announcement" className="bg-white border rounded-xl p-6 space-y-4 mt-4 max-w-2xl">
          <div className="flex items-center justify-between">
            <Label>Active</Label>
            <Switch checked={!!ann.is_active} onCheckedChange={(v) => update("announcement_bar", { is_active: v })} />
          </div>
          <div><Label>Message</Label><Input value={ann.message || ""} onChange={(e) => update("announcement_bar", { message: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Link text</Label><Input value={ann.link_text || ""} onChange={(e) => update("announcement_bar", { link_text: e.target.value })} /></div>
            <div><Label>Link URL</Label><Input value={ann.link_url || ""} onChange={(e) => update("announcement_bar", { link_url: e.target.value })} /></div>
            <div><Label>Background color</Label><Input type="color" value={ann.background_color || "#E6007E"} onChange={(e) => update("announcement_bar", { background_color: e.target.value })} /></div>
            <div><Label>Text color</Label><Input type="color" value={ann.text_color || "#FFFFFF"} onChange={(e) => update("announcement_bar", { text_color: e.target.value })} /></div>
          </div>
          <Button disabled={saving === "announcement_bar"} onClick={() => save("announcement_bar")}>Save</Button>
        </TabsContent>

        <TabsContent value="analytics" className="bg-white border rounded-xl p-6 space-y-4 mt-4 max-w-2xl">
          <div><Label>Google Analytics 4 Measurement ID</Label><Input placeholder="G-XXXXXXXXXX" value={an.ga4_id || ""} onChange={(e) => update("analytics", { ga4_id: e.target.value })} /></div>
          <div><Label>Tawk.to Property ID</Label><Input value={an.tawk_property_id || ""} onChange={(e) => update("analytics", { tawk_property_id: e.target.value })} /></div>
          <div><Label>Tawk.to Widget ID</Label><Input value={an.tawk_widget_id || ""} onChange={(e) => update("analytics", { tawk_widget_id: e.target.value })} /></div>
          <p className="text-xs text-muted-foreground">Leave blank to disable. Reload the public site after saving.</p>
          <Button disabled={saving === "analytics"} onClick={() => save("analytics")}>Save</Button>
        </TabsContent>

        <TabsContent value="cookies" className="bg-white border rounded-xl p-6 space-y-4 mt-4 max-w-2xl">
          <div className="flex items-center justify-between">
            <Label>Show banner</Label>
            <Switch checked={!!cc.is_active} onCheckedChange={(v) => update("cookie_consent", { is_active: v })} />
          </div>
          <div><Label>Message</Label><Textarea rows={3} value={cc.message || ""} onChange={(e) => update("cookie_consent", { message: e.target.value })} /></div>
          <div><Label>Policy URL</Label><Input value={cc.policy_url || ""} onChange={(e) => update("cookie_consent", { policy_url: e.target.value })} /></div>
          <Button disabled={saving === "cookie_consent"} onClick={() => save("cookie_consent")}>Save</Button>
        </TabsContent>

        <TabsContent value="portal" className="bg-white border rounded-xl p-6 space-y-4 mt-4 max-w-2xl">
          <div className="flex items-center justify-between">
            <Label>Show on homepage</Label>
            <Switch checked={!!pp.is_active} onCheckedChange={(v) => update("patient_portal", { is_active: v })} />
          </div>
          <div><Label>Title</Label><Input value={pp.title || ""} onChange={(e) => update("patient_portal", { title: e.target.value })} /></div>
          <div><Label>Description</Label><Textarea rows={3} value={pp.description || ""} onChange={(e) => update("patient_portal", { description: e.target.value })} /></div>
          <div><Label>CTA text</Label><Input value={pp.cta_text || ""} onChange={(e) => update("patient_portal", { cta_text: e.target.value })} /></div>
          <Button disabled={saving === "patient_portal"} onClick={() => save("patient_portal")}>Save</Button>
        </TabsContent>
      </Tabs>
    </AdminShell>
  )
}
