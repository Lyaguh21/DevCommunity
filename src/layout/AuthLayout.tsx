import { Center } from "@mantine/core";
import { Outlet } from "react-router";
import classes from "./classes/layoutStyle.module.css";

export default function AuthLayout() {
  return (
    <Center className={classes.authBg} h="100vh">
      <Outlet />
    </Center>
  );
}
