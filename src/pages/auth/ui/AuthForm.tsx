import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { LoginFormData } from "@/entities/user/schemas/formSchemas";

// перенести типы вне 
function LoginForm({ handleSubmit, onSubmit, register }: {
	handleSubmit: UseFormHandleSubmit<{
		password: string;
		email: string;
	}, {
		password: string;
		email: string;
	}>,
	onSubmit: (data: LoginFormData) => Promise<void>,
	register: UseFormRegister<{
		password: string;
		email: string;
	}>
}) {

	return (
		<>



			<form onSubmit={handleSubmit(onSubmit)} className=" flex gap-2 flex-col">
				<div className=" flex gap-2 flex-col p-[10px] bg-white rounded-[20px] box-content">
					<Input type="email" placeholder="Почта" {...register("email")} />
					{/* {errors.email && (
					<p className="text-red-500 text-sm">{errors.email.message}</p>
				)} */}
					<Input type="password" placeholder="Пароль" {...register("password")} />
					{/* {errors.password && (
					<p className="text-red-500 text-sm">{errors.password.message}</p>
				)} */}

					{/* {errors.root && (
					<p className="text-red-500 text-sm">{errors.root.message}</p>
				)} */}
				</div>

				<Button className=" self-center" type="submit">
					Вход
				</Button>
			</form>

		</>

	);
}

export default LoginForm;
