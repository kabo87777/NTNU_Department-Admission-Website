import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueQueryPlugin } from "@tanstack/vue-query";

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

import App from "@/App.vue";
import { router } from "./router/index";

import { i18n } from "./i18n";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(i18n);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.use(VueQueryPlugin);

app.component("Menubar", Menubar);
app.component("Divider", Divider);
app.component("ToastService", ToastService);
app.component("Toast", Toast);

app.mount("#app");
