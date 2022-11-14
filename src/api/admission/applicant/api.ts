import type { AuthStore } from "@/stores/universalAuth";
import type {
	AdmissionApplicantGetProgramResponse,
	AdmissionApplicantChangePassResponse,
} from "./types";
import type { APIGenericResponse } from "@/api/types";
import { GenericAPI } from "@/api/api";

export class AdmissionApplicantAPI extends GenericAPI {
	constructor(auth: AuthStore) {
		super(auth);
	}

	async getProgramList(): Promise<AdmissionApplicantGetProgramResponse[]> {
		const data: APIGenericResponse = await this.instance.get(
			"/admission/applicant/program"
		);

		if (data.error === true || typeof data.data.programs === "undefined")
			throw new Error("Failed to fetch program list");
		console.log(data);
		return data.data.programs;
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
}
