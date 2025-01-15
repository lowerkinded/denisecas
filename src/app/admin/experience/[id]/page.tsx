"use server";

import { AdminExperienceDeleteButton } from "@/components/AdminExperienceDeleteButton";
import AdminExperienceEditForm from "@/components/AdminExperienceEditForm";
import { getExperience } from "@/lib/experience";
import {
  Anchor,
  Breadcrumbs,
  Button,
  Container,
  Group,
  Stack,
  Title,
} from "@mantine/core";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const experience = await getExperience(id);

  if (!experience) {
    notFound();
  }

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
          <Anchor component={Link} href={`/admin/experience/${experience.id}`}>
            {experience.title}
          </Anchor>
        </Breadcrumbs>
        <Group>
          <Title flex="1">Manage experience</Title>
          <AdminExperienceDeleteButton id={id} />
        </Group>
        <AdminExperienceEditForm experience={experience} />
      </Stack>
    </Container>
  );
}
