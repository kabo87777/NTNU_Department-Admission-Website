import axios from "axios";
import type { AdmissionApplicantSignInInput } from "./types";

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

export const sign_in = async (user: AdmissionApplicantSignInInput) => {
	return await instance.post("/admission/auth/applicant/sign_in", user);
};
