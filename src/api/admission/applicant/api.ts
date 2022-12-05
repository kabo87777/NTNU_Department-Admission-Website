import type { AuthStore } from "@/stores/universalAuth";
import type {
	AdmissionApplicantGetProgramResponse,
	AdmissionApplicantGetFileListResponse,
	AdmissionApplicantGenericResponse,
	AdmissionApplicantRecLetListRes,
	AdmissionApplicantGetUserInfoResponse,
} from "./types";
import type { APIGenericResponse } from "@/api/types";
import { GenericAPI } from "@/api/api";

export class AdmissionApplicantAPI extends GenericAPI {
	constructor(auth: AuthStore) {
		super(auth);
	}

	async getProgram(): Promise<AdmissionApplicantGetProgramResponse> {
		const data: APIGenericResponse = await this.instance.get(
			"/admission/applicant/program"
		);

		if (data.error === true || typeof data.data === "undefined")
			console.log("Failed to fetch program list");

		return data.data;
	}

	async getUserInfo(): Promise<AdmissionApplicantGetUserInfoResponse> {
		const data: APIGenericResponse = await this.instance.get(
			"admission/applicant/info"
		);

		if (data.error === true) throw new Error("Failed to fetch user info");
		console.log(data);
		return data.data;
	}

	async patchBasicInfo(
		body: object
	): Promise<AdmissionApplicantGenericResponse> {
		const data: APIGenericResponse = await this.instance.patch(
			"admission/applicant/info",
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

	async getFileList(): Promise<AdmissionApplicantGetFileListResponse[]> {
		const data: APIGenericResponse = await this.instance.get(
			"admission/applicant/file"
		);

		if (data.error === true) throw new Error("Failed to fetch file list");

		return data.data;
	}

	async deleteFile(
		fileId: number
	): Promise<AdmissionApplicantGenericResponse> {
		const data: APIGenericResponse = await this.instance.delete(
			`admission/applicant/file/${fileId}`
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

	async createFile(body: object): Promise<AdmissionApplicantGenericResponse> {
		const data: APIGenericResponse = await this.instance.post(
			"admission/applicant/file",
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
		fileId: number
	): Promise<AdmissionApplicantGenericResponse> {
		const data: APIGenericResponse = await this.instance.patch(
			`admission/applicant/file/${fileId}`,
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
	): Promise<AdmissionApplicantGenericResponse> {
		const data: APIGenericResponse = await this.instance.patch(
			"admission/auth/applicant/password",
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

	async getRecommendLetterList(): Promise<AdmissionApplicantRecLetListRes[]> {
		const data: APIGenericResponse = await this.instance.get(
			"admission/applicant/recommendletter"
		);

		if (data.error !== false)
			throw new Error("Failed to fetch recommendation letter list");

		return data.data;
	}

	async saveRecommendLetter(
		body: object
		// CHANGE THE RESPONSE TYPE ONCE BACKEND CONFIRM THE DATA STRUCTURE
	): Promise<AdmissionApplicantGenericResponse> {
		const data: APIGenericResponse = await this.instance.post(
			"admission/applicant/recommendletter",
			body
		);

		if (data.error !== false)
			return {
				success: false,
				message: data.message,
			};

		return {
			success: true,
			message: data.message,
		};
	}

	async deleteRecommendLetter(
		letterId: number
	): Promise<AdmissionApplicantGenericResponse> {
		const data: APIGenericResponse = await this.instance.delete(
			`admission/applicant/recommendletter/${letterId}`
		);

		if (data.error !== false)
			return {
				success: false,
				message: data.message,
			};

		return {
			success: true,
			message: data.message,
		};
	}

	async requestRecommendLetter(
		letterId: number
	): Promise<AdmissionApplicantGenericResponse> {
		const data: APIGenericResponse = await this.instance.get(
			`admission/applicant/recommendletter/${letterId}/send_email`
		);

		if (data.error !== false)
			return {
				success: false,
				message: data.message,
			};

		return {
			success: true,
			message: data.message,
		};
	}

	async uploadRefillFile(
		body: object
	): Promise<AdmissionApplicantGenericResponse> {
		const data: APIGenericResponse = await this.instance.post(
			"admission/applicant/refillFile",
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
}
