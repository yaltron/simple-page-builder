import { createFileRoute } from "@tanstack/react-router"
import { AdminShell, AdminLoading } from "@/components/admin/admin-shell"
import { DoctorsHeadingEditor } from "@/components/admin/cms-editors"
import { useAdminAuth } from "@/lib/use-admin-auth"

export const Route = createFileRoute("/admin/homepage/doctors-heading")({
  component: Page,
})

function Page() {
  const { loading, isAdmin } = useAdminAuth()
  if (loading || !isAdmin) return <AdminLoading />
  return (
    <AdminShell title="Our Doctors Section" breadcrumb="Admin / Homepage / Our Doctors">
      <DoctorsHeadingEditor />
    </AdminShell>
  )
}
