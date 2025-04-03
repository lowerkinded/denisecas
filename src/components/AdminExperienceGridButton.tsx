"use client";

import { useState } from "react";
import { Button } from "@mantine/core";
import { setFrontPagePosition } from "@/lib/experience";
import { useRouter } from "next/navigation";

export function AdminExperienceGridButton(props: {
  id: number;
  position: number;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <Button
      disabled={loading}
      loading={loading}
      onClick={async () => {
        setLoading(true);
        await setFrontPagePosition(props.id, props.position);
        router.push("/admin/homepage");
      }}
    >
      Add to grid
    </Button>
  );
}
