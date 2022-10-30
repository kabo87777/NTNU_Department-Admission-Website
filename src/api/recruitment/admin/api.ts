import type { AuthStore } from "@/stores/universalAuth";
import { GenericAPI } from "@/api/api";
// TODO: disannotation while backend finished admin get program API
// import type { RecruitmentAdminListResponse } from "./types";
// import type { APIGenericResponse } from "@/api/types";

export class RecruitmentAdminAPI extends GenericAPI {
	constructor(auth: AuthStore) {
		super(auth);
	}

	// TODO: disannotation while backend finished admin get program API
	// async getProgramList(): Promise<RecruitmentAdminProgramListResponse[]> {
	// 	const data: APIGenericResponse = await this.instance.get(
	// 		"/recruitment/admin/program"
	// 	);

	// 	if (data.error === true || typeof data.data.programs === "undefined")
	// 		throw new Error("Failed to fetch program list");

	// 	return data.data.programs;
	// }
}
