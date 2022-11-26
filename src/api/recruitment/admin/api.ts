import type { AuthStore } from "@/stores/universalAuth";
import { GenericAPI } from "@/api/api";
import type {
	RecruitmentAdminApplicantListResponse,
	RecruitmentAdminChangePassResponse,
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

	async changePassword(
		body: object
	): Promise<RecruitmentAdminChangePassResponse> {
		const data: APIGenericResponse = await this.instance.patch(
			"/recruitment/auth/admin/password",
			body
		);
		if(data.error !== false){
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
