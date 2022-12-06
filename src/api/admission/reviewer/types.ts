export interface AdmissionReviewerGenericResponse {
	success?: boolean;
	message?: string | [];
}
export interface AdmissionReviewerSignInInput {
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

export interface AdmissionReviewerProgramListResponse {
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

export interface AdmissionReviewerApplicantGradeResponse {
	id: number;
	s_program_id: number;
	s_applicant_id: number;
	s_reviewer_id: number;
	docs_grade_1: number;
	docs_grade_2: number;
	docs_grade_3: number;
	oral_grade_1: number;
	oral_grade_2: number;
	oral_grade_3: number;
	isImmediateEnroll: boolean | null;
	immediate_enroll_comment: string;
	isDocsGraded: boolean | null;
	isOralGraded: boolean | null;
	created_at: string;
	updated_at: string;
	docs_grade_4: number;
	docs_grade_5: number;
	oral_grade_4: number;
	oral_grade_5: number;
}

export interface AdmissionReviewerApplicantInfoResponse {
	id: number;
	name: string;
	national_id: string;
	admission_id: string;
	sex: string;
	birth: string;
	day_phone: string;
	night_phone: string;
	mobile_phone: string;
	household_address: string;
	household_zipcode: string;
	communicate_address: string;
	communicate_zipcode: string;
	graduated_school: string;
	graduated_major: string;
	isSameDept: boolean;
	s_applicant_id: number;
	created_at: string;
	updated_at: string;
	isDisabled: boolean;
}

export interface AdmissionReviewerProgramGradingResponse {
	docs_weight: number;
	oral_weight: number;
	docs_grade_name_1: string;
	docs_grade_name_2: string;
	docs_grade_name_3: string;
	docs_grade_weight_1: number;
	docs_grade_weight_2: number;
	docs_grade_weight_3: number;
	oral_grade_name_1: string;
	oral_grade_name_2: string;
	oral_grade_name_3: string;
	oral_grade_weight_1: number;
	oral_grade_weight_2: number;
	oral_grade_weight_3: number;
	s_program_id: number;
	created_at: string;
	updated_at: string;
	docs_grade_name_4: string | null;
	docs_grade_name_5: string | null;
	oral_grade_name_4: string | null;
	oral_grade_name_5: string | null;
	docs_grade_weight_4: number | null;
	docs_grade_weight_5: number | null;
	oral_grade_weight_4: number | null;
	oral_grade_weight_5: number | null;
}

export interface AdmissionReviewerApplicantListResponse {
	id: number;
	provider: string;
	uid: number;
	allow_password_change: boolean;
	isInit: boolean;
	lang: string;
	name: string;
	nickname: string;
	image: string;
	email: string;
	username: string;
	docs_order: number;
	oral_order: number;
	file: string;
	docs_stage: string;
	oral_stage: string;
	created_at: string;
	updated_at: string;
	s_program_id: number;
	application_stage: string;
	docs_grade_1: number;
	docs_grade_2: number;
	docs_grade_3: number;
	docs_grade_4: number;
	docs_grade_5: number;
	oral_grade_1: number;
	oral_grade_2: number;
	oral_grade_3: number;
	oral_grade_4: number;
	oral_grade_5: number;
	isDocsGraded: boolean;
	isOralGraded: boolean;
	isImmediateEnroll: boolean;
	immediate_enroll_comment: string;
}

export interface AdmissionReviewerApplicantFileListResponse {
	id: number;
	category: string;
	name: string;
	filepath: {
		url: string;
	};
	s_applicant_id: number;
	created_at: string;
	updated_at: string;
	school: null;
	score: number;
}
