import { checkToken } from "@/lib/auth";
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

  if (!(await checkToken(token.value))) {
    redirect("/login");
  }

  return children;
}
