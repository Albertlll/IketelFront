import { useUserStore } from "@/entities/user/model/store";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { loginRequest, registerRequest } from "../api/auth";
import type { LoginFormData } from "../schemas/formSchemas";
import {
	type RegisterFormData,
	loginSchema,
	registerSchema,
} from "../schemas/formSchemas";
export function useRegisterForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = async (data: RegisterFormData) => {
		try {
			registerRequest({
				username: data.username,
				password: data.password,
				email: data.email,
			});
		} catch (error) {
			console.error(error);
		}
	};

	return { register, handleSubmit, errors, onSubmit };
}

export function useLoginForm() {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const { setUser } = useUserStore();

	const onSubmit = async (data: LoginFormData) => {
		console.log("sssc");
		try {
			console.log("cdcsd");

			const tokenData = await loginRequest({
				password: data.password,
				email: data.email,
			});

			setUser({
				token: tokenData.access_token,
				email: tokenData.email,
				username: tokenData.username,
			});

			localStorage.setItem("token", tokenData.access_token);
		} catch (error) {
			console.log("error");

			const axiosError = error as AxiosError<{
				message?: string;
				statusCode?: number;
			}>;

			console.log(axiosError);

			if (axiosError.response?.status === 401) {
				console.log("Ошибка авторизации", axiosError.response.data.message);
				setError("root", {
					message: "Неверный логин или пароль!",
				});
			}
		}
	};

	return { register, handleSubmit, errors, onSubmit };
}
