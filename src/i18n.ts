import { createI18n } from "vue-i18n";
import messages from "@intlify/vite-plugin-vue-i18n/messages";

const i18n = createI18n({
	locale:
		window.localStorage.getItem("lastLocale") || navigator.language || "",
	fallbackLocale: "zh",
	messages,
});

const { t, te, locale } = i18n.global;

const computePageTitle = (pageTitleKey: string) => {
	pageTitleKey = `meta.title.${pageTitleKey}`;

	return te(pageTitleKey)
		? `${t(pageTitleKey)} - ${t("meta.title.base")}`
		: t("meta.title.base");
};

const handleLocaleChange = (newLocale: string) => {
	(locale as any).value = newLocale;
};

export { i18n, computePageTitle, handleLocaleChange };
