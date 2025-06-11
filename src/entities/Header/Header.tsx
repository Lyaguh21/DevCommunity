import { Avatar, Flex, Text } from "@mantine/core";


import classes from "./classes/Header.module.css";
import Navigation from "./components/Navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

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
          <Avatar src={null} alt="Anonymous" color="#4f46e5" h={38} w={38}>
            A
          </Avatar>
        </Flex>
      </Flex>

      <AnimatePresence>
        {visibleInfo && <InfoMenu setVisibleInfo={setVisibleInfo} />}
      </AnimatePresence>
    </>
  );
}
