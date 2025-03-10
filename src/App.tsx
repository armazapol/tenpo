import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Login from "./pages/Login/LoginPage";
import Home from "./pages/Home/HomePage";
import Layout from "./components/layout/Layout";
import { PublicContextProvider } from "./context/public/PublicContext";
import { PrivateContextProvider } from "./context/private/PrivateContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRoute from "./components/AuthRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1, 
    },
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<Home />} />
      </Route>
      <Route element={<AuthRoute />}>
        <Route index element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </>
  )
);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PublicContextProvider>
        <PrivateContextProvider>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </PrivateContextProvider>
      </PublicContextProvider>
    </QueryClientProvider>
  );
}
