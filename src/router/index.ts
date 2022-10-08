import {
	createRouter,
	RouteRecordRaw,
	Router,
	createWebHistory,
} from "vue-router";

import { RouterInstanceOptions } from "../interfaces/RouterInstanceOptions";

export default function createRouterInstance(options: RouterInstanceOptions) {
	const { computePageTitle } = options;

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
			path: "/managerlogin",
			name: "managerlogin",
			component: () => import("../views/loginPage/ManagerLogin.vue"),
		},
		{
			path: "/firstloginchangepassword",
			name: "firstloginchangepassword",
			component: () =>
				import("../views/loginPage/firstLoginChangePass.vue"),
		},
		{
			path: "/resetpassword",
			name: "resetpassword",
			component: () => import("../views/loginPage/resetPass.vue"),
		},
	];

	const router: Router = createRouter({
		history: createWebHistory(),
		routes,
	});

	router.beforeEach((to) => {
		if (typeof to.meta.titleKey === "string") {
			document.title = computePageTitle(to.meta.titleKey);
		}
	});

	return router;
}
