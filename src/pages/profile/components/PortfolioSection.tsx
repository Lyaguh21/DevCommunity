import { Box, Flex, Group, Text, UnstyledButton } from "@mantine/core";
import classes from "../classes/profile.module.css";
import { NavLink } from "react-router";
import ProjectTemplate from "./ProjectTemplate";
import { UserProfile } from "../../../entities/user/UserProfile";
import { Project } from "../../../entities/user/Project.interface";
export default function PortfolioSection({
  ThisUser,
  thisAuthor,
}: {
  ThisUser: any;
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
          {ThisUser.portfolio.length} проектов
        </Text>
      </Flex>
      <Group
        grow={ThisUser.portfolio.length > 2}
        gap={16}
        mih={374}
        style={{ overflowX: "scroll" }}
        wrap="nowrap"
        py={8}
      >
        {ThisUser.portfolio.length === 0 && (
          <Text ta="center" w="100%">
            Проектов еще нет
          </Text>
        )}

        {ThisUser.portfolio.length !== 0 &&
          ThisUser.portfolio
            .slice(0, 3)
            .map((el: Project) => (
              <ProjectTemplate key={el.id} project={el} user={ThisUser} />
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
