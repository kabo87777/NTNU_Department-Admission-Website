import {
	createRouter,
	RouteRecordRaw,
	Router,
	createWebHistory,
} from "vue-router";

import LandingView from "@/views/LandingView.vue";
import AdmissionSignin from "@/views/admission/AdmissionSignin.vue";
import AdmissionManagerMainContainer from "@/views/admission/manager/MainContainer.vue";
import AdmissionManagerSignin from "@/views/admission/manager/ManagerSignin.vue";
import AdmissionManagerForgetPassword from "@/views/admission/manager/ForgetPassword.vue";
import AdmissionManagerProjectSettings from "@/views/admission/manager/ProjectSettings.vue";
import AdmissionApplicantMainContainer from "@/views/admission/applicant/MainContainer.vue";
import AdmissionApplicantSignin from "@/views/admission/applicant/ApplicantSignin.vue";
import projectSetting from "@/views/admission/manager/project-setting.vue";
import firstloginchangepassword from "@/views/admission/FirstSigninChangePass.vue";
import reviewScoreField from "@/views/reviewScoreField.vue";
import resetpassword from "@/views/admission/ResetPassword.vue";
import ResetPasswordEmailSent from "@/views/admission/ResetPasswordEmailSent.vue";

const routes: Array<RouteRecordRaw> = [
	// Choose recruitment / admission
	{
		path: "/",
		name: "LandingView",
		component: LandingView,
		children: [
			// Admission - choose applicant / manager
			{
				path: "admission",
				name: "AdmissionSignin",
				meta: {
					titleKey: "登入頁面",
				},
				component: AdmissionSignin,
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
				],
			},
		],
	},
	{
		path: "/reviewScoreField",
		name: "reviewScoreField",
		component: () => import("../views/reviewScoreField.vue"),
	},
];

export const router: Router = createRouter({
	history: createWebHistory(),
	routes,
});
