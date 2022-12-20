export interface AdmissionApplicantGenericResponse {
	success?: boolean;
	message?: string | [];
}

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
	isMoredoc: boolean;
	moredoc_category: string;
	moredoc_name: string;
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
	id: number;
	category: string;
	name: string;
	filepath: {
		url: string | any;
	};
	school?: string;
	score?: number;
	s_applicant_id: number;
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
	school?: string;
	score?: number;
	s_applicant_id?: number;
	created_at?: string;
	updated_at?: string;
	order?: number;
	state?: number;
}

export interface AdmissionApplicantGetProgramResponse {
	id: number;
	category: string;
	name: string;
	application_start_date: Date;
	application_end_date: Date;
	review_start_date: Date;
	review_end_date: Date;
	require_file: [];
	stage: string;
	created_at: string;
	updated_at: string;
	applicant_required_info: string;
	applicant_required_file: string;
	reviewer_required_info: string;
	reviewer_required_file: string;
}

export interface AdmissionApplicantRecLetListRes {
	id: number;
	name: string;
	email: string;
	phone: string;
	relation: string;
	position: string;
	institution: string;
	stage: string;
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

export interface AdmissionApplicantGetFileListResponse {
	id: number;
	category: string;
	name: string;
	filepath: {
		url: string | any;
	};
	school?: string;
	score?: number;
	s_applicant_id: number;
	created_at: string;
	updated_at: string;
}

export interface AdmissionApplicantGetUserInfoResponse {
	id: number;
	admission_id?: number;
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
	communicate_address?: string;
	communicate_zipcode?: number | string;
	isForeigner: boolean;
}
