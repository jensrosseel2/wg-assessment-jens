import { createRoot } from "react-dom/client";
import "./App.css";
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layout/Layout.tsx";
import AddOrEditUser from "./pages/AddOrEditUser.tsx";
import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserOverview from "./pages/UserOverview.tsx";

const queryClient = new QueryClient();

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
            element: (
              <QueryClientProvider client={queryClient}>
                <UserOverview />
              </QueryClientProvider>
            ),
          },
          {
            path: "add",
            element: <AddOrEditUser />,
          },
          {
            path: "edit/:id",
            element: (
              <QueryClientProvider client={queryClient}>
                <AddOrEditUser />
              </QueryClientProvider>
            ),
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
