import type { AuthStore } from "@/stores/universalAuth";
import type {
	AdmissionAdminProgramListResponse,
	AdmAdminReviewerListResponse,
	AdmissionAdminApplicantsListResponse,
	AdmAdminGetApplicantInfo,
	AdmAdminGetApplicantAttachmentData,
	AdmissionAdminScoreFieldResponse,
	AdmAdminReviewerRelatedProgramResponse,
	AdmAdminEditApplicantRequest,
	AdmissionAdminGenericResponse,
	AdmissionAdminDocsGradeListResponse,
	AdmissionAdminOralGradeListResponse,
	AdmissionAdminSingleDocsGradeResponse,
	AdmissionAdminSingleOralGradeResponse,
	AdmissionAdminCreateReviewerRequest,
	AdmAdminGetApplicantMoredocResponses,
	AdmAdminChangePasswordRequest,
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
		reviewerID: number
	): Promise<AdmAdminReviewerRelatedProgramResponse[]> {
		const data: APIGenericResponse = await this.instance.get(
			`/admission/admin/reviewer/${reviewerID}/relation`
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

	async getApplicantBasicInfo(
		userId: number
	): Promise<AdmAdminGetApplicantInfo> {
		const data: APIGenericResponse = await this.instance.get(
			`/admission/admin/applicant/${userId}/info`
		);

		if (data.error === true)
			throw new Error("Failed to fetch applicant basic info");

		return data.data[0];
	}

	async getApplicantFile(
		userId: number
	): Promise<AdmAdminGetApplicantAttachmentData[]> {
		const data: APIGenericResponse = await this.instance.get(
			`/admission/admin/applicant/${userId}/file`
		);

		if (data.error === true)
			throw new Error("Failed to fetch applicant attachment");

		return data.data;
	}

	async getApplicantMoreDocRes(
		userId: number
	): Promise<AdmAdminGetApplicantMoredocResponses> {
		const data: APIGenericResponse = await this.instance.get(
			`admission/admin/applicant/${userId}/moredoc`
		);

		if (data.error === true)
			throw new Error("Failed to fetch applicant more doc state");

		return data.data;
	}

	async updateApplicantMoreDocState(
		userId: number,
		body: object
	): Promise<AdmissionAdminGenericResponse> {
		const data: APIGenericResponse = await this.instance.patch(
			`admission/admin/applicant/${userId}/moredoc`,
			body
		);

		if (data.error !== false) {
			return {
				success: false,
				message: data.message,
			};
		}

		return {
			success: true,
			message: data.message,
		};
	}

	async sendNotifyApplicantMoreDoc(
		userId: number
	): Promise<AdmissionAdminGenericResponse> {
		const data: APIGenericResponse = await this.instance.get(
			`admission/admin/applicant/${userId}/moredoc/notify`
		);

		if (data.error !== false) {
			return {
				success: false,
				message: data.message,
			};
		}

		return {
			success: true,
			message: data.message,
		};
	}

	async downloadApplicantFile(
		applicantID: number,
		fileId: number
	): Promise<Blob> {
		return await this.instance.get(
			`admission/admin/applicant/${applicantID}/file/${fileId}/getfile`,
			{ responseType: "blob" }
		);
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
				timeout: 61000,
				timeoutErrorMessage: "[TIMEOUT] Importing applicants",
			}
		);
		if (
			response.error === true ||
			typeof response.data?.totalImport === "undefined"
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

	async deleteProgram(programID: number): Promise<void> {
		const response: APIGenericResponse = await this.instance.delete(
			`/admission/admin/program/${programID}`
		);
		if (response.error === true)
			throw new Error("Failed to delete program");
	}

	async changePassword(
		body: AdmAdminChangePasswordRequest
	): Promise<AdmissionAdminGenericResponse> {
		const response: APIGenericResponse = await this.instance.patch(
			"/admission/auth/admin/password",
			body
		);

		if (response.error === true) {
			const msg = response.message.full_messages.join("\n");
			throw new Error(msg);
		}

		return response;
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
		applicantID: number
	): Promise<AdmissionAdminSingleDocsGradeResponse> {
		const data: APIGenericResponse = await this.instance.get(
			`/admission/admin/applicant/${applicantID}/docs_grading`
		);

		if (data.error === true || typeof data.data === "undefined")
			throw new Error("Failed to fetch docs grade");

		return data.data;
	}

	async getSingleOralGrade(
		applicantID: number
	): Promise<AdmissionAdminSingleOralGradeResponse> {
		const data: APIGenericResponse = await this.instance.get(
			`/admission/admin/applicant/${applicantID}/oral_grading`
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

	async changeReviewerAccountState(
		id: number,
		action: "activate" | "disable"
	) {
		const state = action === "activate" ? false : true;
		const response: APIGenericResponse = await this.instance.patch(
			`/admission/admin/reviewer/${id}/state`,
			{
				isDisabled: state,
			}
		);
		if (response.error === true)
			throw new Error(
				`Failed to ${action} reviewer's account state: ${response.message}`
			);

		return response;
	}
	async assignReviewertoProgram(reviewerID: number, programID: number) {
		const response: APIGenericResponse = await this.instance.post(
			`/admission/admin/program/${programID}/addreviewer`,
			{
				reviewer_id: reviewerID,
			}
		);

		if (response.error === true) throw new Error(`${response.message}`);
		return response;
	}

	async removeReviewerFromProgram(reviewerID: number, programID: number) {
		const response: APIGenericResponse = await this.instance.delete(
			`/admission/admin/program/${programID}/deletereviewer`,
			{
				data: {
					reviewer_id: reviewerID,
				},
			}
		);

		if (response.error === true) throw new Error(`${response.message}`);
		return response;
	}

	async getDocsReport(programID: number): Promise<string> {
		return await this.instance.get(
			`/admission/admin/program/${programID}/get_docs_report`
		);
	}

	async getDocsAnonyReport(programID: number): Promise<string> {
		return await this.instance.get(
			`/admission/admin/program/${programID}/get_docs_report?hide=true`
		);
	}

	async getGenReport(programID: number): Promise<string> {
		return await this.instance.get(
			`/admission/admin/program/${programID}/get_gen_report`
		);
	}

	async getGenAnonyReport(programID: number): Promise<string> {
		return await this.instance.get(
			`admission/admin/program/${programID}/get_gen_report?hide=true`
		);
	}

	async getEnrollReport(programID: number): Promise<string> {
		return await this.instance.get(
			`/admission/admin/program/${programID}/get_enroll_report`
		);
	}

	async getDocsReportGenerated(programID: number): Promise<GenericAPI> {
		const data: APIGenericResponse = await this.instance.get(
			`/admission/admin/program/${programID}/generate_docs`
		);

		if (data.error === true || typeof data.data === "undefined")
			throw new Error("Failed to generate the docs report");

		return data.data;
	}

	async getDocsAnonyReportGenerated(programID: number): Promise<GenericAPI> {
		const data: APIGenericResponse = await this.instance.get(
			`/admission/admin/program/${programID}/generate_docs?hide=true`
		);

		if (data.error === true || typeof data.data === "undefined")
			throw new Error("Failed to generate the anonymous docs report");

		return data.data;
	}

	async getGenReportGenerated(programID: number): Promise<GenericAPI> {
		const data: APIGenericResponse = await this.instance.get(
			`/admission/admin/program/${programID}/generate_general`
		);

		if (data.error === true || typeof data.data === "undefined")
			throw new Error("Failed to generate the general report");

		return data.data;
	}

	async getGenAnonyReportGenerated(programID: number): Promise<GenericAPI> {
		const data: APIGenericResponse = await this.instance.get(
			`/admission/admin/program/${programID}/generate_general?hide=true`
		);

		if (data.error === true || typeof data.data === "undefined")
			throw new Error("Failed to generate the anonymous general report");

		return data.data;
	}

	async getEnrollReportGenerated(programID: number): Promise<GenericAPI> {
		const data: APIGenericResponse = await this.instance.get(
			`/admission/admin/program/${programID}/generate_enroll`
		);

		if (data.error === true || typeof data.data === "undefined")
			throw new Error("Failed to generate the enroll report");

		return data.data;
	}
}
