import { Badge, MantineSize } from "@mantine/core";

export default function TypeBadge({
  type,
  style,
  size,
}: {
  type: "creativity" | "activity" | "service";
  style: "adapt" | "outline";
  size: MantineSize;
}) {
  const color =
    type === "creativity" ? "blue" : type === "activity" ? "red" : "teal";

  if (style === "adapt") {
    return (
      <>
        <Badge
          c={`${color}.5`}
          bg={`${color}.1`}
          radius="md"
          size={size}
          darkHidden
        >
          {type}
        </Badge>
        <Badge
          c={`${color}.5`}
          bg="transparent"
          bd={`1px solid ${color}.5`}
          radius="md"
          size={size}
          lightHidden
        >
          {type}
        </Badge>
      </>
    );
  }

  if (style === "outline") {
    return (
      <Badge
        c={`${color}.5`}
        bg="transparent"
        bd={`2px solid ${color}.5`}
        radius="md"
        size={size}
      >
        {type}
      </Badge>
    );
  }
}
