"use client";

import { useState } from "react";
import { sendLoginLink } from "@/lib/auth";
import { Button } from "@mantine/core";

export function AdminLoginButton() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  return (
    <Button
      disabled={loading || sent}
      loading={loading}
      onClick={async () => {
        setLoading(true);
        await sendLoginLink();
        setLoading(false);
        setSent(true);
      }}
    >
      Send login link
    </Button>
  );
}
