import { createBrowserRouter } from "react-router-dom";
import Home from "../layout/Home";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Layout from "./Layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "*",
        element: <div>This in an invalid route</div>,
      },
    ],
  },
]);

export default router;
