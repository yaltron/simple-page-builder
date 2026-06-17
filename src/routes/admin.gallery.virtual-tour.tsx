import { createFileRoute } from "@tanstack/react-router"
import { AdminShell, AdminLoading } from "@/components/admin/admin-shell"
import { VirtualTourEditor } from "@/components/admin/cms-editors"
import { useAdminAuth } from "@/lib/use-admin-auth"

export const Route = createFileRoute("/admin/gallery/virtual-tour")({
  component: Page,
})

function Page() {
  const { loading, isAdmin } = useAdminAuth()
  if (loading || !isAdmin) return <AdminLoading />
  return (
    <AdminShell title="Virtual Tour" breadcrumb="Admin / Gallery / Virtual Tour">
      <VirtualTourEditor />
    </AdminShell>
  )
}
