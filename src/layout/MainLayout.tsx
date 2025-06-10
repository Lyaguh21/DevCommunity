import { Outlet } from "react-router";
import Header from "../entities/Header/Header";
import { Box } from "@mantine/core";

export default function MainLayout() {
  return (
    <Box h="100vh" bg="#f9fafb">
      <Header />
      <Outlet />
    </Box>
  );
}
