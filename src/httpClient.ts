import axios from "axios";

const httpConfig = axios.create({
	baseURL: "http://localhost:8000",
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

httpConfig.interceptors.request.use((config) => {
	const token = localStorage.getItem("access_token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default httpConfig;
