"use client";

import {
  Button,
  Group,
  InputWrapper,
  SegmentedControl,
  Stack,
  Textarea,
  TextInput,
  Image,
  FileButton,
  Space,
  Text,
  Avatar,
  Divider,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { ExperienceType } from "@prisma/client";
import {
  IconAt,
  IconCalendar,
  IconCalendarCheck,
  IconUser,
} from "@tabler/icons-react";
import { upload } from "@vercel/blob/client";
import { useState } from "react";
import ActionFileButton from "./ActionFileButton";

export type ValuesIn = {
  author: {
    name: string;
    email: string;
  };
  range: {
    from: Date | null;
    to: Date | null;
  };
  type: ExperienceType | null;
  title: string;
  summary: string;
  mdDescription: string;
};

export type ValuesOut = {
  author: {
    name: string;
    email: string;
  };
  range: {
    from: Date;
    to: Date;
  };
  type: ExperienceType;
  title: string;
  summary: string;
  mdDescription: string;
};

export default function AdminExperienceForm(props: {
  initialValues: ValuesIn;
  initialAuthorPictureUrl: string | null;
  initialCoverUrl: string | null;
  initialMainImageUrls: string[];
  submitAction: (
    values: ValuesOut,
    authorPictureUrl: string | null,
    coverUrl: string | null,
    mainImageUrls: string[]
  ) => Promise<void>;
  submitText: string;
}) {
  const [loading, setLoading] = useState(false);

  const form = useForm<ValuesIn>({
    mode: "uncontrolled",
    initialValues: props.initialValues,
    validate: {
      author: {
        name: isNotEmpty("Put in a name"),
        email: isEmail("Put in an email"),
      },
      range: {
        from: isNotEmpty("Put in a date"),
        to: (value, values) =>
          isNotEmpty("Put in a date")(value) ??
          (values.range.from &&
          value &&
          values.range.from.getTime() > value.getTime()
            ? "The last day must be after the first day"
            : null),
      },
      type: isNotEmpty("Choose a type"),
      title: isNotEmpty("Put in a title"),
      summary: isNotEmpty("Put in a summary"),
      mdDescription: isNotEmpty("Put in a description"),
    },
  });
  const [authorPictureUrl, setAuthorPictureUrl] = useState(
    props.initialAuthorPictureUrl
  );
  const [coverUrl, setCoverUrl] = useState(props.initialCoverUrl);
  const [mainImageUrls, setMainImageUrls] = useState(
    props.initialMainImageUrls
  );

  const setAuthorPicture = async (file: File | null) => {
    if (!file) {
      return;
    }

    const timestamp = new Date().getTime();
    const blob = await upload(`images/${timestamp}`, file, {
      access: "public",
      handleUploadUrl: "/upload",
    });

    setAuthorPictureUrl(blob.url);
  };

  const setCover = async (file: File | null) => {
    if (!file) {
      return;
    }

    const timestamp = new Date().getTime();
    const blob = await upload(`images/${timestamp}`, file, {
      access: "public",
      handleUploadUrl: "/upload",
    });

    setCoverUrl(blob.url);
  };

  return (
    <form
      onSubmit={form.onSubmit(async (v) => {
        setLoading(true);
        await props.submitAction(
          v as ValuesOut,
          authorPictureUrl,
          coverUrl,
          mainImageUrls
        );
        setLoading(false);
      })}
    >
      <Stack>
        <Divider
          label={
            <Text fw="bold" tt="uppercase">
              Basic information
            </Text>
          }
          labelPosition="left"
        />
        <Group align="end">
          <Group flex="1" align="start">
            <TextInput
              {...form.getInputProps("author.name")}
              key={form.key("author.name")}
              label="Author name"
              placeholder="Stephanie Kane"
              leftSectionPointerEvents="none"
              leftSection={<IconUser size={16} />}
              flex="1"
            />
            <TextInput
              {...form.getInputProps("author.email")}
              key={form.key("author.email")}
              label="Author email"
              placeholder="s.kane@denise.espritscholen.nl"
              leftSectionPointerEvents="none"
              leftSection={<IconAt size={16} />}
              flex="1"
            />
          </Group>
          <Group align="center">
            {authorPictureUrl && <Avatar src={authorPictureUrl} radius="sm" />}
            <ActionFileButton
              action={setAuthorPicture}
              accept="image/png,image/jpeg"
            >
              {(props) => <Button {...props}>Upload face</Button>}
            </ActionFileButton>
          </Group>
        </Group>
        <Group align="start">
          <DateInput
            {...form.getInputProps("range.from")}
            key={form.key("range.from")}
            label="First day"
            leftSectionPointerEvents="none"
            leftSection={<IconCalendar size={16} />}
            flex="1"
          />
          <DateInput
            {...form.getInputProps("range.to")}
            key={form.key("range.to")}
            label="Last day"
            leftSectionPointerEvents="none"
            leftSection={<IconCalendarCheck size={16} />}
            flex="1"
          />
          <InputWrapper {...form.getInputProps("type")} label="Type">
            <SegmentedControl
              {...form.getInputProps("type")}
              key={form.key("type")}
              data={[
                { label: "Creativity", value: ExperienceType.CREATIVITY },
                { label: "Activity", value: ExperienceType.ACTIVITY },
                { label: "Service", value: ExperienceType.SERVICE },
              ]}
              display="flex"
            />
          </InputWrapper>
        </Group>
        <TextInput
          {...form.getInputProps("title")}
          key={form.key("title")}
          label="Title"
          placeholder="Going to the gym"
          flex="1"
        />
        <TextInput
          {...form.getInputProps("summary")}
          key={form.key("summary")}
          label="One-line summary"
          placeholder="I went to the gym four times per week with a friend"
        />
        <Textarea
          {...form.getInputProps("mdDescription")}
          key={form.key("mdDescription")}
          label="Detailed description"
          description="At least two paragraphs are recommended."
        />
        <Divider
          label={
            <Text fw="bold" tt="uppercase">
              Cover image (shown on the homepage)
            </Text>
          }
          labelPosition="left"
        />
        <Group align="center">
          {coverUrl && <Image src={coverUrl} radius="md" w="30rem" />}
          <Space flex="1" />
          <ActionFileButton action={setCover} accept="image/png,image/jpeg">
            {(props) => <Button {...props}>Upload cover image</Button>}
          </ActionFileButton>
        </Group>
        <Divider
          label={
            <Text fw="bold" tt="uppercase">
              Main images (shown when clicked on)
            </Text>
          }
          labelPosition="left"
        />
        <Text>Coming soon</Text>
        <Button disabled={loading} loading={loading} type="submit" mt="md">
          {props.submitText}
        </Button>
        <Space h="2rem" />
      </Stack>
    </form>
  );
}
