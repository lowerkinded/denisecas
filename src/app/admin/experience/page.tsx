export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import {
  Anchor,
  Breadcrumbs,
  Button,
  Container,
  Group,
  List,
  ListItem,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";

export default async function Page() {
  const experiences = await prisma.experience.findMany();

  return (
    <Container size={800} mt="xl">
      <Stack>
        <Breadcrumbs>
          <Anchor component={Link} href="/admin">
            Admin
          </Anchor>
          <Anchor component={Link} href="/admin/experience">
            Experiences
          </Anchor>
        </Breadcrumbs>
        <Group>
          <Title flex="1">Manage experiences</Title>
          <Button component={Link} href="/admin/experience/new">
            Add new
          </Button>
        </Group>
        <List>
          {experiences.map((it) => (
            <ListItem key={it.id}>
              <Anchor component={Link} href={`/admin/experience/${it.id}`}>
                <Text>
                  {it.author_name} — {it.title}
                </Text>
              </Anchor>
            </ListItem>
          ))}
        </List>
      </Stack>
    </Container>
  );
}
