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
		path: "/managerlogin",
		name: "managerlogin",
		component: () => import("../views/loginPage/ManagerLogin.vue"),
	},
];

export const router: Router = createRouter({
	history: createWebHistory(),
	routes,
});
