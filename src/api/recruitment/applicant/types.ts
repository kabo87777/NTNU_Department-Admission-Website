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
	applicant_required_file?: {} | [];
	applicant_required_info?: {} | [];
	created_at?: string;
	recruit_end_date: string;
	recruit_start_date: string;
	require_file?: [];
	review_end_date?: string;
	review_start_date?: string;
	reviewer_required_file?: {} | [];
	reviewer_required_info?: {} | [];
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
	created_at: string;
	updated_at: string;
}

export interface RecruitmentApplicantUserInfoResponse {
	id: number;
	name?: string;
	email?: string;
	national_id?: string;
	sex?: string;
	birth?: string;
	day_phone?: string;
	night_phone?: string;
	mobile_phone?: string;
	household_address?: string;
	household_zipcode?: number | string;
	communicate_address?: string;
	communicate_zipcode?: number | string;
	GSAT_num?: number | string;
	GSAT_registration?: boolean;
	graduated_school?: string;
	graduated_major?: string;
	isSameDept?: boolean;
	isDisabled?: boolean;
	r_applicant_id: number;
	created_at: string;
	updated_at: string;
}
