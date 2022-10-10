<template>
	<router-view />
</template>

<script setup lang="ts">
import type { RouteLocationNormalized } from "vue-router";

import { Ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const { t, te, locale } = useI18n();

const router = useRouter();

const computeRouteTitle = (route: Ref<RouteLocationNormalized>) => {
	// The i18n key for the route title
	const routeTitleI18nKey = `meta.title.${route.value.meta.titleKey}`;

	// if key exists
	if (te(routeTitleI18nKey))
		return `${t(routeTitleI18nKey)} - ${t("meta.title.base")}`;

	return t("meta.title.base");
};

// Watch for i18n locale change
watch(locale, (newLocale) => {
	// Remember the new locale
	window.localStorage.setItem("lastLocale", newLocale);

	// and update the title since locale changed
	document.title = computeRouteTitle(router.currentRoute);
});

// Watch for route change and update title
watch(router.currentRoute, () => {
	document.title = computeRouteTitle(router.currentRoute);
});
</script>

<style scoped></style>
