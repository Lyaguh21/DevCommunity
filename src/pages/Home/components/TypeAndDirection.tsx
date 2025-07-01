import { Badge, Flex } from "@mantine/core";

import { TypePost } from "../../../entities/post/Type";
import { Directions } from "../../../entities/post/Directions";

export default function TypeAndDirection({
  direction,
  type,
}: {
  direction: string;
  type: string;
}) {
  return (
    <Flex gap={8}>
      <Badge
        bg={TypePost.find((e) => e.value === type)?.bg}
        c={TypePost.find((e) => e.value === type)?.font}
      >
        {TypePost.find((e) => e.value === type)?.label}
      </Badge>
      <Badge
        bg={Directions.find((e) => e.value === direction)?.bg}
        c={Directions.find((e) => e.value === direction)?.font}
      >
        {direction}
      </Badge>
    </Flex>
  );
}
