import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  PasswordInput,
  Text,
} from "@mantine/core";
import { NavLink } from "react-router";
import { UserCircle } from "tabler-icons-react";
import classes from "./classes/AuthStyles.module.css";

export default function Login() {
  return (
    <Box
      bg="white"
      p={32}
      style={{ borderRadius: "12px" }}
      className={classes.shadow}
    >
      <Center>
        <UserCircle height={48} width={48} color="#4f46e5" />
      </Center>
      <Center>
        <Text fw={700} fz={24}>
          Вход в аккаунт
        </Text>
      </Center>

      <form>
        <Flex direction="column" gap={16} mt={8}>
          <Input.Wrapper label="Никнейм" classNames={{ label: classes.label }}>
            <Input
              w={385}
              placeholder="Введите ваш никнейм"
              size="lg"
              c="#4f46e5"
              radius="6px"
            />
          </Input.Wrapper>
          <Input.Wrapper label="Пароль" classNames={{ label: classes.label }}>
            <PasswordInput
              w={385}
              placeholder="Введите ваш пароль"
              size="lg"
              c="#4f46e5"
              radius="6px"
            />
          </Input.Wrapper>

          <Button type="submit" fullWidth h={50} bg="#4f46e5" radius="6px">
            Войти
          </Button>

          <Center>
            <Text fw={500} fz={14} c="#374151">
              Нет аккаунта?{" "}
              <NavLink
                to="/auth/register"
                color="#4f46e5"
                style={{ textDecoration: "underline" }}
              >
                Зарегистрироваться
              </NavLink>
            </Text>
          </Center>
        </Flex>
      </form>
    </Box>
  );
}
