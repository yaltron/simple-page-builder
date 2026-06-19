import { createFileRoute } from "@tanstack/react-router"
import { AdminShell, AdminLoading } from "@/components/admin/admin-shell"
import { AboutCtaBannerEditor } from "@/components/admin/cms-editors"
import { useAdminAuth } from "@/lib/use-admin-auth"

export const Route = createFileRoute("/admin/about/cta-banner")({
  component: Page,
})

function Page() {
  const { loading, isAdmin } = useAdminAuth()
  if (loading || !isAdmin) return <AdminLoading />
  return (
    <AdminShell title="CTA Banner" breadcrumb="Admin / About Us / CTA Banner">
      <AboutCtaBannerEditor />
    </AdminShell>
  )
}
