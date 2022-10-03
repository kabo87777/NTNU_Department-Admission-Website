import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import "virtual:windi.css";
import "./styles/style.css";
import router from "./router/index";
// Import Style
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
// Import via Module
import Divider from "primevue/divider";
import Menubar from "primevue/menubar";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";

// app component
const app = createApp(App);
app.component("Menubar", Menubar);
app.component("Divider", Divider);
app.component("ToastService", ToastService);
app.component("Toast", Toast);
// API
app.use(PrimeVue).use(router).use(ToastService).mount("#app");
