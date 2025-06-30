import {
  Box,
  Button,
  Flex,
  Input,
  Textarea,
  Text,
  Select,
  Grid,
  ActionIcon,
  LoadingOverlay,
} from "@mantine/core";
import { UserProfile } from "../../interfaces/UserProfile";
import { useForm } from "@mantine/form";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import classes from "./classes/profile.module.css";
import { Roles } from "../../interfaces/Role";
import { useEffect, useState } from "react";
import { IconX } from "@tabler/icons-react";
import { NavLink } from "react-router";
import { useAuthStore } from "../../stores/authStore";
import axios from "axios";
import { API } from "../../app/helpers";
import { notifications } from "@mantine/notifications";

export default function EditProfile() {
  const [ThisUser, setThisUser] = useState<UserProfile>();
  const { user } = useAuthStore();
  const [desktopPreview, setDesktopPreview] = useState<string | null>(null);
  const [desktopFile, setDesktopFile] = useState<FileWithPath | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      avatar: "",
      firstName: "",
      lastName: "",
      nickname: "",
      role: "",
      description: "",
      workplace: "",
    },
  });

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${API}/users/${user?.id}`, {
        withCredentials: true,
      })
      .then((res) => {
        const userData = res.data;
        setThisUser(userData);

        // Обновляем значения формы
        form.setValues({
          avatar: userData.avatar || "",
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          nickname: userData.nickname || "",
          role: userData.role || "",
          description: userData.description || "",
          workplace: userData.workplace || "",
        });
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [user?.id]);

  // const handleSubmit = async (values: typeof form.values) => {
  //   setLoading(true);
  //   axios
  //     .patch(
  //       `${API}/users/${user?.id}`,
  //       {
  //         avatar: form.values.avatar,
  //         firstName: form.values.firstName,
  //         lastName: form.values.lastName,
  //         description: form.values.description,
  //         workplace: form.values.workplace,
  //         role: form.values.role,
  //       },
  //       {
  //         withCredentials: true, // Отправляем куки (JWT)
  //         headers: {
  //           "Content-Type": "application/json",
  //           // Уберите заголовок Authorization, если он был
  //           // (теперь токен передается через куки)
  //         },
  //       }
  //     )
  //     .then(() =>
  //       notifications.show({
  //         title: "Успешно",
  //         message: "Профиль обновлен!",
  //         color: "green",
  //       })
  //     )
  //     .catch(() =>
  //       notifications.show({
  //         title: "Ошибка",
  //         message: "Не удалось изменить профиль",
  //         color: "red",
  //       })
  //     )
  //     .finally(() => setLoading(false));
  // };

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);

    // Проверка наличия кук
    console.log("Текущие куки:", document.cookie);

    axios
      .patch(
        `${API}/users/${user?.id}`,
        { ...values },
        {
          withCredentials: true,
        }
      )
      .then(() =>
        notifications.show({
          title: "Успешно",
          message: "Профиль обновлен!",
          color: "green",
        })
      )
      .catch((error) => {
        console.error("Ошибка запроса:", error);
        if (error.response?.status === 401) {
          console.log("Куки не отправились или устарели!");
        }
      })
      .finally(() => setLoading(false));
  };

  const handleImageUpload = async (file: FileWithPath) => {
    setLoading(true);
    try {
      // Создаем FormData и добавляем файл
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(`${API}/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const base64Image = response.data.base64;

      form.setFieldValue("avatar", base64Image);

      notifications.show({
        title: "Успешно",
        message: "Изображение загружено!",
        color: "green",
      });
      console.log(base64Image);
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
    <Box py={16} mih="94vh" key={ThisUser?.id}>
      <Box bg="white" p={24} className={classes.shadow}>
        <LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 1 }}
        />
        <Text ta="center" fz={22} fw={500} c="#4f46e5" mb={8}>
          Редактирование профиля
        </Text>
        <form>
          <Flex gap={16} mb={16} wrap={{ base: "wrap", md: "nowrap" }}>
            <Flex gap={16} direction="column" w={{ md: "385px", base: "100%" }}>
              <Input.Wrapper label="Имя" classNames={{ label: classes.label }}>
                <Input
                  w={{ md: "385px", base: "100%" }}
                  placeholder="Введите ваше имя"
                  size="lg"
                  c="#4f46e5"
                  radius="6px"
                  maxLength={100}
                  {...form.getInputProps("firstName")}
                />
              </Input.Wrapper>
              <Input.Wrapper
                label="Фамилия"
                classNames={{ label: classes.label }}
              >
                <Input
                  w={{ md: "385px", base: "100%" }}
                  placeholder="Введите вашу фамилию"
                  size="lg"
                  c="#4f46e5"
                  radius="6px"
                  maxLength={100}
                  {...form.getInputProps("lastName")}
                />
              </Input.Wrapper>
              <Input.Wrapper
                label="Никнейм"
                classNames={{ label: classes.label }}
              >
                <Input
                  w={{ md: "385px", base: "100%" }}
                  placeholder="Введите ваш никнейм"
                  size="lg"
                  c="#4f46e5"
                  radius="6px"
                  maxLength={100}
                  disabled
                  {...form.getInputProps("nickname")}
                />
              </Input.Wrapper>
              <Input.Wrapper label="Роль" classNames={{ label: classes.label }}>
                <Select
                  w={{ md: "385px", base: "100%" }}
                  data={Roles}
                  placeholder="Выберите вашу роль"
                  size="lg"
                  {...form.getInputProps("role")}
                />
              </Input.Wrapper>

              <Input.Wrapper
                label="Место работы"
                classNames={{ label: classes.label }}
              >
                <Input
                  w={{ md: "385px", base: "100%" }}
                  placeholder="Введите место работы"
                  size="lg"
                  c="#4f46e5"
                  radius="6px"
                  maxLength={100}
                  {...form.getInputProps("workplace")}
                />
              </Input.Wrapper>
            </Flex>

            <Flex direction="column" w="100%">
              <Text fz={18} fw={500}>
                Аватарка
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
                      : ThisUser?.avatar
                      ? `url(data:image/jpeg;base64,${ThisUser.avatar})`
                      : undefined,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundColor:
                      !desktopPreview && !ThisUser?.avatar
                        ? "#f8f9fa"
                        : undefined,
                  },
                }}
              >
                {!desktopPreview && !ThisUser?.avatar && (
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
              <Textarea
                rows={8}
                label="О себе"
                size="lg"
                maxLength={350}
                placeholder="Напишите информацию о себе"
                {...form.getInputProps("description")}
              />
            </Flex>
          </Flex>

          <Flex justify="flex-end" mt={24} gap={16}>
            <NavLink to={`/profile/${ThisUser?.userId}`}>
              <Button
                h={50}
                fz={18}
                w={180}
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
              w={180}
              bg="#4f46e5"
              radius="6px"
              onClick={() => form.onSubmit(handleSubmit)()}
            >
              Редактировать
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
}
