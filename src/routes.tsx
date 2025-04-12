import { RouterProvider, createBrowserRouter } from "react-router";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Auth from "./pages/auth";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},

	{
		path: "/auth",
		element: <Auth />,
	},
]);
