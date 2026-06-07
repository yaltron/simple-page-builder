import { createFileRoute } from "@tanstack/react-router"
import { AdminShell, AdminLoading } from "@/components/admin/admin-shell"
import { MomentsGalleryEditor } from "@/components/admin/moments-gallery-editor"
import { useAdminAuth } from "@/lib/use-admin-auth"

export const Route = createFileRoute("/admin/homepage/moments-gallery")({
  component: Page,
})

function Page() {
  const { loading, isAdmin } = useAdminAuth()
  if (loading || !isAdmin) return <AdminLoading />
  return (
    <AdminShell title="Moments Gallery" breadcrumb="Admin / Homepage / Moments Gallery">
      <MomentsGalleryEditor />
    </AdminShell>
  )
}
