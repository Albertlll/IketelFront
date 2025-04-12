import Tabs from "@/widgets/tabs";
import AuthForm from "./authForm";
import RegisterForm from "./registerForm";

export function Auth() {
	return (
		<div className=" w-full h-full flex justify-center">
			<div className=" w-[580px] flex flex-col gap-2 mt-[300px] p-4">
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
