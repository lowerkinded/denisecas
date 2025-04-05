import { Container, Group, Text } from "@mantine/core";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Container size={800}>
        <Group justify="space-between" mt={{ base: "md", md: "xl" }}>
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
            visibleFrom="md"
          >
            DENISE CAS
          </Text>
          <Text
            size="2rem"
            fw="bold"
            variant="gradient"
            gradient={{
              from: "teal.9",
              to: "teal.2",
              deg: 45,
            }}
            component={Link}
            href="/"
            hiddenFrom="md"
          >
            DENISE CAS
          </Text>
        </Group>
        <Group mt="xs" ml="2px" gap="md">
          <Text
            c="teal.6"
            td="underline"
            component={Link}
            href="https://denise.espritscholen.nl"
            rel="noopener"
            target="_blank"
          >
            What&apos;s DENISE?
          </Text>
          <Text
            c="teal.6"
            td="underline"
            component={Link}
            href="https://www.ibo.org/programmes/diploma-programme/curriculum/dp-core/creativity-activity-and-service/"
            rel="noopener"
            target="_blank"
          >
            What&apos;s CAS?
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
