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
import TypeBadge from "./TypeBadge";

export default function ExperienceSlide(props: {
  id: number;
  type: "creativity" | "activity" | "service";
  title: string;
  coverUrl: string | null;
  format: "big" | "small";
}) {
  const bgImageProps =
    props.format === "big"
      ? { component: Link, href: `/experience/${props.id}` }
      : { href: "fixme" };

  return (
    <Paper shadow="md" withBorder>
      <AspectRatio ratio={16 / 9} w="100%" mx="auto" pos="relative">
        <BackgroundImage
          src={props.coverUrl ?? ""}
          radius="md"
          {...bgImageProps}
        >
          <Overlay
            radius="md"
            gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.3) 10%, rgba(0, 0, 0, 0) 100%)"
          >
            <Stack
              h="100%"
              pb={props.format === "big" ? "2rem" : "md"}
              px={props.format === "big" ? "lg" : "md"}
              justify="end"
            >
              <Group>
                <TypeBadge
                  variant={props.type}
                  style="outline"
                  size={props.format === "big" ? "xl" : "md"}
                />
                <Text
                  size={props.format === "big" ? "1.5rem" : "md"}
                  fw="bold"
                  c="white"
                >
                  {props.title}
                </Text>
              </Group>
            </Stack>
          </Overlay>
        </BackgroundImage>
      </AspectRatio>
    </Paper>
  );
}
