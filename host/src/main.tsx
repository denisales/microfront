import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <React.Suspense>
      <Router/>
    </React.Suspense>
  </React.StrictMode>
);
