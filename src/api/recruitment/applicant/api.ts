import type { AuthStore } from "@/stores/universalAuth";
import { GenericAPI } from "@/api/api";
import type {
	RecruitmentApplicantProgramResponse,
	RecruitmentApplicantFileListResponse,
	RecruitmentApplicantChangePassResponse,
} from "./types";
import type { APIGenericResponse } from "@/api/types";

export class RecruitmentApplicantAPI extends GenericAPI {
	constructor(auth: AuthStore) {
		super(auth);
	}

	async getProgramList(): Promise<RecruitmentApplicantProgramResponse[]> {
		const data: APIGenericResponse = await this.instance.get(
			"/recruitment/applicant/program"
		);

		if (data.error === true || typeof data.data === "undefined")
			throw new Error("Failed to fetch program list");

		return data.data;
	}

	async getFileList(
		pid: number
	): Promise<RecruitmentApplicantFileListResponse[]> {
		const data: APIGenericResponse = await this.instance.get(
			`/recruitment/applicant/program/${pid}/file`
		);

		if (data.error === true || typeof data.data === "undefined")
			throw new Error("Failed to fetch file list");

		return data.data;
	}

	async changePassword(
		body: object
	): Promise<RecruitmentApplicantChangePassResponse> {
		const data: APIGenericResponse = await this.instance.patch(
			"recruitment/auth/applicant/password",
			body
		);

		if (data.success === false && data.errors !== undefined) {
			return {
				success: data.success,
				message: data.errors.full_messages,
			};
		}

		return {
			success: data.success,
			message: data.message,
		};
	}
}
