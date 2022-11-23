import type { AuthStore } from "@/stores/universalAuth";
import type {
	AdmissionAdminProgramListResponse,
	AdmAdminReviewerListResponse,
	AdmissionAdminApplicantsListResponse,
<<<<<<< HEAD
	AdmissionAdminScoreFieldResponse,
} from "./types";
import type { APIGenericResponse } from "@/api/types";
import { GenericAPI } from "@/api/api";
import messages from "@intlify/vite-plugin-vue-i18n/messages";
=======
	AdmAdminReviewerRelatedProgramResponse,
	AdmAdminEditApplicantRequest,
} from "./types";
import type { APIGenericResponse } from "@/api/types";
import { GenericAPI } from "@/api/api";
import { Ref } from "vue";
>>>>>>> develop

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
<<<<<<< HEAD

	async getScoreField(
		programID: number
	): Promise<AdmissionAdminScoreFieldResponse> {
		const data: APIGenericResponse = await this.instance.get(
			`admission/admin/program/${programID}/grading`
		);
		if (data.error === true) throw new Error(data.message);
		return data.data;
	}

	async patchScoreField(
		programID: number,
		newData: AdmissionAdminScoreFieldResponse
	): Promise<APIGenericResponse> {
		const data: APIGenericResponse = await this.instance.patch(
			`/admission/admin/program/${programID}/grading/`,
			newData
		);
		if (data.error === true) throw new Error(data.message);
		return data;
=======
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
			throw new Error("Failed to update program");
	}

	async deleteProgram(programID: number): Promise<any> {
		const response: APIGenericResponse = await this.instance.delete(
			`/admission/admin/program/${programID}`
		);
		if (response.error === true)
			throw new Error("Failed to update program");
>>>>>>> develop
	}
}
