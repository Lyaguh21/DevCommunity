import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  LoadingOverlay,
  PasswordInput,
  Select,
  Stepper,
  Text,
} from "@mantine/core";
import { NavLink } from "react-router";
import { FileArrowRight, FileCheck, UserCircle } from "tabler-icons-react";
import classes from "./classes/AuthStyles.module.css";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { IconArrowRight } from "@tabler/icons-react";
import { Roles } from "../../interfaces/Role";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { API } from "../../app/helpers";
import { useAuthStore } from "../../stores/authStore";

export default function Register() {
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useAuthStore();

  const form = useForm({
    initialValues: {
      nickname: "",
      password: "",
      confirmPassword: "",
      email: "",
      firstname: "",
      lastname: "",
      role: "",
    },

    validate: (values) => {
      if (active === 0) {
        return {
          nickname:
            values.nickname.trim().length < 2
              ? "Никнейм слишком короткий"
              : null,
          password:
            values.password.length < 8
              ? "Пароль должен содержать минимум 8 символов"
              : null,
          confirmPassword:
            values.password !== values.confirmPassword
              ? "Пароли не совпадают"
              : null,
        };
      }

      if (active === 1) {
        return {
          firstname:
            values.firstname.trim().length < 3 ? "Имя слишком короткое" : null,
          lastname:
            values.lastname.trim().length < 3
              ? "Фамилия слишком короткая"
              : null,
          email: /^\S+@\S+$/.test(values.email) ? null : "Некорректный email",
          role: values.role !== "" ? null : "Роль не выбрана",
        };
      }

      return {};
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

  const nextStep = () => {
    const errors = form.validate();
    if (errors.hasErrors) {
      handleError(errors.errors);
      return;
    }
    setActive((current) => (current < 2 ? current + 1 : current));
  };

  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
  };

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    axios
      .post(
        `${API}/auth/register`,
        {
          nickname: form.values.nickname,
          password: form.values.password,
          firstName: form.values.firstname,
          lastName: form.values.lastname,
          email: form.values.email,
          role: form.values.role,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setLoading(true);
        setUser({
          id: res.data.id,
          role: res.data.role,
          nickname: res.data.nickname,
        });
        nextStep();
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

  // Функция для получения стилей поля с ошибкой
  const getFieldStyles = (fieldName: string) => ({
    input: {
      borderColor: form.errors[fieldName] ? "red" : undefined,
      "&:focus": {
        borderColor: form.errors[fieldName] ? "red" : "#4f46e5",
      },
    },
  });

  return (
    <Box
      bg="white"
      p={32}
      style={{ borderRadius: "12px" }}
      mih={575}
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
          Создать аккаунт
        </Text>
      </Center>
      <Flex direction="column" justify="space-between" mih={426}>
        <Stepper active={active} mb={16} color="#4f46e5">
          <Stepper.Step icon={<FileArrowRight color="#4f46e5" />}>
            <form>
              <Flex direction="column" gap={16} mt={8}>
                <Input.Wrapper
                  label="Никнейм"
                  classNames={{ label: classes.label }}
                  errorProps={{ style: { display: "none" } }}
                >
                  <Input
                    w={385}
                    placeholder="Введите ваш никнейм"
                    size="lg"
                    c="#4f46e5"
                    radius="6px"
                    key={form.key("nickname")}
                    {...form.getInputProps("nickname")}
                    styles={getFieldStyles("nickname")}
                  />
                </Input.Wrapper>
                <Input.Wrapper
                  label="Пароль"
                  classNames={{ label: classes.label }}
                  errorProps={{ style: { display: "none" } }}
                >
                  <PasswordInput
                    w={385}
                    placeholder="Введите ваш пароль"
                    size="lg"
                    c="#4f46e5"
                    radius="6px"
                    errorProps={{ style: { display: "none" } }}
                    key={form.key("password")}
                    {...form.getInputProps("password")}
                    styles={getFieldStyles("password")}
                  />
                </Input.Wrapper>

                <Input.Wrapper
                  label="Подтверждение пароля"
                  classNames={{ label: classes.label }}
                  errorProps={{ style: { display: "none" } }}
                >
                  <PasswordInput
                    w={385}
                    placeholder="Повторите свой пароль"
                    size="lg"
                    c="#4f46e5"
                    errorProps={{ style: { display: "none" } }}
                    radius="6px"
                    key={form.key("confirmPassword")}
                    {...form.getInputProps("confirmPassword")}
                    styles={getFieldStyles("confirmPassword")}
                  />
                </Input.Wrapper>
              </Flex>
            </form>
          </Stepper.Step>

          <Stepper.Step icon={<FileCheck color="#4f46e5" />}>
            <form>
              <Flex gap={16} direction="column">
                <Flex gap={16} w={385} mt={8}>
                  <Input.Wrapper
                    label="Имя"
                    classNames={{ label: classes.label }}
                    errorProps={{ style: { display: "none" } }}
                  >
                    <Input
                      placeholder="Ваше имя"
                      size="lg"
                      key={form.key("firstname")}
                      {...form.getInputProps("firstname")}
                      styles={getFieldStyles("firstname")}
                    />
                  </Input.Wrapper>
                  <Input.Wrapper
                    label="Фамилия"
                    classNames={{ label: classes.label }}
                    errorProps={{ style: { display: "none" } }}
                  >
                    <Input
                      placeholder="Ваша фамилия"
                      size="lg"
                      key={form.key("lastname")}
                      {...form.getInputProps("lastname")}
                      styles={getFieldStyles("lastname")}
                    />
                  </Input.Wrapper>
                </Flex>

                <Input.Wrapper
                  label="Email"
                  classNames={{ label: classes.label }}
                  errorProps={{ style: { display: "none" } }}
                >
                  <Input
                    placeholder="Ваша почта"
                    size="lg"
                    key={form.key("email")}
                    {...form.getInputProps("email")}
                    styles={getFieldStyles("email")}
                  />
                </Input.Wrapper>

                <Input.Wrapper
                  label="Роль"
                  classNames={{ label: classes.label }}
                  errorProps={{ style: { display: "none" } }}
                >
                  <Select
                    data={Roles}
                    {...form.getInputProps("role")}
                    key={form.key("role")}
                    placeholder="Ваша роль"
                    size="lg"
                    errorProps={{ style: { display: "none" } }}
                    styles={getFieldStyles("role")}
                  />
                </Input.Wrapper>
              </Flex>
            </form>
          </Stepper.Step>

          <Stepper.Completed>
            <Text size="30px" mt={40} fw={700} w={385} mb="md" ta="center">
              Регистрация завершена!
            </Text>
          </Stepper.Completed>
        </Stepper>

        {active === 0 && (
          <Button onClick={nextStep} h={50} bg="#4f46e5" fullWidth radius="6px">
            Продолжить
          </Button>
        )}
        {active === 1 && (
          <Flex gap={16}>
            <Button
              variant="default"
              h={50}
              bg="#4f46e5"
              radius="6px"
              onClick={prevStep}
              w="50%"
              c="white"
            >
              Назад
            </Button>
            <Button
              loading={loading}
              onClick={() => form.onSubmit(handleSubmit, handleError)()}
              h={50}
              bg="#4f46e5"
              radius="6px"
              w="50%"
            >
              Зарегистрироваться
            </Button>
          </Flex>
        )}
        {active === 2 && (
          <Center mb={100}>
            <NavLink to="/">
              <Button bg="#4f46e5" radius="100px" h={80} w={80} p={5}>
                <IconArrowRight size={50} />
              </Button>
            </NavLink>
          </Center>
        )}

        {active !== 2 && (
          <Center mt={16}>
            <Text fw={500} fz={14} c="#374151">
              Есть аккаунт?{" "}
              <NavLink
                to="/auth/login"
                color="#4f46e5"
                style={{ textDecoration: "underline" }}
              >
                Войти
              </NavLink>
            </Text>
          </Center>
        )}
      </Flex>
    </Box>
  );
}
