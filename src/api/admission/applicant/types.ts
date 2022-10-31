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
	isInit: any | null;
	lang: any | null;
	name: any | null;
	nickname: any | null;
	image: any | null;
	docs_order: number | null;
	oral_order: number | null;
	file: any | null;
	docs_stage: any | null;
	oral_stage: any | null;
	s_program_id: number | null;
	application_stage: any | null;
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
}

// BELOW APIs not connected CURRENTLY
export interface AdmissionApplicantGetProgramNameResponse {
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
