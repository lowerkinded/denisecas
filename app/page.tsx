import {
  Container,
  Divider,
  Group,
  SimpleGrid,
  Space,
  Text,
} from "@mantine/core";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import Header from "../components/Header";
import ExperienceCard from "../components/ExperienceCard";
import ExperienceSlide from "../components/ExperienceSlide";

export default function Page() {
  return (
    <>
      <Header />
      <Carousel withIndicators loop slideSize={800} mt="xl" slideGap="md">
        <CarouselSlide>
          <ExperienceSlide
            id={123}
            type="service"
            title="Walking my friend's dog!"
            coverUrl="https://www.wallpaperhub.app/_next/image?url=https%3A%2F%2Fcdn.wallpaperhub.app%2Fcloudcache%2Fe%2F6%2F7%2F3%2F1%2F4%2Fe6731493cd50103e3561288c33a6a589c9bf67ab.jpg&w=384&q=75"
          />
        </CarouselSlide>
        <CarouselSlide>
          <ExperienceSlide
            id={123}
            type="service"
            title="Walking my friend's dog!"
            coverUrl="https://www.wallpaperhub.app/_next/image?url=https%3A%2F%2Fcdn.wallpaperhub.app%2Fcloudcache%2Fe%2F6%2F7%2F3%2F1%2F4%2Fe6731493cd50103e3561288c33a6a589c9bf67ab.jpg&w=384&q=75"
          />
        </CarouselSlide>
        <CarouselSlide>
          <ExperienceSlide
            id={123}
            type="service"
            title="Walking my friend's dog!"
            coverUrl="https://www.wallpaperhub.app/_next/image?url=https%3A%2F%2Fcdn.wallpaperhub.app%2Fcloudcache%2Fe%2F6%2F7%2F3%2F1%2F4%2Fe6731493cd50103e3561288c33a6a589c9bf67ab.jpg&w=384&q=75"
          />
        </CarouselSlide>
        <CarouselSlide>
          <ExperienceSlide
            id={123}
            type="service"
            title="Walking my friend's dog!"
            coverUrl="https://www.wallpaperhub.app/_next/image?url=https%3A%2F%2Fcdn.wallpaperhub.app%2Fcloudcache%2Fe%2F6%2F7%2F3%2F1%2F4%2Fe6731493cd50103e3561288c33a6a589c9bf67ab.jpg&w=384&q=75"
          />
        </CarouselSlide>
      </Carousel>
      <Container size={700} mt="xl">
        <Group gap="sm">
          <Text size="1rem" fw="bold" tt="uppercase" c="gray.6">
            More from us
          </Text>
          <Divider flex="1" />
        </Group>
        <SimpleGrid cols={2} spacing="md" mt="md">
          <ExperienceCard
            id={123}
            author={{
              name: "Stephanie Kane jr.",
              pictureUrl:
                "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png",
            }}
            type="activity"
            from={new Date()}
            to={new Date()}
            summary="My friend was on vacation and his dog needs a walk everyday, so I helped her!"
            coverUrl="https://www.wallpaperhub.app/_next/image?url=https%3A%2F%2Fcdn.wallpaperhub.app%2Fcloudcache%2Fe%2F6%2F7%2F3%2F1%2F4%2Fe6731493cd50103e3561288c33a6a589c9bf67ab.jpg&w=384&q=75"
          />
          <ExperienceCard
            id={123}
            author={{
              name: "Stephanie Kane jr.",
              pictureUrl:
                "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png",
            }}
            type="service"
            from={new Date()}
            to={new Date()}
            summary="My friend was on vacation and his dog needs a walk everyday, so I helped her!"
            coverUrl="https://www.wallpaperhub.app/_next/image?url=https%3A%2F%2Fcdn.wallpaperhub.app%2Fcloudcache%2Fe%2F6%2F7%2F3%2F1%2F4%2Fe6731493cd50103e3561288c33a6a589c9bf67ab.jpg&w=384&q=75"
          />
          <ExperienceCard
            id={123}
            author={{
              name: "Stephanie Kane jr.",
            }}
            type="creativity"
            from={new Date()}
            to={new Date()}
            summary="My friend was on vacation and his dog needs a walk everyday, so I helped her!"
            coverUrl="https://www.wallpaperhub.app/_next/image?url=https%3A%2F%2Fcdn.wallpaperhub.app%2Fcloudcache%2Fe%2F6%2F7%2F3%2F1%2F4%2Fe6731493cd50103e3561288c33a6a589c9bf67ab.jpg&w=384&q=75"
          />
          <ExperienceCard
            id={123}
            author={{
              name: "Stephanie Kane jr.",
              pictureUrl:
                "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png",
            }}
            type="activity"
            from={new Date()}
            to={new Date()}
            summary="My friend was on vacation and his dog needs a walk everyday, so I helped her!"
          />
          <ExperienceCard
            id={123}
            author={{
              name: "Stephanie Kane jr.",
              pictureUrl:
                "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png",
            }}
            type="activity"
            from={new Date()}
            to={new Date()}
            summary="My friend was on vacation and his dog needs a walk everyday, so I helped her!"
          />
          <ExperienceCard
            id={123}
            author={{
              name: "Stephanie Kane jr.",
              pictureUrl:
                "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png",
            }}
            type="activity"
            from={new Date()}
            to={new Date()}
            summary="My friend was on vacation and his dog needs a walk everyday, so I helped her!"
          />
        </SimpleGrid>
      </Container>
      <footer>
        <Space h="xl" />
      </footer>
    </>
  );
}
