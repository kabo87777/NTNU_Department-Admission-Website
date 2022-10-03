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
];

const router: Router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
