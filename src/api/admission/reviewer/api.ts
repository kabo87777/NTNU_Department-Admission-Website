import type { AuthStore } from "@/stores/universalAuth";
import { GenericAPI } from "@/api/api";
import type {
	AdmissionReviewerProgramListResponse,
	AdmissionReviewerGenericResponse,
} from "./types";
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

	async changePassword(
		body: object
	): Promise<AdmissionReviewerGenericResponse> {
		const data: APIGenericResponse = await this.instance.patch(
			"admission/auth/reviewer/password",
			body
		);

		if (data.error !== false) {
			return {
				success: false,
				message: data.message.full_messages,
			};
		}

		return {
			success: true,
			message: data.message,
		};
	}
}
