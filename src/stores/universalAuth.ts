import { defineStore } from "pinia";
import type { Store } from "pinia";
import type { RemovableRef } from "@vueuse/core";
import { useStorage } from "@vueuse/core";

export interface AuthCredentials {
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
	}
>;

export interface AuthStoreState {
	_credentials: RemovableRef<AuthCredentials | null>;
}

const defineUniversalAuthStore = (authStoreName: string) =>
	defineStore(authStoreName, {
		state: (): AuthStoreState => ({
			_credentials: useStorage(`${authStoreName}Credentials`, {
				"access-token": "",
				"token-type": "",
				client: "",
				expiry: NaN,
				uid: "",
			}),
		}),
		getters: {
			credentials(): AuthCredentials | null {
				return this._credentials ? this._credentials : null;
			},
			isValidSession(): boolean {
				if (!this._credentials) return false;

				if (Object.values(this._credentials).some((e) => !e))
					return false;

				if (Math.floor(Date.now() / 1000) >= this._credentials.expiry)
					return false;

				return true;
			},
		},
		actions: {
			setCredentials(c: AuthCredentials) {
				this._credentials = c;
			},
		},
	});

export const useAdmissionApplicantAuthStore = defineUniversalAuthStore(
	"AdmissionApplicantAuthStore"
);
export const useAdmissionManagerAuthStore = defineUniversalAuthStore(
	"AdmissionManagerAuthStore"
);
export const useRecruitmentApplicantAuthStore = defineUniversalAuthStore(
	"RecruitmentApplicantAuthStore"
);
export const useRecruitmentManagerAuthStore = defineUniversalAuthStore(
	"RecruitmentManagerAuthStore"
);
