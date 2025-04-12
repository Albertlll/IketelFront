import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, RouterProvider } from "react-router";
import App from "./App.tsx";
import { router } from "./routes.tsx";

createRoot(document.getElementById("root")!).render(
	<RouterProvider router={router} />,
);
