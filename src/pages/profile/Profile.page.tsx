import { Center, Flex, Loader } from "@mantine/core";

import ProfileTemplate from "./components/ProfileTemplate";
import { useDisclosure } from "@mantine/hooks";
import ModalExit from "../../widgets/ModalExit/ModalExit";
import { useParams } from "react-router";
import { useAuthStore } from "../../stores/authStore";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../app/helpers";
import { UserProfile } from "../../entities/user/UserProfile";
import PortfolioSection from "./components/PortfolioSection";

export default function Profile() {
  const [user, setUser] = useState<UserProfile>();
  const [loading, setLoading] = useState(true);
  const { clearUser } = useAuthStore();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API}/users/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const [opened, { open, close }] = useDisclosure(false);

  if (loading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="xl" variant="dots" />
      </Center>
    );
  }

  return (
    <Flex h="100%" mih="94vh" py={16} direction="column" gap={16}>
      <ProfileTemplate ThisUser={user} openModal={open} />
      <PortfolioSection ThisUser={user} thisAuthor={id} />

      <ModalExit close={close} opened={opened} />
    </Flex>
  );
}
