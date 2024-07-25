import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import { store } from "./app/store"
import "./index.css"
import {NextUIProvider} from "@nextui-org/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import path from "path"
import { ThemeProvider } from "./components/theme-provider"
import Auth from "./pages/auth"
import Layout from "./components/layout/inedx"
import Posts from "./pages/Posts"
import CurrentPost from "./pages/CurrentPost"
import Followers from "./pages/Followers"
import UserProfile from "./pages/UserProfile"
import Following from "./pages/Following"
import AuthGuard from "./features/user/AuthGuard"


const container = document.getElementById("root")

const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Auth/>
  },
  {
    path: '/',
    element: <Layout/>,
    children:[
      {
        path: "",
        element: <Posts/>
      },
      {
        path: "posts/:id",
        element: <CurrentPost/>
      },
      {
        path: "user/:id",
        element: <UserProfile/>
      },
      {
        path: "followers",
        element: <Followers/>
      },
      {
        path: "following",
        element: <Following/>
      }
    ]
  }
])

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <NextUIProvider>
          <ThemeProvider>
            <AuthGuard>
              <RouterProvider router={router}/>
            </AuthGuard>
          </ThemeProvider>
        </NextUIProvider>
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
