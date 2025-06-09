import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home.page";
import AuthLayout from "../layout/AuthLayout";
import Error from "../pages/Error.page";
import Login from "../pages/Login.page";
import Register from "../pages/Register.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
