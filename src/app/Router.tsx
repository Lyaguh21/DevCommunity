import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home.page";
import AuthLayout from "../layout/AuthLayout";
import Error from "../pages/Errors/Error404.page";
import Login from "../pages/auth/Login.page";
import Register from "../pages/auth/Register.page";
import Portfolio from "../pages/portfolio/Portfolio.page";
import Profile from "../pages/profile/Profile.page";
import CreatePost from "../pages/Home/CreatePost.page";
import ViewPost from "../pages/Home/ViewPost.page";
import EditProfile from "../pages/profile/EditProfile.page";
import ViewProject from "../pages/portfolio/ViewProject.page";
import RequireAuth from "./RequireAuth";
import CreateProject from "../pages/portfolio/CreateProject.page";
import Error404 from "../pages/Errors/Error404.page";
import ErrorNotFound from "../pages/Errors/ErrorNotFound";
import EditProject from "../pages/portfolio/EditProject.page";

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
