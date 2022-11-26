import type { AuthStore } from "@/stores/universalAuth";
import { GenericAPI } from "@/api/api";
import type {
	RecruitmentApplicantGenericResponse,
	RecruitmentApplicantUserInfoResponse,
	RecruitmentApplicantProgramResponse,
	RecruitmentApplicantFileListResponse,
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

	async getBasicInfo(
		pid: number
	): Promise<RecruitmentApplicantUserInfoResponse> {
		const data: APIGenericResponse = await this.instance.get(
			`/recruitment/applicant/program/${pid}/info`
		);

		if (data.error === true) console.log("Failed to fetch user info");
		console.log(data);
		return data.data;
	}

	async patchBasicInfo(
		pid: number,
		body: object
	): Promise<RecruitmentApplicantGenericResponse> {
		const data: APIGenericResponse = await this.instance.patch(
			`/recruitment/applicant/program/${pid}/info`,
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

	async editBasicInfo(
		pid: number,
		body: object
	): Promise<RecruitmentApplicantGenericResponse> {
		const data: APIGenericResponse = await this.instance.patch(
			`/recruitment/applicant/program/${pid}/info`,
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

	async getFileList(
		pid: number
	): Promise<RecruitmentApplicantFileListResponse[]> {
		const data: APIGenericResponse = await this.instance.get(
			`/recruitment/applicant/program/${pid}/file`
		);

		if (data.error === true) console.log("Failed to fetch file list");

		return data.data;
	}

	async deleteFile(
		pid: number,
		fileId: number
	): Promise<RecruitmentApplicantGenericResponse> {
		const data: APIGenericResponse = await this.instance.delete(
			`recruitment/applicant/program/${pid}/file/${fileId}`
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

	async createFile(
		pid: number,
		body: object
	): Promise<RecruitmentApplicantGenericResponse> {
		const data: APIGenericResponse = await this.instance.post(
			`recruitment/applicant/program/${pid}/file`,
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

	async editFile(
		body: object,
		pid: number,
		fileId: number
	): Promise<RecruitmentApplicantGenericResponse> {
		const data: APIGenericResponse = await this.instance.patch(
			`recruitment/applicant/program/${pid}/file/${fileId}`,
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

	async uploadRefillFile(
		body: object,
		pid: number
	): Promise<RecruitmentApplicantGenericResponse> {
		const data: APIGenericResponse = await this.instance.post(
			`recruitment/applicant/program/${pid}/refillFile`,
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
}
