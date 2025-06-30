import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Grid,
  Input,
  LoadingOverlay,
  Text,
  Textarea,
} from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import classes from "./classes/portfolio.module.css";
import { notifications } from "@mantine/notifications";
import { useAuthStore } from "../../stores/authStore";
import axios from "axios";
import { API } from "../../app/helpers";

export default function CreateProject() {
  const [desktopPreview, setDesktopPreview] = useState<string | null>(null);
  const [desktopFile, setDesktopFile] = useState<FileWithPath | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      title: "",
      content: "",
      gitHubLink: "",
      demoLink: "",
      designLink: "",
      previewImage: "",
    },
    validate: {
      title: (value) =>
        value.trim().length < 3 ? "Название слишком короткое" : null,

      gitHubLink: (value) => {
        if (value && value.trim() !== "") {
          return !/^https?:\/\//i.test(value.trim())
            ? "Ссылка должна начинаться с http:// или https://"
            : null;
        }
        return null;
      },

      demoLink: (value) => {
        if (value && value.trim() !== "") {
          return !/^https?:\/\//i.test(value.trim())
            ? "Ссылка должна начинаться с http:// или https://"
            : null;
        }
        return null;
      },

      designLink: (value) => {
        if (value && value.trim() !== "") {
          return !/^https?:\/\//i.test(value.trim())
            ? "Ссылка должна начинаться с http:// или https://"
            : null;
        }
        return null;
      },
    },
  });

  const handleError = (errors: typeof form.errors) => {
    // Показываем уведомление для первой ошибки
    const firstError = Object.values(errors)[0];
    if (firstError) {
      notifications.show({
        title: "Ошибка",
        message: firstError,
        color: "red",
      });
    }
  };

  const handleSubmit = async (values: typeof form.values) => {
    const errors = form.validate();
    if (errors.hasErrors) {
      handleError(errors.errors);
      return;
    }
    setLoading(true);
    axios
      .post(
        `${API}/users/${user?.id}/portfolio`,
        {
          title: form.values.title,
          description: form.values.content,
          links: [
            form.values.gitHubLink === "" ? null : form.values.gitHubLink,
            form.values.demoLink === "" ? null : form.values.demoLink,
            form.values.designLink === "" ? null : form.values.designLink,
          ],
          previewImage: form.values.previewImage,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        notifications.show({
          title: "Успешно",
          message: "Проект создан!",
          color: "green",
        });
      })
      .finally(() => {
        setLoading(false);
        navigate(`/portfolio/${user?.id}`);
      });
  };

  const handleImageUpload = async (file: FileWithPath) => {
    setLoading(true);
    try {
      // Создаем FormData и добавляем файл
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(`${API}/image`, formData, {
        withCredentials: true,

        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const base64Image = response.data.base64;

      form.setFieldValue("previewImage", base64Image);
      console.log(form.values);
      notifications.show({
        title: "Успешно",
        message: "Изображение загружено!",
        color: "green",
      });
    } catch (error) {
      notifications.show({
        title: "Ошибка",
        message: "Не удалось загрузить изображение",
        color: "red",
      });
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box py={16} mih="94vh">
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 1 }}
      />
      <Box bg="white" p={24} className={classes.shadow}>
        <Text ta="center" fz={22} fw={500} c="#4f46e5" mb={8}>
          Добавление проекта
        </Text>
        <form>
          <Flex gap={16} mb={16} wrap={{ base: "wrap", md: "nowrap" }}>
            <Flex gap={16} direction="column" w={{ md: "385px", base: "100%" }}>
              <Input.Wrapper
                label="Название"
                classNames={{ label: classes.label }}
                withAsterisk
              >
                <Input
                  w={{ md: "385px", base: "100%" }}
                  placeholder="Введите название проекта"
                  size="lg"
                  c="#4f46e5"
                  radius="6px"
                  maxLength={100}
                  {...form.getInputProps("title")}
                />
              </Input.Wrapper>
              <Input.Wrapper
                label="Github "
                classNames={{ label: classes.label }}
              >
                <Input
                  w={{ md: "385px", base: "100%" }}
                  placeholder="Введите ссылку на Github"
                  size="lg"
                  c="#4f46e5"
                  radius="6px"
                  maxLength={100}
                  {...form.getInputProps("gitHubLink")}
                />
              </Input.Wrapper>
              <Input.Wrapper label="Демо" classNames={{ label: classes.label }}>
                <Input
                  w={{ md: "385px", base: "100%" }}
                  placeholder="Введите ссылку на демо проекта"
                  size="lg"
                  c="#4f46e5"
                  radius="6px"
                  maxLength={100}
                  {...form.getInputProps("demoLink")}
                />
              </Input.Wrapper>
              <Input.Wrapper
                label="Дизайн"
                classNames={{ label: classes.label }}
              >
                <Input
                  w={{ md: "385px", base: "100%" }}
                  placeholder="Введите ссылку на дизайн проекта"
                  size="lg"
                  c="#4f46e5"
                  radius="6px"
                  maxLength={100}
                  {...form.getInputProps("designLink")}
                />
              </Input.Wrapper>
            </Flex>

            <Flex direction="column" w="100%">
              <Text fz={18} fw={500}>
                Изображение
              </Text>
              <Dropzone
                classNames={{ root: classes.input }}
                accept={IMAGE_MIME_TYPE}
                onDrop={(files) => {
                  setDesktopFile(files[0]);
                  setDesktopPreview(URL.createObjectURL(files[0]));
                  handleImageUpload(files[0]);
                }}
                h={240}
                w="100%"
                styles={{
                  root: desktopPreview
                    ? {
                        backgroundImage: `url(${desktopPreview})`,
                        backgroundSize: "cover",
                        backgroundPosition: "top",
                        backgroundRepeat: "no-repeat",
                      }
                    : { pointerEvents: desktopPreview ? "none" : "auto" },
                }}
              >
                {!desktopPreview ? (
                  <Grid>
                    <Grid.Col h={80}>
                      <Text ta={"center"} fz={18} c="#b5b6bd">
                        Перетащите изображение сюда или нажмите на область
                      </Text>
                      <Text ta={"center"} fz={18} c="#b5b6bd">
                        Поддерживаемые форматы: jpg, jpeg, png
                      </Text>
                      <Text ta={"center"} fz={18} c="#b5b6bd">
                        Максимальный размер файла 5 MB
                      </Text>
                    </Grid.Col>
                  </Grid>
                ) : (
                  <Box
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      color: "white",
                      padding: "10px 10px",
                      borderRadius: 5,
                      display: "flex",
                      gap: 20,
                      height: "53px",
                      zIndex: 10,
                      pointerEvents: "auto",
                    }}
                  >
                    <Flex justify={"space-between"} align={"center"} gap={12}>
                      <ActionIcon
                        bg="white"
                        h={30}
                        w={30}
                        radius="lg"
                        variant="transparent"
                        color="white"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDesktopPreview(null);
                          setDesktopFile(null);
                          form.setFieldValue("previewImage", "");
                        }}
                      >
                        <IconX size={20} color="black" />
                      </ActionIcon>
                      <div>
                        <Text size="sm" fw={500}>
                          {desktopFile?.name}
                        </Text>
                        <Text size="12px" c="#9E9E9E">
                          {(desktopFile?.size / 1024 / 1024).toFixed(2)} MB
                        </Text>
                      </div>
                    </Flex>
                  </Box>
                )}
              </Dropzone>
              <Textarea
                rows={8}
                label="Текст"
                size="lg"
                placeholder="Напишите текст к своему проекту"
                {...form.getInputProps("content")}
              />
            </Flex>
          </Flex>

          <Flex justify="flex-end" mt={24} gap={16}>
            <NavLink to="/">
              <Button
                h={50}
                fz={18}
                w={150}
                radius="6px"
                variant="outline"
                color="#000"
              >
                Отмена
              </Button>
            </NavLink>
            <Button
              h={50}
              fz={18}
              w={150}
              bg="#4f46e5"
              radius="6px"
              onClick={() => form.onSubmit(handleSubmit, handleError)()}
            >
              Создать
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
}
