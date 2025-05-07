import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import Landing from "./pages/landing/Landing";
import ProtectedRoute from "./components/ProtectedRoute";
import DragonPage from "./pages/DragonPage";
import PublicRoute from "./components/PublicRoute";
import DragonDetailPage from "./pages/DragonDetail";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 1000 * 60 * 15,
    },
  },
});

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          { path: "/", element: <Landing /> },
          { path: "/", element: <Landing /> },
          { path: "*", element: <Landing /> },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/dragons", element: <DragonPage /> },
          { path: "/dragon/:id", element: <DragonDetailPage /> },
          { path: "*", element: <DragonPage /> },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
