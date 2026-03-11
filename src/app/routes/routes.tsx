import { createBrowserRouter } from "react-router";

import App from "../initial/App";
import Auth from "../../pages/auth";
import WorldsEditor from "../../pages/edit-world";
import { Game } from "../../pages/game";
import Library from "../../pages/library";
import Profile from "../../pages/profile";
import { AuthGuard } from "./guards";
import { StudyGame } from "../../pages/study-game";

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
			},
			{
				path: "/worlds/new",
				element: (
					<AuthGuard>
						<WorldsEditor mode="create" />
					</AuthGuard>
				),
			},
			{
				path: "/my-worlds",
				element: (
					<AuthGuard>
						<Profile />
					</AuthGuard>
				),
			},
			{
				path: "/game/:worldId",
				element: (
					<AuthGuard>
						<Game />
					</AuthGuard>
				),
			},
			{
				path: "/study/:worldId",
				element: (
					<AuthGuard>
						<StudyGame />
					</AuthGuard>
				),
			},
			{
				index: true,
				element: <Library />,
			},
		],
	},
]);
