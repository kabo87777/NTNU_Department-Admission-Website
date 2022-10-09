import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
	state: () => ({
		isLoggedIn: false,
		name: {
			firstName: "John",
			lastName: "Doe",
			fullName: "John Doe",
		},
	}),
	getters: {
		// doubleCount: (state) => state.count * 2,
	},
	actions: {
		// increment() {
		// 	this.count++;
		// },
	},
});
