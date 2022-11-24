import type { AuthStore } from "@/stores/universalAuth";
import { GenericAPI } from "@/api/api";
// TODO: disannotation while backend finished reviewer get program API
import type {
	RecruitmentReviewerProgramListResponse,
	RecruitmentReviewerApplicantListResponse,
	RecruitmentReviewerApplicantCommentResponse,
} from "./types";
import type { APIGenericResponse } from "@/api/types";

export class RecruitmentReviewerAPI extends GenericAPI {
	constructor(auth: AuthStore) {
		super(auth);
	}

	async getProgramList(): Promise<RecruitmentReviewerProgramListResponse[]> {
		const data: APIGenericResponse = await this.instance.get(
			"/recruitment/reviewer/program"
		);

		if (data.error === true || typeof data.data.programs === "undefined")
			throw new Error("Failed to fetch program list");

		return data.data.programs;
	}

	async getApplicantList(
		programID: number
	): Promise<RecruitmentReviewerApplicantListResponse[]> {
		const data: APIGenericResponse = await this.instance.get(
			`/recruitment/reviewer/program/${programID}/applicant?detail=true`
		);

		if (data.error === true || typeof data.data.applicants === "undefined")
			throw new Error("Failed to fetch applicant list");

		return data.data.applicants;
	}

	async getApplicantComment(
		programID: number,
		applicantID: number
	): Promise<RecruitmentReviewerApplicantCommentResponse> {
		const data: APIGenericResponse = await this.instance.get(
			`/recruitment/reviewer/program/${programID}/applicant/${applicantID}/comment`
		);

		if (data.error === true || typeof data.data === "undefined")
			throw new Error("Failed to fetch applicant comment");

		return data.data;
	}
}
