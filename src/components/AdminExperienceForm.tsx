"use client";

import {
  Button,
  Group,
  InputWrapper,
  SegmentedControl,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import {
  IconAt,
  IconCalendar,
  IconCalendarCheck,
  IconUser,
} from "@tabler/icons-react";

export type Values = {
  author: {
    name: string;
    email: string;
  };
  range: {
    from: Date | null;
    to: Date | null;
  };
  type: "creativity" | "activity" | "service" | null;
  title: string;
  summary: string;
  md_description: string;
};

export default function AdminExperienceForm(props: {
  initialValues: Values;
  onSubmit: (values: Values) => void;
  submitText: string;
  loading: boolean;
}) {
  const form = useForm<Values>({
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
      md_description: isNotEmpty("Put in a description"),
    },
  });

  return (
    <form onSubmit={form.onSubmit(props.onSubmit)}>
      <Stack>
        <Group align="start">
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
                { label: "Creativity", value: "creativity" },
                { label: "Activity", value: "activity" },
                { label: "Service", value: "Service" },
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
          {...form.getInputProps("md_description")}
          key={form.key("md_description")}
          label="Detailed description"
          description="At least two paragraphs are recommended."
        />
        <Button
          disabled={props.loading}
          loading={props.loading}
          type="submit"
          mt="md"
        >
          {props.submitText}
        </Button>
      </Stack>
    </form>
  );
}
