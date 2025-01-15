"use server";

import AdminExperienceCreateForm from "@/components/AdminExperienceCreateForm";
import { Anchor, Breadcrumbs, Container, Stack, Title } from "@mantine/core";
import Link from "next/link";

export default async function Page() {
  return (
    <Container size={800} mt="xl">
      <Stack align="left">
        <Breadcrumbs>
          <Anchor component={Link} href="/admin">
            Admin
          </Anchor>
          <Anchor component={Link} href="/admin/experience">
            Experiences
          </Anchor>
          <Anchor component={Link} href="/admin/experience/new">
            Add new
          </Anchor>
        </Breadcrumbs>
        <Title>New experience</Title>
        <AdminExperienceCreateForm />
      </Stack>
    </Container>
  );
}
