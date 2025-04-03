export const dynamic = "force-dynamic";

import { Container, Stack, Text } from "@mantine/core";
import { AdminLoginButton } from "@/components/AdminLoginButton";
import { getNeonVersion } from "@/lib/neon";

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
