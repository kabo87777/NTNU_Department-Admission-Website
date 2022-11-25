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

export interface RecruitmentReviewerProgramListResponse {
	id: number;
	category: string;
	name: string;
	recruit_start_date: string;
	recruit_end_date: string;
	review_start_date: string;
	review_end_date: string;
	created_at: string;
	updated_at: string;
	applicant_required_info: null;
	applicant_required_file: null;
	reviewer_required_info: null;
	reviewer_required_file: null;
}
export interface RecruitmentReviewerApplicantListResponse {
	id: number;
	provider: string;
	uid: string;
	allow_password_change: boolean;
	isInit: any | null;
	lang: any | null;
	name: any | null;
	nickname: any | null;
	image: any | null;
	email: string;
	created_at: string;
	updated_at: string;
	comment: string | null;
	isRecommend: boolean | null;
}

export interface RecruitmentReviewerApplicantCommentResponse {
	comment: string | null;
}

export interface RecruitmentReviewerApplicantInfoResponse {
	id: number;
	name: string;
	national_id: string;
	sex: string;
	birth: string;
	day_phone: string;
	night_phone: string;
	mobile_phone: string;
	hosuehold_address: string;
	household_zipcode: string;
	communicate_address: string;
	communicate_zipcode: string;
	GSAT_num: string;
	GSAT_registration: string;
	graduated_school: string;
	graduated_major: string;
	isSameDept: boolean;
	isDisabled: boolean;
	r_applicants_r_program_id: number;
	created_at: string;
	updated_at: string;
	isConfirm: boolean;
}
