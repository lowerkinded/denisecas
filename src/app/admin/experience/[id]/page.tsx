export const dynamic = "force-dynamic";

import { AdminExperienceCarouselButton } from "@/components/AdminExperienceCarouselButton";
import { AdminExperienceDeleteButton } from "@/components/AdminExperienceDeleteButton";
import AdminExperienceEditForm from "@/components/AdminExperienceEditForm";
import { AdminExperienceGridButton } from "@/components/AdminExperienceGridButton";
import { getExperience, getExperiences } from "@/lib/experience";
import {
  Anchor,
  Breadcrumbs,
  Container,
  Divider,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = (await params).id;
  const experiences = await getExperiences();
  const experience = await getExperience(id);

  const carouselPositions = experiences
    .map((it) => it.carousel_position)
    .filter((it) => it !== null);
  const frontPagePositions = experiences
    .map((it) => it.front_page_position)
    .filter((it) => it !== null);
  const nextCarouselPosition =
    carouselPositions.length === 0 ? 0 : Math.max(...carouselPositions) + 1;
  const nextFrontPagePosition =
    frontPagePositions.length === 0 ? 0 : Math.max(...frontPagePositions) + 1;

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
        <Divider
          label={
            <Text fw="bold" tt="uppercase">
              Homepage
            </Text>
          }
          labelPosition="left"
        />
        <Group>
          {experience.carousel_position ? (
            <Text>Carousel position: {experience.carousel_position}</Text>
          ) : (
            <AdminExperienceCarouselButton
              id={id}
              position={nextCarouselPosition}
            />
          )}
          {experience.front_page_position ? (
            <Text>Grid position: {experience.front_page_position}</Text>
          ) : (
            <AdminExperienceGridButton
              id={id}
              position={nextFrontPagePosition}
            />
          )}
        </Group>
        <Divider
          label={
            <Text fw="bold" tt="uppercase">
              Edit information
            </Text>
          }
          labelPosition="left"
        />
        <AdminExperienceEditForm experience={experience} />
      </Stack>
    </Container>
  );
}
