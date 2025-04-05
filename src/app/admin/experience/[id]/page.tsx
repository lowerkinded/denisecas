export const dynamic = "force-dynamic";

import ActionButton from "@/components/ActionButton";
import AdminExperienceForm, {
  ValuesOut,
} from "@/components/AdminExperienceForm";
import { prisma } from "@/lib/prisma";
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
import { ExperienceType } from "@prisma/client";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = parseInt((await params).id);

  if (isNaN(id)) {
    notFound();
  }

  const experience = await prisma.experience.findFirst({
    where: { id },
    include: { front_page: true, carousel: true },
  });

  if (!experience) {
    notFound();
  }

  async function edit(
    values: ValuesOut,
    authorPictureUrl: string | null,
    coverUrl: string | null,
    mainImageUrls: string[]
  ) {
    "use server";

    await prisma.experience.update({
      where: { id },
      data: {
        author_name: values.author.name,
        author_email: values.author.email,
        author_picture_url: authorPictureUrl,
        type:
          values.type === "creativity"
            ? ExperienceType.CREATIVITY
            : values.type === "activity"
            ? ExperienceType.ACTIVITY
            : ExperienceType.SERVICE,
        from_date: values.range.from,
        to_date: values.range.to,
        summary: values.summary,
        cover_url: coverUrl,
        main_image_urls: mainImageUrls,
        title: values.title,
        md_description: values.mdDescription,
      },
    });
  }

  async function delete_() {
    "use server";

    await prisma.experience.delete({ where: { id } });

    redirect("/admin/experience");
  }

  async function addToFrontPage() {
    "use server";

    const positions = (await prisma.frontPageExperience.findMany()).map(
      (it) => it.position
    );
    const nextPosition =
      positions.length === 0 ? 0 : Math.max(...positions) + 1;

    await prisma.frontPageExperience.create({
      data: { id, position: nextPosition },
    });

    redirect("/admin/homepage");
  }

  async function addToCarousel() {
    "use server";

    const positions = (await prisma.carouselExperience.findMany()).map(
      (it) => it.position
    );
    const nextPosition =
      positions.length === 0 ? 0 : Math.max(...positions) + 1;

    await prisma.carouselExperience.create({
      data: { id, position: nextPosition },
    });

    redirect("/admin/homepage");
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
          <ActionButton color="red" action={delete_}>
            Delete experience
          </ActionButton>
        </Group>
        <Divider
          label={
            <Text fw="bold" tt="uppercase">
              Placement
            </Text>
          }
          labelPosition="left"
        />
        <Group>
          {experience.front_page === null ? (
            <ActionButton action={addToFrontPage}>
              Add to front page
            </ActionButton>
          ) : (
            <Text>Front page position: {experience.front_page.position}</Text>
          )}
          {experience.carousel === null ? (
            <ActionButton action={addToCarousel}>Add to carousel</ActionButton>
          ) : (
            <Text>Carousel position: {experience.carousel.position}</Text>
          )}
        </Group>
        <AdminExperienceForm
          initialValues={{
            type:
              experience.type === ExperienceType.CREATIVITY
                ? "creativity"
                : experience.type === ExperienceType.ACTIVITY
                ? "activity"
                : "service",
            title: experience.title,
            summary: experience.summary,
            mdDescription: experience.md_description,
            author: {
              name: experience.author_name,
              email: experience.author_email,
            },
            range: {
              from: experience.from_date,
              to: experience.to_date,
            },
          }}
          initialAuthorPictureUrl={experience.author_picture_url}
          initialCoverUrl={experience.cover_url}
          initialMainImageUrls={experience.main_image_urls}
          submitAction={edit}
          submitText="Save information"
        />
      </Stack>
    </Container>
  );
}
