import { createBrowserRouter, redirect } from "react-router";

import App from "./App";
import { useUserStore } from "./entities/user/model/store";
import Auth from "./pages/auth";
import EditWorlds from "./pages/edit-world";
import CreateWorld from "./pages/edit-world/ui/CreateWorld";
import WorldsEditor from "./pages/edit-world/ui/CreateWorld";
import Library from "./pages/library";
import Profile from "./pages/profile";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/auth",
				element: <Auth />,
			},
			{
				path: "/worlds/:id",
				element: <WorldsEditor mode="edit" />,
			},
			{
				path: "/worlds/new",
				element: <WorldsEditor mode="create" />,
			},
			{
				path: "/my-worlds",
				element: <Profile />,
				loader: () => {
					// Проверяем авторизацию напрямую из хранилища
					const token = useUserStore.getState().token;
					if (!token) return redirect("/auth");
					return null;
				},
			},
			{
				index: true,
				element: <Library />,
			},
		],
	},
]);
