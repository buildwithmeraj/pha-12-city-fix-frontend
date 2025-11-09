import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import routes from "./routes/routres";
import "./index.css";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
