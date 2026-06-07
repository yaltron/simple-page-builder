import { createFileRoute } from "@tanstack/react-router"
import { AdminShell, AdminLoading } from "@/components/admin/admin-shell"
import { CareerApplications } from "@/components/admin/cms-editors"
import { useAdminAuth } from "@/lib/use-admin-auth"

export const Route = createFileRoute("/admin/career/applications")({
  component: Page,
})

function Page() {
  const { loading, isAdmin } = useAdminAuth()
  if (loading || !isAdmin) return <AdminLoading />
  return (
    <AdminShell title="Applications" breadcrumb="Admin / Career / Applications">
      <CareerApplications />
    </AdminShell>
  )
}
