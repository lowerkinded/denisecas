import { Container, Divider, Text } from "@mantine/core";
import Header from "../../../components/Header";

export default function Page() {
  return (
    <>
      <Header />
      <Container size={800}>
        <Divider my="xl" />
        <Text size="2rem" fw="bold">
          Cool
        </Text>
      </Container>
    </>
  );
}
