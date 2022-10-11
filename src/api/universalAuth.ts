// TODO: verifySession
import type { AuthCredentials, AuthStoreState } from "@/stores/universalAuth";
import type { Store } from "pinia";
import { useAdmissionManagerAuthStore } from "@/stores/universalAuth";
import { sign_in } from "@/api/admission/applicant/api";

export interface doUniversalAuthOptions {
	email: string;
	password: string;
	"cf-turnstile-response": string;
}

// type guard
const craftAuthCredentialsFromHeaders = (
	headers: any
): AuthCredentials | null => {
	// All required credentials headers
	// Uses falsy value as fallback if any being undefined
	const credentials: AuthCredentials = {
		"access-token": headers["access-token"] || "",
		"token-type": headers["token-type"] || "",
		client: headers["client"] || "",
		expiry: Number(headers["expiry"] || NaN),
		uid: headers["uid"] || "",
	};

	// and check if any of which is falsy
	const isMissingAnyCredential: boolean = Object.values(credentials).some(
		(p) => !p
	);

	if (isMissingAnyCredential) return null;

	return credentials;
};

export async function doUniversalAuth(
	auth: Store<
		string,
		AuthStoreState,
		{},
		{
			setAuthCredentials(c: AuthCredentials): void;
		}
	>,
	options: doUniversalAuthOptions
) {
	const response = await sign_in(options);
	const credentials = craftAuthCredentialsFromHeaders(response.headers);

	if (!credentials)
		throw new Error("Server returned invalid authorization response");

	// if (!data.email)
	// 	throw new Error("Sign-in failure: " + JSON.stringify(data));

	// Store token credentials in authStore upon successful authorization
	auth = useAdmissionManagerAuthStore();
	auth.credentials = credentials;

	// TODO: store token in localStorage and automatic renew
	return response.data;
}
