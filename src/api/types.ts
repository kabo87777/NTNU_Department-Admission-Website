export interface APIGenericResponse {
	error?: boolean;
	message?: string;
	status?: "success" | "error";
	data?: any;
}
