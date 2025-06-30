import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  LoadingOverlay,
  PasswordInput,
  Text,
} from "@mantine/core";
import { NavLink, useNavigate } from "react-router";
import { UserCircle } from "tabler-icons-react";
import classes from "./classes/AuthStyles.module.css";
import { useForm } from "@mantine/form";
import { useState } from "react";
import axios from "axios";
import { API } from "../../app/helpers";
import { notifications } from "@mantine/notifications";
import { useAuthStore } from "../../stores/authStore";

export default function Login() {
  const { setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      nickname: "",
      password: "",
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    axios
      .post(`${API}/auth/login`, {
        nickname: form.values.nickname,
        password: form.values.password,
      })
      .then((res) => {
        setLoading(true);
        setUser({
          id: res.data.id,
          token: res.data.JWTtoken,
          role: res.data.role,
          nickname: res.data.nickname,
        });
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        notifications.show({
          title: "Ошибка регистрации",
          message: err.response?.data?.message || "Произошла ошибка",
          color: "red",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Box
      bg="white"
      p={32}
      style={{ borderRadius: "12px" }}
      className={classes.shadow}
    >
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 1 }}
      />
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
              {...form.getInputProps("nickname")}
            />
          </Input.Wrapper>
          <Input.Wrapper label="Пароль" classNames={{ label: classes.label }}>
            <PasswordInput
              w={385}
              placeholder="Введите ваш пароль"
              size="lg"
              c="#4f46e5"
              radius="6px"
              {...form.getInputProps("password")}
            />
          </Input.Wrapper>

          <Button
            onClick={handleSubmit}
            fullWidth
            h={50}
            bg="#4f46e5"
            radius="6px"
          >
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
