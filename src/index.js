import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./state"

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { RootLayout } from "./pages/RootLayout";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Details from "./pages/Details";
import Index from "./pages/Index";
import ErrorPage from "./pages/ErrorPage";


const router = createBrowserRouter([{
  path: "/",
  element: <RootLayout />,
  errorElement: <ErrorPage />,
  children: [
    { index: true, element: <Index /> },
    { path: "post", element: <Index /> },
    { path: "post/add", element: <Add /> },
    { path: "post/:id/edit", element: <Edit /> },
    { path: "post/:id/details", element: <Details />,
      loader : ({ params }) => {
        if(isNaN(params.id)){
          throw new Response("Bad Request", {statusText:"please make sure to insert correct post ID" ,status: 400})
        }
      } 
  }
  ],
}])


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  // </React.StrictMode>
);
