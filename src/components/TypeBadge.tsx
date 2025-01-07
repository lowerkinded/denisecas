import { Badge, MantineSize } from "@mantine/core";

export default function TypeBadge({
  variant,
  style,
  size,
}: {
  variant: "creativity" | "activity" | "service";
  style: "adapt" | "outline";
  size: MantineSize;
}) {
  const color =
    variant === "creativity" ? "blue" : variant === "activity" ? "red" : "teal";

  if (style === "adapt") {
    return (
      <>
        <Badge variant="light" color={color} size={size} darkHidden>
          {variant}
        </Badge>
        <Badge variant="outline" color={color} size={size} lightHidden>
          {variant}
        </Badge>
      </>
    );
  }

  if (style === "outline") {
    return (
      <Badge variant="outline" color={color} size={size}>
        {variant}
      </Badge>
    );
  }
}
