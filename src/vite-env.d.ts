/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_ADMISSIONS_API_ENDPOINT: string;
	readonly VITE_IS_SKIP_CAPTCHA: string;
	readonly VITE_ADMISSION_APPLICANT_USERNAME: string;
	readonly VITE_ADMISSION_APPLICANT_PASSWORD: string;
	readonly VITE_ADMISSION_REVIEWER_USERNAME: string;
	readonly VITE_ADMISSION_REVIEWER_PASSWORD: string;
	readonly VITE_ADMISSION_MANAGER_USERNAME: string;
	readonly VITE_ADMISSION_MANAGER_PASSWORD: string;
	readonly VITE_RECRUITMENT_APPLICANT_USERNAME: string;
	readonly VITE_RECRUITMENT_APPLICANT_PASSWORD: string;
	readonly VITE_RECRUITMENT_REVIEWER_USERNAME: string;
	readonly VITE_RECRUITMENT_REVIEWER_PASSWORD: string;
	readonly VITE_RECRUITMENT_MANAGER_USERNAME: string;
	readonly VITE_RECRUITMENT_MANAGER_PASSWORD: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare module "*.vue" {
	import type { DefineComponent } from "vue";
	const component: DefineComponent<{}, {}, any>;
	export default component;
}
