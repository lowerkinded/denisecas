"use client";

import { ReactNode, useState } from "react";
import { FileButton, FileButtonProps } from "@mantine/core";

export default function ActionFileButton({
  action,
  children,
  ...fileButtonProps
}: Omit<FileButtonProps, "children" | "onChange"> & {
  action: (file: File | null) => Promise<void>;
  children: (props: {
    onClick: () => void;
    disabled: boolean;
    loading: boolean;
  }) => ReactNode;
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
