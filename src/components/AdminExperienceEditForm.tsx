"use client";

import { getExperience, updateExperience } from "@/lib/experience";
import AdminExperienceForm, { Values } from "./AdminExperienceForm";
import { useState } from "react";

export default function AdminExperienceEditForm({
  experience,
}: {
  experience: NonNullable<Awaited<ReturnType<typeof getExperience>>>;
}) {
  const [loading, setLoading] = useState(false);

  const create = async (
    values: Values,
    authorPictureUrl: string | null,
    coverUrl: string | null,
    mainImageUrls: string[]
  ) => {
    console.log(values);
    setLoading(true);

    try {
      await updateExperience(experience.id, {
        author_email: values.author.email,
        author_name: values.author.name,
        author_picture_url: authorPictureUrl,
        type: values.type!,
        from_date: values.range.from!,
        to_date: values.range.to!,
        title: values.title,
        summary: values.summary,
        md_description: values.md_description,
        cover_url: coverUrl,
        main_image_urls: mainImageUrls,
      });
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  };

  return (
    <AdminExperienceForm
      initialValues={{
        type: experience.type,
        title: experience.title,
        summary: experience.summary,
        md_description: experience.md_description,
        author: {
          name: experience.author_name,
          email: experience.author_email,
        },
        range: {
          from: experience.from_date,
          to: experience.to_date,
        },
      }}
      initialAuthorPictureUrl={experience.author_picture_url}
      initialCoverUrl={experience.cover_url}
      initialMainImageUrls={experience.main_image_urls}
      onSubmit={create}
      submitText="Save information"
      loading={loading}
    />
  );
}
