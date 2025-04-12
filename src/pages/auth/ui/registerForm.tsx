import { Button } from "@/shared/button";
import { Input } from "@/shared/input";
import { useRegisterForm } from "../hooks/authHooks";

function RegisterForm() {
	const { errors, handleSubmit, register, onSubmit } = useRegisterForm();

	return (
		<form onSubmit={handleSubmit(onSubmit)} className=" flex gap-2 flex-col">
			<div className=" flex gap-2 flex-col p-5 bg-white rounded-[20px] box-content">
				<Input placeholder="Имя" {...register("username")} />
				{errors.username && (
					<p className="text-red-500 text-sm">{errors.username.message}</p>
				)}
				<Input type="email" placeholder="Почта" {...register("email")} />
				{errors.email && (
					<p className="text-red-500 text-sm">{errors.email.message}</p>
				)}
				<Input type="password" placeholder="Пароль" {...register("password")} />
				{errors.password && (
					<p className="text-red-500 text-sm">{errors.password.message}</p>
				)}
				<Input
					type="password"
					placeholder="Повторите пароль"
					{...register("confirmPassword")}
				/>
			</div>
			{errors.confirmPassword && (
				<p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
			)}

			<Button className=" self-center" type="submit">
				Регистрация
			</Button>
		</form>
	);
}

export default RegisterForm;
