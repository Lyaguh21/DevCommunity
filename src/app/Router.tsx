import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home.page";
import AuthLayout from "../layout/AuthLayout";
import Error from "../pages/Error.page";
import Login from "../pages/auth/Login.page";
import Register from "../pages/auth/Register.page";
import Portfolio from "../pages/portfolio/Portfolio.page";
import Profile from "../pages/profile/Profile.page";
import CreatePost from "../pages/Home/CreatePost.page";
import ViewPost from "../pages/Home/ViewPost.page";

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
        path: "/createPost",
        element: <CreatePost />,
      },
      {
        path: "/post/:id",
        element: <ViewPost />,
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
