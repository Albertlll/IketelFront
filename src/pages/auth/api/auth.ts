import httpClient from "@/shared/api/httpClient";
import type {
	AuthResponseDto,
	LoginRequestDto,
	RegisterRequestDto,
} from "../schemas/dto";

export const loginRequest = async (
	data: LoginRequestDto,
): Promise<AuthResponseDto> => {
	const response = await httpClient.post<AuthResponseDto>("/auth/login", data);

	return response.data;
};

export const registerRequest = async (
	data: RegisterRequestDto,
): Promise<AuthResponseDto> => {
	console.log(data);

	const response = await httpClient.post<AuthResponseDto>(
		"/auth/register",
		data,
	);
	return response.data;
};
