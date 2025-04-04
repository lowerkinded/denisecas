import { AspectRatio, Paper, Image } from "@mantine/core";

export default function MainImageSlide(props: { url: string }) {
  return (
    <Paper shadow="md" withBorder radius="md">
      <AspectRatio ratio={16 / 9} w="100%" mx="auto" pos="relative">
        <Image alt="Experience image" src={props.url} radius="md" />
      </AspectRatio>
    </Paper>
  );
}
