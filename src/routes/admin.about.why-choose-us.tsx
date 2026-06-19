import { createFileRoute } from "@tanstack/react-router"
import { AdminShell, AdminLoading } from "@/components/admin/admin-shell"
import { WhyChooseUsEditor } from "@/components/admin/cms-editors"
import { useAdminAuth } from "@/lib/use-admin-auth"

export const Route = createFileRoute("/admin/about/why-choose-us")({
  component: Page,
})

function Page() {
  const { loading, isAdmin } = useAdminAuth()
  if (loading || !isAdmin) return <AdminLoading />
  return (
    <AdminShell title="Why Choose Us" breadcrumb="Admin / About Us / Why Choose Us">
      <WhyChooseUsEditor />
    </AdminShell>
  )
}
