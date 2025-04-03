import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const token = (await params).token;
  const cookieStore = await cookies();

  cookieStore.set("admin_login_token", token, { path: "/" });
  redirect("/admin");
}
