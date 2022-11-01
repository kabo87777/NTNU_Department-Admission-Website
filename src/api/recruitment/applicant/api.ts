import type { AuthStore } from "@/stores/universalAuth";
import { GenericAPI } from "@/api/api";
import type { RecruitmentApplicantGetProgramResponse } from "./types";
import type { APIGenericResponse } from "@/api/types";

export class RecruitmentApplicantAPI extends GenericAPI {
	constructor(auth: AuthStore) {
		super(auth);
	}

	async getProgramList(): Promise<RecruitmentApplicantGetProgramResponse[]> {
		const data: APIGenericResponse = await this.instance.get(
			"/recruitment/applicant/program"
		);

		if (data.error === true || typeof data.data.programs === "undefined")
			throw new Error("Failed to fetch program list");
		console.log(data);
		return data.data.programs;
	}
}
