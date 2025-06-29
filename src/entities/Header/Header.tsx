import { Avatar, Flex, Text } from "@mantine/core";

import classes from "./classes/Header.module.css";
import Navigation from "./components/Navigation";
import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";

import InfoMenu from "./components/InfoMenu";
import axios from "axios";
import { UserProfile } from "../../interfaces/UserProfile";
import { API } from "../../app/helpers";
import { useAuthStore } from "../../stores/authStore";

export default function Header() {
  const [visibleInfo, setVisibleInfo] = useState(false);
  const [data, setData] = useState<UserProfile>();
  const { user } = useAuthStore();

  useEffect(() => {
    axios.get(`${API}/users/${user?.id}`).then((res) => {
      const userData = res.data;
      setData(userData);
    });
  }, [user?.id]);
  return (
    <>
      <Flex
        w="100%"
        bg="white"
        px={{ base: "20px", sm: "80px" }}
        py={6}
        pos="fixed"
        className={classes.header}
        justify="space-between"
        align="center"
      >
        <a href="#top">
          <Text c="#4f46e5" fw="bold" fz="h3" visibleFrom="sm">
            DevCommunity
          </Text>
        </a>

        <Navigation />

        <Flex
          visibleFrom="sm"
          align="center"
          onClick={() => setVisibleInfo(true)}
        >
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
        </Flex>
      </Flex>

      <AnimatePresence>
        {visibleInfo && <InfoMenu setVisibleInfo={setVisibleInfo} />}
      </AnimatePresence>
    </>
  );
}
