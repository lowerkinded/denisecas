"use client";

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Box, Button, Group, Stack, Text } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import ExperienceSlide from "./ExperienceSlide";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Experience } from "@prisma/client";

export default function AdminCarouselEditor({
  initial,
  updateAction,
  removeAction,
}: {
  initial: Experience[];
  updateAction: (experiences: Experience[]) => Promise<void>;
  removeAction: (id: number) => Promise<void>;
}) {
  const [values, handlers] = useListState(initial);
  const [resend, setResend] = useState(Symbol());

  useEffect(() => {
    updateAction(values);
  }, [resend]);

  const items = values.map((it, i) => (
    <Group key={it.id} align="start" pb="md">
      <Text fw="bold" w="2rem" ta="right">
        {i + 1}.
      </Text>
      <Box w="20rem" h="11.25rem">
        <Draggable index={i} draggableId={`${it.id}`}>
          {(provided) => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <ExperienceSlide experience={it} format="small" />
            </div>
          )}
        </Draggable>
      </Box>
      <Stack>
        <Button component={Link} href={`/admin/experience/${it.id}`}>
          Manage
        </Button>
        <Button
          color="red"
          onClick={async () => {
            handlers.remove(values.findIndex((other) => other.id === it.id));
            setResend(Symbol());
            await removeAction(it.id);
          }}
        >
          Remove
        </Button>
      </Stack>
    </Group>
  ));

  return (
    <DragDropContext
      onDragEnd={async ({ destination, source }) => {
        handlers.reorder({ from: source.index, to: destination?.index || 0 });
        setResend(Symbol());
      }}
    >
      <Droppable droppableId="AdminCarouselEditor" direction="vertical">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
