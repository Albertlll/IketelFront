import { createBrowserRouter, redirect } from "react-router";

import App from "../initial/App";
import { useUserStore } from "../../entities/user/model/store";
import Auth from "../../pages/auth";
import WorldsEditor from "../../pages/edit-world";
import { Game } from "../../pages/game";
import Library from "../../pages/library";
import Profile from "../../pages/profile";
import { AuthGuard } from "./guards";

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
				element: <WorldsEditor mode="read" />,
				// loader: ({ params }) => ({ id: params.id }),
			},
			{
				path: "/worlds/new",
				element:
				<AuthGuard>
				 <WorldsEditor mode="create" />,
				</AuthGuard> 
				// loader: () => {
					// Проверяем авторизацию напрямую из хранилища
					// const token = useUserStore.getState().token;
					// if (!token) return redirect("/auth");
					// return null;
				// },
			},
			{
				path: "/my-worlds",
				element:
				<AuthGuard>
				<Profile />,
				</AuthGuard>
			},
			{
				path: "/game/:worldId", // Добавляем параметр worldId
				element: <AuthGuard><Game/></AuthGuard>,
				// loader: ({ params }) => {
				// 	const token = useUserStore.getState().token;
				// 	if (!token) return redirect("/auth");

				// 	if (!params.worldId || Number.isNaN(Number(params.worldId))) {
				// 		return redirect("/worlds");
				// 	}

				// 	return null;
				// },
			},
			{
				index: true,
				element: <Library />,
			},
		],
	},
]);
