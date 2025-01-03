import { Container } from "@mantine/core";
import { neon } from "@neondatabase/serverless";

async function getNeonVersion() {
  "use server";
  const sql = neon(`${process.env.DATABASE_URL}`);
  const response = await sql`SELECT version()`;
  return response[0].version;
}

export default async function Page() {
  const neonVersion = await getNeonVersion();
  return <Container size={800}>Neon version: {neonVersion}</Container>;
}
