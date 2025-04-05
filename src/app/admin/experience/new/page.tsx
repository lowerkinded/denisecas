import AdminExperienceForm, {
  ValuesOut,
} from "@/components/AdminExperienceForm";
import { prisma } from "@/lib/prisma";
import { Anchor, Breadcrumbs, Container, Stack, Title } from "@mantine/core";
import Link from "next/link";
import { redirect } from "next/navigation";

async function create(
  values: ValuesOut,
  authorPictureUrl: string | null,
  coverUrl: string | null,
  mainImageUrls: string[]
) {
  "use server";

  const row = await prisma.experience.create({
    data: {
      author_name: values.author.name,
      author_email: values.author.email,
      author_picture_url: authorPictureUrl,
      type: values.type,
      from_date: values.range.from,
      to_date: values.range.to,
      summary: values.summary,
      cover_url: coverUrl,
      main_image_urls: mainImageUrls,
      title: values.title,
      md_description: values.mdDescription,
    },
  });

  redirect(`/admin/experience/${row.id}`);
}

export default async function Page() {
  return (
    <Container size={800} mt="xl">
      <Stack align="left">
        <Breadcrumbs>
          <Anchor component={Link} href="/admin">
            Admin
          </Anchor>
          <Anchor component={Link} href="/admin/experience">
            Experiences
          </Anchor>
          <Anchor component={Link} href="/admin/experience/new">
            Add new
          </Anchor>
        </Breadcrumbs>
        <Title>New experience</Title>
        <AdminExperienceForm
          initialValues={{
            type: null,
            title: "",
            summary: "",
            mdDescription: "",
            author: {
              name: "",
              email: "",
            },
            range: {
              from: null,
              to: null,
            },
          }}
          initialAuthorPictureUrl={null}
          initialCoverUrl={null}
          initialMainImageUrls={[]}
          submitAction={create}
          submitText="Create"
        />
      </Stack>
    </Container>
  );
}
