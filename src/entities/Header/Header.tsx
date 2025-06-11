import { Flex, Text } from "@mantine/core";
import { UserCircle } from "tabler-icons-react";

import classes from "./classes/Header.module.css";
import Navigation from "./components/Navigation";
import { useState } from "react";
import { AnimatePresence } from "motion/react";

import InfoMenu from "./components/InfoMenu";
export default function Header() {
  const [visibleInfo, setVisibleInfo] = useState(false);

  return (
    <>
      <Flex
        w="100%"
        bg="white"
        px={{ base: "20px", sm: "80px" }}
        py={6}
        className={classes.header}
        justify="space-between"
        align="center"
      >
        <Text c="#4f46e5" fw="bold" fz="h3" visibleFrom="sm">
          DevCommunity
        </Text>

        <Navigation />

        <Flex
          visibleFrom="sm"
          align="center"
          onClick={() => setVisibleInfo(true)}
        >
          <UserCircle height={34} width={34} color="#4f46e5" />
        </Flex>
      </Flex>

      <AnimatePresence>
        {visibleInfo && <InfoMenu setVisibleInfo={setVisibleInfo} />}
      </AnimatePresence>
    </>
  );
}
