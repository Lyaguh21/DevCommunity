import { NavLink, useParams } from "react-router";
import { UserProfile } from "../../entities/user/UserProfile";
import { Box, Flex, LoadingOverlay, SimpleGrid, Text } from "@mantine/core";

import ProfilePortfolioSection from "./components/ProfilePortfolioSection";
import ProjectTemplate from "../profile/components/ProjectTemplate";
import classes from "./classes/portfolio.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../app/helpers";
export default function Portfolio() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [ThisUser, setThisUser] = useState<UserProfile>();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API}/users/${id}`)
      .then((res) => {
        setThisUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <Box h="100%" mih="94vh" py={16}>
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 1 }}
      />
      <Flex
        w="100%"
        gap={16}
        align="flex-start"
        wrap={{ base: "wrap", lg: "nowrap" }}
      >
        <ProfilePortfolioSection ThisUser={ThisUser} />

        <Box
          bg="white"
          className={classes.shadow}
          p={24}
          pt={20}
          w="100%"
          mih="90vh"
        >
          <Flex align="center" justify="space-between" mb={8}>
            <Text lh="20px" fz={24} fw={700}>
              Портфолио
            </Text>
            <Text c="#6B7280" fz={16} lh="22px" component="div">
              {ThisUser?.portfolio.length} проектов
            </Text>
          </Flex>

          {ThisUser?.portfolio.length === 0 && (
            <Text ta="center" mt="40%">
              Проектов еще нет
            </Text>
          )}

          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md" w="100%">
            {ThisUser?.portfolio.map((el) => (
              <ProjectTemplate user={ThisUser} project={el} key={el.id} />
            ))}
          </SimpleGrid>
        </Box>
      </Flex>
    </Box>
  );
}
