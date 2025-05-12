import z from "zod";
export const registerSchema = z
	.object({
		username: z
			.string()
			.min(3, "Имя должно содержать не менее 3 символов")
			.max(10),
		password: z
			.string()
			.min(6, "Пароль должен быть не менее 6 символов")
			.regex(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
			.regex(/[0-9]/, "Пароль должен содержать хотя бы одну цифру"),
		confirmPassword: z.string(),
		email: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Пароли не совпадают",
		path: ["confirmPassword"],
	});

export const loginSchema = z.object({
	password: z.string()
		.min(6, "Пароль должен быть не менее 6 символов")
		.regex(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
		.regex(/[0-9]/, "Пароль должен содержать хотя бы одну цифру"),
	email: z.string()
		.email("Некорректный формат email"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
