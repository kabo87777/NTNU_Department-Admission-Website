import {
	createRouter,
	RouteRecordRaw,
	Router,
	createWebHistory,
} from "vue-router";

import MainPage from "@/views/MainPage.vue";
import LandingView from "@/views/LandingView.vue";
import AdmissionSignin from "@/views/admission/AdmissionSignin.vue";
import RecruitmentSignin from "@/views/recruitment/recruitmentSignin.vue";
// Manager section
import AdmissionListReviewer from "@/views/admission/manager/ListReviewer.vue";
import AdmissionListApplicant from "@/views/admission/manager/ListApplicant.vue";
import AdmissionManagerMainContainer from "@/views/admission/manager/MainContainer.vue";
import AdmissionManagerSignin from "@/views/admission/manager/ManagerSignin.vue";
import AdmissionManagerForgetPassword from "@/views/admission/manager/ForgetPassword.vue";
import AdmissionManagerProjectSettings from "@/views/admission/manager/ProjectSettings.vue";
// Applicant section
import AdmissionApplicantMainContainer from "@/views/admission/applicant/MainContainer.vue";
import AdmissionApplicantSignin from "@/views/admission/applicant/login/ApplicantSignin.vue";
import AdmissionApplicantForgetPassword from "@/views/admission/applicant/login/ForgetPassword.vue";
import AdmissionApplicantPasswordRecvoerySentView from "@/views/admission/applicant/login/PasswordRecvoerySentView.vue";
import AdmissionApplicantResetPassword from "@/views/admission/applicant/login/ResetPassword.vue";
import AdmissionApplicantLatestNews from "@/views/admission/applicant/pages/latestNews.vue";
import AdmissionApplicantBasicInfo from "@/views/admission/applicant/pages/basicInfo.vue";
import AdmissionApplicantAttachment from "@/views/admission/applicant/pages/attachment.vue";
import AdmissionApplicantRecommendationLetter from "@/views/admission/applicant/pages/recommendationLetter.vue";
import AdmissionApplicantAdditionalDocs from "@/views/admission/applicant/pages/additionalDocs.vue";
import AdmissionApplicantUserSetting from "@/views/admission/applicant/pages/userSetting.vue";

import AdmissionManagerProjectSetting from "@/views/admission/manager/project-setting.vue";
import firstloginchangepassword from "@/views/admission/FirstSigninChangePass.vue";
import reviewScoreField from "@/views/reviewScoreField.vue";
import resetpassword from "@/views/admission/ResetPassword.vue";
import ResetPasswordEmailSent from "@/views/admission/ResetPasswordEmailSent.vue";
import gradeDataList from "@/views/admission/manager/gradeDataList.vue";
import ApplicantsUploadList from "@/views/admission/manager/applicantsUploadList/applicantsUploadList.vue";
import ApplicantUploadedDocs from "@/views/admission/manager/applicantsUploadList/applicantUploadedDocs.vue";
import AdmissionManagerUserSetting from "@/views/admission/manager/managerUserSetting.vue";
//Reviewer section
import AdmissionReviewerMainContainer from "@/views/admission/reviewer/MainContainer.vue";
import AdmissionReviewerSignin from "@/views/admission/reviewer/ReviewerSignin.vue";
import applicationReview from "@/views/admission/reviewer/applicationReview.vue";
import oralReview from "@/views/admission/reviewer/oralReview.vue";
import singleApplicationReview from "@/views/admission/reviewer/singleApplicationReview.vue";
import singleOralReview from "@/views/admission/reviewer/singleOralReview.vue";
import AdmissionReviewerUserSetting from "@/views/admission/reviewer/userSetting.vue";
import AdmissionReviewerForgetpassword from "@/views/admission/reviewer/ResetPassword.vue";

