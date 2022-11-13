export interface RecruitmentReviewerSignInInput {
	email: string;
	password: string;
	"cf-turnstile-response": string;
}

export interface RecruitmentManagerAuthResponse {
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
export interface RecruitmentReviewerProgramResponse {
	id: number;
	category: string;
	name: string | null;
	recruit_start_date: string;
	recruit_end_date: string;
	review_start_date: string;
	review_end_date: string;
	require_file: any | null;
	created_at: string;
	updated_at: string | null;
	applicant_required_info: any | null;
	applicant_required_file: any | null;
	reviewer_required_info: any | null;
	updareviewer_required_fileted_at: any | null;
}

// TODO: disannotation while backend finished reviewer get program API
// export interface RecruitmentReviewerApplicantListResponse {
// 	id: number;
// 	provider: string;
// 	uid: string;
// 	isInit: any | null;
// 	lang: any | null;
// 	name: any | null;
// 	nickname: any | null;
// 	image: any | null;
// 	email: string;
// 	created_at: string;
// 	updated_at: string;
// }
