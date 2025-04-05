export const dynamic = "force-dynamic";

import AdminCarouselEditor from "@/components/AdminCarouselEditor";
import AdminFrontPageEditor from "@/components/AdminFrontPageEditor";
import { prisma } from "@/lib/prisma";
import {
  Anchor,
  Breadcrumbs,
  Container,
  Divider,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Experience } from "@prisma/client";
import Link from "next/link";

async function updateFrontPage(experiences: Experience[]) {
  "use server";

  for (const [experience, position] of experiences.map(
    (it, i): [Experience, number] => [it, i]
  )) {
    await prisma.frontPageExperience.update({
      where: { id: experience.id },
      data: { position },
    });
  }
}

async function removeFrontPage(id: number) {
  "use server";

  await prisma.frontPageExperience.delete({ where: { id } });
}

async function updateCarousel(experiences: Experience[]) {
  "use server";

  for (const [experience, position] of experiences.map(
    (it, i): [Experience, number] => [it, i]
  )) {
    await prisma.carouselExperience.update({
      where: { id: experience.id },
      data: { position },
    });
  }
}

async function removeCarousel(id: number) {
  "use server";

  await prisma.carouselExperience.delete({ where: { id } });
}

export default async function Page() {
  const frontPage = (
    await prisma.experience.findMany({
      where: { front_page: { isNot: null } },
      include: { front_page: true },
    })
  ).toSorted((a, b) => a.front_page!.position - b.front_page!.position);
  const carousel = (
    await prisma.experience.findMany({
      where: { carousel: { isNot: null } },
      include: { carousel: true },
    })
  ).toSorted((a, b) => a.carousel!.position - b.carousel!.position);

  return (
    <Container size={800} mt="xl">
      <Stack>
        <Breadcrumbs>
          <Anchor component={Link} href="/admin">
            Admin
          </Anchor>
          <Anchor component={Link} href="/admin/homepage">
            Homepage editor
          </Anchor>
        </Breadcrumbs>
        <Title flex="1">Adjust the homepage</Title>
        <Divider
          label={
            <Text fw="bold" tt="uppercase">
              Edit the carousel (drag and drop)
            </Text>
          }
          labelPosition="left"
        />
        <AdminCarouselEditor
          initial={carousel}
          updateAction={updateCarousel}
          removeAction={removeCarousel}
        />
        <Divider
          label={
            <Text fw="bold" tt="uppercase">
              Edit the front page (drag and drop)
            </Text>
          }
          labelPosition="left"
        />
        <AdminFrontPageEditor
          initial={frontPage}
          updateAction={updateFrontPage}
          removeAction={removeFrontPage}
        />
      </Stack>
    </Container>
  );
}
