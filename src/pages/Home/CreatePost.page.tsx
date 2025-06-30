import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Grid,
  Input,
  LoadingOverlay,
  Select,
  Text,
  Textarea,
} from "@mantine/core";
import { NavLink } from "react-router";

import classes from "./classes/Home.module.css";
import { TypePost } from "../../interfaces/Type";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";
import "@mantine/dropzone/styles.css";
import { useForm } from "@mantine/form";
import { Directions } from "../../interfaces/Directions";

export default function CreatePost() {
  const [desktopPreview, setDesktopPreview] = useState<string | null>(null);
  const [desktopFile, setDesktopFile] = useState<FileWithPath | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      title: "",
      content: "",
      type: "",
      direction: "",
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
    <Box py={16} mih="94vh">
      <Box bg="white" p={24} className={classes.shadow}>
        <LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 1 }}
        />
        <Text ta="center" fz={22} fw={500} c="#4f46e5" mb={8}>
          Создание поста
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
                  size="lg"
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
                  data={TypePost}
                  placeholder="Введите тип поста"
                  size="lg"
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
                onDrop={(files) => {
                  setDesktopFile(files[0]),
                    setDesktopPreview(URL.createObjectURL(files[0]));
                }}
                h={{ md: "100%", base: "240px" }}
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
              onClick={() => form.onSubmit(handleSubmit)()}
            >
              Создать
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
}
