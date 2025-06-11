import { Flex, Text } from "@mantine/core";
import { motion } from "motion/react";
import { NavLink } from "react-router";
import { Logout, UserCircle, X } from "tabler-icons-react";

import classes from "../classes/Header.module.css";
export default function InfoMenu({ setVisibleInfo }) {
  return (
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
          <Flex align="center" justify="center" gap={8}>
            <Logout height={25} width={25} color="#4f46e5" />
            <Text fw={500} c="#4f46e5">
              Войти
            </Text>
          </Flex>
        </NavLink>
      </Flex>
    </motion.div>
  );
}
