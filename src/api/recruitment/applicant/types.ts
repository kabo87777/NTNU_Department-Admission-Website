export interface RecruitmentApplicantSignInInput {
	email: string;
	password: string;
	"cf-turnstile-response": string;
}

export interface RecruitmentApplicantAuthResponse {
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

// TODO: disannotation while backend finished applicant get program API
// export interface RecruitmentApplicantProgramListResponse {
// 	id: number;
// 	category: string;
// 	name: string;
// 	application_start_date: string;
// 	application_end_date: string;
// 	review_start_date: string;
// 	review_end_date: string;
// 	require_file: string; // Array or string ??
// 	stage: string;
// 	created_at: string;
// 	updated_at: string;
// 	applicant_required_info: null; // ??
// 	applicant_required_file: null;
// 	reviewer_required_info: null;
// 	reviewer_required_file: null;
// }
