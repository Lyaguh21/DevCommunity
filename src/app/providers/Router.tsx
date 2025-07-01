import { createBrowserRouter, RouterProvider } from "react-router";

import AuthLayout from "../../layout/AuthLayout";
import MainLayout from "../../layout/MainLayout";
import Register from "../../pages/auth/Register.page";
import ErrorNotFound from "../../pages/Errors/ErrorNotFound.page";
import CreatePost from "../../pages/Home/CreatePost.page";
import ViewPost from "../../pages/Home/ViewPost.page";
import CreateProject from "../../pages/portfolio/CreateProject.page";
import EditProject from "../../pages/portfolio/EditProject.page";
import Portfolio from "../../pages/portfolio/Portfolio.page";
import ViewProject from "../../pages/portfolio/ViewProject.page";
import EditProfile from "../../pages/profile/EditProfile.page";
import Profile from "../../pages/profile/Profile.page";
import RequireAuth from "./RequireAuth";
import Home from "../../pages/Home/Home.page";
import Login from "../../pages/auth/Login.page";
import Error404 from "../../pages/Errors/Error404.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/createPost",
            element: <CreatePost />,
          },
          {
            path: "/post/:id",
            element: <ViewPost />,
          },
          {
            path: "/profile/:id",
            element: <Profile />,
            errorElement: <ErrorNotFound />,
          },
          {
            path: "/profile/edit",
            element: <EditProfile />,
          },
          {
            path: "/portfolio/:id",
            element: <Portfolio />,
          },
          {
            path: "/portfolio/project/:id",
            element: <ViewProject />,
          },
          {
            path: "/portfolio/createProject",
            element: <CreateProject />,
          },
          {
            path: "/portfolio/EditProject/:id",
            element: <EditProject />,
          },
        ],
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
    element: <Error404 />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
