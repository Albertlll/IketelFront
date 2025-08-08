import httpClient from "@/shared/api/httpClient";
import type {
	AuthResponseDto,
	LoginRequestDto,
	RegisterRequestDto,
} from "../schemas/dto";
import { ResponseWrapper } from "@/shared/lib/responseWrapper";

export const loginRequest = async (
	data: LoginRequestDto,
): Promise<AuthResponseDto> => {
	const response = await httpClient.post<ResponseWrapper<AuthResponseDto>>("/auth/login", data);
	
	console.log(response.data)

	return response.data.data;
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
