import { AdminShell } from "@/components/admin/AdminShell";
import { getSession } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // Login page renders without shell
  if (!session) {
    return children;
  }

  return <AdminShell username={session.username}>{children}</AdminShell>;
}
