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
	// TODO: Wait backend to give exact type fields currently using null
	id: number;
	provider: string;
	uid: string;
	allow_password_change: boolean;
	isInit: null;
	lang: null;
	name: string;
	nickname: null;
	image: null;
	email: string;
	username: string;
	docs_order: null;
	oral_order: null;
	file: null;
	docs_stage: null;
	oral_stage: null;
	created_at: string;
	updated_at: string;
	s_program_id: number;
	application_stage: null;
}
