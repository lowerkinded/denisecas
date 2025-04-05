import {
  AspectRatio,
  Paper,
  BackgroundImage,
  Stack,
  ActionIcon,
} from "@mantine/core";
import { IconReplace, IconTrash } from "@tabler/icons-react";
import ActionFileButton from "./ActionFileButton";

export default function AdminImageCard(props: {
  alt?: string;
  src: string;
  onRemove: () => void;
  onReplace: (file: File | null) => Promise<void>;
}) {
  return (
    <Paper shadow="md" withBorder radius="md">
      <AspectRatio ratio={16 / 9} w="100%" mx="auto" pos="relative">
        <BackgroundImage src={props.src} radius="md">
          <Stack align="end" p="sm" gap="xs">
            <Paper shadow="md" radius="xl">
              <ActionIcon
                size="lg"
                radius="xl"
                color="red"
                onClick={props.onRemove}
              >
                <IconTrash size={18} />
              </ActionIcon>
            </Paper>
            <Paper shadow="md" radius="xl">
              <ActionFileButton action={props.onReplace}>
                {(props) => (
                  <ActionIcon {...props} size="lg" radius="xl">
                    <IconReplace size={18} />
                  </ActionIcon>
                )}
              </ActionFileButton>
            </Paper>
          </Stack>
        </BackgroundImage>
      </AspectRatio>
    </Paper>
  );
}
