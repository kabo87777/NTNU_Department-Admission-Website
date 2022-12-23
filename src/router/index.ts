import {
	createRouter,
	RouteRecordRaw,
	Router,
	createWebHistory,
} from "vue-router";

const loadModulesGlob = (modules: Record<string, unknown>) =>
	Object.fromEntries(
		Object.entries(modules).map(([k, v]: [string, any]) => [k, v.default])
	);

const LandingModules = loadModulesGlob(
	import.meta.glob(
		[
			"@/views/*.vue",
			"@/views/admission/*.vue",
			"@/views/admission/applicant/login/*.vue",
			"@/views/admission/reviewer/login/*.vue",
			"@/views/admission/manager/login/*.vue",
			"@/views/recruitment/*.vue",
			"@/views/recruitment/applicant/login/*.vue",
			"@/views/recruitment/reviewer/login/*.vue",
			"@/views/recruitment/manager/login/*.vue",
		],
		{ eager: true }
	)
);

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "LandingView",
		component: LandingModules["/src/views/LandingView.vue"],
		children: [
			// Admission - choose role
			{
				path: "/admission",
				name: "AdmissionSignin",
				meta: {
					titleKey: "登入頁面",
				},
				component:
					LandingModules["/src/views/admission/AdmissionSignin.vue"],
			},
			// Admission - first signin change password
			{
				path: "/admission/firstSignin",
				name: "AdmissionFirstSigninChangePassword",
				meta: {
					titleKey: "登入頁面",
				},
				component:
					LandingModules["/src/views/admission/FirstSignin.vue"],
			},
			// Admission - Applicant
			{
				path: "admission/applicant/signin",
				name: "AdmissionApplicantSignin",
				component:
					LandingModules[
						"/src/views/admission/applicant/login/Signin.vue"
					],
			},
			{
				path: "admission/applicant/password/reset",
				name: "AdmissionApplicantResetPassword",
				component:
					LandingModules[
						"/src/views/admission/applicant/login/PwdReset.vue"
					],
			},
			{
				path: "admission/applicant/forgetPassword",
				name: "AdmissionApplicantForgetPassword",
				component:
					LandingModules[
						"/src/views/admission/applicant/login/PwdForget.vue"
					],
			},
			{
				path: "admission/applicant/setupaccount",
				name: "AdmissionApplicantFirstLoginSetupAccount",
				component:
					LandingModules[
						"/src/views/admission/applicant/login/FirstLoginSetupAccount.vue"
					],
			},
			// Admission - Reviewer
			{
				path: "admission/reviewer/signin",
				name: "AdmissionReviewerSignin",
				component:
					LandingModules[
						"/src/views/admission/reviewer/login/Signin.vue"
					],
			},
			{
				path: "admission/reviewer/forgetpassword",
				name: "AdmissionReviewerForgetpassword",
				component:
					LandingModules[
						"/src/views/admission/reviewer/login/PwdForget.vue"
					],
			},
			{
				path: "admission/reviewer/password/reset",
				name: "AdmissionReviewerResetPassword",
				component:
					LandingModules[
						"/src/views/admission/reviewer/login/PwdReset.vue"
					],
			},
			{
				path: "admission/reviewer/setupaccount",
				name: "AdmissionReviewerFirstLoginSetupAccount",
				component:
					LandingModules[
						"/src/views/admission/reviewer/login/FirstLoginSetupAccount.vue"
					],
			},
			// Admission - Manager
			{
				path: "admission/manager/signin",
				name: "AdmissionManagerSignin",
				component:
					LandingModules[
						"/src/views/admission/manager/login/Signin.vue"
					],
			},
			{
				path: "admission/manager/forgetPassword",
				name: "AdmissionManagerForgetPassword",
				component:
					LandingModules[
						"/src/views/admission/manager/login/PwdForget.vue"
					],
			},
			{
				path: "admission/manager/password/reset",
				name: "AdmissionManagerResetPassword",
				component:
					LandingModules[
						"/src/views/admission/manager/login/PwdReset.vue"
					],
			},
			// Recruitment - choose role
			{
				path: "/recruitment",
				name: "RecruitmentSignin",
				meta: {
					titleKey: "登入頁面",
				},
				component:
					LandingModules[
						"/src/views/recruitment/RecruitmentSignin.vue"
					],
			},
			// Recruitment - Applicant
			{
				path: "recruitment/applicant/signin",
				name: "RecruitmentApplicantSignin",
				component:
					LandingModules[
						"/src/views/recruitment/applicant/login/Signin.vue"
					],
			},
			{
				path: "recruitment/applicant/regist",
				name: "recruitmentApplicantRegist",
				component:
					LandingModules[
						"/src/views/recruitment/applicant/login/Regist.vue"
					],
			},
			{
				path: "recruitment/applicant/password/reset",
				name: "recruitmentApplicantPasswordReset",
				component:
					LandingModules[
						"/src/views/recruitment/applicant/login/PwdReset.vue"
					],
			},
			{
				path: "recruitment/applicant/forgetpassword",
				name: "recruitmentApplicantPasswordForget",
				component:
					LandingModules[
						"/src/views/recruitment/applicant/login/PwdForget.vue"
					],
			},
			// Recruitment - Reviewer
			{
				path: "recruitment/reviewer/signin",
				name: "RecruitmentReviewerSignin",
				component:
					LandingModules[
						"/src/views/recruitment/reviewer/login/Signin.vue"
					],
			},
			{
				path: "recruitment/reviewer/password/reset",
				name: "recruitmenReviewerPasswordReset",
				component:
					LandingModules[
						"/src/views/recruitment/reviewer/login/PwdReset.vue"
					],
			},
			{
				path: "recruitment/reviewer/forgetpassword",
				name: "recruitmentReviewerPasswordForget",
				component:
					LandingModules[
						"/src/views/recruitment/reviewer/login/PwdForget.vue"
					],
			},
			{
				path: "recruitment/reviewer/setupaccount",
				name: "recruitmentReviewerFirstLoginSetupAccount",
				component:
					LandingModules[
						"/src/views/recruitment/reviewer/login/FirstLoginSetupAccount.vue"
					],
			},
			// Recruitment - Manager
			{
				path: "recruitment/manager/signin",
				name: "RecruitmentManagerSignin",
				component:
					LandingModules[
						"/src/views/recruitment/manager/login/Signin.vue"
					],
			},
			{
				path: "recruitment/manager/password/reset",
				name: "recruitmentManagerPasswordReset",
				component:
					LandingModules[
						"/src/views/recruitment/manager/login/PwdReset.vue"
					],
			},
			{
				path: "recruitment/manager/forgetpassword",
				name: "recruitmentManagerPasswordForget",
				component:
					LandingModules[
						"/src/views/recruitment/manager/login/PwdForget.vue"
					],
			},
			{
				path: "recruitment/manager/firstSignin",
				name: "recruitmentManagerFirstSigninChangePassword",
				component:
					LandingModules[
						"/src/views/recruitment/manager/login/FirstSignin.vue"
					],
			},
		],
	},
	{
		path: "/admission/reviewer",
		name: "AdmissionReviewerMainContainer",
		component: () => import("@/views/admission/reviewer/MainContainer.vue"),
		children: [
			{
				path: "applicationReview",
				name: "applicationReview",
				component: () =>
					import("@/views/admission/reviewer/applicationReview.vue"),
			},
			{
				path: "oralReview",
				name: "oralReview",
				component: () =>
					import("@/views/admission/reviewer/oralReview.vue"),
			},
			{
				path: "singleApplicationReview/:id",
				name: "singleApplicationReview",
				component: () =>
					import(
						"@/views/admission/reviewer/singleApplicationReview.vue"
					),
			},
			{
				path: "singleOralReview/:id",
				name: "singleOralReview",
				component: () =>
					import("@/views/admission/reviewer/singleOralReview.vue"),
			},
			{
				path: "reviewerUserSetting",
				name: "AdmissionReviewerUserSetting",
				component: () =>
					import("@/views/admission/reviewer/userSetting.vue"),
			},
		],
	},
	{
		path: "/admission/applicant",
		name: "AdmissionApplicantMainContainer",
		component: () =>
			import("@/views/admission/applicant/MainContainer.vue"),
		children: [
			// Admission - applicant info pages
			{
				path: "latestNews",
				name: "AdmissionApplicantLatestNews",
				component: () =>
					import("@/views/admission/applicant/pages/latestNews.vue"),
			},
			{
				path: "basicInfo",
				name: "AdmissionApplicantBasicInfo",
				component: () =>
					import("@/views/admission/applicant/pages/basicInfo.vue"),
			},
			{
				path: "attachment",
				name: "AdmissionApplicantAttachment",
				component: () =>
					import("@/views/admission/applicant/pages/attachment.vue"),
			},
			{
				path: "recommendationLetter",
				name: "AdmissionApplicantRecommendationLetter",
				component: () =>
					import(
						"@/views/admission/applicant/pages/recommendationLetter.vue"
					),
			},
			{
				path: "additionalDocs",
				name: "AdmissionApplicantAdditionalDocs",
				component: () =>
					import(
						"@/views/admission/applicant/pages/additionalDocs.vue"
					),
			},
			{
				path: "userSetting",
				name: "AdmissionApplicantUserSetting",
				component: () =>
					import("@/views/admission/applicant/pages/userSetting.vue"),
			},
		],
	},
	{
		path: "/admission/manager",
		name: "AdmissionManagerMainContainer",
		component: () => import("@/views/admission/manager/MainContainer.vue"),
		children: [
			// Admission - manager project settings
			{
				path: "projectSettings",
				name: "AdmissionManagerProjectSettings",
				component: () =>
					import("@/views/admission/manager/UploadFileSetting.vue"),
			},
			{
				path: "projectSetting",
				name: "projectSetting",
				component: () =>
					import("@/views/admission/manager/project-setting.vue"),
			},
			{
				path: "reviewScoreField",
				name: "reviewScoreField",
				component: () =>
					import("@/views/admission/manager/ReviewScoreField.vue"),
			},
			{
				path: "gradeDataList",
				name: "gradeDataList",
				component: () =>
					import("@/views/admission/manager/gradeDataList.vue"),
			},
			// Admission - applicants uploaded documents setting
			{
				path: "applicantsUploadList",
				name: "ApplicantsUploadList",
				component: () =>
					import(
						"@/views/admission/manager/applicantsUploadList/applicantsUploadList.vue"
					),
			},
			{
				path: "applicantsUploadList/:userId",
				name: "ApplicantUploadedDocs",
				component: () =>
					import(
						"@/views/admission/manager/applicantsUploadList/applicantUploadedDocs.vue"
					),
			},
			{
				path: "userSetting",
				name: "AdmissionManagerUserSetting",
				component: () =>
					import("@/views/admission/manager/managerUserSetting.vue"),
			},
			{
				path: "reviewerSettings",
				name: "reviewerSettings",
				component: () =>
					import("@/views/admission/manager/ListReviewer.vue"),
			},
			{
				path: "manageApplicants",
				name: "manageApplicants",
				component: () =>
					import("@/views/admission/manager/ListApplicant.vue"),
			},
		],
	},
	// Admission - Recommendation Letters
	{
		path: "/admission/recommenderAuthVerify",
		name: "RecommenderAuthVerify",
		component: () =>
			import("@/views/admission/recommender/AuthVerification.vue"),
	},
	{
		path: "/admission/recommendLetterFillIn",
		name: "RecommendLetterFillIn",
		component: () =>
			import("@/views/admission/recommender/FillRecommendLetter.vue"),
	},
	{
		path: "/recruitment/applicant",
		name: "RecruitmentApplicantMainContainer",
		component: () =>
			import("@/views/recruitment/applicant/MainContainer.vue"),
		children: [
			//Recruitment - applicant info pages
			{
				path: "applicantInfo",
				name: "recruitmentApplicantUserInfo",
				component: () =>
					import(
						"@/views/recruitment/applicant/pages/ApplicantInfo.vue"
					),
			},
			{
				path: "attachmentFile",
				name: "recruitmentApplicantAttachmentFile",
				component: () =>
					import(
						"@/views/recruitment/applicant/pages/AttachmentFile.vue"
					),
			},
			{
				path: "refillFile",
				name: "recruitmentApplicantRefillFile",
				component: () =>
					import(
						"@/views/recruitment/applicant/pages/RefillFile.vue"
					),
			},
			{
				path: "switchProject",
				name: "recruitmentApplicantSwitchProject",
				component: () =>
					import(
						"@/views/recruitment/applicant/pages/SwitchProject.vue"
					),
			},
			{
				path: "userManagement",
				name: "recruitmentApplicantUserManagement",
				component: () =>
					import(
						"@/views/recruitment/applicant/pages/UserManagement.vue"
					),
			},
		],
	},
	// Recruitment - manager
	{
		path: "/recruitment/manager",
		name: "RecruitmentAdminMainContainer",
		component: () =>
			import("@/views/recruitment/manager/MainContainer.vue"),
		children: [
			{
				path: "projectSetting",
				name: "recruitmentProjectSetting",
				component: () =>
					import(
						"@/views/recruitment/manager/pages/ProjectSetting.vue"
					),
			},
			{
				path: "reviewerSettings",
				name: "recruitmentManagerManageReviewers",
				component: () =>
					import("@/views/recruitment/manager/ListReviewer.vue"),
			},
			{
				path: "ListApplicant",
				name: "recruitmentManagerListApplicant",
				component: () =>
					import("@/views/recruitment/manager/ListApplicant.vue"),
			},
			{
				path: "gradeDataList",
				name: "recruitmentGradeDataList",
				component: () =>
					import("@/views/recruitment/manager/gradeDataList.vue"),
			},
			{
				path: "reviewScoreField",
				name: "recruitmentReviewScoreField",
				component: () =>
					import("@/views/recruitment/manager/reviewScoreField.vue"),
			},
			{
				path: "reviewProgress",
				name: "recruitmentManagerReviewProgress",
				component: () =>
					import(
						"@/views/recruitment/manager/pages/ReviewProgress.vue"
					),
			},
			{
				path: "mustviewSetting",
				name: "recruitmentManagerMustviewSetting",
				component: () =>
					import(
						"@/views/recruitment/manager/pages/mustviewSetting.vue"
					),
			},
			{
				path: "attachmentList",
				name: "recruitmentManagerApplicantUploadList",
				component: () =>
					import(
						"@/views/recruitment/manager/pages/ApplicantUploadList/ApplicantList.vue"
					),
			},
			{
				path: "applicant/:userId",
				name: "recruitmentManagerApplicant",
				component: () =>
					import(
						"@/views/recruitment/manager/pages/ApplicantUploadList/Applicant.vue"
					),
			},
			{
				path: "userSetting",
				name: "recruitmentManagerUserSetting",
				component: () =>
					import(
						"@/views/recruitment/manager/pages/RecruitmentManagerSelfSetting.vue"
					),
			},
		],
	},
	{
		path: "/recruitment/reviewer",
		name: "RecruitmentReviewerMainContainer",
		component: () =>
			import("@/views/recruitment/reviewer/MainContainer.vue"),
		children: [
			{
				path: "requiredDataReview",
				name: "requiredDataReview",
				component: () =>
					import(
						"@/views/recruitment/reviewer/requiredDataReview.vue"
					),
			},
			{
				path: "optionalDataReview",
				name: "optionalDataReview",
				component: () =>
					import(
						"@/views/recruitment/reviewer/optionalDataReview.vue"
					),
			},
			{
				path: "singleRequiredDataReview/:id",
				name: "singleRequiredDataReview",
				component: () =>
					import(
						"@/views/recruitment/reviewer/singleRequiredDataReview.vue"
					),
			},
			{
				path: "singleOptionalDataReview/:id",
				name: "singleOptionalDataReview",
				component: () =>
					import(
						"@/views/recruitment/reviewer/singleOptionalDataReview.vue"
					),
			},
			{
				path: "userSetting",
				name: "recruitmentReviewerUserSetting",
				component: () =>
					import("@/views/recruitment/reviewer/userSetting.vue"),
			},
		],
	},
];

export const router: Router = createRouter({
	history: createWebHistory(),
	routes,
});
