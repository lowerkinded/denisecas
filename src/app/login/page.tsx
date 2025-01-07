"use server";

import { Container, Stack, Text } from "@mantine/core";
import { neon } from "@neondatabase/serverless";
import { AdminLoginButton } from "@/components/AdminLoginButton";

async function getNeonVersion(): Promise<string> {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const response = await sql`SELECT version()`;
  return response[0].version;
}

export default async function Page() {
  const neonVersion = await getNeonVersion();

  return (
    <Container size={800} mt="xl">
      <Stack align="center">
        <Text>Neon version: {neonVersion}</Text>
        <AdminLoginButton />
      </Stack>
    </Container>
  );
}
