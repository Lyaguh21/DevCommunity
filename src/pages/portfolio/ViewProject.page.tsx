import { Avatar, Box, Flex, Text, Image, LoadingOverlay } from "@mantine/core";
import { NavLink, useLocation, useNavigate, useParams } from "react-router";
import { Roles } from "../../entities/user/Role";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import {
  ArrowLeft,
  BrandFigma,
  BrandGithub,
  Link,
  Point,
} from "tabler-icons-react";
import { Project } from "../../entities/user/Project.interface";
import classes from "./classes/portfolio.module.css";
import ModalConfirmDelete from "../../widgets/ModalConfilrmDelete/ModalConfirmDelete";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../app/helpers";
import { useAuthStore } from "../../stores/authStore";
import { notifications } from "@mantine/notifications";
export default function ViewProject() {
  const { id } = useParams();
  const { state } = useLocation();
  const author = state.author;
  const { user } = useAuthStore();
  const [project, setProject] = useState<Project>();
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API}/users/${author.id}/portfolio/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setProject(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = () => {
    axios
      .delete(`${API}/users/${author.id}/portfolio/${id}`, {
        withCredentials: true,
      })
      .then(() => {
        notifications.show({
          title: "Успешно",
          message: "Проект удален!",
          color: "green",
        });
      })
      .catch(() =>
        notifications.show({
          title: "Ошибка",
          message: "Не удалось удалить проект",
          color: "red",
        })
      )
      .finally(() => {
        close();
        navigate(`/portfolio/${author.userId}`);
      });
  };

  return (
    <>
      <ModalConfirmDelete
        close={close}
        opened={opened}
        onDelete={handleDelete}
      />
      <Box pt={16} mih="94vh" key={id}>
        <LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 1 }}
        />
        <Box w={"100%"} bg="white" className={classes.shadow} p={24}>
          <Flex justify="space-between" wrap={{ base: "wrap" }} gap={8}>
            <Flex gap={6}>
              <Avatar
                src={
                  author?.avatar
                    ? `data:image/jpeg;base64,${author?.avatar}`
                    : undefined
                }
                alt={author?.nickname}
                color="#4f46e5"
                h={38}
                w={38}
              >
                {author?.firstName[0]}
                {author?.lastName[0]}
              </Avatar>
              <Box>
                <Text lh="20px" fz={16} fw={600}>
                  {author?.firstName} {author?.lastName}
                </Text>
                <Text c="#6B7280" fz={14} lh="20px" fw={600} component="div">
                  <Flex align="center">
                    <NavLink
                      to={`/profile/${author?.userId}`}
                      style={{ textDecoration: "none" }}
                      color="#4f46e5"
                    >
                      @{author?.nickname}
                    </NavLink>
                    <Point fill="#6B7280" stroke="#6B7280" size={16} />
                    {Roles.find((role) => author?.role == role.value)?.label}
                  </Flex>
                </Text>
              </Box>
            </Flex>

            {author.userId === user?.id && (
              <Flex gap={8} align="center" h={20}>
                <NavLink
                  to={`/portfolio/EditProject/${id}`}
                  state={{ author: author }}
                  style={{ height: "20px", width: "20px" }}
                >
                  <IconEdit
                    size={20}
                    style={{ cursor: "pointer" }}
                    color="black"
                  />
                </NavLink>
                <IconTrash
                  size={20}
                  style={{ cursor: "pointer" }}
                  onClick={open}
                />
              </Flex>
            )}
          </Flex>

          <Text fz={30} fw={700} my={16}>
            {project?.title}
          </Text>

          {project?.previewImage && (
            <Image
              src={
                project?.previewImage
                  ? `data:image/jpeg;base64,${project?.previewImage}`
                  : undefined
              }
              h={{ base: 190, sm: 300 }}
              w={{ base: "100%", sm: "auto" }}
              mb={16}
            />
          )}

          <Text c="#374151" component="div">
            {project?.description}
          </Text>

          {(project?.links[0] || project?.links[1] || project?.links[2]) !==
            null && (
            <Box py={8}>
              <Text component="div" fz={16} fw={600}>
                Ссылки
              </Text>

              {project?.links[0] && (
                <NavLink to={project?.links[0]}>
                  <Flex gap={2} align="center">
                    <BrandGithub color="#4f46e5" size={20} />
                    <Text c="#4f46e5" fz={20}>
                      GitHub
                    </Text>
                  </Flex>
                </NavLink>
              )}

              {project?.links[1] && (
                <NavLink to={project?.links[1]}>
                  <Flex gap={0} align="center">
                    <Link color="#30b06b" size={20} />
                    <Text c="#30b06b" fz={20}>
                      Demo
                    </Text>
                  </Flex>
                </NavLink>
              )}

              {project?.links[2] && (
                <NavLink to={project?.links[2]}>
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
              to={`/profile/${author.userId}`}
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
