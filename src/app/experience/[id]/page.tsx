export const dynamic = "force-dynamic";

import { Container, Divider, Text, Image } from "@mantine/core";
import Header from "@/components/Header";
import { notFound } from "next/navigation";
import { getExperience } from "@/lib/experience";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import ExperienceSlide from "@/components/ExperienceSlide";
import MainImageSlide from "@/components/MainImageSlide";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = (await params).id;
  const experience = await getExperience(id);

  if (!experience) {
    notFound();
  }

  return (
    <>
      <Header />
      {experience.main_image_urls.length !== 0 && (
        <Carousel withIndicators loop slideSize={800} mt="xl" slideGap="md">
          {experience.main_image_urls.map((it) => (
            <CarouselSlide key={it}>
              <MainImageSlide url={it} />
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
