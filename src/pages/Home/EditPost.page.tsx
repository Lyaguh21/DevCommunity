import {
  ActionIcon,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Input,
  LoadingOverlay,
  Select,
  Text,
  Textarea,
} from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router";
import classes from "./classes/Home.module.css";
import { notifications } from "@mantine/notifications";
import { useAuthStore } from "../../stores/authStore";
import axios from "axios";
import { API } from "../../app/helpers";
import { Project } from "../../entities/user/Project.interface";
import { Directions } from "../../entities/post/Directions";
import { TypeNotHRPost, TypePost } from "../../entities/post/Type";

export default function EditPost() {
  const [project, setProject] = useState<Project>();
  const { user } = useAuthStore();
  const { id } = useParams();
  const { state } = useLocation();
  const author = state.author;

  const [desktopPreview, setDesktopPreview] = useState<string | null>(null);
  const [desktopFile, setDesktopFile] = useState<FileWithPath | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      title: "",
      content: "",
      type: "",
      direction: "",
      previewImage: "",
    },
    validate: {
      title: (value) =>
        value.trim().length < 3 ? "Название слишком короткое" : null,
      direction: (value) =>
        value.length == 0 ? "Выберите направление поста" : null,
      type: (value) => (value.length == 0 ? "Выберите тип поста" : null),
      content: (value) =>
        value.trim().length < 5 ? "Текст поста слишком короткий" : null,
    },
  });

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${API}/posts/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        const userData = res.data;
        setProject(userData);

        // Обновляем значения формы
        form.setValues({
          title: userData.title || "",
          direction: userData.direction || "",
          type: userData.type || "",
          content: userData.content || "",
          previewImage: userData.previewImage || "",
        });
        console.log(author);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id, author.userId]);

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
    setLoading(true);
    axios
      .patch(
        `${API}/posts/${id}`,
        {
          title: form.values.title,
          direction: form.values.direction,
          type: form.values.type,
          content: form.values.content,
          previewImage: form.values.previewImage,
        },
        {
          withCredentials: true,
        }
      )
      .then(() =>
        notifications.show({
          title: "Успешно",
          message: "Проект обновлен!",
          color: "green",
        })
      )
      .catch(() =>
        notifications.show({
          title: "Ошибка",
          message: "Не удалось изменить проект",
          color: "red",
        })
      )
      .finally(() => {
        setLoading(false);
        navigate(`/post/${id}`);
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

  if (user?.id !== author?.userId) {
    return (
      <Center mih="94vh">У вас нет доступа к редактированию этого поста</Center>
    );
  }

  return (
    <Box py={16} mih="94vh">
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 1 }}
      />
      <Box bg="white" p={24} className={classes.shadow}>
        <Text ta="center" fz={22} fw={500} c="#4f46e5" mb={8}>
          Редактирование поста
        </Text>
        <form>
          <Flex gap={16} mb={16} wrap={{ base: "wrap", md: "nowrap" }}>
            <Flex gap={16} direction="column" w={{ md: "385px", base: "100%" }}>
              <Input.Wrapper
                label="Название"
                classNames={{ label: classes.label }}
                withAsterisk
                errorProps={{ style: { display: "none" } }}
              >
                <Input
                  w={{ md: "385px", base: "100%" }}
                  placeholder="Введите название поста"
                  size="lg"
                  c="#4f46e5"
                  radius="6px"
                  maxLength={100}
                  {...form.getInputProps("title")}
                />
              </Input.Wrapper>
              <Input.Wrapper
                label="Направление поста"
                classNames={{ label: classes.label }}
                withAsterisk
              >
                <Select
                  data={Directions}
                  w={{ md: "385px", base: "100%" }}
                  placeholder="Введите направление поста"
                  key={form.key("direction")}
                  size="lg"
                  errorProps={{ style: { display: "none" } }}
                  {...form.getInputProps("direction")}
                />
              </Input.Wrapper>
              <Input.Wrapper
                label="Тип поста"
                classNames={{ label: classes.label }}
                withAsterisk
              >
                <Select
                  w={{ md: "385px", base: "100%" }}
                  data={user?.role == "HR" ? TypePost : TypeNotHRPost}
                  placeholder="Введите тип поста"
                  key={form.key("type")}
                  size="lg"
                  errorProps={{ style: { display: "none" } }}
                  {...form.getInputProps("type")}
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
                loading={loading}
                onDrop={(files) => {
                  setDesktopFile(files[0]);
                  setDesktopPreview(URL.createObjectURL(files[0]));
                  handleImageUpload(files[0]);
                }}
                h={{ md: "240px", base: "240px" }}
                maxSize={2 * 1024 * 1024}
                w="100%"
                styles={{
                  root: {
                    backgroundImage: desktopPreview
                      ? `url(${desktopPreview})`
                      : project?.previewImage
                      ? `url(data:image/jpeg;base64,${project?.previewImage})`
                      : undefined,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundColor:
                      !desktopPreview && !project?.previewImage
                        ? "#f8f9fa"
                        : undefined,
                  },
                }}
              >
                {!desktopPreview && !project?.previewImage && (
                  <Grid>
                    <Grid.Col h={80}>
                      <Text ta={"center"} fz={18} c="#b5b6bd">
                        Перетащите изображение сюда или нажмите на область
                      </Text>
                      <Text ta={"center"} fz={18} c="#b5b6bd">
                        Поддерживаемые форматы: jpg, jpeg, png
                      </Text>
                      <Text ta={"center"} fz={18} c="#b5b6bd">
                        Максимальный размер файла 2 MB
                      </Text>
                    </Grid.Col>
                  </Grid>
                )}

                {desktopPreview && (
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
                          form.setFieldValue("avatar", "");
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
            </Flex>
          </Flex>
          <Textarea
            withAsterisk
            rows={8}
            label="Текст"
            size="lg"
            errorProps={{ style: { display: "none" } }}
            placeholder="Напишите текст к своему посту в формате Markdown

Пример:
# Заголовок
## Подзаголовок
**Жирный текст**
[Ссылка](https://example.com)
*Курсив*
`код`
> Цитата"
            {...form.getInputProps("content")}
          />
          <Flex justify="flex-end" mt={24} gap={16}>
            <NavLink to={`/portfolio/${author?.userId}`}>
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
              w={200}
              bg="#4f46e5"
              radius="6px"
              onClick={() => form.onSubmit(handleSubmit, handleError)()}
            >
              Редактировать
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
}
