import type { AuthStore } from "@/stores/universalAuth";
import { GenericAPI } from "@/api/api";
// TODO: disannotation while backend finished reviewer get program API
import type { RecruitmentReviewerProgramResponse } from "./types";
import type { APIGenericResponse } from "@/api/types";

export class RecruitmentReviewerAPI extends GenericAPI {
	constructor(auth: AuthStore) {
		super(auth);
	}

	// TODO: disannotation while backend finished reviewer get program API
	async getProgramList(): Promise<RecruitmentReviewerProgramResponse[]> {
		const data: APIGenericResponse = await this.instance.get(
			"/recruitment/reviewer/program"
		);

		if (data.error === true || typeof data.data.programs === "undefined")
			throw new Error("Failed to fetch program list");

		return data.data.programs;
	}
}
