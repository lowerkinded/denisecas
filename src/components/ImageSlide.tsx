import { AspectRatio, Paper, Image } from "@mantine/core";

export default function ImageSlide(props: {
  flex?: string | number;
  alt?: string;
  src: string;
}) {
  return (
    <Paper shadow="md" withBorder radius="md" flex={props.flex}>
      <AspectRatio ratio={16 / 9} w="100%" mx="auto" pos="relative">
        <Image alt={props.alt} src={props.src} radius="md" />
      </AspectRatio>
    </Paper>
  );
}
