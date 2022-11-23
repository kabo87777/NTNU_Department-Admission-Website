import type { AuthStore } from "@/stores/universalAuth";
import type {
	AdmissionAdminProgramListResponse,
	AdmissionAdminApplicantsListResponse,
	AdmissionAdminScoreFieldResponse,
} from "./types";
import type { APIGenericResponse } from "@/api/types";
import { GenericAPI } from "@/api/api";
import messages from "@intlify/vite-plugin-vue-i18n/messages";

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
	}
}
