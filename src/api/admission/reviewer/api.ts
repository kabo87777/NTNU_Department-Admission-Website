import type { AuthStore } from "@/stores/universalAuth";
import { GenericAPI } from "@/api/api";
import type {
	AdmissionReviewerProgramListResponse,
	AdmissionReviewerApplicantGradeResponse,
	AdmissionReviewerApplicantInfoResponse,
	AdmissionReviewerProgramGradingResponse,
	AdmissionReviewerApplicantListResponse,
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

	async getSingleApplicantGrade(
		applicantID: string | string[]
	): Promise<AdmissionReviewerApplicantGradeResponse> {
		const data: APIGenericResponse = await this.instance.get(
			`/admission/reviewer/applicant/${applicantID}/grade`
		);

		if (data.error === true || typeof data.data === "undefined")
			throw new Error("Failed to fetch ApplicantGrade");

		return data.data;
	}

	async updateSingleApplicantGrade(
		applicantID: string | string[],
		grade: any
	): Promise<any> {
		const response: APIGenericResponse = await this.instance.patch(
			`/admission/reviewer/applicant/${applicantID}`,
			grade
		);

		if (response.error === true)
			throw new Error("Failed to update ApplicantGrade");
	}

	async getSingleApplicantInfo(
		applicantID: string | string[]
	): Promise<AdmissionReviewerApplicantInfoResponse[]> {
		const data: APIGenericResponse = await this.instance.get(
			`/admission/reviewer/applicant/${applicantID}/info`
		);

		if (data.error === true || typeof data.data === "undefined")
			throw new Error("Failed to fetch ApplicantInfo");

		return data.data;
	}

	async getProgramGrading(
		programID: number
	): Promise<AdmissionReviewerProgramGradingResponse> {
		const data: APIGenericResponse = await this.instance.get(
			`/admission/reviewer/program/${programID}/grading`
		);

		if (data.error === true || typeof data.data === "undefined")
			throw new Error("Failed to fetch ProgramGrading");

		return data.data;
	}

	async getApplicantList(
		programID: number
	): Promise<AdmissionReviewerApplicantListResponse[]> {
		const data: APIGenericResponse = await this.instance.get(
			`/admission/reviewer/program/${programID}/applicant?detail=true`
		);

		if (data.error === true || typeof data.data.applicants === "undefined")
			throw new Error("Failed to fetch applicant list");

		return data.data.applicants;
	}

	async submitDocsGrade(programID: number): Promise<any> {
		const response: APIGenericResponse = await this.instance.patch(
			`/admission/reviewer/program/${programID}/confirm_docs`
		);

		if (response.error === true)
			throw new Error("Failed to submit DocsGrade");
	}
}
