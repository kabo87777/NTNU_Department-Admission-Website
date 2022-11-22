export interface APIGenericResponse {
	error: boolean;
	message: any;
	status: "success" | "error";
	data: any;
}
