import type { AuthStore } from "@/stores/universalAuth";
import type {
	AdmissionAdminProgramListResponse,
	AdmAdminReviewerListResponse,
	AdmissionAdminApplicantsListResponse,
	AdmAdminReviewerRelatedProgramResponse,
	AdmAdminEditApplicantRequest,
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
	async importApplicantsXlsx(programID: number) {
		const response: APIGenericResponse = await this.instance.post(
			`/admission/admin/program/${programID}/import`
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
			throw new Error("Failed to update program");
	}

	async deleteProgram(programID: number): Promise<any> {
		const response: APIGenericResponse = await this.instance.delete(
			`/admission/admin/program/${programID}`
		);
		if (response.error === true)
			throw new Error("Failed to update program");
	}
}
