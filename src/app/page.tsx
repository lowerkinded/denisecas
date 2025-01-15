"use server";

import { Container, Divider, SimpleGrid, Space, Text } from "@mantine/core";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import Header from "@/components/Header";
import ExperienceCard from "@/components/ExperienceCard";
import ExperienceSlide from "@/components/ExperienceSlide";
import { neon } from "@neondatabase/serverless";

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

type Experiences = {
  front_page: Experience[];
  carousel: Experience[];
};

async function getExperiences(): Promise<Experiences> {
  const sql = neon(`${process.env.DATABASE_URL}`);

  return {
    front_page:
      await sql`SELECT * FROM experience WHERE front_page_position IS NOT NULL ORDER BY front_page_position ASC`,
    carousel:
      await sql`SELECT * FROM experience WHERE carousel_position IS NOT NULL ORDER BY carousel_position ASC`,
  } as Experiences;
}

export default async function Page() {
  const experiences = await getExperiences();

  return (
    <>
      <Header />
      <Carousel withIndicators loop slideSize={800} mt="xl" slideGap="md">
        {experiences.carousel.map((it) => (
          <CarouselSlide key={it.id}>
            <ExperienceSlide
              id={it.id}
              type={it.type}
              title={it.title}
              coverUrl={it.cover_url!}
            />
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
          {experiences.front_page.map((it) => (
            <ExperienceCard
              key={it.id}
              id={it.id}
              author={{
                name: it.author_name,
                pictureUrl: it.author_picture_url,
              }}
              type={it.type}
              from={it.from_date}
              to={it.to_date}
              summary={it.summary}
              coverUrl={it.cover_url}
            />
          ))}
        </SimpleGrid>
      </Container>
      <footer>
        <Space h="xl" />
      </footer>
    </>
  );
}
