// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { RouterProvider } from "react-router/dom";
// import AuthProvider from './providers/AuthProvider.jsx';
// import { router } from './routes/router.jsx';
// import { Toaster } from "react-hot-toast";
// import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


// const queryClient = new QueryClient()

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//   <QueryClientProvider client={queryClient}>
//     <AuthProvider>
//     <RouterProvider router={router}>
//       <Toaster position='top-right' reverseOrder={false}/>
//     </RouterProvider>
//     </AuthProvider>
//      <ReactQueryDevtools initialIsOpen={false} />
//   </QueryClientProvider>
  
//   </StrictMode>,
// )


import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
//import { router } from "./Routes/router";
//import { RouterProvider } from "react-router";
//import AuthProvider from "./Context/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//import LenisProvider from "./Hooks/LenisProviders";
import { router } from "./routes/router";
import AuthProvider from "./providers/AuthProvider";
import LenisProvider from "./hooks/LenisProvider";
import { RouterProvider } from "react-router";

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
    </StrictMode>
);
