export interface RecruitmentAdminSignInInput {
	email: string;
	password: string;
	"cf-turnstile-response": string;
}

export interface RecruitmentAdminAuthResponse {
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
	created_at: string;
	updated_at: string;
}

export interface RecruitmentAdminGenericStatusResponse {
	success?: boolean;
	message?: string | [];
}

export interface RecruitmentAdminFileListResponse {
	id: number;
	category: string;
	name: string;
	filepath: object;
	r_applicants_r_program_id: number;
	created_at: string;
	updated_at: string;
}

export interface RecruitmentAdminApplicantListResponse {
	id?: number;
	provider?: string;
	uid?: string;
	allow_password_change?: boolean;
	isInit?: boolean;
	lang?: string;
	name?: string;
	nickname?: string;
	image?: string;
	email?: string;
	username?: string;
	docs_order?: string;
	oral_order?: string;
	file?: string;
	docs_stage?: string | number;
	oral_stage?: string | number;
	created_at?: string;
	updated_at?: string;
	s_program_id?: number;
	application_stage?: string | number;
}

// TODO: disannotation while backend finished admin get program API
export interface RecruitmentAdminProgramListResponse {
	id: number;
	category: string;
	name: string;
	recruit_start_date: string;
	recruit_end_date: string;
	review_start_date: string;
	review_end_date: string;
	require_file: string; // Array or string ??
	stage: string;
	created_at: string;
	updated_at: string;
	applicant_required_info: string;
	applicant_required_file: string;
	reviewer_required_info: string;
	reviewer_required_file: string;
	detail: string;
}
export interface RecruitmentAdminChangePassResponse {
	success?: boolean;
	message?: string | [];
}

export interface RecruitmentAdminApplicantsListResponse {
	// Target API: /recruitment/admin/program/1/applicant
	// TODO: check exact type of each fields
	allReviewerNum: number;
	interviewDate: Date;
	isRecommend: boolean;
	id: number;
	provider: string;
	uid: string;
	allow_password_change: boolean;
	isInit: boolean | null;
	lang: string | null;
	name: string;
	nickname: string | null;
	image: string | null;
	email: string;
	created_at: string;
	updated_at: string;
}

export interface RecruitmentAdminApplicantResponse {
	id: number;
	birth: Date;
	college: string;
	college_year: number;
	current_job: string;
	doctoral: string;
	doctoral_paper: string;
	doctoral_year: number;
	email?: string;
	master: string;
	master_year: number;
	name: string;
	publication: string;
}

export interface RecruitmentAdminGetApplicantInfoHeader {
	id: number;
	name: string;
}

export interface RecruitmentAdminGetApplicantAttachmentList {
	id: number;
	category: string;
	name: string;
	filepath: {
		url: string | any;
	};
	school?: string;
	score?: number;
	r_applicants_r_program_id: number;
	created_at: string;
	updated_at: string;
}

export interface RecruitmentAdminGetApplicantAttachmentListDetail {
	id?: number;
	category?: string;
	name?: string;
	filepath?: {
		url: string | any;
	};
	school?: string;
	score?: number;
	r_applicants_r_program_id?: number;
	created_at: string;
	updated_at: string;
	order: number;
	state: number;
}

export interface RecruimentAdminGetApplicantMoredocResponses {
	name: string;
	program_id: number;
	isMoredoc: boolean;
	moredoc_start_date: Date;
	moredoc_end_date: Date;
	moredoc_category: string;
	moredoc_name: string;
}

export interface RecruitmentAdminReviewersListResponse {
	id: number;
	provider: string;
	uid: string;
	allow_password_change: boolean;
	isInit: boolean | null;
	lang: string | null;
	name: string;
	nickname: string | null;
	image: string | null;
	email: string;
	created_at: string;
	updated_at: string;
	isDisabled: boolean;
}

export interface RecruitmentAdminCreateReviewerRequest {
	email: string;
	name: string;
	redirect_url: string;
}

export interface RecruitmentAdminApplicantListWithDetailResponse {
	id: number;
	provider: string;
	uid: string;
	allow_password_change: boolean;
	isInit: boolean;
	lang: string;
	name: string;
	nickname: string;
	image: string;
	email: string;
	created_at: string;
	updated_at: string;
	isForeigner: boolean;
	isRecommend: number;
	allReviewerNum: number;
	revieweResult: string;
	interviewDate: string;
}

export interface RecruitmentAdminSingleReviewerRecommendResponse {
	name: string;
	isRecommend: boolean;
	comment: string;
}
export interface RecruitmentAdminSingleApplicantWithDetailResponse {
	r_applicant_id: number;
	name: string;
	reviewers: RecruitmentAdminSingleReviewerRecommendResponse[];
	isRecommendNum: number;
	allReviewerNum: number;
	revieweResult: string;
	interviewDate: string;
}

export interface RecruitmentAdminReviewersListResponseWithDetail {
	id: number;
	provider: string;
	uid: string;
	allow_password_change: boolean;
	isInit: boolean | null;
	lang: string | null;
	name: string;
	nickname: string | null;
	image: string | null;
	email: string;
	created_at: string;
	updated_at: string;
	isDisabled: boolean;
	requiredSeen: number;
	requiredTotal: number;
	optionalSeen: number;
	optionalTotal: number;
}

export interface RAdminChangePasswordRequest {
	current_password: string;
	password: string;
	password_confirmation: string;
}
