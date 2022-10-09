import { defineStore } from "pinia";

interface State {
	credentials: {
		expiry: number;
		uid: string;
		authorization: string;
	};
}

export const useAuthStore = defineStore("auth", {
	state: (): State => ({
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
		isLoggedIn: (state: State) => {
			if (state.credentials.expiry)
				return (
					Math.floor(Date.now() / 1000) >= state.credentials.expiry
				);

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
