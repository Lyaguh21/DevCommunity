import { Avatar, Flex, Text, UnstyledButton } from "@mantine/core";
import { motion } from "motion/react";
import { NavLink } from "react-router";
import { Logout, X } from "tabler-icons-react";

import classes from "../classes/Header.module.css";
import { useAuthStore } from "../../../stores/authStore";
import { useClickOutside, useDisclosure } from "@mantine/hooks";
import ModalExit from "../../ModalExit/ModalExit";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../app/helpers";
import { UserProfile } from "../../../entities/user/UserProfile";
export default function InfoMenu({ setVisibleInfo }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [data, setData] = useState<UserProfile>();
  const { user, isAuthenticated, clearUser } = useAuthStore();

  const menuRef = useClickOutside(() => setVisibleInfo(false));
  useEffect(() => {
    axios.get(`${API}/users/${user?.id}`).then((res) => {
      const userData = res.data;
      setData(userData);
    });
  }, [user?.id]);

  return (
    <>
      <ModalExit close={close} opened={opened} />
      <motion.div
        ref={menuRef}
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          position: "fixed",
          top: "0",
          right: "0",
          height: "110px",
          width: "400px",
          backgroundColor: "white",
          zIndex: 100,
          padding: "0 0 0 0",
        }}
        className={classes.infoMenu}
      >
        <Flex h="100%" direction="column" justify="space-between" py={10}>
          <Flex align="center" justify="space-between" py={5} px={10}>
            <Flex align="center" gap={10}>
              <Avatar
                src={`data:image/jpeg;base64,${data?.avatar}`}
                alt={data?.nickname}
                color="#4f46e5"
                h={38}
                w={38}
              >
                {data?.firstName[0]}
                {data?.lastName[0]}
              </Avatar>
              <Text fw={500}>
                {data?.firstName} {data?.lastName}
              </Text>
            </Flex>
            <X onClick={() => setVisibleInfo(false)} />
          </Flex>

          {!isAuthenticated && (
            <NavLink to="/auth/login">
              <Flex
                align="center"
                justify="center"
                gap={8}
                py={12.5}
                style={{ borderTop: "solid 1.5px rgb(196, 198, 201)" }}
              >
                <Logout height={25} width={25} color="#4f46e5" />
                <Text fw={500} c="#4f46e5">
                  Войти
                </Text>
              </Flex>
            </NavLink>
          )}

          {isAuthenticated && (
            <UnstyledButton onClick={open}>
              <Flex
                align="center"
                justify="center"
                gap={8}
                py={12.5}
                style={{ borderTop: "solid 1.5px rgb(196, 198, 201)" }}
              >
                <Logout height={25} width={25} color="#4f46e5" />
                <Text fw={500} c="#4f46e5">
                  Выйти
                </Text>
              </Flex>
            </UnstyledButton>
          )}
        </Flex>
      </motion.div>
    </>
  );
}
