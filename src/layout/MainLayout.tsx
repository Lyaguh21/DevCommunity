import { Outlet } from "react-router";
import Header from "../entities/Header/Header";
import { Box } from "@mantine/core";

export default function MainLayout() {
  return (
    <Box h="100%" bg="#f9fafb">
      <Header />
      <Box px={{ base: "20px", sm: "80px" }} pt={46}>
        <Outlet />
      </Box>
    </Box>
  );
}
