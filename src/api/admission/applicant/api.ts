import type { AuthStore } from "@/stores/universalAuth";
import type {
	AdmissionApplicantGetProgramResponse,
	AdmissionApplicantChangePassResponse,
	AdmissionApplicantRecLetListRes,
} from "./types";
import type { APIGenericResponse } from "@/api/types";
import { GenericAPI } from "@/api/api";

export class AdmissionApplicantAPI extends GenericAPI {
	constructor(auth: AuthStore) {
		super(auth);
	}

	async getProgram(): Promise<AdmissionApplicantGetProgramResponse> {
		const data: APIGenericResponse = await this.instance.get(
			"/admission/applicant/program"
		);

		if (data.error === true || typeof data.data === "undefined")
			throw new Error("Failed to fetch program list");

		return data.data;
	}

	// async getUserInfo(): Promise<> {
	// 	const data: APIGenericResponse = await this.instance.get(
	// 		"admission/applicant/info"
	// 	);

	// 	if (data.error === true || typeof data.data.programs === "undefined")
	// 		throw new Error("Failed to fetch user info");
	// 	console.log(data);
	// 	return data.data.programs;
	// }

	async changePassword(
		body: object
	): Promise<AdmissionApplicantChangePassResponse> {
		const data: APIGenericResponse = await this.instance.patch(
			"admission/auth/applicant/password",
			body
		);

		if (data.success === false && data.errors !== undefined) {
			return {
				success: data.success,
				message: data.errors.full_messages,
			};
		}

		return {
			success: data.success,
			message: data.message,
		};
	}

	async getRecommendLetterList(): Promise<AdmissionApplicantRecLetListRes[]> {
		const data: APIGenericResponse = await this.instance.get(
			"admission/applicant/recommendletter"
		);

		if (data.error !== false)
			throw new Error("Failed to fetch recommendation letter list");

		return data.data;
	}

	async sendRecommendLetterReq(
		body: object
		// CHANGE THE RESPONSE TYPE ONCE BACKEND CONFIRM THE DATA STRUCTURE
	): Promise<AdmissionApplicantChangePassResponse> {
		const data: APIGenericResponse = await this.instance.post(
			"admission/applicant/recommendletter",
			body
		);

		if (data.error !== false)
			return {
				success: data.success,
				message: data.errors.full_messages,
			};

		return {
			success: data.success,
			message: data.message,
		};
	}
}
