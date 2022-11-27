export interface AdmissionManagerSignInInput {
	email: string;
	password: string;
	"cf-turnstile-response": string;
}

export interface AdmissionManagerAuthResponse {
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

export interface AdmissionAdminProgramListResponse {
	id: number;
	category: string;
	name: string;
	application_start_date: string;
	application_end_date: string;
	review_start_date: string;
	review_end_date: string;
	require_file: string; // FIXME: Does this type exist in ProgramList's API response?
	stage: string;
	created_at: string;
	updated_at: string;
	// FIXME: Not very sure to reserve "null" type or not?
	applicant_required_info: string;
	applicant_required_file: string;
	reviewer_required_info: string;
	reviewer_required_file: string;
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
	require_file: string[];
	stage: string;
	created_at: string;
	updated_at: string;
	applicant_required_info: null;
	applicant_required_file: null;
	reviewer_required_info: null;
	reviewer_required_file: null;
	relation?: AdmAdminReviewerRelatedProgramResponse[];
}
export interface AdmissionAdminApplicantsListResponse {
	// TODO: Wait backend to give exact data type
	id: number;
	provider: string;
	uid: string;
	allow_password_change: boolean;
	isInit: null;
	lang: null;
	name: string;
	nickname: null;
	image: null;
	email: string;
	username: string;
	docs_order: null;
	oral_order: null;
	file: null;
	docs_stage: null;
	oral_stage: null;
	created_at: string;
	updated_at: string;
	s_program_id: number;
	application_stage: null;
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
