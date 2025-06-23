import { Box, Flex, Group, Text, UnstyledButton } from "@mantine/core";
import classes from "../classes/profile.module.css";

import { NavLink } from "react-router";
import ProjectTemplate from "./ProjectTemplate";
import { UserProfile } from "../../../interfaces/UserProfile";
export default function PortfolioSection({
  user,
  thisAuthor,
}: {
  user: UserProfile;
  thisAuthor: string | undefined;
}) {
  return (
    <Box
      w={"100%"}
      bg="white"
      className={classes.shadow}
      p={24}
      pb={12}
      mb={24}
    >
      <Flex align="center" justify="space-between">
        <Text fz={24} fw={700}>
          Портфолио
        </Text>
        <Text c="#6B7280" fz={16} lh="22px" component="div">
          {user.portfolio.length} проектов
        </Text>
      </Flex>
      <Group
        grow={user.portfolio.length > 2}
        gap={16}
        mih={374}
        style={{ overflowX: "scroll" }}
        wrap="nowrap"
        py={8}
      >
        {user.portfolio.length === 0 && (
          <Text ta="center">Проектов еще нет</Text>
        )}

        {user.portfolio.length !== 0 &&
          user.portfolio
            .slice(0, 3)
            .map((el) => (
              <ProjectTemplate key={el.id} project={el} user={user} />
            ))}
      </Group>
      <Flex justify="flex-end" pt={4}>
        <NavLink to={`/portfolio/${thisAuthor}`}>
          <UnstyledButton variant="subtle" c="#4f46e5" p={0} fw={500}>
            Посмотреть все проекты
          </UnstyledButton>
        </NavLink>
      </Flex>
    </Box>
  );
}
