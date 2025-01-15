import {
  Button,
  Container,
  Divider,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";

export default function Page() {
  return (
    <Container size={800} mt="xl">
      <Stack align="left">
        <Title>DENISE CAS Admin Page</Title>
        <Text>Logged in successfully!</Text>
        <Divider
          label={
            <Text tt="uppercase" fw="bold" size="sm">
              What do you want to do?
            </Text>
          }
          labelPosition="left"
        />
        <SimpleGrid cols={2}>
          <Button
            component={Link}
            variant="default"
            href="/admin/experience/new"
          >
            Add an experience
          </Button>
          <Button component={Link} variant="default" href="/admin/experience">
            Manage experiences
          </Button>
          <Button component={Link} variant="default" href="/admin/homepage">
            Adjust the homepage
          </Button>
          <Button component={Link} variant="default" href="/admin/tokens">
            Manage admins
          </Button>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
