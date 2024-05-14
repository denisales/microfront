// import { Route, Routes } from "react-router-dom"
import { RouteObject } from "react-router-dom";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Template from "./pages/Template";

export const routes: RouteObject[] = [
  {
    path: "/",
    element:  <Template/>,
    children: [
      {
        index: true,
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "*",
        element: <>CART: 404 Not Found</>,
      },
    ],
  },

];

export default routes;
