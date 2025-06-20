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
} from "@mantine/core";
import { UserProfile } from "../../interfaces/UserProfile";
import { useForm } from "@mantine/form";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import classes from "./classes/profile.module.css";
import { Roles } from "../../interfaces/Role";
import { useState } from "react";
import { IconX } from "@tabler/icons-react";
import { NavLink } from "react-router";

export default function EditProfile() {
  const [desktopPreview, setDesktopPreview] = useState<string | null>(null);
  const [desktopFile, setDesktopFile] = useState<FileWithPath | null>(null);
  const [desktopLoading, setDesktopLoading] = useState(false);
  const user: UserProfile = {
    id: "1",
    firstName: "Игорь",
    lastName: "Малышев",
    nickname: "Lgorek2280",
    role: "Frontend",
    description:
      "В zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид  В zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид",
    workplace: 'OOO "ZUZU"',
    portfolio: [],
  };
  const form = useForm({
    initialValues: {
      avatar: user.avatar,
      firstname: user.firstName,
      lastname: user.lastName,
      nickname: user.nickname,
      role: user.role,
      description: user.description,
      workplace: user.workplace,
    },
  });
  const handleSubmit = async (values: typeof form.values) => {
    // setLoading(true);
    // try {
    //   // Здесь ваш API запрос для регистрации
    //   console.log("Регистрационные данные:", values);
    //   await new Promise((resolve) => setTimeout(resolve, 1000));
    //   // После успешной регистрации можно перенаправить пользователя
    //   // navigate('/dashboard');
    // } catch (error) {
    //   console.error("Ошибка регистрации:", error);
    // } finally {
    //   setLoading(false);
    // }
    console.log(form.values);
  };
  return (
    <Box py={32} key={user.id}>
      <Box bg="white" p={24} className={classes.shadow}>
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
                  {...form.getInputProps("firstname")}
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
                  {...form.getInputProps("lastname")}
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
                loading={desktopLoading}
                onDrop={(files) => {
                  setDesktopFile(files[0]),
                    setDesktopPreview(URL.createObjectURL(files[0]));
                }}
                h={{ md: "240px", base: "240px" }}
                w="100%"
                styles={{
                  root: desktopPreview
                    ? {
                        backgroundImage: `url(${desktopPreview})`,
                        backgroundSize: "contain",
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
            <NavLink to="/profile">
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
