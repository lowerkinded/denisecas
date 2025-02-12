"use client";

import {
  getExperiences,
  setFrontPagePosition,
  setFrontPagePositions,
} from "@/lib/experience";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Box, Button, Group, Stack, Text } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import ExperienceSlide from "./ExperienceSlide";
import Link from "next/link";
import { useEffect, useState } from "react";

export function AdminGridEditor({
  experiences,
}: {
  experiences: Awaited<ReturnType<typeof getExperiences>>;
}) {
  const [values, handlers] = useListState(
    experiences
      .filter((it) => it.front_page_position !== null)
      .toSorted((a, b) => a.front_page_position! - b.front_page_position!)
  );
  const [resend, setResend] = useState(Symbol());

  useEffect(() => {
    if (values.length === 0) {
      return;
    }

    setFrontPagePositions(
      values.map((it, i) => ({ id: it.id, position: i }))
    ).catch(console.error);
  }, [resend]);

  const items = values.map((it, i) => (
    <Group key={it.id} align="start" pb="md">
      <Text fw="bold" w="2rem" ta="right">
        {i + 1}.
      </Text>
      <Box w="20rem" h="11.25rem">
        <Draggable index={i} draggableId={`${it.id}`}>
          {(provided, snapshot) => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <ExperienceSlide
                id={it.id}
                type={it.type}
                title={it.title}
                coverUrl={it.cover_url!}
                format="small"
              />
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

            try {
              await setFrontPagePosition(it.id, null);
            } catch (e) {
              console.error(e);
            }
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
      <Droppable droppableId="AdminGridEditor" direction="vertical">
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
