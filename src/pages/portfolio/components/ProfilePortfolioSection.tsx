import { NavLink } from "react-router";
import { Avatar, Box, Button, Flex, Text } from "@mantine/core";
import classes from "../classes/portfolio.module.css";
import { IconBuilding, IconCode } from "@tabler/icons-react";

import { Plus } from "tabler-icons-react";
import { UserProfile } from "../../../entities/user/UserProfile";
import { Roles } from "../../../entities/user/Role";
import { useAuthStore } from "../../../stores/authStore";
export default function ProfilePortfolioSection({
  ThisUser,
}: {
  ThisUser: UserProfile;
}) {
  const { user } = useAuthStore();
  return (
    <Box
      bg="white"
      className={classes.shadow}
      p={24}
      pt={20}
      miw={400}
      w={{ base: "100%", lg: "327px" }}
    >
      <Flex align="center" justify="space-between">
        <Flex align="center" gap={8}>
          <Avatar
            src={
              ThisUser?.avatar
                ? `data:image/jpeg;base64,${ThisUser?.avatar}`
                : undefined
            }
            alt={ThisUser?.nickname}
            color="#4f46e5"
            h={60}
            w={60}
          >
            <Text fz={24} fw={700}>
              {ThisUser?.firstName[0]}
              {ThisUser?.lastName[0]}
            </Text>
          </Avatar>
          <Flex direction="column" gap={4}>
            <Text fz={24} fw={700}>
              {ThisUser?.firstName} {ThisUser?.lastName}
            </Text>
            <Text c="#6B7280" fz={16} lh="20px" component="div">
              @{ThisUser?.nickname}
            </Text>
            <Flex align="center">
              <IconCode size={16} color="#6B7280" />
              <Text c="#6B7280" fz={16} lh="20px" component="div">
                Роль:{" "}
                <Text span c="black">
                  {Roles.find((role) => ThisUser?.role == role.value)?.label}
                </Text>
              </Text>
            </Flex>

            <Flex align="center">
              {ThisUser?.workplace && (
                <>
                  <IconBuilding size={16} color="#6B7280" />
                  <Text c="#6B7280" fz={16} lh="20px" component="div">
                    Компания:{" "}
                    <Text span c="black">
                      {ThisUser?.workplace}
                    </Text>
                  </Text>
                </>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      {user?.id == ThisUser?.userId && (
        <NavLink to="/portfolio/createProject">
          <Button bg="#4f46e5" fullWidth mt={16}>
            <Flex align="center" gap={4}>
              <Plus size={16} />
              <Text>Добавить проект</Text>
            </Flex>
          </Button>
        </NavLink>
      )}

      <NavLink to={`/profile/${ThisUser?.userId}`}>
        <Flex align="center" gap={4} mt={8}>
          <Text ta="center" w="100%" c="#4f46e5">
            Назад в профиль
          </Text>
        </Flex>
      </NavLink>
    </Box>
  );
}
