import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const token = (await params).token;

  try {
    const row = await prisma.adminLoginToken.findFirst({ where: { token } });
    if (!row) {
      notFound();
    }
  } catch (e) {
    console.error(e);
    notFound();
  }

  const cookieStore = await cookies();
  cookieStore.set("admin_login_token", token, { path: "/" });
  redirect("/admin");
}
