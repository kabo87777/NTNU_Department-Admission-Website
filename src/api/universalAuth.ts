import type { AuthCredentials, AuthStore } from "@/stores/universalAuth";
import axios from "axios";

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
		authorization: headers["authorization"] || "",
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
	auth: AuthStore,
	data: universalAuthData
) {
	const response = await axios.post(auth.apiEndpoint + "/sign_in", data);

	const credentials = buildAuthCredentialsFromHeaders(response.headers);

	if (!credentials)
		throw new Error("Server returned invalid authorization response");

	auth.setCredentials(credentials);

	return response.data;
}

export async function doUniversalAuthSignOut(auth: AuthStore) {
	const response = await axios({
		method: "DELETE",
		url: auth.apiEndpoint + "/sign_out",
		headers: {
			"Content-Type": "application/json",
			authorization: auth.credentials?.authorization,
		},
		data: {},
	});

	// It's possible the session has already expired - so we clear the
	// localStorage anyway before handling errors
	auth.clearCredentials();

	if (response.data?.success !== true) throw new Error("Sign out failed");

	return true;
}
