import type { AuthStore } from "@/stores/universalAuth";
import type {
	AdmissionAdminProgramListResponse,
	AdmAdminReviewerListResponse,
	AdmissionAdminApplicantsListResponse,
	AdmissionAdminScoreFieldResponse,
	AdmAdminReviewerRelatedProgramResponse,
	AdmAdminEditApplicantRequest,
	AdmissionAdminGenericResponse,
	AdmissionAdminDocsGradeListResponse,
	AdmissionAdminOralGradeListResponse,
	AdmissionAdminSingleDocsGradeResponse,
	AdmissionAdminSingleOralGradeResponse,
	AdmissionAdminCreateReviewerRequest,
} from "./types";
import type { APIGenericResponse } from "@/api/types";
import { GenericAPI } from "@/api/api";
import { Ref } from "vue";
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
		reviewerID: Ref<number>
	): Promise<AdmAdminReviewerRelatedProgramResponse[]> {
		const data: APIGenericResponse = await this.instance.get(
			`/admission/admin/reviewer/${reviewerID.value}/relation`
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

	async getScoreField(
		programID: number
	): Promise<AdmissionAdminScoreFieldResponse> {
		const response: APIGenericResponse = await this.instance.get(
			`admission/admin/program/${programID}/grading`
		);
		if (response.error === true) throw new Error(response.message);
		return response.data;
	}

	async patchScoreField(
		programID: number,
		newData: AdmissionAdminScoreFieldResponse
	): Promise<APIGenericResponse> {
		const response: APIGenericResponse = await this.instance.patch(
			`/admission/admin/program/${programID}/grading/`,
			newData
		);
		if (response.error === true)
			throw new Error("Failed to patch score field");
		return response;
	}
	async postApplicantsXlsx(programID: number, data: FormData) {
		console.log("POST");
		const response: APIGenericResponse = await this.instance.post(
			`/admission/admin/program/${programID}/import`,
			data,
			{
				onUploadProgress(progressEvent) {
					// TODO: Pass PrimeVue ProgressBar argument
					console.log(progressEvent.progress);
				},
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);
		if (
			response.error === true ||
			typeof response.data.totalImport === "undefined"
		)
			throw new Error("Failed to import applicant accounts.");

		return response;
	}

	async deleteApplicant(applicantID: number) {
		const response: APIGenericResponse = await this.instance.delete(
			`/admission/admin/applicant/${applicantID}`
		);

		if (response.error === true)
			throw new Error(
				`Failed to delete applicant account: ${applicantID}`
			);

		return response;
	}

	async updateApplicantData(
		applicantID: number,
		data: AdmAdminEditApplicantRequest
	) {
		const response: APIGenericResponse = await this.instance.patch(
			`/admission/admin/applicant/${applicantID}`,
			data
		);
		if (response.error === true)
			throw new Error(`Failed to update applicant: ${applicantID}`);

		return response;
	}

	async updateProgramData(
		programID: number,
		data: AdmissionAdminProgramListResponse
	): Promise<any> {
		const response: APIGenericResponse = await this.instance.patch(
			`/admission/admin/program/${programID}`,
			data
		);
		if (response.error === true)
			throw new Error("Failed to update program");
	}

	async addNewProgram(data: AdmissionAdminProgramListResponse): Promise<any> {
		const response: APIGenericResponse = await this.instance.post(
			"/admission/admin/program",
			data
		);
		if (response.error === true)
			throw new Error("Failed to add new program");
	}

	async deleteProgram(programID: number): Promise<any> {
		const response: APIGenericResponse = await this.instance.delete(
			`/admission/admin/program/${programID}`
		);
		if (response.error === true)
			throw new Error("Failed to delete program");
	}

	async changePassword(body: object): Promise<AdmissionAdminGenericResponse> {
		const data: APIGenericResponse = await this.instance.patch(
			"admission/auth/admin/password",
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

	async getDocsGradeList(
		programID: number
	): Promise<AdmissionAdminDocsGradeListResponse[]> {
		const data: APIGenericResponse = await this.instance.get(
			`/admission/admin/program/${programID}/docs_grading`
		);

		if (typeof data.data === "undefined")
			throw new Error("Failed to fetch docs list");

		return data.data;
	}

	async getOralGradeList(
		programID: number
	): Promise<AdmissionAdminOralGradeListResponse[]> {
		const data: APIGenericResponse = await this.instance.get(
			`/admission/admin/program/${programID}/oral_grading`
		);

		if (typeof data.data === "undefined")
			throw new Error("Failed to fetch oral list");

		return data.data;
	}

	async getSingleDocsGrade(
		applicantID: Ref<number>
	): Promise<AdmissionAdminSingleDocsGradeResponse> {
		const data: APIGenericResponse = await this.instance.get(
			`/admission/admin/applicant/${applicantID.value}/docs_grading`
		);

		if (data.error === true || typeof data.data === "undefined")
			throw new Error("Failed to fetch docs grade");

		return data.data;
	}

	async getSingleOralGrade(
		applicantID: Ref<number>
	): Promise<AdmissionAdminSingleOralGradeResponse> {
		const data: APIGenericResponse = await this.instance.get(
			`/admission/admin/applicant/${applicantID.value}/oral_grading`
		);

		if (data.error === true || typeof data.data === "undefined")
			throw new Error("Failed to fetch docs grade");

		return data.data;
	}

	async updateApplicantStage(applicantID: number, data: any): Promise<any> {
		const response: APIGenericResponse = await this.instance.patch(
			`/admission/admin/applicant/${applicantID}`,
			data
		);
		if (response.error === true)
			throw new Error("Failed to update program");

		return response;
	}
	async createReviewer(
		data: AdmissionAdminCreateReviewerRequest
	): Promise<AdmissionAdminGenericResponse> {
		const response: APIGenericResponse = await this.instance.post(
			"/admission/admin/reviewer",
			data
		);

		if (response.error === true) throw new Error("Failed to add reviewer");

		return response;
	}
}
