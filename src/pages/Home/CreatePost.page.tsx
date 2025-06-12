import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Text,
  Textarea,
  UnstyledButton,
} from "@mantine/core";
import { NavLink } from "react-router";
import { CaretLeft } from "tabler-icons-react";
import classes from "./classes/Home.module.css";
import { Roles } from "../../interfaces/Role";
import { TypePost } from "../../interfaces/Type";

export default function CreatePost() {
  return (
    <Box py={32}>
      <Flex align="center" mb={16}>
        <NavLink
          to="/"
          style={{
            textDecoration: "none",
            color: "black",
          }}
        >
          <UnstyledButton>
            <Flex align="center">
              <CaretLeft fill="dark" />{" "}
              <Text fz={22} fw={600}>
                Назад
              </Text>
            </Flex>
          </UnstyledButton>
        </NavLink>

        <Text
          fz={22}
          fw={700}
          style={{
            position: "absolute",
            left: "49%",
            transform: "translateX(-50%)",
          }}
          c={"#4f46e5"}
        >
          Создание поста
        </Text>
      </Flex>

      <form>
        <Flex gap={32} mb={32}>
          <Flex gap={16} direction="column">
            <Input.Wrapper
              label="Название"
              classNames={{ label: classes.label }}
            >
              <Input
                w={385}
                placeholder="Введите название поста"
                size="lg"
                c="#4f46e5"
                radius="6px"
              />
            </Input.Wrapper>
            <Input.Wrapper
              label="Направление"
              classNames={{ label: classes.label }}
            >
              <Select data={Roles} placeholder="Направление поста" size="lg" />
            </Input.Wrapper>
            <Input.Wrapper label="Тип" classNames={{ label: classes.label }}>
              <Select
                data={TypePost}
                placeholder="Направление поста"
                size="lg"
              />
            </Input.Wrapper>
          </Flex>

          {/* <Dropzone/> */}
        </Flex>
        <Textarea
          rows={9}
          label="Текст"
          size="lg"
          placeholder="Напишите текст к своему посту в формате Markdown"
        />

        <Flex justify="flex-end" mt={32}>
          <Button
            type="submit"
            h={50}
            fz={18}
            w={150}
            bg="#4f46e5"
            radius="6px"
          >
            Создать
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
