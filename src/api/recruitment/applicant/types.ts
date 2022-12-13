export interface Tags {
	basicInfo: string;
	attachment: string;
	additionalDocs: string;
	submitConfirm: string;
}

export interface RecruitmentApplicantGenericResponse {
	success?: boolean;
	message?: string | [];
}

export interface AttachmentData {
	id: number;
	category: string;
	name: string;
	filepath: {
		url: string | any;
	};
	r_applicants_r_program_id: number;
	school?: string;
	score?: number;
	created_at: string;
	updated_at: string;
}

export interface AttachmentDetailData {
	id?: number;
	category?: string;
	name?: string;
	filepath?: {
		url?: string | any;
	};
	r_applicants_r_program_id?: number;
	school?: string;
	score?: number;
	created_at?: string;
	updated_at?: string;
	order?: number;
	state?: number;
}

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

export interface RecruitmentApplicantProgramResponse {
	id: number;
	category: string;
	name: string;
	isMoredoc?: boolean;
	applicant_required_file?: string;
	applicant_required_info?: string;
	created_at?: string;
	recruit_end_date: string;
	recruit_start_date: string;
	require_file?: [];
	review_end_date?: string;
	review_start_date?: string;
	reviewer_required_file?: string;
	reviewer_required_info?: string;
	updated_at: string;
}

export interface RecruitmentApplicantFileListResponse {
	id: number;
	category: string;
	name: string;
	filepath: {
		url: string | any;
	};
	r_applicants_r_program_id: number;
	school?: string;
	score?: number;
	created_at: string;
	updated_at: string;
}

export interface RecruitmentApplicantUserInfoResponse {
	id: number;
	title?: string;
	suffix?: string;
	cn_surname?: string;
	name?: string;
	en_givenname?: string;
	en_midname?: string;
	en_surname?: string;
	nationality?: string;
	national_id?: string;
	sex?: string;
	birth?: Date;
	birthcountry?: string;
	mobile_phone?: string;
	household_address?: string;
	household_zipcode?: number | string;
	communicate_address?: string;
	communicate_zipcode?: number | string;
}
