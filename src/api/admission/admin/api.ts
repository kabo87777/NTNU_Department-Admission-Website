import type { AuthStore } from "@/stores/universalAuth";
import type { AdmissionAdminProgramListResponse } from "./types";
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
}
