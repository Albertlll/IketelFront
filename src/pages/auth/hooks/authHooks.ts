import { useUserStore } from "@/entities/user/model/store";
import { useToast } from "@/shared/toast";
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
	
	const { showSuccess, showError } = useToast();

	const onSubmit = async (data: RegisterFormData) => {
		try {
			await registerRequest({
				username: data.username,
				password: data.password,
				email: data.email,
			});
			showSuccess("Регистрация успешно завершена! Теперь вы можете войти в систему.");
		} catch (error) {
			console.error(error);
			const axiosError = error as AxiosError<{
				message?: string;
				statusCode?: number;
			}>;
			
			if (axiosError.response?.data?.message) {
				showError(axiosError.response.data.message);
			} else {
				showError("Ошибка при регистрации. Пожалуйста, попробуйте еще раз.");
			}
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
	const { showSuccess, showError } = useToast();

	const onSubmit = async (data: LoginFormData) => {
		try {
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
			showSuccess(`Добро пожаловать, ${tokenData.username}!`);
		} catch (error) {
			const axiosError = error as AxiosError<{
				message?: string;
				statusCode?: number;
			}>;

			if (axiosError.response?.status === 401) {
				setError("root", {
					message: "Неверный логин или пароль!",
				});
				showError("Неверный логин или пароль!");
			} else if (axiosError.response?.data?.message) {
				showError(axiosError.response.data.message);
			} else {
				showError("Ошибка при входе. Пожалуйста, попробуйте еще раз.");
			}
		}
	};

	return { register, handleSubmit, errors, onSubmit };
}
