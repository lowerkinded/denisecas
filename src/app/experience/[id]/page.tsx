"use server";

import { Container, Divider, Text, Image } from "@mantine/core";
import Header from "@/components/Header";
import { notFound } from "next/navigation";
import { getExperience } from "@/lib/experience";

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
    <>
      <Header />
      <Container size={800}>
        {experience.cover_url && (
          <Image src={experience.cover_url} radius="md" mt="lg" />
        )}
        {!experience.cover_url && <Divider mt="xl" />}
        <Text size="2rem" fw="bold" mt="lg">
          {experience.title}
        </Text>
        <Text mt="lg">{experience.md_description}</Text>
      </Container>
    </>
  );
}
