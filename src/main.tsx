import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.tsx";
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layout/Layout.tsx";
import AddOrEditUser from "./pages/AddOrEditUser.tsx";
import { StrictMode } from "react";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate replace to="users" />,
      },
      {
        path: "/users",
        children: [
          {
            index: true,
            element: <App />,
          },
          {
            path: "add",
            element: <AddOrEditUser />,
          },
        ],
      },
    ],
  },
]);

// Enable React Strict Mode if you want to use it (components will be rendered twice)
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
