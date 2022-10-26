import type { AuthStore } from "@/stores/universalAuth";
import { GenericAPI } from "@/api/api";
import type { RecruitmentReviewerApplicantListResponse } from "./types";
import type { APIGenericResponse } from "@/api/types";

export class RecruitmentReviewerAPI extends GenericAPI {
	constructor(auth: AuthStore) {
		super(auth);
	}
}
