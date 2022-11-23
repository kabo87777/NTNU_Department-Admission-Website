import type { AuthStore } from "@/stores/universalAuth";
import { GenericAPI } from "@/api/api";
import type {
	RecruitmentApplicantGenericResponse,
	RecruitmentApplicantProgramResponse,
	RecruitmentApplicantFileListResponse,
<<<<<<< HEAD
	RecruitmentApplicantChangePassResponse,
	RecruitmentRegisterEmailPostResponse,
	newPostEmailRegister,
=======
>>>>>>> origin/develop
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

	async deleteFile(
		pid: number,
		fileId: number
	): Promise<RecruitmentApplicantGenericResponse> {
		const data: APIGenericResponse = await this.instance.delete(
			`recruitment/applicant/program/${pid}/file/${fileId}`
		);

		if (data.error !== false && data.message !== undefined) {
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

	async createFile(
		pid: number,
		body: object
	): Promise<RecruitmentApplicantGenericResponse> {
		const data: APIGenericResponse = await this.instance.post(
			`recruitment/applicant/program/${pid}/file`,
			body
		);

		if (data.error !== false && data.message !== undefined) {
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

	async editFile(
		body: object,
		pid: number,
		fileId: number
	): Promise<RecruitmentApplicantGenericResponse> {
		const data: APIGenericResponse = await this.instance.patch(
			`recruitment/applicant/program/${pid}/file/${fileId}`,
			body
		);

		if (data.error !== false && data.message !== undefined) {
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

	async changePassword(
		body: object
	): Promise<RecruitmentApplicantGenericResponse> {
		const data: APIGenericResponse = await this.instance.patch(
			"recruitment/auth/applicant/password",
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
	async postEmailRegister(
		newData: newPostEmailRegister
	): Promise<RecruitmentRegisterEmailPostResponse[]> {
		const data: APIGenericResponse = await this.instance.post(
			"/recruitment/auth/applicant",
			{
				body: newData,
			}
		);

		if (data.error === true || typeof data.data === "undefined")
			throw new Error("Failed to fetch program list");

		return data.data;
	}
}
