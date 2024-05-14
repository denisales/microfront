// import { Route, Routes } from "react-router-dom"
import { RouteObject } from "react-router-dom";
import Template from "./pages/Template";
import Login from "./pages/Login";

const routes = [
  {
    path: "/",
    element:  <Template/>,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "*",
        element: <>CART: 404 Not Found</>,
      },
    ],
  },
] as RouteObject[];

export default routes;