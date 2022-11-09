import type { AuthStore } from "@/stores/universalAuth";
import type {
	AdmissionAdminProgramListResponse,
	AdmAdminReviewerListResponse,
	AdmissionAdminApplicantsListResponse,
	AdmAdminReviewerRelatedProgramResponse,
} from "./types";
import type { APIGenericResponse } from "@/api/types";
import { GenericAPI } from "@/api/api";

export class AdmissionAdminAPI extends GenericAPI {
	constructor(auth: AuthStore) {
		super(auth);
	}

	async getProgramList(): Promise<AdmissionAdminProgramListResponse[]> {
		const data: APIGenericResponse = await this.instance.get(
			"/admission/admin/program"
		);

		if (data.error === true || typeof data.data.programs === "undefined")
			throw new Error("Failed to fetch program list");

		return data.data.programs;
	}

	async getReviewerList(): Promise<AdmAdminReviewerListResponse[]> {
		const data: APIGenericResponse = await this.instance.get(
			"/admission/admin/reviewer"
		);

		if (data.error === true || typeof data.data.reviewers === "undefined")
			throw new Error("Failed to fetch reviewer list");

		return data.data.reviewers;
	}

	async getReviewerPrograms(
		rID: number
	): Promise<AdmAdminReviewerRelatedProgramResponse[]> {
		const data: APIGenericResponse = await this.instance.get(
			`/admission/admin/reviewer/${rID}/relation`
		);
		if (data.error === true || typeof data.data === "undefined")
			throw new Error("Failed to fetch reviewer-related program list");

		return data.data;
	}

	async getApplicantList(
		programID: number
	): Promise<AdmissionAdminApplicantsListResponse[]> {
		const data: APIGenericResponse = await this.instance.get(
			`/admission/admin/program/${programID}/applicant`
		);
		if (data.error === true || typeof data.data.applicants === "undefined")
			throw new Error("Failed to fetch applicant list");
		return data.data.applicants;
	}
}
