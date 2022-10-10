import { defineStore } from "pinia";

export interface AuthStoreState {
	credentials: {
		expiry: number;
		uid: string;
		authorization: string;
	};
}

export const useAuthStore = defineStore("auth", {
	state: (): AuthStoreState => ({
		credentials: {
			expiry: NaN,
			uid: "",
			authorization: "",
		},
		// name: {
		// 	firstName: "John",
		// 	lastName: "Doe",
		// 	fullName: "John Doe",
		// },
	}),
	getters: {
		isLoggedIn: (state: AuthStoreState) => {
			if (state.credentials.expiry)
				return Math.floor(Date.now() / 1000) < state.credentials.expiry;

			return false;
		},
		// doubleCount: (state) => state.count * 2,
	},
	actions: {
		// increment() {
		// 	this.count++;
		// },
	},
});
