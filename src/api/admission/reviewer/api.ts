import type { AuthStore } from "@/stores/universalAuth";
import { GenericAPI } from "@/api/api";
import type {
	AdmissionReviewerProgramListResponse,
	AdmissionReviewerApplicantGradeResponse,
	AdmissionReviewerApplicantInfoResponse,
	AdmissionReviewerProgramGradingResponse,
	AdmissionReviewerApplicantListResponse,
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

	///FIX while backend is ready
	async getApplicantSingleFile(): Promise<any> {
		const data: APIGenericResponse = await this.instance.get(
			"/admission/reviewer/applicant/1/file/1/getfile"
		);

		if (data.error === true || typeof data === "undefined")
			throw new Error("Failed to fetch applicant file");

		return data;
	}

	async submitOralGrade(programID: number): Promise<any> {
		const response: APIGenericResponse = await this.instance.patch(
			`/admission/reviewer/program/${programID}/confirm_oral`
		);

		if (response.error === true)
			throw new Error("Failed to submit OralGrade");
	}
}
