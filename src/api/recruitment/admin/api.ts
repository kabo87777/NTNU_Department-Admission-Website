import type { AuthStore } from "@/stores/universalAuth";
import { GenericAPI } from "@/api/api";
import type {
	RecruitmentAdminApplicantListResponse,
	RecruitmentAdminProgramListResponse,
} from "./types";
import type { APIGenericResponse } from "@/api/types";

export class RecruitmentAdminAPI extends GenericAPI {
	constructor(auth: AuthStore) {
		super(auth);
	}

	async getApplicantList(): Promise<RecruitmentAdminApplicantListResponse[]> {
		const data: APIGenericResponse = await this.instance.get(
			// @PT FIXME: This should not be hardcode
			"/recruitment/admin/program/1/applicant/1/file"
		);

		if (data.error === true || typeof data.data === "undefined")
			throw new Error("Failed to fetch applicant upload list");

		return data.data;
	}

	// TODO: disannotation while backend finished admin get program API
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
}
