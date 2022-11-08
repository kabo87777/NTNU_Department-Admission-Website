import type { AuthStore } from "@/stores/universalAuth";
import type {
	AdmissionAdminProgramListResponse,
	AdmissionAdminApplicantsListResponse,
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
}
