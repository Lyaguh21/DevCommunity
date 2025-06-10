import { Box, Center, CloseButton, Flex, Text } from "@mantine/core";
import { Cross, Login, Logout, Menu2, UserCircle, X } from "tabler-icons-react";

import classes from "./classes/Header.module.css";
import Navigation from "./components/Navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { NavLink } from "react-router";
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
        {visibleInfo && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: "0",
              right: "0",
              height: "100px",
              width: "400px",
              backgroundColor: "white",
              zIndex: 1000,
            }}
            className={classes.infoMenu}
          >
            <Flex h="100%" direction="column" justify="space-between">
              <Flex align="center" justify="space-between" py={5}>
                <Flex align="center" gap={10}>
                  <UserCircle height={34} width={34} />
                  <Text fw={500}>Анонимный пользователь</Text>
                </Flex>
                <X onClick={() => setVisibleInfo(false)} />
              </Flex>

              <NavLink to="/auth/login">
                <Flex align="center" justify="center" gap={10}>
                  <Logout height={25} width={25} />
                  <Text fw={500}>Войти</Text>
                </Flex>
              </NavLink>
            </Flex>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
