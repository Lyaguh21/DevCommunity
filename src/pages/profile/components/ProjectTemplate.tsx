import { Text, Box, Flex, Image, UnstyledButton } from "@mantine/core";
import { Project } from "../../../entities/user/Project.interface";
import classes from "../classes/profile.module.css";
import { BrandFigma, BrandGithub, Link } from "tabler-icons-react";
import { NavLink, useNavigate } from "react-router";
import { UserProfile } from "../../../entities/user/UserProfile";

export default function ProfileTemplate({
  project,
  user,
}: {
  project: Project;
  user: UserProfile;
}) {
  return (
    <Box
      bg="#f9fafc"
      style={{ overflow: "hidden", borderRadius: "12px" }}
      className={classes.projectCard}
      miw={335}
    >
      <Image
        src={
          project?.previewImage
            ? `data:image/jpeg;base64,${project?.previewImage}`
            : undefined
        }
        w="100%"
        h={200}
        fallbackSrc={`https://placehold.co/600x400?text=${project.title}`}
      />
      <Flex direction="column" gap={4} p={20}>
        <Text fz={16} fw={700}>
          {project.title}
        </Text>
        <Text fz={14} lineClamp={2} h={44}>
          {project.description}
        </Text>

        <Flex gap={8} h={24}>
          {project.links[0] && (
            <NavLink to={project.links[0]}>
              <Flex gap={2} align="center">
                <BrandGithub color="#4f46e5" size={16} />
                <Text c="#4f46e5">GitHub</Text>
              </Flex>
            </NavLink>
          )}

          {project.links[1] && (
            <NavLink to={project.links[1]}>
              <Flex gap={0} align="center">
                <Link color="#30b06b" size={16} />
                <Text c="#30b06b">Demo</Text>
              </Flex>
            </NavLink>
          )}

          {project.links[2] && (
            <NavLink to={project.links[2]}>
              <Flex gap={0} align="center">
                <BrandFigma color="#f20cb1" size={16} />
                <Text c="#f20cb1">Design</Text>
              </Flex>
            </NavLink>
          )}
        </Flex>

        <NavLink
          to={`/portfolio/project/${project.id}`}
          state={{ author: user }}
        >
          <UnstyledButton variant="subtle" c="#4f46e5" p={0} fw={500}>
            Открыть
          </UnstyledButton>
        </NavLink>
      </Flex>
    </Box>
  );
}
