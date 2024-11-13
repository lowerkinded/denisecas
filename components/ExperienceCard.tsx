import {
  Card,
  Image,
  Group,
  Avatar,
  Text,
  Button,
  Space,
  CardSection,
} from "@mantine/core";
import Link from "next/link";
import TypeBadge from "./TypeBadge";
import moment from "moment";

export default function ExperienceCard(props: {
  id: number;
  author: { name: string; pictureUrl?: string };
  type: "creativity" | "activity" | "service";
  from: Date;
  to: Date;
  summary: string;
  coverUrl?: string;
}) {
  const byline = `${props.author.pictureUrl ? "" : "— "}${props.author.name}`;
  const from = moment(props.from).format("DD/MM/YYYY");
  const to = moment(props.to).format("DD/MM/YYYY");

  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      {props.coverUrl && (
        <CardSection mb="md">
          <Image src={props.coverUrl} height={160} />
        </CardSection>
      )}

      <Group gap="sm">
        {props.author.pictureUrl && (
          <Avatar radius="sm" size="1.75rem" src={props.author.pictureUrl} />
        )}
        <Text c="gray.6">{byline}</Text>
        {!!props.author.pictureUrl || <Space h="1.75rem" />}
      </Group>

      <Text mt="sm">{props.summary}</Text>

      <Space h="lg" flex="1" />

      <Group justify="space-between">
        <TypeBadge type={props.type} />
        <Text c="gray.6">
          {from}–{to}
        </Text>
      </Group>

      <Button
        mt="md"
        variant="filled"
        component={Link}
        href={`/experience/${props.id}`}
      >
        Read more
      </Button>
    </Card>
  );
}
