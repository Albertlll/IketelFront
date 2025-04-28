import { useNavbarStore } from "@/widgets/navbar/model/navbarState";
import Tabs from "@/widgets/tabs";
import { useEffect } from "react";
import AuthForm from "./authForm";
import RegisterForm from "./registerForm";

export function Auth() {
	const { setSelectedIndex } = useNavbarStore();
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
				/>
			</div>
		</div>
	);
}
