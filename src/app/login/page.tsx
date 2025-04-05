export const dynamic = "force-dynamic";

import { Container, Stack, Text } from "@mantine/core";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import ActionButton from "@/components/ActionButton";
import { neon } from "@neondatabase/serverless";

async function getNeonVersion(): Promise<string> {
  "use server";

  const sql = neon(`${process.env.DATABASE_URL}`);
  const response = await sql`SELECT version()`;
  return response[0].version;
}

async function sendLoginLink() {
  "use server";

  const row = await prisma.adminLoginToken.create();

  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: "auth@denisecas.eu",
    to: "cas@denise.espritscholen.nl",
    subject: "Your login link",
    text: `Here is your login link for the DENISE CAS admin panel:

https://denisecas.eu/login/${row.token}`,
  });
}

export default async function Page() {
  const neonVersion = await getNeonVersion();

  return (
    <Container size={800} mt="xl">
      <Stack align="center">
        <Text>Neon version: {neonVersion}</Text>
        <ActionButton action={sendLoginLink}>Send login link</ActionButton>
      </Stack>
    </Container>
  );
}
