import {
	createRouter,
	RouteRecordRaw,
	Router,
	createWebHistory,
} from "vue-router";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "home",
		component: () => import("../views/home/HomeView.vue"),
	},
	{
		path: "/login",
		name: "login",
		meta: {
			titleKey: "登入頁面",
		},
		component: () => import("../views/loginPage/main-login.vue"),
	},
	{
		path: "/applicantLogin",
		name: "applicantLogin",
		component: () => import("../views/loginPage/ApplicantLogin.vue"),
	},
	{
		path: "/managerlogin",
		name: "managerlogin",
		component: () => import("../views/loginPage/ManagerLogin.vue"),
	},
	{
		path: "/firstloginchangepassword",
		name: "firstloginchangepassword",
		component: () => import("../views/loginPage/firstLoginChangePass.vue"),
	},
	{
		path: "/resetpassword",
		name: "resetpassword",
		component: () => import("../views/loginPage/resetPass.vue"),
	},
	{
		path: "/forgetpassword",
		name: "forgetpassword",
		component: () => import("../views/loginPage/forgetPass.vue"),
	},
	{
		path: "/project-application-setting",
		name: "project-application-setting",
		component: () =>
			import("../views/home/project-application-setting.vue"),
	},
	{
		path: "/projectSetting",
		name: "projectSetting",
		component: () => import("../views/project-setting.vue"),
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
