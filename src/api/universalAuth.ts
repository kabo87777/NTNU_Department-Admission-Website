// TODO: verifySession
import type { AuthCredentials, AuthStore } from "@/stores/universalAuth";
import urlJoin from "url-join";
import axios from "axios";
import { useAdmissionManagerAuthStore } from "@/stores/universalAuth";

export interface universalAuthData {
	username?: string;
	email?: string;
	password: string;
	"cf-turnstile-response": string;
}

// type guard
const buildAuthCredentialsFromHeaders = (
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

export async function doUniversalAuthSignIn(
	path: string,
	auth: AuthStore,
	data: universalAuthData
) {
	const endpoint: string = urlJoin(
		`${import.meta.env.VITE_ADMISSIONS_API_ENDPOINT}/api/v1`,
		path
	);

	const response = await axios.post(endpoint, data);

	const credentials = buildAuthCredentialsFromHeaders(response.headers);

	if (!credentials)
		throw new Error("Server returned invalid authorization response");

	// TODO: validate response data

	// Store token credentials in authStore upon successful authorization
	auth = useAdmissionManagerAuthStore();
	auth.setCredentials(credentials);
	console.log(credentials);
	console.log(auth.credentials);

	return response.data;
}
