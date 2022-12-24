import type { AuthCredentials, AuthStore } from "@/stores/universalAuth";
import axios from "axios";

export interface universalAuthData {
	username?: string;
	email?: string;
	password: string;
	"cf-turnstile-response": string;
}
export interface universalAuthSendResetPwdEmailData {
	email: string;
	redirect_url: string;
	"cf-turnstile-response": string;
}

export interface AdmissionApplicantAuthSendResetPwdEmailData {
	username: string;
	redirect_url: string;
	"cf-turnstile-response": string;
}

export interface universalAuthSendPostEmailRegister {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
	confirm_success_url: string;
	"cf-turnstile-response": string;
}

export interface universalAuthResetPwdData {
	password: string;
	password_confirmation: string;
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

// This makes sure the session is invalid and the localStorage cleared
export async function doUniversalAuthSignOut(auth: AuthStore) {
	// No need to ask backend to invalidate the session if it does not pass
	// our check in the first place.
	if (!auth.isValidCredentials) {
		auth.clearCredentials();
		return;
	}

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

	if (response.data?.error !== false) throw new Error("Sign out failed");
}

export async function doUniversalAuthSessionValidation(
	auth: AuthStore
): Promise<boolean> {
	if (!auth.isValidCredentials) return false;

	try {
		const response = await axios({
			method: "GET",
			url: auth.apiEndpoint + "/validate_token",
			headers: {
				"Content-Type": "application/json",
				authorization: auth.credentials?.authorization,
			},
			data: {},
		});

		if (response.data?.status !== "success") return false;
	} catch (e) {
		return false;
	}

	return true;
}

export async function doUniversalAuthSendForgotPwdEmail(
	auth: AuthStore,
	data: universalAuthSendResetPwdEmailData
) {
	const response = await axios.post(auth.apiEndpoint + "/password", data);
	console.log("response: ", response);
	return response.data;
}
export async function doUniversalAuthSendPostEmailRegister(
	auth: AuthStore,
	data: universalAuthSendPostEmailRegister
) {
	const response = await axios.post(auth.apiEndpoint, data);
	console.log("response: ", response);
	return response.data;
}

export async function doAdmisssionApplicantAuthSendForgotPwdEmail(
	auth: AuthStore,
	data: AdmissionApplicantAuthSendResetPwdEmailData
) {
	const response = await axios.post(auth.apiEndpoint + "/password", data);
	console.log("response: ", response);
	return response.data;
}

export async function doUniversalAuthResetPassword(
	auth: AuthStore,
	data: universalAuthResetPwdData,
	access_token: string,
	client: string,
	uid: string
) {
	const response = await axios({
		method: "PUT",
		url: auth.apiEndpoint + "/password",
		headers: {
			"access-token": access_token,
			client: client,
			uid: uid,
		},
		data: data,
	});
	console.log("response", response);
	return response.data;
}

export async function doUniversalAuthGetUserInfo(auth: AuthStore) {
	if (!auth.isValidCredentials) return false;

	const response = await axios({
		method: "GET",
		url: auth.apiEndpoint + "/validate_token",
		headers: {
			"Content-Type": "application/json",
			authorization: auth.credentials?.authorization,
		},
		data: {},
	});

	if (response.data?.status !== "success" || response.data?.error === true)
		throw new Error("Failed to get user info");

	return response.data.data;
}