// Recruitment Applicant section
import recruitmentApplicantSignin from "@/views/recruitment/applicant/login/signin.vue";
import recruitmentApplicantRegist from "@/views/recruitment/applicant/login/regist.vue";
import recruitmentApplicantRegistDone from "@/views/recruitment/applicant/login/registDone.vue";
import recruitmentApplicantPasswordReset from "@/views/recruitment/applicant/login/pwdReset.vue";
import recruitmentApplicantPasswordForget from "@/views/recruitment/applicant/login/pwdForget.vue";
import recruitmentApplicantPasswordForgetEmailSent from "@/views/recruitment/applicant/login/pwdForgetEmailSent.vue";
import recruitmentApplicantMainContainer from "@/views/recruitment/applicant/mainContainer.vue";
import recruitmentApplicantBasicInfo from "@/views/recruitment/applicant/pages/basicInfo.vue";
import recruitmentApplicantAttachment from "@/views/recruitment/applicant/pages/attachment.vue";
import recruitmentApplicantSubmitConfirm from "@/views/recruitment/applicant/pages/SubmitConfirm.vue";
import recruitmentApplicantAdditionalDocs from "@/views/recruitment/applicant/pages/additionalDocs.vue";
import recruitmentApplicantSwitchProject from "@/views/recruitment/applicant/pages/SwitchProject.vue";
import recruitmentApplicantUserSetting from "@/views/recruitment/applicant/pages/userSetting.vue";

// Recruitment Reviewer siginin section
import recruitmentReviewerSignin from "@/views/recruitment/reviewer/login/signin.vue";
import recruitmentReviewerPasswordForget from "@/views/recruitment/reviewer/login/pwdForget.vue";
import recruitmentReviewerPasswordReset from "@/views/recruitment/reviewer/login/pwdReset.vue";
import recruitmentReviewerPasswordForgetEmailSent from "@/views/recruitment/reviewer/login/pwdForgetEmailSent.vue";
import recruitmentReviewerPasswordFirstLogin from "@/views/recruitment/reviewer/login/pwdFirstLogin.vue";
//Recruitment Reviewer section
import recruitmentReviewerMainContainer from "@/views/recruitment/reviewer/MainContainer.vue";
import requiredDataReview from "@/views/recruitment/reviewer/requiredDataReview.vue";
import optionalDataReview from "@/views/recruitment/reviewer/optionalDataReview.vue";
import singleRequiredDataReview from "@/views/recruitment/reviewer/singleRequiredDataReview.vue";
import singleOptionalDataReview from "@/views/recruitment/reviewer/singleOptionalDataReview.vue";
import recruitmentReviewerUserSetting from "@/views/recruitment/reviewer/userSetting.vue";

// Recruitment Manager signin section
import recruitmentManagerSignin from "@/views/recruitment/manager/login/signin.vue";
import recruitmentManagerPasswordReset from "@/views/recruitment/manager/login/pwdReset.vue";
import recruitmentManagerPasswordForget from "@/views/recruitment/manager/login/pwdForget.vue";
import recruitmentManagerPasswordForgetEmailSent from "@/views/recruitment/manager/login/pwdForgetEmailSent.vue";
// Recruitment Manager section
import recruitmentManagerMainContainer from "@/views/recruitment/manager/MainContainer.vue";
import recruitmentManagerApplicantUploadList from "@/views/recruitment/manager/pages/ApplicantUploadList/TableList.vue";
import recruitmentManagerReviewProgress from "@/views/recruitment/manager/pages/ReviewProgress.vue";
import recruitmentManagerUserSetting from "@/views/recruitment/manager/pages/RecruitmentManagerSelfSetting.vue";
import recruitmentApplicationUpload from "@/views/recruitment/manager/pages/RecruitmentApplicationSetting.vue";
import recruitmentGradeDataList from "@/views/recruitment/manager/gradeDataList.vue";
import recruitmentReviewScroreField from "@/views/recruitment/manager/reviewScoreField.vue";
import recruitmentProjectSetting from "@/views/recruitment/manager/pages/ProjectSetting.vue";
import recruitmentManagerApplicationAccountSetting from "@/views/recruitment/manager/pages/ApplicationAccountSetting.vue";

