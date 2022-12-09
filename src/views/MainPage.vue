<template>
	<div class="grid grid-cols-2 gap-15px">
		<div>
			<img src="/assets/login-page/Login-img.png" class="h-screen" />
		</div>
		<div class="m-auto">
			<div class="flex m-auto h-15">
				<div>
					<img
						src="/assets/login-page/NTNU-logo-B1.png"
						class="h-15"
					/>
				</div>
				<Divider layout="vertical" />
				<div class="mt-1.5">
					<div class="text-4xl font-bold text-gray-500">
						資訊工程學系
					</div>
					<div class="text-xs text-gray-400">
						Department of Computer Science and Information
						Enginering
					</div>
				</div>
			</div>
			<div>
				<div class="mt-100px ml-204px text-4xl font-bold text-gray-500">
					{{ $t("資訊工程學系報名系統") }}
				</div>
				<div class="ml-204px text-xs text-gray-500">
					NTNU CSIE Admissions
				</div>
			</div>
			<div class="mt-50px ml-184px userLogin">
				<router-link to="/admission">
					<button
						class="text-xl h-90px w-420px md:mx-auto w-full py-4 admissionButtonStyle"
						border="2  rounded-lg"
					>
						<div>招生系統 Admission System</div>
					</button>
				</router-link>
			</div>
			<div class="mt-50px ml-184px">
				<router-link to="/recruitment">
					<button
						class="text-xl h-90px w-420px md:mx-auto w-full py-4 recruitmentButtonStyle"
						border="2  rounded-lg"
					>
						<div>教師聘請系統 Recruitment System</div>
					</button>
				</router-link>
			</div>

			<div>..</div>
			<div class="ml-8px">
				<router-link to="/recruitment">
					<button
						class="h-40px w-130px p-button-outlined p-button-success adminDeleteSmallButtonStyle"
						border="2  rounded-lg"
					>
						<img
							alt="logo"
							src="/assets/reviewer-page/Arhive.png"
							style="width: 18px"
						/>
						<h1 class="ml-8px text-16px">
							{{ $t("切換專案") }}
						</h1>
					</button>
				</router-link>
			</div>
			<div>..</div>
			<div class="ml-8px">
				<router-link to="/recruitment">
					<button
						class="h-40px w-130px p-button-outlined p-button-success saveButtonStyle"
						border="2  rounded-lg"
					>
						<img
							alt="logo"
							src="/assets/admissionApplicant\switch.svg"
							style="width: 18px"
						/>
						<h1 class="ml-8px text-16px">
							{{ $t("切換專案") }}
						</h1>
					</button>
				</router-link>
			</div>
			<div>..</div>
			<div class="ml-8px">
				<router-link to="/recruitment">
					<button
						class="h-40px w-130px p-button-outlined p-button-success reviewSmallButtonStyle"
						border="2  rounded-lg"
					>
						<img
							alt="logo"
							src="/assets/reviewer-page/Arhive.png"
							style="width: 18px"
						/>
						<h1 class="ml-8px text-16px">
							{{ $t("切換專案") }}
						</h1>
					</button>
				</router-link>
			</div>
			<div>..</div>
			<div class="ml-8px">
				<router-link to="/recruitment">
					<button
						class="h-40px w-130px p-button-outlined p-button-success admissionSmallButtonStyle"
						border="2  rounded-lg"
					>
						<img
							alt="logo"
							src="/assets/admissionApplicant/switch.svg"
							style="width: 18px"
						/>
						<h1 class="ml-8px text-16px">
							{{ $t("切換專案") }}
						</h1>
					</button>
				</router-link>
			</div>
			<div>..</div>
			<div class="ml-8px">
				<router-link to="/recruitment">
					<button
						class="h-40px w-130px p-button-outlined p-button-success adminSmallButtonStyle"
						border="2  rounded-lg"
					>
						<img
							class="change-my-color"
							alt="logo"
							src="/assets/admissionApplicant/switch.svg"
							style="width: 18px"
						/>
						<h1 class="ml-8px text-16px">
							{{ $t("取消變更") }}
						</h1>
					</button>
				</router-link>
			</div>
			<div>..</div>
			<div class="ml-8px">
				<router-link to="/recruitment">
					<button
						class="h-40px w-130px p-button-outlined p-button-success adminSmallButtonStyle"
						border="2  rounded-lg"
					>
						<svg
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M15 5L5 15"
								v-bind:stroke="mycolor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M5 5L15 15"
								v-bind:stroke="mycolor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						<h1 class="ml-8px text-16px">
							{{ $t("取消變更") }}
						</h1>
					</button>
				</router-link>
			</div>
			<div class="sizes">
				<Button label="Small" icon="pi pi-check" class="p-button-sm" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import Divider from "primevue/divider";
import { ref } from "vue";

const mycolor = ref("#ff0000");
</script>

<style setup lang="css">
.admissionButtonStyle {
	background-color: #fafac7;
	border-color: #dbd379;
	color: #544830;
}
.admissionButtonStyle:hover {
	background-color: #8a7b27;
	border-color: #8a7b27;
	color: white;
}
.admissionButtonStyle:active {
	background-color: #624f2a;
	border-color: #624f2a;
	color: white;
}
.recruitmentButtonStyle {
	background-color: #dfe7fd;
	border-color: #a5b9ec;
	color: #003a5c;
}
.recruitmentButtonStyle:hover {
	background-color: #2459a4;
	border-color: #2459a4;
	color: white;
}
.recruitmentButtonStyle:active {
	background-color: #0b4873;
	border-color: #0b4873;
	color: white;
}
.change-my-color {
	color: "green";
	/*filter: hue-rotate(180deg);*/
	/*filter: contrast(1000);*/
	/*filter: brightness(0.25);*/
}
.change-my-color:hover {
	color: "green";
	filter: hue-rotate(180deg);
	/*filter: contrast(1000);*/
	/*filter: brightness(0.25);*/
}
</style>
