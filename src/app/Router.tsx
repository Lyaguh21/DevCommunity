import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home.page";
import AuthLayout from "../layout/AuthLayout";
import Error from "../pages/Error.page";
import Login from "../pages/auth/Login.page";
import Register from "../pages/auth/Register.page";
import Portfolio from "../pages/Portfolio.page";
import Profile from "../pages/Profile.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/portfolio",
        element: <Portfolio />,
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
