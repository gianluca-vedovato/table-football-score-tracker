import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Dashboard from './pages/dashboard.tsx'
import Create from './pages/create.tsx'
import { Toaster } from "@/components/ui/toaster"
import { H2H } from './pages/h2h.tsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/create",
    element: <Create />,
  },
  {
    path: "/h2h",
    element: <H2H />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  </StrictMode>,
)
