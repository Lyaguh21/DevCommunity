import { Box, Flex, Group, Text, UnstyledButton } from "@mantine/core";
import classes from "../classes/profile.module.css";
import { Project } from "../../../interfaces/Project.interface";
import { NavLink } from "react-router";
import ProjectTemplate from "./ProjectTemplate";
export default function PortfolioSection({
  projects,
}: {
  projects: Project[];
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
      <Flex align="center" justify="space-between" mb={4}>
        <Text fz={24} fw={700}>
          Портфолио
        </Text>
        <Text c="#6B7280" fz={16} lh="22px" component="div">
          {projects.length} проектов
        </Text>
      </Flex>
      <Group
        grow={projects.length > 2}
        gap={16}
        mih={374}
        style={{ overflowX: "scroll" }}
        wrap="nowrap"
        py={8}
      >
        {projects.length === 0 && <Text ta="center">Проектов еще нет</Text>}

        {projects.length !== 0 &&
          projects.slice(0, 3).map((el) => <ProjectTemplate project={el} />)}
      </Group>
      <Flex justify="flex-end" pt={4}>
        <NavLink to="/portfolio">
          <UnstyledButton variant="subtle" c="#4f46e5" p={0} fw={500}>
            Посмотреть все проекты
          </UnstyledButton>
        </NavLink>
      </Flex>
    </Box>
  );
}
