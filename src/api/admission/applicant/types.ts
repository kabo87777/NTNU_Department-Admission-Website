export interface AdmissionApplicantSignInInput {
	email: string;
	password: string;
	"cf-turnstile-response": string;
}

export interface AdmissionApplicantAuthResponse {
	email: string;
	username: string;
	id: number;
	provider: string;
	uid: string;
	allow_password_change: boolean;
	isInit: boolean;
	lang: string;
	name: string;
	nickname: string;
	image: any;
	docs_order: number;
	oral_order: number;
	file: any;
	docs_stage: any;
	oral_stage: any;
	created_at: string;
	updated_at: string;
	s_program_id: number;
	application_stage: any;
}

export interface UserInfo {
	name: string;
	email: string;
	phone: string;
}

export interface Tags {
	basicInfo: string;
	attachment: string;
	recommendLetter: string;
	additionalDocs: string;
}

export interface AttachmentData {
	itemName?: string;
	fileName?: string;
	fileUrl?: string;
	order?: number;
	state?: number;
	schoolName?: string;
	score?: number | string;
}

export interface AdmissionApplicantGetProgramResponse {
	id: number;
	category: string;
	name: string;
	application_start_date: string;
	application_end_date: string;
	review_start_date: string;
	review_end_date: string;
	require_file: [];
	stage: string;
	created_at: string;
	updated_at: string;
	applicant_required_info: null; // ??
	applicant_required_file: null;
	reviewer_required_info: null;
	reviewer_required_file: null;
}

export interface AdmissionApplicantRecLetListRes {
	id: number;
	name: string;
	email: string;
	phone: string;
	relation: string;
	position: string;
	institution: string;
	status: string;
	s_applicant_id: number;
	created_at: string;
	updated_at: string;
	content: string;
	token: string;
	title: string;
	filepath: {
		url: string;
	};
}

export interface AdmissionApplicantChangePassResponse {
	success?: boolean;
	message?: string | [];
}

export interface AdmissionApplicantGetFileListResponse {
	id: number;
	category: string;
	name: string;
	filepath: object;
	r_applicants_r_program_id: number;
	created_at: string;
	updated_at: string;
}

export interface AdmissionApplicantGetUserInfoResponse {
	id?: number;
	name?: string;
	email?: string;
	national_id?: number;
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
	r_applicant_id?: number;
	created_at?: string;
	updated_at?: string;
}
