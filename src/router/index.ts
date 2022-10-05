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
		path: "/projectSetting",
		name: "projectSetting",
		component: () => import("../views/project-setting.vue"),
	},
];

const router: Router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
