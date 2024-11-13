import { Badge } from "@mantine/core";

export default function TypeBadge({
  type,
}: {
  type: "creativity" | "activity" | "service";
}) {
  const color =
    type === "creativity" ? "blue" : type === "activity" ? "red" : "teal";

  return (
    <>
      <Badge
        c={`${color}.5`}
        bg={`${color}.1`}
        radius="md"
        size="lg"
        darkHidden
      >
        {type}
      </Badge>
      <Badge
        c={`${color}.5`}
        bg="transparent"
        bd={`1px solid ${color}.5`}
        radius="md"
        size="lg"
        lightHidden
      >
        {type}
      </Badge>
    </>
  );
}
