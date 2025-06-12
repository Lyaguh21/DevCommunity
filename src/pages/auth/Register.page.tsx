import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  PasswordInput,
  Select,
  Stepper,
  Text,
} from "@mantine/core";
import { NavLink } from "react-router";
import {
  ClipboardText,
  FileArrowRight,
  FileCheck,
  UserCircle,
} from "tabler-icons-react";
import classes from "./classes/AuthStyles.module.css";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { IconArrowRight } from "@tabler/icons-react";
import { Roles } from "../../interfaces/Role";

export default function Register() {
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      nickname: "",
      password: "",
      confirmPassword: "",

      email: "",
      name: "",
      surname: "",
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
          email: /^\S+@\S+$/.test(values.email) ? null : "Некорректный email",
          name: values.name.trim().length < 2 ? "Имя слишком короткое" : null,
          surname:
            values.surname.trim().length < 2
              ? "Фамилия слишком короткая"
              : null,
          role: values.role !== "" ? null : "Роль не выбрана",
        };
      }

      return {};
    },
  });

  const nextStep = () => {
    if (form.validate().hasErrors) return;
    setActive((current) => (current < 2 ? current + 1 : current));
  };

  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
  };

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
    <Box
      bg="white"
      p={32}
      style={{ borderRadius: "12px" }}
      mih={575}
      className={classes.shadow}
    >
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
                >
                  <Input
                    w={385}
                    placeholder="Введите ваш никнейм"
                    size="lg"
                    c="#4f46e5"
                    radius="6px"
                    {...form.getInputProps("nickname")}
                  />
                </Input.Wrapper>
                <Input.Wrapper
                  label="Пароль"
                  classNames={{ label: classes.label }}
                >
                  <PasswordInput
                    w={385}
                    placeholder="Введите ваш пароль"
                    size="lg"
                    c="#4f46e5"
                    radius="6px"
                    {...form.getInputProps("password")}
                  />
                </Input.Wrapper>

                <Input.Wrapper
                  label="Подтверждение пароля"
                  classNames={{ label: classes.label }}
                >
                  <PasswordInput
                    w={385}
                    placeholder="Повторите свой пароль"
                    size="lg"
                    c="#4f46e5"
                    radius="6px"
                    {...form.getInputProps("confirmPassword")}
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
                  >
                    <Input
                      placeholder="Ваше имя"
                      size="lg"
                      {...form.getInputProps("name")}
                    />
                  </Input.Wrapper>
                  <Input.Wrapper
                    label="Фамилия"
                    classNames={{ label: classes.label }}
                  >
                    <Input
                      placeholder="Ваша фамилия"
                      size="lg"
                      {...form.getInputProps("surname")}
                    />
                  </Input.Wrapper>
                </Flex>

                <Input.Wrapper
                  label="Email"
                  classNames={{ label: classes.label }}
                >
                  <Input
                    placeholder="Ваша почта"
                    size="lg"
                    {...form.getInputProps("email")}
                  />
                </Input.Wrapper>

                <Input.Wrapper
                  label="Роль"
                  classNames={{ label: classes.label }}
                >
                  <Select
                    data={Roles}
                    {...form.getInputProps("role")}
                    placeholder="Ваша роль"
                    size="lg"
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
              onClick={() => {
                form.onSubmit(handleSubmit)();
                nextStep();
              }}
              h={50}
              bg="#4f46e5"
              radius="6px"
              w="50%"
            >
              Продолжить
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
