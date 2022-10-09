// import { mount } from '@vue/test-utils';
import { test, expect } from "vitest";
import App from "../App.vue";

test("mount component", async () => {
	expect(App).toBeTruthy();
});
