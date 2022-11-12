export interface AdmissionManagerSignInInput {
	email: string;
	password: string;
	"cf-turnstile-response": string;
}

export interface AdmissionManagerAuthResponse {
	email: string;
	provider: string;
	uid: string;
	id: number;
	allow_password_change: boolean;
	isInit: any | null;
	lang: any | null;
	name: any | null;
	nickname: any | null;
	image: any | null;
}

export interface AdmissionAdminProgramListResponse {
	id: number;
	category: string;
	name: string;
	application_start_date: string;
	application_end_date: string;
	review_start_date: string;
	review_end_date: string;
	require_file: string; // Array or string ??
	stage: string;
	created_at: string;
	updated_at: string;
	applicant_required_info: null; // ??
	applicant_required_file: null;
	reviewer_required_info: null;
	reviewer_required_file: null;
}

export interface AdmissionAdminApplicantsListResponse {
	id?: number;
	provider?: string;
	uid?: string;
	allow_password_change?: boolean;
	isInit?: boolean;
	lang?: string;
	name?: string;
	nickname?: string;
	image?: string;
	email?: string;
	username?: string;
	docs_order?: string;
	oral_order?: string;
	file?: string;
	docs_stage?: string | number;
	oral_stage?: string | number;
	created_at?: string;
	updated_at?: string;
	s_program_id?: number;
	application_stage?: string | number;
}

export interface AdmissionAdminScoreFieldResponse {
	docs_weight: number;
	oral_weight: number;
	docs_grade_name_1: string;
	docs_grade_name_2: string;
	docs_grade_name_3: string;
	docs_grade_weight_1: number;
	docs_grade_weight_2: number;
	docs_grade_weight_3: number;
	oral_grade_name_1: string;
	oral_grade_name_2: string;
	oral_grade_name_3: string;
	oral_grade_weight_1: number;
	oral_grade_weight_2: number;
	oral_grade_weight_3: number;
}
