

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./routes/router";
import AuthProvider from "./providers/AuthProvider";
import LenisProvider from "./hooks/LenisProvider";
import { RouterProvider } from "react-router";
import { ToastContainer } from 'react-toastify';


const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <LenisProvider>
                 <RouterProvider router={router} />   
                </LenisProvider>
            </AuthProvider>
        </QueryClientProvider>
        <ToastContainer />
    </StrictMode>
);
