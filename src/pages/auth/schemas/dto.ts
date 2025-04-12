export interface LoginRequestDto {
	email: string;
	password: string;
}

export interface RegisterRequestDto {
	email: string;
	username: string;
	password: string;
}

export interface AuthResponseDto {
	access_token: string;
	token_type: string;
}
