import { Avatar, Box, Button, Flex, Text } from "@mantine/core";
import { UserProfile } from "../../../interfaces/UserProfile";
import classes from "../classes/profile.module.css";
import { Roles } from "../../../interfaces/Role";
import { Edit, Logout } from "tabler-icons-react";
export default function ProfileTemplate({ user }: { user: UserProfile }) {
  return (
    <Box w={"100%"} bg="white" className={classes.shadow} p={24}>
      <Flex align="center" justify="space-between">
        <Flex align="center" gap={8}>
          <Avatar
            src={user.avatar}
            alt={user.nickname}
            color="#4f46e5"
            h={60}
            w={60}
          >
            <Text fz={24} fw={700}>
              {user.nickname[0]}
            </Text>
          </Avatar>
          <Flex direction="column" gap={8}>
            <Text lh="20px" fz={24} fw={700}>
              {user.firstName} {user.lastName}
            </Text>
            <Text c="#6B7280" fz={16} lh="20px" component="div">
              @{user.nickname}
            </Text>
            <Text c="#6B7280" fz={16} lh="20px" component="div">
              {Roles.find((role) => user.role == role.value)?.label}
            </Text>
            <Text c="#6B7280" fz={16} lh="20px" component="div">
              {user.workplace}
            </Text>
          </Flex>
        </Flex>

        <Flex gap={8} style={{ alignSelf: "self-start" }}>
          <Button bg="#4f46e5" visibleFrom="sm">
            <Flex align="center" gap={4}>
              <Edit size={16} />
              <Text>Редактировать</Text>
            </Flex>
          </Button>
          <Button bg="#4f46e5" hiddenFrom="sm" px={6} w={36}>
            <Flex align="center" gap={4}>
              <Edit size={16} />
            </Flex>
          </Button>

          <Button bg="#eb0918" visibleFrom="sm">
            <Flex align="center" gap={4}>
              <Logout size={16} />
              <Text>Выйти</Text>
            </Flex>
          </Button>
          <Button bg="#eb0918" hiddenFrom="sm" px={6} w={36}>
            <Flex align="center" gap={4}>
              <Logout size={16} />
            </Flex>
          </Button>
        </Flex>
      </Flex>

      {user.description && (
        <Text
          pt={12}
          mt={12}
          style={{ borderTop: "solid 1.5px rgb(196, 198, 201)" }}
        >
          {user.description}
        </Text>
      )}
    </Box>
  );
}
