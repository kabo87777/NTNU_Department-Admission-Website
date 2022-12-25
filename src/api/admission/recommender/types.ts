export interface RecommenderGenericResponse {
	success?: boolean;
	message?: string | [];
}

export interface RecommenderRecommendLetterResponse {
	id: number;
	name: string;
	email: string;
	phone: string;
	relation: string;
	position: string;
	institution: string;
	status: string;
	stage: string;
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
