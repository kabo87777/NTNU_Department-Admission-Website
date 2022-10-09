<template>
	<NavBar v-if="loggedin" />
	<SideBar v-if="loggedin" />
	<div v-if="loggedin" class="ml-400px mr-80px mt-62px">
		<router-view />
	</div>
	<div v-else>
		<router-view />
	</div>
</template>

<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import SideBar from "./components/SideBar.vue";

import { Ref, ref, watch } from "vue";
import { RouteLocationNormalized, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const { t, te, locale } = useI18n();

const router = useRouter();

const loggedin = ref(false);

if (!loggedin.value) {
	//router.push("/login");
}

const computeRouteTitle = (route: Ref<RouteLocationNormalized>) => {
	const routeTitleI18nKey = `meta.title.${route.value.meta.titleKey}`;

	return te(routeTitleI18nKey)
		? `${t(routeTitleI18nKey)} - ${t("meta.title.base")}`
		: t("meta.title.base");
};

watch(locale, (newLocale) => {
	window.localStorage.setItem("lastLocale", newLocale);
	document.title = computeRouteTitle(router.currentRoute);
});

watch(router.currentRoute, () => {
	document.title = computeRouteTitle(router.currentRoute);
});
</script>

<style scoped></style>
