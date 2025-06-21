import { Avatar, Box, Flex, Text, Image } from "@mantine/core";
import { NavLink, useLocation, useParams } from "react-router";
import { Roles } from "../../interfaces/Role";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import {
  ArrowLeft,
  BrandFigma,
  BrandGithub,
  Link,
  Point,
} from "tabler-icons-react";
import { Project } from "../../interfaces/Project.interface";
import classes from "./classes/portfolio.module.css";
import ModalConfirmDelete from "../../entities/ModalConfilrmDelete/ModalConfirmDelete";
import { useDisclosure } from "@mantine/hooks";
export default function ViewProject() {
  const { id } = useParams();
  const { state } = useLocation();
  const author = state.author;

  const project: Project = {
    id: "3",
    title: "Okoprom",
    description:
      "В zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид  В zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид",
    links: ["hhtp://", "hhtp://", "hhtp://"],
    // links: [null, null, null],
    previewImage:
      "https://i.pinimg.com/originals/db/46/90/db46900efc60e41a87a1274fecebc977.jpg",
  };
  const [opened, { open, close }] = useDisclosure(false);
  const handleDelete = () => {
    console.log("DELETE", { id });
  };

  return (
    <>
      <ModalConfirmDelete
        close={close}
        opened={opened}
        onDelete={handleDelete}
      />
      <Box pt={16} mih="94vh">
        <Box w={"100%"} bg="white" className={classes.shadow} p={24}>
          <Flex justify="space-between" wrap={{ base: "wrap" }} gap={8}>
            <Flex gap={6}>
              <Avatar
                src={author.avatar}
                alt={author.nickname}
                color="#4f46e5"
                h={40}
                w={40}
              >
                {author.nickname[0]}
              </Avatar>
              <Box>
                <Text lh="20px" fz={16} fw={600}>
                  {author.firstName} {author.lastName}
                </Text>
                <Text c="#6B7280" fz={14} lh="20px" component="div">
                  <Flex align="center">
                    {author.nickname}
                    <Point fill="#6B7280" stroke="#6B7280" size={16} />
                    {Roles.find((role) => author.role == role.value)?.label}
                  </Flex>
                </Text>
              </Box>
            </Flex>

            <Flex gap={8} align="center">
              <IconEdit size={20} style={{ cursor: "pointer" }} />
              <IconTrash
                size={20}
                style={{ cursor: "pointer" }}
                onClick={open}
              />
            </Flex>
          </Flex>

          <Text fz={30} fw={700} my={16}>
            {project.title}
          </Text>

          {project.previewImage && (
            <Image
              src={project.previewImage}
              h={{ base: 190, sm: 300 }}
              w={{ base: "100%", sm: "auto" }}
              mb={16}
            />
          )}

          <Text c="#374151" component="div">
            {project.description}
          </Text>

          {(project.links[0] || project.links[1] || project.links[2]) !==
            null && (
            <Box py={8}>
              <Text component="div" fz={16} fw={600}>
                Ссылки
              </Text>

              {project.links[0] && (
                <NavLink to={project.links[0]}>
                  <Flex gap={2} align="center">
                    <BrandGithub color="#4f46e5" size={20} />
                    <Text c="#4f46e5" fz={20}>
                      GitHub
                    </Text>
                  </Flex>
                </NavLink>
              )}

              {project.links[1] && (
                <NavLink to={project.links[1]}>
                  <Flex gap={0} align="center">
                    <Link color="#30b06b" size={20} />
                    <Text c="#30b06b" fz={20}>
                      Demo
                    </Text>
                  </Flex>
                </NavLink>
              )}

              {project.links[2] && (
                <NavLink to={project.links[2]}>
                  <Flex gap={0} align="center">
                    <BrandFigma color="#f20cb1" size={20} />
                    <Text c="#f20cb1" fz={20}>
                      Design
                    </Text>
                  </Flex>
                </NavLink>
              )}
            </Box>
          )}

          <Flex justify="space-between" align="center">
            <NavLink
              to={`/profile/${author.id}`}
              color="black"
              style={{ textDecoration: "none" }}
            >
              <Flex align="center">
                <ArrowLeft color="black" />
                <Text fw={600} c="black">
                  Назад к профилю
                </Text>
              </Flex>
            </NavLink>
          </Flex>
        </Box>
      </Box>
    </>
  );
}
