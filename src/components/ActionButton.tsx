"use client";

import { useState } from "react";
import { Button, ButtonProps } from "@mantine/core";

export default  function ActionButton({
  action,
  ...buttonProps
}: ButtonProps & { action: () => Promise<void> }) {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      disabled={loading}
      loading={loading}
      onClick={async () => {
        setLoading(true);
        await action();
        setLoading(false);
      }}
      {...buttonProps}
    />
  );
}
