import { AspectRatio, Button } from "@mantine/core";
import ActionFileButton from "./ActionFileButton";
import { ReactNode } from "react";

export default function AdminImageAddCard({
  onAdd,
  children,
}: {
  onAdd: (file: File | null) => Promise<void>;
  children: ReactNode;
}) {
  return (
    <ActionFileButton action={onAdd} accept="image/png,image/jpeg">
      {(props) => (
        <AspectRatio ratio={16 / 9}>
          <Button
            {...props}
            size="lg"
            radius="md"
            variant="light"
            w="100%"
            h="100%"
          >
            {children}
          </Button>
        </AspectRatio>
      )}
    </ActionFileButton>
  );
}
