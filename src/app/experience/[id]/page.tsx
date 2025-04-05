export const dynamic = "force-dynamic";

import { Container, Divider, Text, Image } from "@mantine/core";
import Header from "@/components/Header";
import { notFound } from "next/navigation";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import ImageSlide from "@/components/ImageSlide";
import { prisma } from "@/lib/prisma";

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

  return (
    <>
      <Header />
      {experience.main_image_urls.length !== 0 && (
        <Carousel
          withIndicators
          slideSize={800}
          mt="xl"
          slideGap="md"
          initialSlide={Math.round((experience.main_image_urls.length - 1) / 2)}
        >
          {experience.main_image_urls.map((it) => (
            <CarouselSlide key={it}>
              <ImageSlide alt="Experience image" src={it} />
            </CarouselSlide>
          ))}
        </Carousel>
      )}
      <Container size={800}>
        {!experience.cover_url && <Divider mt="xl" />}
        <Text size="2rem" fw="bold" mt="lg">
          {experience.title}
        </Text>
        <Text mt="lg">{experience.md_description}</Text>
      </Container>
    </>
  );
}
