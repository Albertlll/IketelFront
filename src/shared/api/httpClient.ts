import axios from "axios";
import { useUserStore } from "../../entities/user/model/store";

const httpConfig = axios.create({
	// baseURL: "https://iketel.ru/api",
	baseURL: "/api/",
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

httpConfig.interceptors.request.use((config) => {
	const token = useUserStore.getState().token;
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

httpConfig.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			useUserStore.getState().clearUser();
			window.location.href = "/auth";
		}
		return Promise.reject(error);
	},
);

export default httpConfig;
