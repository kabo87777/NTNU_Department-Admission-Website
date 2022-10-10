import axios from "axios";
import type { AdmissionApplicantSignInInput } from "./types";

const instance = axios.create({
	baseURL:
		"https://9f88298d-a5f9-4017-ac13-88e38a638293.mock.pstmn.io/api/v1/",
	timeout: 1000,
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
	const response = await instance.post(
		"/admission/auth/applicant/sign_in",
		user
	);
	return response.data;
};
