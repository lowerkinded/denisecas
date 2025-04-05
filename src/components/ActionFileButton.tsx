"use client";

import { ReactNode, useState } from "react";
import { ButtonProps, FileButton, FileButtonProps } from "@mantine/core";

export default function ActionFileButton({
  action,
  children,
  ...fileButtonProps
}: Omit<FileButtonProps, "children" | "onChange"> & {
  action: (file: File | null) => Promise<void>;
  children: (props: ButtonProps) => ReactNode;
}) {
  const [loading, setLoading] = useState(false);

  return (
    <FileButton
      disabled={loading}
      onChange={async (file) => {
        setLoading(true);
        await action(file);
        setLoading(false);
      }}
      {...fileButtonProps}
    >
      {(props) => children({ ...props, disabled: loading, loading })}
    </FileButton>
  );
}
