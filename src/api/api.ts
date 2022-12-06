import type { AxiosInstance } from "axios";
import type { AuthStore } from "@/stores/universalAuth";
import type {
	universalAuthData,
	universalAuthSendResetPwdEmailData,
	universalAuthSendPostEmailRegister,
	universalAuthResetPwdData,
	AdmissionApplicantAuthSendResetPwdEmailData,
} from "@/api/universalAuth";

import axios from "axios";
import {
	doUniversalAuthSignIn,
	doUniversalAuthSignOut,
	doUniversalAuthSendForgotPwdEmail,
	doUniversalAuthSendPostEmailRegister,
	doUniversalAuthResetPassword,
	doAdmisssionApplicantAuthSendForgotPwdEmail,
} from "./universalAuth";
import { InvalidSessionError } from "./error";

export class GenericAPI {
	auth: AuthStore;
	instance: AxiosInstance;

	constructor(_auth: AuthStore) {
		this.auth = _auth;

		this.instance = axios.create({
			baseURL: `${import.meta.env.VITE_ADMISSIONS_API_ENDPOINT}/api/v1/`,
			timeout: 10000,
		});

		this.instance.interceptors.request.use(
			(config) => {
				config.headers = config.headers ?? {};

				if (!this.auth.isValidCredentials) {
					throw new InvalidSessionError(
						"Local check failed: invalid auth session. An unhandled expired auth session was most likely used to perform this request."
					);
				}

				config.headers["authorization"] =
					this.auth.credentials!.authorization;

				return config;
			},
			async (error) => {
				throw error;
			}
		);

		// NOTE: update auth credentials here if devise rotates on every request.
		this.instance.interceptors.response.use(
			(response) => {
				if (response.status !== 200)
					throw new Error("Remote did not return 200");

				return response.data;
			},
			async (error) => {
				return error.response.data;
				// throw error;
			}
		);
	}

	// Sign in
	async requestNewSession(data: universalAuthData) {
		return await doUniversalAuthSignIn(this.auth, data);
	}

	// Sign out
	async invalidateSession(): Promise<void> {
		await doUniversalAuthSignOut(this.auth);
	}

	// Send Forgot Password
	async sendForgotPasswordEmail(data: universalAuthSendResetPwdEmailData) {
		return await doUniversalAuthSendForgotPwdEmail(this.auth, data);
	}

	// Send Forgot Password (only for Admission Applicant)
	async sendAdmissionApplicantForgotPasswordEmail(
		data: AdmissionApplicantAuthSendResetPwdEmailData
	) {
		return await doAdmisssionApplicantAuthSendForgotPwdEmail(
			this.auth,
			data
		);
	}

	//  Register
	async sendPostEmailRegister(data: universalAuthSendPostEmailRegister) {
		return await doUniversalAuthSendPostEmailRegister(this.auth, data);
	}

	// Reset Password
	async requestResetPasswordSession(
		data: universalAuthResetPwdData,
		access_token: string,
		client: string,
		uid: string
	) {
		return await doUniversalAuthResetPassword(
			this.auth,
			data,
			access_token,
			client,
			uid
		);
	}
}
