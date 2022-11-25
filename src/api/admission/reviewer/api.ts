import type { AuthStore } from "@/stores/universalAuth";
import { GenericAPI } from "@/api/api";
import type { AdmissionReviewerProgramListResponse } from "./types";
import type { APIGenericResponse } from "@/api/types";

export class AdmissionReviewerAPI extends GenericAPI {
	constructor(auth: AuthStore) {
		super(auth);
	}

	async getProgramList(): Promise<AdmissionReviewerProgramListResponse[]> {
		const data: APIGenericResponse = await this.instance.get(
			"/admission/reviewer/program"
		);

		if (data.error === true || typeof data.data === "undefined")
			throw new Error("Failed to fetch program list");

		return data.data;
	}

	// async changePassword(
	// 	body: object
	// ): Promise<AdmissionApplicantChangePassResponse> {
	// 	const data: APIGenericResponse = await this.instance.patch(
	// 		"admission/auth/applicant/password",
	// 		body
	// 	);

	// 	if (data.success === false && data.errors !== undefined) {
	// 		return {
	// 			success: data.success,
	// 			message: data.errors.full_messages,
	// 		};
	// 	}

	// 	return {
	// 		success: data.success,
	// 		message: data.message,
	// 	};
	// }
}
