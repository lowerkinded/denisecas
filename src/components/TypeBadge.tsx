import { Badge, MantineSize } from "@mantine/core";
import { ExperienceType } from "@prisma/client";

export default function StrandBadge({
  strand,
  style,
  wording,
  size,
}: {
  strand: ExperienceType;
  style: "adapt" | "outline";
  wording: "x" | "a-x-experience";
  size: MantineSize;
}) {
  const color =
    strand === ExperienceType.CREATIVITY
      ? "blue"
      : strand === ExperienceType.ACTIVITY
      ? "red"
      : "teal";
  const text =
    wording === "x"
      ? strand.toLocaleLowerCase()
      : strand === ExperienceType.ACTIVITY
      ? `An activity experience`
      : `A ${strand} experience`;

  if (style === "adapt") {
    return (
      <>
        <Badge variant="light" color={color} size={size} darkHidden>
          {text}
        </Badge>
        <Badge variant="outline" color={color} size={size} lightHidden>
          {text}
        </Badge>
      </>
    );
  }

  if (style === "outline") {
    return (
      <Badge variant="outline" color={color} size={size}>
        {text}
      </Badge>
    );
  }
}
