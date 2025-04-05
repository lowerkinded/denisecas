import {
  AspectRatio,
  BackgroundImage,
  Group,
  Overlay,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import Link from "next/link";
import StrandBadge from "./TypeBadge";
import { Experience } from "@prisma/client";

export default function ExperienceSlide({
  experience,
  format,
}: {
  experience: Experience;
  format: "big" | "small";
}) {
  const bgImageProps =
    format === "big"
      ? { component: Link, href: `/experience/${experience.id}` }
      : { href: "fixme" };

  return (
    <Paper shadow="md" withBorder radius="md">
      <AspectRatio ratio={16 / 9} w="100%" mx="auto" pos="relative">
        <BackgroundImage
          src={experience.cover_url ?? ""}
          radius="md"
          {...bgImageProps}
        >
          <Overlay
            radius="md"
            gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.3) 10%, rgba(0, 0, 0, 0) 100%)"
          >
            <Stack
              h="100%"
              pb={format === "big" ? "2rem" : "md"}
              px={format === "big" ? "lg" : "md"}
              justify="end"
            >
              <Group>
                <StrandBadge
                  strand={experience.type}
                  style="outline"
                  wording="x"
                  size={format === "big" ? "xl" : "md"}
                />
                <Text
                  size={format === "big" ? "1.5rem" : "md"}
                  fw="bold"
                  c="white"
                >
                  {experience.title}
                </Text>
              </Group>
            </Stack>
          </Overlay>
        </BackgroundImage>
      </AspectRatio>
    </Paper>
  );
}
