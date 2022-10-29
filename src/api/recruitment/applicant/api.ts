import type { AuthStore } from "@/stores/universalAuth";
import { GenericAPI } from "@/api/api";
// TODO: disannotation while backend finished applicant get program API
// import type { RecruitmentApplicantListResponse } from "./types";
// import type { APIGenericResponse } from "@/api/types";

export class RecruitmentApplicantAPI extends GenericAPI {
	constructor(auth: AuthStore) {
		super(auth);
	}

	// TODO: disannotation while backend finished applicant get program API
	// async getProgramList(): Promise<RecruitmentApplicantProgramListResponse[]> {
	// 	const data: APIGenericResponse = await this.instance.get(
	// 		"/recruitment/applicant/program"
	// 	);

	// 	if (data.error === true || typeof data.data.programs === "undefined")
	// 		throw new Error("Failed to fetch program list");

	// 	return data.data.programs;
	// }
}
