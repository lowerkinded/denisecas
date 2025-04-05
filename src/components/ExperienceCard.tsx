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
import StrandBadge from "./TypeBadge";
import moment from "moment";
import { Experience } from "@prisma/client";

export default function ExperienceCard({
  experience,
}: {
  experience: Experience;
}) {
  const byline = `${experience.author_picture_url ? "" : "— "}${
    experience.author_name
  }`;
  const from = moment(experience.from_date).format("DD/MM/YYYY");
  const to = moment(experience.to_date).format("DD/MM/YYYY");

  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      {experience.cover_url && (
        <CardSection mb="md">
          <Image alt="Cover image" src={experience.cover_url} height={160} />
        </CardSection>
      )}

      <Group gap="sm">
        {experience.author_picture_url && (
          <Avatar
            radius="sm"
            size="1.75rem"
            src={experience.author_picture_url}
          />
        )}
        <Text c="gray.6">{byline}</Text>
        {!!experience.author_picture_url || <Space h="1.75rem" />}
      </Group>

      <Text mt="sm">{experience.summary}</Text>

      <Space h="lg" flex="1" />

      <Group justify="space-between">
        <StrandBadge
          strand={experience.type}
          style="adapt"
          wording="x"
          size="lg"
        />
        <Text c="gray.6">
          {from}–{to}
        </Text>
      </Group>

      <Button
        mt="md"
        variant="filled"
        component={Link}
        href={`/experience/${experience.id}`}
      >
        Read more
      </Button>
    </Card>
  );
}
