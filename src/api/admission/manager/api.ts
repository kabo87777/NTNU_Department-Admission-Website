import type { AuthStore } from "@/stores/universalAuth";
import { doUniversalAuthSignIn } from "@/api/universalAuth";
import axios from "axios";

const instance = axios.create({
	baseURL: `${import.meta.env.VITE_ADMISSIONS_API_ENDPOINT}/api/v1/`,
	timeout: 10000,
});

instance.interceptors.request.use(
	(config) => {
		config.headers = config.headers ?? {};

		// config.headers["access-token"] = "";
		// config.headers["token-type"] = "Bearer";
		// config.headers["client"] = "";
		// config.headers["expiry"] = "";
		// config.headers["uid"] = "";
		return config;
	},
	async (error) => {
		throw new Error(error);
	}
);

instance.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		throw new Error(error);
	}
);

export const sign_in = async (auth: AuthStore, data: any) => {
	return await doUniversalAuthSignIn(
		"/admission/auth/admin/sign_in",
		auth,
		data
	);
};
