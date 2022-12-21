import type { AuthStore } from "@/stores/universalAuth";
import { GenericAPI } from "@/api/api";
import type {
	RecruitmentAdminApplicantListResponse,
	RecruitmentAdminApplicantsListResponse,
	RecruitmentAdminChangePassResponse,
	RecruitmentAdminCreateReviewerRequest,
	RecruitmentAdminProgramListResponse,
	RecruitmentAdminReviewersListResponse,
	RecruitmentAdminApplicantListWithDetailResponse,
	RecruitmentAdminSingleApplicantWithDetailResponse,
	RecruitmentAdminApplicantResponse,
	RecruitmentAdminGetApplicantAttachmentList,
	RecruimentAdminGetApplicantMoredocResponses,
	RecruitmentAdminGenericStatusResponse,
	RecruitAdminChangePasswordRequest,
} from "./types";
import type { APIGenericResponse } from "@/api/types";
import { Ref } from "vue";

export class RecruitmentAdminAPI extends GenericAPI {
	constructor(auth: AuthStore) {
		super(auth);
	}

	async getApplicantFile(
		pid: number
	): Promise<RecruitmentAdminApplicantListResponse[]> {
		const data: APIGenericResponse = await this.instance.get(
			`/recruitment/admin/program/${pid}/file`
		);

		if (data.error === true || typeof data.data === "undefined")
			throw new Error("Failed to fetch applicant upload list");

		return data.data;
	}

	async getProgramList(): Promise<RecruitmentAdminProgramListResponse[]> {
		const data: APIGenericResponse = await this.instance.get(
			"/recruitment/admin/program"
		);

		if (data.error === true || typeof data.data.programs === "undefined")
			throw new Error("Failed to fetch program list");

		return data.data.programs;
	}

	async updateProgramData(
		programID: number,
		data: RecruitmentAdminProgramListResponse
	): Promise<any> {
		const response: APIGenericResponse = await this.instance.patch(
			`/recruitment/admin/program/${programID}`,
			data
		);
		if (response.error === true)
			throw new Error("Failed to update program");
	}

	async addNewProgram(
		data: RecruitmentAdminProgramListResponse
	): Promise<any> {
		const response: APIGenericResponse = await this.instance.post(
			"/recruitment/admin/program",
			data
		);
		if (response.error === true)
			throw new Error("Failed to add new program");
	}

	async deleteProgram(programID: number): Promise<any> {
		const response: APIGenericResponse = await this.instance.delete(
			`/recruitment/admin/program/${programID}`
		);
		if (response.error === true)
			throw new Error("Failed to delete program");
	}

	async changePassword(
		body: RecruitAdminChangePasswordRequest
	): Promise<RecruitmentAdminGenericStatusResponse> {
		const response: APIGenericResponse = await this.instance.patch(
			"/recruitment/auth/admin/password",
			body
		);

		if (response.error === true) {
			const msg = response.message.full_messages.join("\n");
			throw new Error(msg);
		}

		return response;
	}

	async getApplicantList(
		programID: number
	): Promise<RecruitmentAdminApplicantsListResponse[]> {
		const data: APIGenericResponse = await this.instance.get(
			`/recruitment/admin/program/${programID}/applicant`
		);
		if (data.error === true || typeof data.data.applicants === "undefined")
			throw new Error("Failed to fetch applicant list");
		return data.data.applicants;
	}

	async getApplicantBasicInfo(
		programID: number,
		userId: number
	): Promise<RecruitmentAdminApplicantResponse> {
		const data: APIGenericResponse = await this.instance.get(
			`/recruitment/admin/program/${programID}/applicant/${userId}/info`
		);
		if (data.error === true)
			throw new Error("Failed to fetch appplicant info");

		return data.data;
	}

	async getApplicantFileList(
		programID: number,
		userId: number
	): Promise<RecruitmentAdminGetApplicantAttachmentList[]> {
		const data: APIGenericResponse = await this.instance.get(
			`/recruitment/admin/program/${programID}/applicant/${userId}/file`
		);
		if (data.error === true)
			throw new Error("Failed to fetch applicant attachment");

		return data.data;
	}

	async getApplicantMoreDocRes(
		programID: number,
		userId: number
	): Promise<RecruimentAdminGetApplicantMoredocResponses> {
		const data: APIGenericResponse = await this.instance.get(
			`recruitment/admin/program/${programID}/applicant/${userId}/moredoc`
		);

		if (data.error === true)
			throw new Error("Failed to fetch applicant more doc state");

		return data.data;
	}

	async updateApplicantMoreDocState(
		programID: number,
		userId: number,
		body: object
	): Promise<RecruitmentAdminGenericStatusResponse> {
		const data: APIGenericResponse = await this.instance.patch(
			`recruitment/admin/program/${programID}/applicant/${userId}/moredoc`,
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

	async deleteApplicant(id: number) {
		const response: APIGenericResponse = await this.instance.delete(
			`/recruitment/admin/applicant/${id}`
		);
		if (response.error === true)
			throw new Error("Failed to send DEL request at deleteApplicant");

		return response;
	}

	async getReviewerList(): Promise<RecruitmentAdminReviewersListResponse[]> {
		const response: APIGenericResponse = await this.instance.get(
			"/recruitment/admin/reviewer"
		);
		if (response.error === true || typeof response.data === "undefined")
			throw new Error("Failed to GET reviewer list");

		return response.data.reviewers;
	}

	async createReviewerAccount(data: RecruitmentAdminCreateReviewerRequest) {
		const response: APIGenericResponse = await this.instance.post(
			"/recruitment/admin/reviewer",
			data
		);

		if (response.error === true) throw new Error(`${response.message}`);

		return;
	}

	async changeReviewerAccountState(
		id: number,
		action: "activate" | "disable"
	) {
		const body = {
			isDisabled: action === "disable" ? true : false,
		};

		const response: APIGenericResponse = await this.instance.patch(
			`/recruitment/admin/reviewer/${id}/state`,
			body
		);

		if (response.error === true) throw new Error(`${response.message}`);

		return;
	}

	async getApplicantListWithDetail(
		programID: number
	): Promise<RecruitmentAdminApplicantListWithDetailResponse[]> {
		const data: APIGenericResponse = await this.instance.get(
			`/recruitment/admin/program/${programID}/applicant`
		);

		if (data.error === true || typeof data.data.applicants === "undefined")
			throw new Error("Failed to fetch applicant upload list");

		return data.data.applicants;
	}

	async getSingleApplicantWithDetail(
		programID: number,
		applicantID: number
	): Promise<RecruitmentAdminSingleApplicantWithDetailResponse> {
		const data: APIGenericResponse = await this.instance.get(
			`/recruitment/admin/program/${programID}/applicant/${applicantID}/reviewstate`
		);

		if (data.error === true || typeof data.data === "undefined")
			throw new Error("Failed to fetch applicant reviewstate");

		return data.data;
	}

	async updateSingleApplicantWithDetail(
		programID: number,
		applicantID: number,
		newStage: any
	): Promise<any> {
		const data: APIGenericResponse = await this.instance.patch(
			`/recruitment/admin/program/${programID}/applicant/${applicantID}`,
			newStage
		);

		if (data.error === true || typeof data.data === "undefined")
			throw new Error("Failed to update applicant reviewstate");

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
