import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import routes from "./routes/routres";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(<RouterProvider router={routes} />);
