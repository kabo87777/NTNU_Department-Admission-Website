<template>
	<div
		class="cf-turnstile"
		data-sitekey="0x4AAAAAAAAwuJcK_C3iXAFh"
		data-theme="light"
		data-callback="onTurnstileSuccessfulVerification"
		data-expired-callback="onTurnstileTokenExpiration"
		data-error-callback="onTurnstileFailedVerification"
	></div>
	Turnstile token: {{ turnstileToken.slice(0, 10) }}...
</template>

<script setup lang="ts">
import { ref } from "vue";

export interface TurnstileComponentExposes {
	turnstileToken: string;
}

let turnstileToken = ref("");

const script = document.createElement("script");

script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
script.async = true;
script.defer = true;

document.head.appendChild(script);

window.onTurnstileSuccessfulVerification = (token: string) => {
	turnstileToken.value = token;
};

window.onTurnstileTokenExpiration = () => {
	turnstileToken.value = "";
};

window.onTurnstileFailedVerification = () => {
	turnstileToken.value = "";
};

defineExpose({
	turnstileToken,
});
</script>

<style setup lang="css"></style>
