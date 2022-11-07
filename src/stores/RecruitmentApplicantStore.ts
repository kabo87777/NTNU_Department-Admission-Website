import { defineStore } from "pinia";

export const useProjectIdStore = defineStore({
	id: "pid",
	state: () => ({
		pid: 0,
	}),
	getters: {},
	actions: {
		switchPid(pid: number) {
			this.pid = pid;
		},
	},
});
