import { createApp } from "vue";

import "virtual:windi.css";
import "./styles/style.css";

// Import Style
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

// Import via Module
import PrimeVue from "primevue/config";
import Divider from "primevue/divider";
import Menubar from "primevue/menubar";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";

import App from "./App.vue";
import createRouterInstance from "./router/index";

import { i18n, computePageTitle } from "./i18n";

// app component
const app = createApp(App);
app.component("Menubar", Menubar);
app.component("Divider", Divider);
app.component("ToastService", ToastService);
app.component("Toast", Toast);

// API
app.use(i18n);

app.use(
	createRouterInstance({
		computePageTitle,
	})
);
app.use(PrimeVue);
app.use(ToastService);

app.mount("#app");
