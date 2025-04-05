
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_login_token");

  if (!token) {
    redirect("/login");
  }

  const row = await prisma.adminLoginToken.findFirst({ where: { token: token.value } });

  if (!row) {
    redirect("/login");
  }

  return children;
}
