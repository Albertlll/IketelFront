import { useNavbarStore } from "@/widgets/navbar/model/navbarState";
import Tabs from "@/widgets/tabs";
import { useEffect, useMemo } from "react";
import { useLocation } from "react-router";
import AuthForm from "./authForm";
import RegisterForm from "./registerForm";

export function Auth() {
	const { setSelectedIndex } = useNavbarStore();
	const location = useLocation();
	
	// Get the initial tab index from the URL
	const initialTabIndex = useMemo(() => {
		const params = new URLSearchParams(location.search);
		const tabParam = params.get("tab");
		if (tabParam) {
			const tabIndex = parseInt(tabParam, 10);
			if (!isNaN(tabIndex) && tabIndex >= 0 && tabIndex <= 1) {
				return tabIndex;
			}
		}
		return 0; // Default to the first tab
	}, []);

	useEffect(() => {
		setSelectedIndex(2);
	}, [setSelectedIndex]);

	return (
		<div className=" w-full h-full flex justify-center">
			<div className=" w-[580px] flex flex-col gap-2 p-4">
				<Tabs
					elements={[
						{
							element: <RegisterForm />,
							title: "Регистрация",
						},
						{ element: <AuthForm />, title: "Авторизация" },
					]}
					initialSelectedIndex={initialTabIndex}
				/>
			</div>
		</div>
	);
}
