export interface AdmissionManagerSignInInput {
	email: string;
	password: string;
	"cf-turnstile-response": string;
}

export interface AdmissionManagerAuthResponse {
	email: string;
	username: string;
	provider: string;
	uid: string;
	id: number;
	allow_password_change: boolean;
	isInit: any | null;
	lang: any | null;
	name: any | null;
	nickname: any | null;
	image: any | null;
	created_at: string;
	updated_at: string;
}

export interface AdmissionAdminProgramListResponse {
	id: number;
	category: string;
	name: string;
	application_start_date: string;
	application_end_date: string;
	review_start_date: string;
	review_end_date: string;
	stage: string;
	created_at: string;
	updated_at: string;
	applicant_required_info: string;
	applicant_required_file: string;
	reviewer_required_info: string;
	reviewer_required_file: string;
	detail: string;
}

export interface AdmAdminReviewerListResponse {
	// TODO: Wait backend to give exact data type
	// --- Example response ---
	// "id": 1,
	// "provider": "email",
	// "uid": "example@email.com",
	// "allow_password_change": false,
	// "lang": null,
	// "name": "example",
	// "nickname": null,
	// "image": null,
	// "email": "example@email.com",
	// "created_at": "2022-11-07T01:31:21.153+08:00",
	// "updated_at": "2022-11-07T01:31:21.153+08:00",
	// "isDisabled": false
	id: number;
	provider: string;
	uid: string;
	allow_password_change: boolean;
	lang: string | null;
	name: string;
	nickname: string | null;
	image: string | null;
	email: string;
	created_at: string;
	updated_at: string;
	isDisabled: boolean;
}

export interface AdmAdminReviewerRelatedProgramResponse {
	// TODO: Wait backend to give exact data type
	// --- Example response ---
	// {
	// 	"id": 1,
	// 	"category": "111年碩士班",
	// 	"name": "A組",
	// 	"application_start_date": "2022-10-01T00:00:00.000+08:00",
	// 	"application_end_date": "2022-10-31T00:00:00.000+08:00",
	// 	"review_start_date": "2022-11-01T00:00:00.000+08:00",
	// 	"review_end_date": "2022-11-30T00:00:00.000+08:00",
	// 	"require_file": "[\"file1\", \"file2\"]",
	// 	"stage": "application",
	// 	"created_at": "2022-11-07T01:31:19.417+08:00",
	// 	"updated_at": "2022-11-07T01:31:19.417+08:00",
	// 	"applicant_required_info": null,
	// 	"applicant_required_file": null,
	// 	"reviewer_required_info": null,
	// 	"reviewer_required_file": null
	// }

	id: number;
	category: string;
	name: string;
	application_start_date: string;
	application_end_date: string;
	review_start_date: string;
	review_end_date: string;
	stage: string;
	created_at: string;
	updated_at: string;
	applicant_required_info: string[];
	applicant_required_file: string[];
	reviewer_required_info: string[];
	reviewer_required_file: string[];
	detail: null | unknown;
}
export interface AdmissionAdminApplicantsListResponse {
	// TODO: Wait backend to give exact data type
	id: number;
	provider: string;
	uid: string;
	allow_password_change: boolean;
	isInit: any | null;
	lang: string | null;
	name: string;
	nickname: string | null;
	image: any | null;
	email: string;
	username: string;
	docs_order: number | null;
	oral_order: number;
	file: any | null;
	docs_stage: string | null;
	oral_stage: string | null;
	created_at: string;
	updated_at: string;
	s_program_id: number;
	application_stage: null;
	isMoredoc: boolean;
	moredoc_category: string;
	moredoc_end_date: string;
	moredoc_name: string;
	moredoc_start_date: string;
}

export interface AdmAdminGetApplicantInfo {
	admission_id: string;
	birth?: Date;
	birthcountry?: string;
	cn_surname?: string;
	communicate_address?: string;
	communicate_zipcode?: number | string;
	created_at: string;
	day_phone?: string;
	en_givenname?: string;
	en_midname?: string;
	en_surname?: string;
	graduated_school?: string;
	graduated_major?: string;
	household_address?: string;
	household_zipcode?: number | string;
	id: number;
	isDisabled?: boolean;
	isForeigner?: boolean;
	isSameDept?: boolean;
	mobile_phone?: string;
	title?: string;
	name?: string;
	nationality?: string;
	national_id?: string;
	night_phone?: string;
	s_applicant_id: number;
	suffix?: string;
	sex?: string;
	updated_at: string;
}

export interface AdmAdminGetApplicantInfoHeader {
	id: number;
	name: string;
	admission_id: string;
}

export interface AdmAdminEditApplicantRequest {
	id: number;
	name: string;
	email: string;
	password?: string;
}

export interface AdmissionAdminScoreFieldResponse {
	docs_weight: number;
	oral_weight: number;
	docs_grade_name_1: string;
	docs_grade_name_2: string;
	docs_grade_name_3: string;
	docs_grade_name_4: string;
	docs_grade_name_5: string;
	docs_grade_weight_1: number;
	docs_grade_weight_2: number;
	docs_grade_weight_3: number;
	docs_grade_weight_4: number;
	docs_grade_weight_5: number;
	oral_grade_name_1: string;
	oral_grade_name_2: string;
	oral_grade_name_3: string;
	oral_grade_name_4: string;
	oral_grade_name_5: string;
	oral_grade_weight_1: number;
	oral_grade_weight_2: number;
	oral_grade_weight_3: number;
	oral_grade_weight_4: number;
	oral_grade_weight_5: number;
}
export interface AdmissionAdminGenericResponse {
	success?: boolean;
	message?: string | [];
}

export interface AdmissionAdminDocsGradeListResponse {
	id: string;
	name: string;
	application_stage: string;
	isImmediateEnroll: boolean;
	grades: number;
}

export interface AdmissionAdminOralGradeListResponse {
	id: string;
	name: string;
	oral_order: number;
	enroll_stage: string;
	enroll_order: number;
	isImmediateEnroll: boolean;
	docs_grades: number;
	oral_grades: number;
	total_grades: number;
}

export interface AdmissionAdminReviewerGradeResponse {
	name: string;
	isimmendiateenroll: boolean;
	grades: number;
}

export interface AdmissionAdminSingleDocsGradeResponse {
	id: string;
	name: string;
	stage: string;
	oral_order: number;
	reviewer: AdmissionAdminReviewerGradeResponse[];
	avg: number;
}

export interface AdmissionAdminSingleOralGradeResponse {
	id: string;
	name: string;
	enroll_stage: string;
	enroll_order: number;
	reviewer: AdmissionAdminReviewerGradeResponse[];
	avg: number;
}

export interface AdmissionAdminCreateReviewerRequest {
	username: string;
	password: string;
	email: string;
	name: string;
	redirect_url: string;
}
