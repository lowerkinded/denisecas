export const dynamic = "force-dynamic";

import { Container, Divider, Space, Title } from "@mantine/core";
import Header from "@/components/Header";
import { notFound } from "next/navigation";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import ImageSlide from "@/components/ImageSlide";
import { prisma } from "@/lib/prisma";
import StrandBadge from "@/components/TypeBadge";
import { remark } from "remark";
import html from "remark-html";

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

  const rendered = await remark().use(html).process(experience.md_description);

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
        <Title mt="lg" mb="xs">
          {experience.title}
        </Title>
        <StrandBadge
          strand={experience.type}
          style="adapt"
          wording="a-x-experience"
          size="lg"
        />
        <Space h="md" />
        <div dangerouslySetInnerHTML={{ __html: rendered.toString() }} />
      </Container>
    </>
  );
}
