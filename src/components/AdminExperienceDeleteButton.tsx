"use client";

import { useState } from "react";
import { Button } from "@mantine/core";
import { deleteExperience } from "@/lib/experience";
import { useRouter } from "next/navigation";

export function AdminExperienceDeleteButton({ id }: { id: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <Button
      color="red"
      disabled={loading}
      loading={loading}
      onClick={async () => {
        setLoading(true);
        await deleteExperience(id);
        router.push("/admin/experience");
      }}
    >
      Delete experience
    </Button>
  );
}
