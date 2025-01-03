import { Button, Container, Group, Text } from "@mantine/core";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Container size={800}>
        <Group justify="space-between" mt="xl">
          <Text
            size="3rem"
            fw="bold"
            variant="gradient"
            gradient={{
              from: "teal.9",
              to: "teal.2",
              deg: 45,
            }}
            component={Link}
            href="/"
          >
            DENISE CAS
          </Text>
          <Button variant="filled" component={Link} href="/new">
            Upload yours
          </Button>
        </Group>
        <Group mt="xs" ml="2px" gap="xl">
          <Text
            c="teal.6"
            td="underline"
            component={Link}
            href="https://denise.espritscholen.nl"
            rel="noopener"
            target="_blank"
          >
            What's DENISE?
          </Text>
          <Text
            c="teal.6"
            td="underline"
            component={Link}
            href="/experience/1"
            rel="noopener"
            target="_blank"
          >
            Who made this?
          </Text>
        </Group>
      </Container>
    </header>
  );
}
