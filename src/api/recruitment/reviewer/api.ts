import type { AuthStore } from "@/stores/universalAuth";
import { GenericAPI } from "@/api/api";
// TODO: disannotation while backend finished reviewer get program API
import type {
	RecruitmentReviewerProgramListResponse,
	RecruitmentReviewerApplicantListResponse,
	RecruitmentReviewerApplicantCommentResponse,
	RecruitmentReviewerApplicantInfoResponse,
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
		applicantID: string | string[]
	): Promise<RecruitmentReviewerApplicantCommentResponse> {
		const data: APIGenericResponse = await this.instance.get(
			`/recruitment/reviewer/program/${programID}/applicant/${applicantID}/comment`
		);

		if (data.error === true || typeof data.data === "undefined")
			throw new Error("Failed to fetch applicant comment");

		return data.data;
	}

	async getApplicantInfo(
		programID: number,
		applicantID: string | string[]
	): Promise<RecruitmentReviewerApplicantInfoResponse> {
		const data: APIGenericResponse = await this.instance.get(
			`/recruitment/reviewer/program/${programID}/applicant/${applicantID}/info`
		);

		if (data.error === true || typeof data.data === "undefined")
			throw new Error("Failed to fetch applicant info");

		return data.data;
	}

	async updateApplicantComment(
		programID: number,
		applicantID: string | string[],
		comment: any
	): Promise<any> {
		const data: APIGenericResponse = await this.instance.patch(
			`/recruitment/reviewer/program/${programID}/applicant/${applicantID}/comment`,
			comment
		);

		if (data.error === true || typeof data.data === "undefined")
			throw new Error("Failed to fetch applicant comment");
	}
}
