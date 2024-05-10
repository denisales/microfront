import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
     <div>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
    </div>
  </React.StrictMode>
);
