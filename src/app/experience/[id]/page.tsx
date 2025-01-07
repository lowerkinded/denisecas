"use server";

import { Container, Divider, Text, Image } from "@mantine/core";
import Header from "@/components/Header";
import { neon } from "@neondatabase/serverless";
import { notFound } from "next/navigation";

type Experience = {
  id: number;
  author_email: string;
  author_name: string;
  author_picture_url: string;
  type: "creativity" | "activity" | "service";
  from_date: Date;
  to_date: Date;
  summary: string;
  cover_url?: string;
  title: string;
  md_description: string;
  front_page_position?: number;
  carousel_position?: number;
};

async function getExperience(id: string): Promise<Experience | undefined> {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const response = await sql`SELECT * FROM experience WHERE id = ${id}`;

  return response[0] as Experience | undefined;
}

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
