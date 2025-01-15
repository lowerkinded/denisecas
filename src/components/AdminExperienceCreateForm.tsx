"use client";

import { insertExperience } from "@/lib/experience";
import AdminExperienceForm, { Values } from "./AdminExperienceForm";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminExperienceCreateForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const create = async (values: Values) => {
    console.log(values);
    try {
      setLoading(true);

      const { id } = await insertExperience({
        author_email: values.author.email,
        author_name: values.author.name,
        type: values.type!,
        from_date: values.range.from!,
        to_date: values.range.to!,
        title: values.title,
        summary: values.summary,
        md_description: values.md_description,
      });

      router.push(`/admin/experience/${id}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AdminExperienceForm
      initialValues={{
        type: null,
        title: "",
        summary: "",
        md_description: "",
        author: {
          name: "",
          email: "",
        },
        range: {
          from: null,
          to: null,
        },
      }}
      onSubmit={create}
      submitText="Create"
      loading={loading}
    />
  );
}
