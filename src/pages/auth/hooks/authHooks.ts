import { useUserStore } from "@/entities/user/model/store";
import { useToast } from "@/shared/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
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

	const { success, error: showError } = useToast();
	const navigate = useNavigate();

	const onSubmit = async (data: RegisterFormData) => {
		try {
			await registerRequest({
				username: data.username,
				password: data.password,
				email: data.email,
			});
			
			success("Регистрация успешна!");
			
			// Redirect to login tab
			// We need to reload the page to the auth page with the login tab selected
			// This is done by adding a query parameter to the URL
			navigate("/auth?tab=1");
			
		} catch (error) {
			console.error(error);
			showError("Ошибка при регистрации!");
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
	const { success, error: showError } = useToast();
	const navigate = useNavigate();

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
			
			success("Вход выполнен успешно!");
			
			// Redirect to library page
			navigate("/");
		} catch (error) {
			const axiosError = error as AxiosError<{
				message?: string;
				statusCode?: number;
			}>;

			if (axiosError.response?.status === 401) {
				console.log("Ошибка авторизации", axiosError.response.data.message);
				setError("root", {
					message: "Неверный логин или пароль!",
				});
				showError("Неверный логин или пароль!");
			} else {
				showError("Произошла ошибка. Пожалуйста, попробуйте снова.");
			}
		}
	};

	return { register, handleSubmit, errors, onSubmit };
}
