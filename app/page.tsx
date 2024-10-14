import { Button, Container, Flex, Text, Title } from "@mantine/core";

export default function HomePage() {
  return (
    <Container size={900}>
      <Flex justify="space-between" mt="xl">
        <Title>DENISE CAS</Title>
        <Button variant="filled">Upload yours</Button>
      </Flex>
    </Container>
  );
}
