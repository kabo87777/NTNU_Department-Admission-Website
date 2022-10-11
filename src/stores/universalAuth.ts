import { defineStore } from "pinia";

export interface AuthCredentials {
	"access-token": string;
	"token-type": string;
	client: string;
	expiry: number;
	uid: string;
}

export interface AuthStoreState {
	credentials: AuthCredentials | null;
}

const defineUniversalAuthStore = (authStoreName: string) =>
	defineStore(authStoreName, {
		state: (): AuthStoreState => ({
			credentials: null,
		}),
		getters: {},
		actions: {
			setAuthCredentials(c: AuthCredentials) {
				this.credentials = c;
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
