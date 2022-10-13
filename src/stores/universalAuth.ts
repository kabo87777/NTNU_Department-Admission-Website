import { defineStore } from "pinia";
import type { Store } from "pinia";
import type { RemovableRef } from "@vueuse/core";
import { useStorage } from "@vueuse/core";
import urlJoin from "url-join";

export interface AuthCredentials {
	authorization: string;
	"access-token": string;
	"token-type": string;
	client: string;
	expiry: number;
	uid: string;
}

export type AuthStore = Store<
	string,
	AuthStoreState,
	{
		credentials(): AuthCredentials | null;
		isValidSession(): boolean;
	},
	{
		setCredentials(c: AuthCredentials): void;
		clearCredentials(): void;
	}
>;

export interface AuthStoreState {
	_credentials: RemovableRef<AuthCredentials | null>;
	apiEndpoint: string;
}

const nullCredentials = {
	authorization: "",
	"access-token": "",
	"token-type": "",
	client: "",
	expiry: NaN,
	uid: "",
};

const defineUniversalAuthStore = (authStoreName: string, path: string) =>
	defineStore(authStoreName, {
		state: (): AuthStoreState => ({
			apiEndpoint: urlJoin(
				`${import.meta.env.VITE_ADMISSIONS_API_ENDPOINT}/api/v1`,
				path
			),
			_credentials: useStorage(
				`${authStoreName}Credentials`,
				nullCredentials
			),
		}),
		getters: {
			credentials(): AuthCredentials | null {
				return this._credentials ? this._credentials : null;
			},
			isValidSession(): boolean {
				// invalid if _credentials == null
				if (!this._credentials) return false;

				// invalid if _credentials has falsy element
				if (Object.values(this._credentials).some((e) => !e))
					return false;

				// invalid if _credentials is expired
				if (Math.floor(Date.now() / 1000) >= this._credentials.expiry)
					return false;

				return true;
			},
		},
		actions: {
			setCredentials(c: AuthCredentials) {
				this._credentials = c;
			},
			clearCredentials() {
				this._credentials = nullCredentials;
			},
		},
	});

export const useAdmissionApplicantAuthStore = defineUniversalAuthStore(
	"AdmissionApplicantAuthStore",
	"/admission/auth/applicant"
);
export const useAdmissionReviewerAuthStore = defineUniversalAuthStore(
	"AdmissionReviewerAuthStore",
	"/admission/auth/reviewer"
);
export const useAdmissionAdminAuthStore = defineUniversalAuthStore(
	"AdmissionAdminAuthStore",
	"/admission/auth/admin"
);
export const useRecruitmentApplicantAuthStore = defineUniversalAuthStore(
	"RecruitmentApplicantAuthStore",
	"/recruitment/auth/applicant"
);
export const useRecruitmentReviewerAuthStore = defineUniversalAuthStore(
	"RecruitmentReviewerAuthStore",
	"/recruitment/auth/reviewer"
);
export const useRecruitmentAdminAuthStore = defineUniversalAuthStore(
	"RecruitmentAdminAuthStore",
	"/recruitment/auth/admin"
);
