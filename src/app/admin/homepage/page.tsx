"use server";

import { AdminCarouselEditor } from "@/components/AdminCarouselEditor";
import { AdminGridEditor } from "@/components/AdminGridEditor";
import { getExperiences } from "@/lib/experience";
import {
  Anchor,
  Breadcrumbs,
  Container,
  Divider,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";

export default async function Page() {
  const experiences = await getExperiences();

  return (
    <Container size={800} mt="xl">
      <Stack>
        <Breadcrumbs>
          <Anchor component={Link} href="/admin">
            Admin
          </Anchor>
          <Anchor component={Link} href="/admin/homepage">
            Homepage editor
          </Anchor>
        </Breadcrumbs>
        <Title flex="1">Adjust the homepage</Title>
        <Divider
          label={
            <Text fw="bold" tt="uppercase">
              Edit the carousel (drag and drop)
            </Text>
          }
          labelPosition="left"
        />
        <AdminCarouselEditor experiences={experiences} />
        <Divider
          label={
            <Text fw="bold" tt="uppercase">
              Edit the grid (drag and drop)
            </Text>
          }
          labelPosition="left"
        />
        <AdminGridEditor experiences={experiences} />
      </Stack>
    </Container>
  );
}
