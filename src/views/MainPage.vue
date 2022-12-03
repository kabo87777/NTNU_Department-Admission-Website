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
			<div class="ml-8px">
				<router-link to="/recruitment">
					<button
						class="h-40px w-130px p-button-outlined p-button-success adminSmallButtonStyle"
						border="2  rounded-lg"
					>
						<img
							alt="logo"
							src="/assets/admissionApplicant\Close_round.svg"
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
							src="/assets/admissionApplicant\Done_round.svg"
							style="width: 18px"
						/>
						<h1 class="ml-8px text-16px">
							{{ $t("設定儲存") }}
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
		</div>
	</div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import Divider from "primevue/divider";
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

.admissionSmallButtonStyle {
	background-color: #ffffff;
	border-color: #62373e;
	color: #62373e;
	box-sizing: border-box;

	/* Auto layout */

	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 16px 12px;
	gap: 6px;
}
.admissionSmallButtonStyle:hover {
	background-color: #dbd379;
	border-color: #dbd379;
	color: #292a2b;
}
.admissionSmallButtonStyle:active {
	background-color: #8a7b27;
	border-color: #8a7b27;
	color: #fafac7;
}

.reviewSmallButtonStyle {
	background-color: #ffffff;
	border-color: #18528c;
	color: #18528c;
	box-sizing: border-box;

	/* Auto layout */

	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 16px 12px;
	gap: 6px;
}
.reviewSmallButtonStyle:hover {
	background-color: #a5b9ec;
	border-color: #292a2b;
	color: #292a2b;
}
.reviewSmallButtonStyle:active {
	background-color: #2459a4;
	border-color: #2459a4;
	color: #dfe7fd;
}

.adminSmallButtonStyle {
	background-color: #ffffff;
	border-color: #62373e;
	color: #62373e;
	box-sizing: border-box;

	/* Auto layout */

	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 16px 12px;
	gap: 6px;
}
.adminSmallButtonStyle:hover {
	background-color: #f3baae;
	border-color: #f3baae;
	color: #292a2b;
}
.adminSmallButtonStyle:active {
	background-color: #79363c;
	border-color: #79363c;
	color: #ffe4df;
}

.adminDeleteSmallButtonStyle {
	background-color: #ffffff;
	border-color: #616366;
	color: #616366;
	box-sizing: border-box;
	/* Auto layout */
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 16px 12px;
	gap: 6px;
}
.adminDeleteSmallButtonStyle:hover {
	background-color: #d9dada;
	border-color: #292a2b;
	color: #292a2b;
}
.adminDeleteSmallButtonStyle:active {
	background-color: #616366;
	border-color: #616366;
	color: #f5f6f6;
}

.saveButtonStyle {
	background-color: #bcd19b;
	border-color: #bcd19b;
	color: #101820;
	box-sizing: border-box;
	/* Auto layout */
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 16px 12px;
	gap: 6px;
}
.saveButtonStyle:hover {
	background-color: #bcd19b;
	border-color: #bcd19b;
	color: #101820;
}
.saveButtonStyle:active {
	background-color: #bcd19b;
	border-color: #bcd19b;
	color: #101820;
}
</style>
