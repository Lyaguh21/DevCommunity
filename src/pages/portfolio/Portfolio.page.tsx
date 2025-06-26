import { NavLink, useParams } from "react-router";
import { UserProfile } from "../../interfaces/UserProfile";
import {
  Avatar,
  Box,
  Button,
  Flex,
  SimpleGrid,
  Text,
  UnstyledButton,
} from "@mantine/core";

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
      .get(`${API}/profiles/${id}`)
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
      <Flex w="100%" gap={16} wrap={{ base: "wrap", lg: "nowrap" }}>
        <ProfilePortfolioSection user={ThisUser} />
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
              <ProjectTemplate user={ThisUser} project={el} />
            ))}
          </SimpleGrid>
        </Box>
      </Flex>
    </Box>
  );
}
