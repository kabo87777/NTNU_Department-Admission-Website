<template>
	<div class="ml-50px mt-50px">
		<div>{{ $t("使用者管理") }}</div>
		<div class="bigRedDivider"></div>
		<div class="mt-20px">
			{{ $t("帳號名稱") }}：{{ userId }}
			<Button @click="editUserId" class="p-button-outlined">
				<img src="/assets/UserSetting/Edit.png" />
				{{ $t("修改") }}
			</Button>
			<Dialog header="修改名稱" v-model:visible="displayUserId">
				<div>{{ $t("輸入新名稱") }}</div>
				<InputText type="text" v-model="newUserId"></InputText>
				<div class="mt-10px">
					<Button @click="ensureUserId">{{ $t("確認修改") }}</Button>
					<Button @click="cancelUserId">{{ $t("取消") }}</Button>
				</div>
			</Dialog>
		</div>
		<div class="mt-20px">
			{{ $t("聯絡信箱") }}：{{ email }}
			<Button @click="editEmail" class="p-button-outlined">
				<img src="/assets/UserSetting/Edit.png" />
				{{ $t("修改") }}
			</Button>
			<Dialog header="修改信箱" v-model:visible="displayEmail">
				<div>{{ $t("輸入新信箱") }}</div>
				<InputText type="text" v-model="email"></InputText>
				<div class="mt-10px">
					<Button @click="ensureEmail">{{ $t("確認修改") }}</Button>
					<Button @click="cancelEmail">{{ $t("取消") }}</Button>
				</div>
			</Dialog>
		</div>
		<div class="mt-20px">
			{{ $t("手機號碼") }}：{{ phone }}
			<Button @click="editPhone" class="p-button-outlined">
				<img src="/assets/UserSetting/Edit.png" />
				{{ $t("修改") }}
			</Button>
			<Dialog header="修改信箱" v-model:visible="displayPhone">
				<div>{{ $t("輸入新號碼") }}</div>
				<InputText type="text" v-model="phone"></InputText>
				<div class="mt-10px">
					<Button @click="ensurePhone">{{ $t("確認修改") }}</Button>
					<Button @click="cancelPhone">{{ $t("取消") }}</Button>
				</div>
			</Dialog>
		</div>
		<Divider />
		<div>
			{{ $t("修改密碼") }}<img src="/assets/UserSetting/Lock.png" />
		</div>
		<div>
			<div>
				<div>{{ $t("請輸入舊密碼") }}：</div>
				<InputText type="password" v-model="oldPassword"></InputText>
			</div>
			<div>
				<div>
					<label>{{ $t("設定新密碼") }}：</label>
					<label class="ml-110px"
						>{{ $t("確認密碼(再輸入一次驗證密碼)") }}：</label
					>
				</div>
				<InputText type="password" v-model="newPassword"></InputText>
				<InputText type="password" v-model="ensurePassword"></InputText>
			</div>
		</div>
		<div>
			<Button @click="editPassword" class="p-button-outlined">
				<img src="/assets/UserSetting/Edit.png" />
				{{ $t("修改送出") }}
			</Button>
		</div>
	</div>
</template>
<script setup lang="ts">
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { ref } from "vue";
import Dialog from "primevue/dialog";
const userId = ref("系辦主管");
const newUserId = ref();
const displayUserId = ref();
const editUserId = () => {
	displayUserId.value = true;
};
const ensureUserId = () => {
	displayUserId.value = false;
};
const cancelUserId = () => {
	displayUserId.value = false;
};

const email = ref("csie_office@ntnu.edu.tw");
const displayEmail = ref();
const editEmail = () => {
	displayEmail.value = true;
};
const ensureEmail = () => {
	displayEmail.value = false;
};
const cancelEmail = () => {
	displayEmail.value = false;
};

const phone = ref("0912345678");
const displayPhone = ref();
const editPhone = () => {
	displayPhone.value = true;
};
const ensurePhone = () => {
	displayPhone.value = false;
};
const cancelPhone = () => {
	displayPhone.value = false;
};

const oldPassword = ref();
const newPassword = ref();
const ensurePassword = ref();
const editPassword = ref();
</script>
