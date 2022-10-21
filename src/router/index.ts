import {
	createRouter,
	RouteRecordRaw,
	Router,
	createWebHistory,
} from "vue-router";

import MainPage from "@/views/MainPage.vue";
import LandingView from "@/views/LandingView.vue";
import AdmissionSignin from "@/views/admission/AdmissionSignin.vue";
import RecruitmentSignin from "@/views/recruitment/RecruitmentSignin.vue";
// Manager section
import AdmissionListReviewer from "@/views/admission/manager/ListReviewer.vue";
import AdmissionManagerMainContainer from "@/views/admission/manager/MainContainer.vue";
import AdmissionManagerSignin from "@/views/admission/manager/ManagerSignin.vue";
import AdmissionManagerForgetPassword from "@/views/admission/manager/ForgetPassword.vue";
import AdmissionManagerProjectSettings from "@/views/admission/manager/ProjectSettings.vue";
// Applicant section
import AdmissionApplicantMainContainer from "@/views/admission/applicant/MainContainer.vue";
import AdmissionApplicantSignin from "@/views/admission/applicant/ApplicantSignin.vue";
import AdmissionApplicantForgetPassword from "@/views/admission/applicant/ForgetPassword.vue";
import AdmissionApplicantPasswordRecvoerySentView from "@/views/admission/applicant/PasswordRecvoerySentView.vue";
import AdmissionApplicantResetPassword from "@/views/admission/applicant/ResetPassword.vue";
import projectSetting from "@/views/admission/manager/project-setting.vue";
import firstloginchangepassword from "@/views/admission/FirstSigninChangePass.vue";
import reviewScoreField from "@/views/reviewScoreField.vue";
import resetpassword from "@/views/admission/ResetPassword.vue";
import ResetPasswordEmailSent from "@/views/admission/ResetPasswordEmailSent.vue";
import gradeDataList from "@/views/admission/manager/gradeDataList.vue";
import ApplicantsUploadList from "@/views/admission/manager/applicantsUploadList/applicantsUploadList.vue";
import ApplicantUploadedDocs from "@/views/admission/manager/applicantsUploadList/applicantUploadedDocs.vue";
import managerUserSetting from "@/views/admission/manager/managerUserSetting.vue";
//Reviewer section
import AdmissionReviewerMainContainer from "@/views/admission/reviewer/MainContainer.vue";
import AdmissionReviewerSignin from "@/views/admission/reviewer/ReviewerSignin.vue";
import applicationReview from "@/views/admission/reviewer/applicationReview.vue";
import oralReview from "@/views/admission/reviewer/oralReview.vue";
import singleApplicationReview from "@/views/admission/reviewer/singleApplicationReview.vue";
import singleOralReview from "@/views/admission/reviewer/singleOralReview.vue";

// Recruitment Applicant section

// Recruitment Reviewer section

// Recruitment Manager section

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
				children: [],
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
						component: projectSetting,
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
						path: "managerUserSetting",
						name: "managerUserSetting",
						component: managerUserSetting,
					},
					{
						path: "reviewerSettings",
						name: "reviewerSettings",
						component: AdmissionListReviewer,
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
		],
	},
];

export const router: Router = createRouter({
	history: createWebHistory(),
	routes,
});
