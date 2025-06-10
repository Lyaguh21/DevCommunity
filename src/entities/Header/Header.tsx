import { Flex, Text } from "@mantine/core";
import { UserCircle } from "tabler-icons-react";

import classes from "./classes/Header.module.css";
import Navigation from "./components/Navigation";
export default function Header() {
  return (
    <Flex
      w="100%"
      bg="white"
      px={40}
      py={6}
      className={classes.header}
      justify="space-between"
      align="center"
    >
      <Text c="#4f46e5" fw="bold" fz="h3">
        DevCommunity
      </Text>

      <Navigation />

      <UserCircle height={34} width={34} />
    </Flex>
  );
}
