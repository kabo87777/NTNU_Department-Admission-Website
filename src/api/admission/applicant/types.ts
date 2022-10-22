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
