<template>
	<div>
		<b>姓名資訊</b><br />
		<p>稱謂：後綴:</p>
		<InputText type="text" v-model="name_title" placeholder="Text" />
		<span :style="{ marginLeft: '.5em' }"></span>

		<InputText type="text" v-model="name_suffix" placeholder="Text" />
		<span :style="{ marginLeft: '.5em' }"></span>

		<divider></divider>

		<p><b>入學身份 (本地生)</b></p>
		<InputText
			type="text"
			v-model="admission_identity"
			placeholder="Text"
		/>
		<InputText type="text" v-model="nation" placeholder="Text" />

		<divider></divider>

		<p><b>戶籍地址</b></p>
		<divider></divider>

		<p><b>現居地址</b></p>
		<Checkbox :binary="true" v-model="sameWithHuZi" />
		與「戶籍地址」資訊相同
		<divider></divider>

		<p><b>身份資料</b></p>
		<p>法定性別*：</p>
		<Checkbox :binary="ture" v-model="isMan" />男性
		<Checkbox :binary="true" v-model="isWomen" />女性
		<p>性別認同*：</p>
		<Checkbox :binary="ture" v-model="asMan" />男性
		<Checkbox :binary="ture" v-model="asWoman" />女性
		<Checkbox :binary="ture" v-model="asNone" />非二元性別

		<br />
		<Checkbox
			:binary="ture"
			v-model="dualNations"
		/>是否有雙重國籍，第二國籍身份：
		<br />
		<Checkbox :binary="ture" v-model="visa" />簽證類型：
		<divider></divider>

		<p><b>聯絡資料</b></p>
		<Checkbox
			:binary="ture"
			v-model="samePhoneTELandMain"
		/>行動電話與主要聯絡電話相同
	</div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
	setup() {
		const name_title = ref();
		const name_suffix = ref();
		const admission_identity = ref();
		const nation = ref();
		const ID = ref();
		const sameWithHuZi = ref();
		const isMan = ref();
		const isWoman = ref();
		const asMan = ref();
		const asWoman = ref();
		const asNone = ref();
		const dualNations = ref();
		const visa = ref();
		const samePhoneTELandMain = ref();
		return {
			name_title,
			name_suffix,
			admission_identity,
			nation,
			ID,
			isMan,
			isWoman,
			asMan,
			asWoman,
			asNone,
			dualNations,
			visa,
		};
	},
};
</script>