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
  coverUrl: string;
}) {
  return (
    <Paper shadow="md" withBorder>
      <AspectRatio ratio={16 / 9} w="100%" mx="auto" pos="relative">
        <BackgroundImage
          src={props.coverUrl}
          radius="md"
          component={Link}
          href={`/experience/${props.id}`}
        >
          <Overlay
            radius="md"
            gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.3) 10%, rgba(0, 0, 0, 0) 100%)"
          >
            <Stack h="100%" pb="2rem" px="lg" justify="end">
              <Group>
                <TypeBadge variant={props.type} style="outline" size="xl" />
                <Text size="1.5rem" fw="bold" c="white">
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
