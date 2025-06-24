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
export default function Portfolio() {
  const { id } = useParams();
  //Получаю инфу о пользователе по id
  const user: UserProfile = {
    id: "3",
    firstName: "Иdгорь",
    lastName: "Малышев",
    nickname: "Lgorek2280",
    role: "Frontend",
    description:
      " В zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид  В zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид",
    workplace: 'OOO "ZUZU"',
    portfolio: [
      {
        id: "1",
        title: "Okoprom",
        description: "Machine tool sail webapp",
        links: ["hhtp://", null, "hhtp://"],
        previewImage:
          "https://i.pinimg.com/originals/db/46/90/db46900efc60e41a87a1274fecebc977.jpg",
      },
      {
        id: "2",
        title: "Okoprom",
        links: [null, null, null],
        previewImage:
          "https://i.pinimg.com/originals/db/46/90/db46900efc60e41a87a1274fecebc977.jpg",
      },
      {
        id: "3",
        title: "Okoprom",
        description:
          "В zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид  В zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид",
        links: ["hhtp://", "hhtp://", "hhtp://"],
        previewImage:
          "https://i.pinimg.com/originals/db/46/90/db46900efc60e41a87a1274fecebc977.jpg",
      },
      {
        id: "4",
        title: "Okoprom",
        description: "Machine tool sail webapp",
        links: ["hhtp://", "hhtp://", "hhtp://"],
        previewImage:
          "https://i.pinimg.com/originals/db/46/90/db46900efc60e41a87a1274fecebc977.jpg",
      },
      {
        id: "5",
        title: "Okoprom",
        description: "Machine tool sail webapp",
        links: ["hhtp://", null, "hhtp://"],
        previewImage:
          "https://i.pinimg.com/originals/db/46/90/db46900efc60e41a87a1274fecebc977.jpg",
      },
    ],
  };
  return (
    <Box h="100%" mih="94vh" py={16}>
      <Flex w="100%" gap={16} wrap={{ base: "wrap", lg: "nowrap" }}>
        <ProfilePortfolioSection user={user} />
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
              {user.portfolio.length} проектов
            </Text>
          </Flex>

          {user.portfolio.length === 0 && (
            <Text ta="center" mt="40%">
              Проектов еще нет
            </Text>
          )}

          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md" w="100%">
            {user.portfolio.map((el) => (
              <ProjectTemplate user={user} project={el} />
            ))}
          </SimpleGrid>
        </Box>
      </Flex>
    </Box>
  );
}
