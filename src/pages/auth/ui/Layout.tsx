import { useNavbarStore } from "@/widgets/navbar/model/navbarState";
import Tabs from "@/shared/ui/tabs";
import { useEffect } from "react";
import AuthForm from "./AuthForm";
import RegisterForm from "./RegisterForm";
import ErrorMessage from "./error/error";
import { useLoginForm, useRegisterForm } from "../hooks/authHooks";

export function Auth() {
	const { setSelectedIndex } = useNavbarStore();

	const { errors: loginErrors, reset: loginReset, ...loginFormData } = useLoginForm();
	const { errors: regErrors, reset: regReset, ...regFormData } = useRegisterForm();



	useEffect(() => {
		setSelectedIndex(2);
	}, []);

	return (
		<div className="w-full h-full flex justify-center">

			<div className="w-full sm:w-[90%] md:w-[80%] lg:w-[580px] flex flex-col gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 md:p-5">


				<ErrorMessage er={[regErrors.email?.message || "",
				regErrors.password?.message || "",
				regErrors.confirmPassword?.message || "",
				].filter((er) => er !== "")} />

				<Tabs
					animated

					onTabChange={() => { regReset(); loginReset() }}

					elements={[
						{
							element: <RegisterForm {...regFormData} />,
							title: "Регистрация",
						},
						{ element: <AuthForm {...loginFormData} />, title: "Авторизация" },
					]}
				/>
			</div>
		</div>
	);
}
