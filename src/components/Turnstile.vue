<template>
	<div
		class="cf-turnstile"
		data-sitekey="0x4AAAAAAAAwuJcK_C3iXAFh"
		data-theme="light"
		data-callback="onTurnstileSuccessfulVerification"
		data-expired-callback="onTurnstileTokenExpiration"
		data-error-callback="onTurnstileFailedVerification"
		v-if="enableTurnstile"
	></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

export interface TurnstileComponentExposes {
	turnstileToken: string;
}

const enableTurnstile = import.meta.env.VITE_IS_SKIP_CAPTCHA !== "true";

const turnstileToken = ref("");

onBeforeUnmount(() => {
	window.turnstile?.remove();
	delete window.turnstile;
});

onMounted(() => {
	if (enableTurnstile) {
		if (!("turnstile" in window)) {
			const script = document.createElement("script");

			script.src =
				"https://challenges.cloudflare.com/turnstile/v0/api.js";
			script.async = true;
			script.defer = true;

			document.head.appendChild(script);
		}

		window.onTurnstileSuccessfulVerification = (token: string) => {
			turnstileToken.value = token;
		};

		window.onTurnstileTokenExpiration = () => {
			turnstileToken.value = "";
			window.turnstile?.reset();
		};

		window.onTurnstileFailedVerification = () => {
			turnstileToken.value = "";
		};
	} else {
		// let's set it to some empty value to pass internal checks
		turnstileToken.value = "haha";
	}
});

defineExpose({
	turnstileToken,
});
</script>

<style setup lang="css"></style>