const routes: Array<RouteRecordRaw> = [
	// Choose recruitment / admission
	{
		path: "/",
		name: "LandingView",
		component: LandingView,
		children: [
			// Admission - choose applicant / manager
			{
				path: "mainpage",
				name: "MainPage",
				meta: {
					titleKey: "報名首頁",
				},
				component: MainPage,
			},
			{
				path: "admission",
				name: "AdmissionSignin",
				meta: {
					titleKey: "登入頁面",
				},
				component: AdmissionSignin,
			},
			{
				path: "admission/reviewer/signin",
				name: "AdmissionReviewerSignin",
				component: AdmissionReviewerSignin,
			},
			{
				path: "/admission/reviewer/forgetpassword",
				name: "AdmissionReviewerForgetpassword",
				component: AdmissionReviewerForgetpassword,
			},

			{
				path: "admission/reviewer",
				name: "AdmissionReviewerMainContainer",
				component: AdmissionReviewerMainContainer,
				children: [
					{
						path: "applicationReview",
						name: "applicationReview",
						component: applicationReview,
					},
					{
						path: "oralReview",
						name: "oralReview",
						component: oralReview,
					},
					{
						path: "singleApplicationReview/:id",
						name: "singleApplicationReview",
						component: singleApplicationReview,
					},
					{
						path: "singleOralReview/:id",
						name: "singleOralReview",
						component: singleOralReview,
					},
					{
						path: "reviewerUserSetting",
						name: "AdmissionReviewerUserSetting",
						component: AdmissionReviewerUserSetting,
					},
				],
			},
			// Admission - manager sign in
			{
				path: "admission/manager/signin",
				name: "AdmissionManagerSignin",
				component: AdmissionManagerSignin,
			},
			// Admission - manager request password recovery
			{
				path: "admission/manager/forgetPassword",
				name: "AdmissionManagerForgetPassword",
				component: AdmissionManagerForgetPassword,
			},
			// Admission - manager reset password
			{
				path: "admission/manager/resetpassword",
				name: "resetpassword",
				component: resetpassword,
			},
			{
				path: "admission/manager/resetpassword/emailsent",
				name: "ResetPasswordEmailSent",
				component: ResetPasswordEmailSent,
			},
			// {
			// 	path: "firstloginchangepassword",
			// 	name: "firstloginchangepassword",
			// 	component: firstloginchangepassword,
			// },
			// Admission - applicant reset password
			{
				path: "admission/applicant/resetPassword",
				name: "AdmissionApplicantResetPassword",
				component: AdmissionApplicantResetPassword,
			},
			// Admission - applicant request password recovery
			{
				path: "admission/applicant/forgetPassword/emailSent",
				name: "AdmissionApplicantForgetPasswordEmailSent",
				component: AdmissionApplicantPasswordRecvoerySentView,
			},
			{
				path: "admission/applicant/forgetPassword",
				name: "AdmissionApplicantForgetPassword",
				component: AdmissionApplicantForgetPassword,
			},
			// Admission - applicant sign in
			{
				path: "admission/applicant/signin",
				name: "AdmissionApplicantSignin",
				component: AdmissionApplicantSignin,
			},
			{
				path: "admission/applicant",
				name: "AdmissionApplicantMainContainer",
				component: AdmissionApplicantMainContainer,
				children: [
					// Admission - applicant info pages
					{
						path: "latestNews",
						name: "AdmissionApplicantLatestNews",
						component: AdmissionApplicantLatestNews,
					},
					{
						path: "basicInfo",
						name: "AdmissionApplicantBasicInfo",
						component: AdmissionApplicantBasicInfo,
					},
					{
						path: "attachment",
						name: "AdmissionApplicantAttachment",
						component: AdmissionApplicantAttachment,
					},
					{
						path: "recommendationLetter",
						name: "AdmissionApplicantRecommendationLetter",
						component: AdmissionApplicantRecommendationLetter,
					},
					{
						path: "additionalDocs",
						name: "AdmissionApplicantAdditionalDocs",
						component: AdmissionApplicantAdditionalDocs,
					},
					{
						path: "userSetting",
						name: "AdmissionApplicantUserSetting",
						component: AdmissionApplicantUserSetting,
					},
				],
			},
			{
				path: "admission/manager",
				name: "AdmissionManagerMainContainer",
				component: AdmissionManagerMainContainer,
				children: [
					// Admission - manager project settings
					{
						path: "projectSettings",
						name: "AdmissionManagerProjectSettings",
						component: AdmissionManagerProjectSettings,
					},
					{
						path: "projectSetting",
						name: "projectSetting",
						component: AdmissionManagerProjectSetting,
					},
					{
						path: "reviewScoreField",
						name: "reviewScoreField",
						component: reviewScoreField,
					},
					{
						path: "gradeDataList",
						name: "gradeDataList",
						component: gradeDataList,
					},
					// Admission - applicants uploaded documents setting
					{
						path: "applicantsUploadList",
						name: "ApplicantsUploadList",
						component: ApplicantsUploadList,
					},
					{
						path: "applicantsUploadList/:accId",
						name: "ApplicantUploadedDocs",
						component: ApplicantUploadedDocs,
					},
					{
						path: "userSetting",
						name: "AdmissionManagerUserSetting",
						component: AdmissionManagerUserSetting,
					},
					{
						path: "reviewerSettings",
						name: "reviewerSettings",
						component: AdmissionListReviewer,
					},
					{
						path: "manageApplicants",
						name: "manageApplicants",
						component: AdmissionListApplicant,
					},
				],
			},

			// Recruitment
			{
				path: "recruitment",
				name: "RecruitmentSignin",
				meta: {
					titleKey: "登入頁面",
				},
				component: RecruitmentSignin,
			},

			// Recruitment - applicant sign in
			{
				path: "recruitment/applicant/signin",
				name: "recruitmentApplicantSignin",
				component: recruitmentApplicantSignin,
			},
			// Recruitment - applicant register
			{
				path: "recruitment/applicant/regist",
				name: "recruitmentApplicantRegist",
				component: recruitmentApplicantRegist,
			},
			{
				path: "recruitment/applicant/regist/done",
				name: "recruitmentApplicantRegistDone",
				component: recruitmentApplicantRegistDone,
			},
			// Recruitment - applicant forget & reset password
			{
				path: "recruitment/applicant/password/reset",
				name: "recruitmentApplicantPasswordReset",
				component: recruitmentApplicantPasswordReset,
			},
			{
				path: "recruitment/applicant/password/forget",
				name: "recruitmentApplicantPasswordForget",
				component: recruitmentApplicantPasswordForget,
			},
			{
				path: "recruitment/applicant/password/forget/emailSent",
				name: "recruitmentApplicantPasswordForgetEmailSent",
				component: recruitmentApplicantPasswordForgetEmailSent,
			},
			{
				path: "recruitment/applicant",
				name: "recruitmentApplicantMainContainer",
				component: recruitmentApplicantMainContainer,
				children: [
					//Recruitment - applicant info pages
					{
						path: "basicInfo",
						name: "recruitmentApplicantBasicInfo",
						component: recruitmentApplicantBasicInfo,
					},
					{
						path: "attachment",
						name: "recruitmentApplicantAttachment",
						component: recruitmentApplicantAttachment,
					},
					{
						path: "submitConfirm",
						name: "recruitmentApplicantSubmitConfirm",
						component: recruitmentApplicantSubmitConfirm,
					},
					{
						path: "additionalDocs",
						name: "recruitmentApplicantAdditionalDocs",
						component: recruitmentApplicantAdditionalDocs,
					},
					{
						path: "switchProject",
						name: "recruitmentApplicantSwitchProject",
						component: recruitmentApplicantSwitchProject,
					},
					{
						path: "userSetting",
						name: "recruitmentApplicantUserSetting",
						component: recruitmentApplicantUserSetting,
					},
				],
			},

			// Recruitment - manager sign in
			{
				path: "recruitment/manager/signin",
				name: "recruitmentManagerSignin",
				component: recruitmentManagerSignin,
			},
			// Recruitment - manager forget & reset password
			{
				path: "recruitment/manager/password/reset",
				name: "recruitmentManagerPasswordReset",
				component: recruitmentManagerPasswordReset,
			},
			{
				path: "recruitment/manager/password/forget",
				name: "recruitmentManagerPasswordForget",
				component: recruitmentManagerPasswordForget,
			},
			{
				path: "recruitment/manager/password/forget/emailSent",
				name: "recruitmentManagerPasswordForgetEmailSent",
				component: recruitmentManagerPasswordForgetEmailSent,
			},
			// Recruitment - manager
			{
				path: "recruitment/manager",
				name: "recruitmentAdminMainContainer",
				component: recruitmentManagerMainContainer,
				children: [
					{
						path: "projectSetting",
						name: "recruitmentProjectSetting",
						component: recruitmentProjectSetting,
					},
					{
						path: "applicationAccountSetting",
						name: "recruitmentManagerApplicationAccountSetting",
						component: recruitmentManagerApplicationAccountSetting,
					},
					{
						path: "gradeDataList",
						name: "recruitmentGradeDataList",
						component: recruitmentGradeDataList,
					},
					{
						path: "reviewScoreField",
						name: "recruitmentReviewScoreField",
						component: recruitmentReviewScroreField,
					},
					{
						path: "reviewProgress",
						name: "recruitmentManagerReviewProgress",
						component: recruitmentManagerReviewProgress,
					},
					{
						path: "attachmentList",
						name: "recruitmentManagerApplicantUploadList",
						component: recruitmentManagerApplicantUploadList,
					},
					{
						path: "userSetting",
						name: "recruitmentManagerUserSetting",
						component: recruitmentManagerUserSetting,
					},
					{
						path: "applicationUploadSetting",
						name: "recruitmentApplicationUpload",
						component: recruitmentApplicationUpload,
					},
				],
			},

			// Recruitment - reviewer sign in
			{
				path: "recruitment/reviewer/signin",
				name: "recruitmentReviewerSignin",
				component: recruitmentReviewerSignin,
			},

			// Recruitment - reviewer forget & reset password
			{
				path: "recruitment/reviewer/password/reset",
				name: "recruitmenReviewerPasswordReset",
				component: recruitmentReviewerPasswordReset,
			},
			{
				path: "recruitment/reviewer/password/forget",
				name: "recruitmentReviewerPasswordForget",
				component: recruitmentReviewerPasswordForget,
			},
			{
				path: "recruitment/reviewer/password/forget/emailSent",
				name: "recruitmentReviewerPasswordForgetEmailSent",
				component: recruitmentReviewerPasswordForgetEmailSent,
			},
			{
				path: "recruitment/reviewer/password/firstLogin",
				name: "recruitmentReviewerPasswordFirstLogin",
				component: recruitmentReviewerPasswordFirstLogin,
			},
			{
				path: "recruitment/reviewer/password/firstLogin",
				name: "recruitmentReviewerPasswordFirstLogin",
				component: recruitmentReviewerPasswordFirstLogin,
			},

			{
				path: "recruitment/reviewer",
				name: "recruitmentReviewerMainContainer",
				component: recruitmentReviewerMainContainer,
				children: [
					{
						path: "requiredDataReview",
						name: "requiredDataReview",
						component: requiredDataReview,
					},
					{
						path: "optionalDataReview",
						name: "optionalDataReview",
						component: optionalDataReview,
					},
					{
						path: "singleRequiredDataReview/:id",
						name: "singleRequiredDataReview",
						component: singleRequiredDataReview,
					},
					{
						path: "singleOptionalDataReview/:id",
						name: "singleOptionalDataReview",
						component: singleOptionalDataReview,
					},
					{
						path: "userSetting",
						name: "recruitmentReviewerUserSetting",
						component: recruitmentReviewerUserSetting,
					},
				],
			},
		],
	},
];

export const router: Router = createRouter({
	history: createWebHistory(),
	routes,
});
