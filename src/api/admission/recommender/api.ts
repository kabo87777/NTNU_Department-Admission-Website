import type { AuthStore } from "@/stores/universalAuth";
import { GenericAPI } from "@/api/api";

export class AdmissionRecommenderAPI extends GenericAPI {
	constructor(auth: AuthStore) {
		super(auth);
	}
}
