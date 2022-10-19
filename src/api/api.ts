import type { AxiosInstance } from "axios";
import type { AuthStore } from "@/stores/universalAuth";
import type { universalAuthData } from "@/api/universalAuth";

import axios from "axios";
import { doUniversalAuthSignIn, doUniversalAuthSignOut } from "./universalAuth";

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

				if (!this.auth.isValidSession)
					throw new Error("Invalid auth session");

				config.headers["authorization"] =
					this.auth.credentials!.authorization;

				return config;
			},
			async (error) => {
				throw new Error(error);
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
				throw new Error(error);
			}
		);
	}

	// Sign in
	async requestNewSession(data: universalAuthData) {
		return await doUniversalAuthSignIn(this.auth, data);
	}

	// Sign in
	async invalidateSession() {
		try {
			await doUniversalAuthSignOut(this.auth);
			return true;
		} catch (e) {
			// handle sign out error
			return false;
		}
	}
}
