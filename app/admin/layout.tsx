"use server";

import { neon } from "@neondatabase/serverless";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function checkToken(token: string): Promise<boolean> {
  const sql = neon(`${process.env.DATABASE_URL}`);

  const response =
    await sql`SELECT * FROM admin_login_token WHERE token = ${token}`;

  return response.length === 1;
}

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
