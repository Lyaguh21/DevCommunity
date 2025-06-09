import { Outlet } from "react-router";
import Header from "../entities/Header/header";

export default function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
