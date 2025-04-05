export const dynamic = "force-dynamic";

import { Container, Divider, SimpleGrid, Space, Text } from "@mantine/core";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import Header from "@/components/Header";
import ExperienceCard from "@/components/ExperienceCard";
import ExperienceSlide from "@/components/ExperienceSlide";
import { prisma } from "@/lib/prisma";

export default async function Page() {
  const frontPage = await prisma.experience.findMany({
    where: { front_page: { isNot: null } },
  });
  const carousel = await prisma.experience.findMany({
    where: { carousel: { isNot: null } },
  });

  return (
    <>
      <Header />
      <Carousel
        withIndicators
        slideSize={800}
        mt="xl"
        slideGap="md"
        initialSlide={Math.round((carousel.length - 1) / 2)}
      >
        {carousel.map((it) => (
          <CarouselSlide key={it.id}>
            <ExperienceSlide experience={it} format="big" />
          </CarouselSlide>
        ))}
      </Carousel>
      <Container size={700} mt="xl">
        <Divider
          label={
            <Text fw="bold" tt="uppercase">
              More from us
            </Text>
          }
          labelPosition="left"
        />
        <SimpleGrid cols={2} mt="md">
          {frontPage.map((it) => (
            <ExperienceCard key={it.id} experience={it} />
          ))}
        </SimpleGrid>
      </Container>
      <footer>
        <Space h="xl" />
      </footer>
    </>
  );
}
