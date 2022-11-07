export interface RecruitmentAdminSignInInput {
	email: string;
	password: string;
	"cf-turnstile-response": string;
}

export interface RecruitmentAdminAuthResponse {
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

export interface RecruitmentAdminProgramListResponse {
	id: number;
	category: string;
	name: string;
	recruit_start_date: string;
	recruit_end_date: string;
	review_start_date: string;
	review_end_date: string;
	require_file: string; // Array or string ??
	created_at: string;
	updated_at: string;
	applicant_required_info: null; // ??
	applicant_required_file: null;
	reviewer_required_info: null;
	reviewer_required_file: null;
}
