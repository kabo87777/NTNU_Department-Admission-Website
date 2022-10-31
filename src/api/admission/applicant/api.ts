import type { AuthStore } from "@/stores/universalAuth";
// TODO: disannotation while backend finished applicant get program API
// import type { AdmissionApplicantProgramListResponse } from "./types";
// import type { APIGenericResponse } from "@/api/types";
import { GenericAPI } from "@/api/api";

export class AdmissionApplicantAPI extends GenericAPI {
	constructor(auth: AuthStore) {
		super(auth);
	}

	// TODO: disannotation while backend finished applicant get program API
	// async getProgramList(): Promise<AdmissionApplicantProgramListResponse[]> {
	// 	const data: APIGenericResponse = await this.instance.get(
	// 		"/admission/applicant/program"
	// 	);

	// 	if (data.error === true || typeof data.data.programs === "undefined")
	// 		throw new Error("Failed to fetch program list");

	// 	return data.data.programs;
	// }
}
