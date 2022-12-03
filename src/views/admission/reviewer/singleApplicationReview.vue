<template>
	<div v-if="load"></div>
	<div class="ml-128px mr-128px mt-62px" v-else>
		<div class="flex">
			<router-link
				to="/admission/reviewer/applicationReview"
				custom
				v-slot="{ navigate }"
			>
				<Button
					class="p-button-secondary p-button-text !w-164px !h-29px"
					@click="navigate"
					role="link"
				>
					<img
						alt="logo"
						src="/assets/reviewer-page/Expand_left.png"
						style="width: 1.5rem"
					/>
					<span class="text-base">
						{{ $t("書面資料評閱") }}
					</span>
				</Button>
			</router-link>
			<div class="text-[32px] ml-24px">
				{{ ID }}
			</div>
			<div class="text-[32px] ml-20px">
				{{ name }}
			</div>
		</div>
		<div class="bigBlueDivider"></div>
		<div class="mt-10px h-670px">
			<vue-pdf-embed :source="pdf"/>
		</div>
		<div class="bigBlueDivider"></div>
		<div class="flex mt-10px">
			<div class="text-xl mt-5px">
				{{ score1Title }} ({{ score1Proportion }}%)
			</div>
			<InputNumber
				inputId="integeronly"
				v-model="inputScore_1"
				class="ml-34px !w-132px !h-44px"
			/>
			<div class="text-xl ml-125px mt-5px">
				{{ score2Title }} ({{ score2Proportion }}%)
			</div>
			<InputNumber
				inputId="integeronly"
				v-model="inputScore_2"
				class="ml-34px !w-132px !h-44px"
			/>
			<div class="text-xl ml-125px mt-5px">
				{{ score3Title }} ({{ score3Proportion }}%)
			</div>
			<InputNumber
				inputId="integeronly"
				v-model="inputScore_3"
				class="ml-34px !w-132px !h-44px"
			/>
		</div>
		<div class="flex mt-10px" v-if="programGrading?.docs_grade_name_4">
			<div class="text-xl mt-5px">
				{{ score4Title }} ({{ score4Proportion }}%)
			</div>
			<InputNumber
				inputId="integeronly"
				v-model="inputScore_4"
				class="ml-34px !w-132px !h-44px"
			/>
			<div
				class="text-xl ml-125px mt-5px"
				v-if="programGrading?.docs_grade_name_5"
			>
				{{ score5Title }} ({{ score5Proportion }}%)
			</div>
			<InputNumber
				inputId="integeronly"
				v-model="inputScore_5"
				class="ml-34px !w-132px !h-44px"
				v-if="programGrading?.docs_grade_name_5"
			/>
		</div>
		<div class="flex mt-10px">
			<div class="text-xl mt-5px">
				{{ $t("備註：") }}
			</div>
			<InputText
				type="text"
				v-model="remark"
				class="!w-683px !h-44px ml-5px"
			/>
		</div>
		<div class="flex mt-10px">
			<Checkbox
				inputId="binary"
				v-model="accessChecked"
				:binary="true"
				class="!w-31px !h-31px mt-9px"
			/>
			<div class="text-xl ml-5px mt-5px">
				{{ $t("逕取，逕取原因：") }}
			</div>
			<InputText
				type="text"
				v-model="accessReason"
				class="!w-549px !h-44px ml-5px"
				:disabled="disable"
			/>
			<div class="text-xl ml-180px mt-5px">
				{{ $t("書面分數合計： ") }} {{ total_score }} {{ $t("分") }}
			</div>
			<Button
				class="w-100px h-40px !ml-20px p-button-success"
				@click="saveScore"
			>
				<img
					alt="logo"
					src="/assets/project-setting/Check_fill.png"
					style="width: 1.5rem"
					class="fill-green-500"
				/>
				<span class="tracking-1px">{{ $t("保存") }}</span>
			</Button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Button from "primevue/button";
import InputNumber from "primevue/inputnumber";
import Checkbox from "primevue/checkbox";
import InputText from "primevue/inputtext";
import { useI18n } from "vue-i18n";
import PDFView from "@/components/pdfPreview.vue";
import jsPdf from "./test.pdf";
import { useAdmissionReviewerAuthStore } from "@/stores/universalAuth";
import { AdmissionReviewerAPI } from "@/api/admission/reviewer/api";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { InvalidSessionError } from "@/api/error";
import { useGlobalStore } from "@/stores/AdmissionReviewerStore";
import { useToast } from "primevue/usetoast";
import SelectButton from "primevue/selectbutton";
import axios from "axios";
import VuePdfEmbed from 'vue-pdf-embed'

let pdf:string;
const route = useRoute();
const { t } = useI18n();
const router = useRouter();

const adminAuth = useAdmissionReviewerAuthStore();
const store = useGlobalStore();
const api = new AdmissionReviewerAPI(adminAuth);

// FIXME: logic may refactor

const ID = computed(() => route.params.id);
const newApplicantGrade = useMutation(async (newProgramData: any) => {
	try {
		return await api.updateSingleApplicantGrade(ID.value, newProgramData);
	} catch (error) {
		toast.add({ severity: "error", summary: "無法保存", life: 3000 });
		console.log(error);
	}
});
const accessChecked = ref();
const disable = computed(() => !accessChecked.value);
const accessReason = ref("");
const score1Proportion = ref(30);
const score2Proportion = ref(30);
const score3Proportion = ref(40);
const score4Proportion = ref(0);
const score5Proportion = ref(0);
const score1Title = ref("");
const score2Title = ref("");
const score3Title = ref("");
const score4Title = ref("");
const score5Title = ref("");
const inputScore_1 = ref(0);
const inputScore_2 = ref(0);
const inputScore_3 = ref(0);
const inputScore_4 = ref(0);
const inputScore_5 = ref(0);
const name = ref("");
const remark = ref("");
const total_score = computed(() => {
	return (
		(inputScore_1!.value! * score1Proportion.value) / 100 +
		(inputScore_2!.value! * score2Proportion.value) / 100 +
		(inputScore_3!.value! * score3Proportion.value) / 100 +
		(inputScore_4!.value! * score4Proportion.value) / 100 +
		(inputScore_5!.value! * score5Proportion.value) / 100
	).toFixed(2);
});
const data = ref("基本資料");
const datas = ref(["基本資料", "PDF"]);

const {
	isLoading,
	isError,
	data: applicantGrade,
	error,
} = useQuery(
	["applicantGrade"],
	async () => {
		try {
			return await api.getSingleApplicantGrade(ID.value);
		} catch (e: any) {
			if (e instanceof InvalidSessionError) {
				// FIXME: show session expiry notification??
				// Why are we even here in the first place?
				// MainContainer should have checked already.
				console.error(
					"Session has already expired while querying programList"
				);
				router.push("/");
				return;
			}
		}
	},
	{
		onSuccess: (data) => {
			inputScore_1.value = data!.docs_grade_1;
			inputScore_2.value = data!.docs_grade_2;
			inputScore_3.value = data!.docs_grade_3;
			inputScore_4.value = data!.docs_grade_4;
			inputScore_5.value = data!.docs_grade_5;
			accessChecked.value = data!.isImmediateEnroll;
			accessReason.value = data!.immediate_enroll_comment;
		},
	}
);

const { data: applicantInfo } = useQuery(
	["applicantInfo"],
	async () => {
		try {
			return await api.getSingleApplicantInfo(ID.value);
		} catch (e: any) {
			if (e instanceof InvalidSessionError) {
				// FIXME: show session expiry notification??
				// Why are we even here in the first place?
				// MainContainer should have checked already.
				console.error(
					"Session has already expired while querying applicantInfo"
				);
				router.push("/");
				return;
			}
		}
	},
	{
		onSuccess: (data) => {
			name.value = data![0].name;
		},
	}
);

const { data: programGrading } = useQuery(
	["programGrading"],
	async () => {
		try {
			return await api.getProgramGrading(
				store.admissionReviewerProgram!.id
			);
		} catch (e: any) {
			if (e instanceof InvalidSessionError) {
				// FIXME: show session expiry notification??
				// Why are we even here in the first place?
				// MainContainer should have checked already.
				console.error(
					"Session has already expired while querying applicantInfo"
				);
				router.push("/");
				return;
			}
		}
	},
	{
		onSuccess: (data) => {
			score1Title.value = data!.docs_grade_name_1;
			score2Title.value = data!.docs_grade_name_2;
			score3Title.value = data!.docs_grade_name_3;
			if (data!.docs_grade_name_4) {
				score4Title.value = data!.docs_grade_name_4;
			}
			if (data!.docs_grade_name_5) {
				score5Title.value = data!.docs_grade_name_5;
			}
			score1Proportion.value = data!.docs_grade_weight_1;
			score2Proportion.value = data!.docs_grade_weight_2;
			score3Proportion.value = data!.docs_grade_weight_3;
			if (data!.docs_grade_weight_4) {
				score4Proportion.value = data!.docs_grade_weight_4;
			}
			if (data!.docs_grade_weight_5) {
				score5Proportion.value = data!.docs_grade_weight_5;
			}
		},
	}
);

const config = {
	headers: { Authorization: adminAuth.credentials?.authorization },
};
const file = axios.get(`http://127.0.0.1:3000/api/v1/admission/reviewer/applicant/1/file/1/getfile`,config).then(response => {
  const blob = new Blob([response.data], { type: 'application/pdf' });
  const objectUrl = URL.createObjectURL(blob);
 pdf = 'data:application/pdf;base64,'+'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yXV32qNzbDkZOcaIsL6ZkZHKjEyLGW+JEdJFW5Tpmd3Kz84ocfbZ0UKJFJZoZYYY193zDT5QzIB+ugu1dUUDqbtlm3HdBpMzLqbvUyLTkmkYfyBTEZlKZubQyed0K1Zn9CuDlEGDgpI+Hzpt4vuRM4JERvaxbLl3Fcdi5PuyeRXYxaPyu9SDjnkVYzMsuh8xdviweRVWpzmir5LZ96lG2d8gvcOERjFISQhCn0OTPm8cOi1y4vuNst/EjGxHttxN/OPdIbt2VGBbU+JCsJWpqaNGScWWZmKzRo7KHIqtO7V9QXL74kNlJj4uYeSI0WOM2ZYB1v62qPGXF09pKU6f1HpXw9qE4TPHTvQVDI80RYYFhVpz5tRl+raUpt6+Na8mx+Ytmrx0YmJkZEhIZGRZtivFVTd5etO0FFdm0ShrkppksvSL7pfUX03qk+ZeV3qwb3r2EFdJTp5+/Sgitveq0a+jyfKV68j1NTZUNTf8F047UUYKZW5kc3RyZWFtCmVuZG9iagoxMyAwIG9iago8PCAvVGl0bGUgKP7/XDAwME1cMDAwaVwwMDBjXDAwMHJcMDAwb1wwMDBzXDAwMG9cMDAwZlwwMDB0XDAwMCBcMDAwV1wwMDBvXDAwMHJcMDAwZFwwMDAgXDAwMC1cMDAwIGWHTvZcMDAwMSkKL1Byb2R1Y2VyICj+/1wwMDBtXDAwMGFcMDAwY1wwMDBPXDAwMFNcMDAwIHJIZyxcMDAwMVwwMDAzXDAwMC5cMDAwMP9cMDEwckiGX1wwMDAyXDAwMDJcMDAwQVwwMDAzXDAwMDhcMDAwMP9cMDExXDAwMCBcMDAwUVwwMDB1XDAwMGFcMDAwclwwMDB0XDAwMHpcMDAwIFwwMDBQXDAwMERcMDAwRlwwMDBDXDAwMG9cMDAwblwwMDB0XDAwMGVcMDAweFwwMDB0KQovQ3JlYXRvciAoV29yZCkgL0NyZWF0aW9uRGF0ZSAoRDoyMDIyMTIwMzE2NDAwN1owMCcwMCcpIC9Nb2REYXRlIChEOjIwMjIxMjAzMTY0MDA3WjAwJzAwJykKPj4KZW5kb2JqCnhyZWYKMCAxNAowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAyMDQgMDAwMDAgbiAKMDAwMDAwMzE1MiAwMDAwMCBuIAowMDAwMDAwMDIyIDAwMDAwIG4gCjAwMDAwMDAzMDggMDAwMDAgbiAKMDAwMDAwMzExNyAwMDAwMCBuIAowMDAwMDAwMDAwIDAwMDAwIG4gCjAwMDAwMDMyODQgMDAwMDAgbiAKMDAwMDAwMDQwNSAwMDAwMCBuIAowMDAwMDAzMjM1IDAwMDAwIG4gCjAwMDAwMDM3NTcgMDAwMDAgbiAKMDAwMDAwMzQ1MCAwMDAwMCBuIAowMDAwMDAzOTkzIDAwMDAwIG4gCjAwMDAwMTExODkgMDAwMDAgbiAKdHJhaWxlcgo8PCAvU2l6ZSAxNCAvUm9vdCA5IDAgUiAvSW5mbyAxMyAwIFIgL0lEIFsgPDkwYjViN2M4MzQyODRlNGVhZjMwZGRhMzBiOGQ3MWExPgo8OTBiNWI3YzgzNDI4NGU0ZWFmMzBkZGEzMGI4ZDcxYTE+IF0gPj4Kc3RhcnR4cmVmCjExNjExCiUlRU9GCg=='
})
const { data: applicantFile } = useQuery(
	["applicantFile"],
	async () => {
		try {
			return await api.getApplicantSingleFile();
		} catch (e: any) {
			if (e instanceof InvalidSessionError) {
				// FIXME: show session expiry notification??
				// Why are we even here in the first place?
				// MainContainer should have checked already.
				console.error(
					"Session has already expired while querying applicantInfo"
				);
				router.push("/");
				return;
			}
		}
	},
	{
		onSuccess: (data) => {
			pdf = 'data:application/pdf;base64,'+'JVBERi0xLjMKJcTl8uXrp/Og0MTGCjMgMCBvYmoKPDwgL0ZpbHRlciAvRmxhdGVEZWNvZGUgL0xlbmd0aCAxMTAgPj4Kc3RyZWFtCngBK1QIVChU0HcuNlRILlYwAMPiZKCQgZ6RCYQPYhhaKJgZGepZGikk5yo4hSiYQlQCKWMDAwVTMyOFkFwu/ZAQIwVDhZA0BQ1FTYWQLAXXELDpRBtlZKxnaWpgBDKPKyRXAck8JYR5gQBV/SWVCmVuZHN0cmVhbQplbmRvYmoKMSAwIG9iago8PCAvVHlwZSAvUGFnZSAvUGFyZW50IDIgMCBSIC9SZXNvdXJjZXMgNCAwIFIgL0NvbnRlbnRzIDMgMCBSIC9NZWRpYUJveCBbMCAwIDU5NSA4NDJdCj4+CmVuZG9iago0IDAgb2JqCjw8IC9Qcm9jU2V0IFsgL1BERiAvVGV4dCBdIC9Db2xvclNwYWNlIDw8IC9DczEgNSAwIFIgPj4gL0ZvbnQgPDwgL1RUMiA3IDAgUgo+PiA+PgplbmRvYmoKOCAwIG9iago8PCAvTiAzIC9BbHRlcm5hdGUgL0RldmljZVJHQiAvTGVuZ3RoIDI2MTIgL0ZpbHRlciAvRmxhdGVEZWNvZGUgPj4Kc3RyZWFtCngBnZZ3VFPZFofPvTe90BIiICX0GnoJINI7SBUEUYlJgFAChoQmdkQFRhQRKVZkVMABR4ciY0UUC4OCYtcJ8hBQxsFRREXl3YxrCe+tNfPemv3HWd/Z57fX2Wfvfde6AFD8ggTCdFgBgDShWBTu68FcEhPLxPcCGBABDlgBwOFmZgRH+EQC1Py9PZmZqEjGs/buLoBku9ssv1Amc9b/f5EiN0MkBgAKRdU2PH4mF+UClFOzxRky/wTK9JUpMoYxMhahCaKsIuPEr2z2p+Yru8mYlybkoRpZzhm8NJ6Mu1DemiXho4wEoVyYJeBno3wHZb1USZoA5fco09P4nEwAMBSZX8znJqFsiTJFFBnuifICAAiUxDm8cg6L+TlongB4pmfkigSJSWKmEdeYaeXoyGb68bNT+WIxK5TDTeGIeEzP9LQMjjAXgK9vlkUBJVltmWiR7a0c7e1Z1uZo+b/Z3x5+U/09yHr7VfEm7M+eQYyeWd9s7KwvvRYA9iRamx2zvpVVALRtBkDl4axP7yAA8gUAtN6c8x6GbF6SxOIMJwuL7OxscwGfay4r6Df7n4Jvyr+GOfeZy+77VjumFz+BI0kVM2VF5aanpktEzMwMDpfPZP33EP/jwDlpzcnDLJyfwBfxhehVUeiUCYSJaLuFPIFYkC5kCoR/1eF/GDYnBxl+nWsUaHVfAH2FOVC4SQfIbz0AQyMDJG4/egJ961sQMQrIvrxorZGvc48yev7n+h8LXIpu4UxBIlPm9gyPZHIloiwZo9+EbMECEpAHdKAKNIEuMAIsYA0cgDNwA94gAISASBADlgMuSAJpQASyQT7YAApBMdgBdoNqcADUgXrQBE6CNnAGXARXwA1wCwyAR0AKhsFLMAHegWkIgvAQFaJBqpAWpA+ZQtYQG1oIeUNBUDgUA8VDiZAQkkD50CaoGCqDqqFDUD30I3Qaughdg/qgB9AgNAb9AX2EEZgC02EN2AC2gNmwOxwIR8LL4ER4FZwHF8Db4Uq4Fj4Ot8IX4RvwACyFX8KTCEDICAPRRlgIG/FEQpBYJAERIWuRIqQCqUWakA6kG7mNSJFx5AMGh6FhmBgWxhnjh1mM4WJWYdZiSjDVmGOYVkwX5jZmEDOB+YKlYtWxplgnrD92CTYRm40txFZgj2BbsJexA9hh7DscDsfAGeIccH64GFwybjWuBLcP14y7gOvDDeEm8Xi8Kt4U74IPwXPwYnwhvgp/HH8e348fxr8nkAlaBGuCDyGWICRsJFQQGgjnCP2EEcI0UYGoT3QihhB5xFxiKbGO2EG8SRwmTpMUSYYkF1IkKZm0gVRJaiJdJj0mvSGTyTpkR3IYWUBeT64knyBfJQ+SP1CUKCYUT0ocRULZTjlKuUB5QHlDpVINqG7UWKqYup1aT71EfUp9L0eTM5fzl+PJrZOrkWuV65d7JU+U15d3l18unydfIX9K/qb8uAJRwUDBU4GjsFahRuG0wj2FSUWaopViiGKaYolig+I1xVElvJKBkrcST6lA6bDSJaUhGkLTpXnSuLRNtDraZdowHUc3pPvTk+nF9B/ovfQJZSVlW+Uo5RzlGuWzylIGwjBg+DNSGaWMk4y7jI/zNOa5z+PP2zavaV7/vCmV+SpuKnyVIpVmlQGVj6pMVW/VFNWdqm2qT9QwaiZqYWrZavvVLquNz6fPd57PnV80/+T8h+qwuol6uPpq9cPqPeqTGpoavhoZGlUalzTGNRmabprJmuWa5zTHtGhaC7UEWuVa57VeMJWZ7sxUZiWzizmhra7tpy3RPqTdqz2tY6izWGejTrPOE12SLls3Qbdct1N3Qk9LL1gvX69R76E+UZ+tn6S/R79bf8rA0CDaYItBm8GooYqhv2GeYaPhYyOqkavRKqNaozvGOGO2cYrxPuNbJrCJnUmSSY3JTVPY1N5UYLrPtM8Ma+ZoJjSrNbvHorDcWVmsRtagOcM8yHyjeZv5Kws9i1iLnRbdFl8s7SxTLessH1kpWQVYbbTqsPrD2sSaa11jfceGauNjs86m3ea1rakt33a/7X07ml2w3Ra7TrvP9g72Ivsm+zEHPYd4h70O99h0dii7hH3VEevo4bjO8YzjByd7J7HTSaffnVnOKc4NzqMLDBfwF9QtGHLRceG4HHKRLmQujF94cKHUVduV41rr+sxN143ndsRtxN3YPdn9uPsrD0sPkUeLx5Snk+cazwteiJevV5FXr7eS92Lvau+nPjo+iT6NPhO+dr6rfS/4Yf0C/Xb63fPX8Of61/tPBDgErAnoCqQERgRWBz4LMgkSBXUEw8EBwbuCHy/SXyRc1BYCQvxDdoU8CTUMXRX6cxguLDSsJux5uFV4fnh3BC1iRURDxLtIj8jSyEeLjRZLFndGyUfFRdVHTUV7RZdFS5dYLFmz5EaMWowgpj0WHxsVeyR2cqn30t1Lh+Ps4grj7i4zXJaz7NpyteWpy8+ukF/BWXEqHhsfHd8Q/4kTwqnlTK70X7l35QTXk7uH+5LnxivnjfFd+GX8kQSXhLKE0USXxF2JY0muSRVJ4wJPQbXgdbJf8oHkqZSQlKMpM6nRqc1phLT4tNNCJWGKsCtdMz0nvS/DNKMwQ7rKadXuVROiQNGRTChzWWa7mI7+TPVIjCSbJYNZC7Nqst5nR2WfylHMEeb05JrkbssdyfPJ+341ZjV3dWe+dv6G/ME17msOrYXWrlzbuU53XcG64fW+649tIG1I2fDLRsuNZRvfbore1FGgUbC+YGiz7+bGQrlCUeG9Lc5bDmzFbBVs7d1ms61q25ciXtH1YsviiuJPJdyS699ZfVf53cz2hO29pfal+3fgdgh33N3puvNYmWJZXtnQruBdreXM8qLyt7tX7L5WYVtxYA9pj2SPtDKosr1Kr2pH1afqpOqBGo+a5r3qe7ftndrH29e/321/0wGNA8UHPh4UHLx/yPdQa61BbcVh3OGsw8/rouq6v2d/X39E7Ujxkc9HhUelx8KPddU71Nc3qDeUNsKNksax43HHb/3g9UN7E6vpUDOjufgEOCE58eLH+B/vngw82XmKfarpJ/2f9rbQWopaodbc1om2pDZpe0x73+mA050dzh0tP5v/fPSM9pmas8pnS8+RzhWcmzmfd37yQsaF8YuJF4c6V3Q+urTk0p2usK7ey4GXr17xuXKp2737/FWXq2euOV07fZ19ve2G/Y3WHruell/sfmnpte9tvelws/2W462OvgV95/pd+y/e9rp95Y7/nRsDiwb67i6+e/9e3D3pfd790QepD14/zHo4/Wj9Y+zjoicKTyqeqj+t/dX412apvfTsoNdgz7OIZ4+GuEMv/5X5r0/DBc+pzytGtEbqR61Hz4z5jN16sfTF8MuMl9Pjhb8p/rb3ldGrn353+71nYsnE8GvR65k/St6ovjn61vZt52To5NN3ae+mp4req74/9oH9oftj9MeR6exP+E+Vn40/d3wJ/PJ4Jm1m5t/3hPP7CmVuZHN0cmVhbQplbmRvYmoKNSAwIG9iagpbIC9JQ0NCYXNlZCA4IDAgUiBdCmVuZG9iagoyIDAgb2JqCjw8IC9UeXBlIC9QYWdlcyAvTWVkaWFCb3ggWzAgMCA1OTUgODQyXSAvQ291bnQgMSAvS2lkcyBbIDEgMCBSIF0gPj4KZW5kb2JqCjkgMCBvYmoKPDwgL1R5cGUgL0NhdGFsb2cgL1BhZ2VzIDIgMCBSID4+CmVuZG9iago3IDAgb2JqCjw8IC9UeXBlIC9Gb250IC9TdWJ0eXBlIC9UcnVlVHlwZSAvQmFzZUZvbnQgL0FBQUFBQytDYWxpYnJpIC9Gb250RGVzY3JpcHRvcgoxMCAwIFIgL1RvVW5pY29kZSAxMSAwIFIgL0ZpcnN0Q2hhciAzMyAvTGFzdENoYXIgMzQgL1dpZHRocyBbIDQ3OSAyMjYgXSA+PgplbmRvYmoKMTEgMCBvYmoKPDwgL0xlbmd0aCAyMzQgL0ZpbHRlciAvRmxhdGVEZWNvZGUgPj4Kc3RyZWFtCngBXZCxbsMgEIZ3nuLGZIjADJ0QUpUqkoemVd0+AIazhVQDwnjw2/cgaSp1+Ie7+7/j5/i5f+mDL8Dfc7QDFph8cBnXuGWLMOLsA+skOG/LvWo9u5jEOMHDvhZc+jBFUIoB8A9C1pJ3ODy7OOKx9t6yw+zDDIev89A6w5bSNy4YCgimNTicaN2rSVezIPCGnnpHc1/2E1F/js89IVAiIrpbJBsdrslYzCbMyJQQWl0ummFw/0byBozT3Sk7raqEeOo0U1JSSRJCiob/Guum+uNHQrvlTOHaWVrumscHfFwuxVTfb/oBbTxzGgplbmRzdHJlYW0KZW5kb2JqCjEwIDAgb2JqCjw8IC9UeXBlIC9Gb250RGVzY3JpcHRvciAvRm9udE5hbWUgL0FBQUFBQytDYWxpYnJpIC9GbGFncyA0IC9Gb250QkJveCBbLTUwMyAtMzEzIDEyNDAgMTAyNl0KL0l0YWxpY0FuZ2xlIDAgL0FzY2VudCA5NTIgL0Rlc2NlbnQgLTI2OSAvQ2FwSGVpZ2h0IDYzMiAvU3RlbVYgMCAvWEhlaWdodAo0NjQgL0F2Z1dpZHRoIDUyMSAvTWF4V2lkdGggMTMyOCAvRm9udEZpbGUyIDEyIDAgUiA+PgplbmRvYmoKMTIgMCBvYmoKPDwgL0xlbmd0aDEgMTU1MjAgL0xlbmd0aCA3MTA3IC9GaWx0ZXIgL0ZsYXRlRGVjb2RlID4+CnN0cmVhbQp4AdWbd1hU57bGvz1DGcrAgIDoiDO4A9EMiAUVKyNlFLGAMGYGQRmaoKhIsaNEYzSTmB7TjakmIWUzmoimaBLTE5OY3jUn55w009sxUe777cUymnNz7h/3uc+TO/Cb913rK/sru4xD0trcVisiRIcwimHVi31NQn+NzYIMqF7eaqc4NU+I4EfqmhYspjgNYnYsaFxVR/HYciGMg+prfTUUi9+go+uRoFjJhJ5Vv7h1JcVjZQeRjUure8vHliI2Lfat7D2+eB+xfYlvcS3Vn9Ah46bm2t5yxYPuvqCy//CuoMwoZolgvY5BWESG2CxE7GjDKD0jy0NGjrwl7KYT86Mn/Cj6mfT0w1+sfVGaN7b56349fqIj7EvTaIRhwqAXC4F2odtPvCtE+I5fjx/fEfalzJzxMnaFGSeXGJ41PC2yhM3wTK9+ILIM7wq34R3oW9C3e/VN6BuIX4e+Bj0MfRW6H/oY9FHoI8ItggzviUxQCoynXA2i28HrIFgsQk+KiEB7RcQZnhB5oAa0gqtAMOo+hrLb0aMi7Ibzd4clKtPs3YaNbDawOY9NB5v1bNaxaWezls0aNqvZrGKzks0KNsvZtLFpZdPCZhmbJjZL2Sxhs5hNI5tFbBayaWBTz2YBmzo2tWxq2FSzqWLjY1PJZj6beWwq2JSzmcumjI2XjYfNuWzmsHGzKWVTwmY2m2I2RWxmsZnJZgab6WwK2UxjU8BmKpspbFxs8tnkscllk8NmMhsnm2w2k9hMZDOBzXg249iMZZPFZgyb0WxGsclkM5LNCDbD2Qxjk8FmKJt0NmlsHGzOYTOEzWA2Z7NJZZPC5iw2KptBbJLZ2NnY2Axkk8RmABsrm/5s+rFJZNOXTQKbeDZxbPqwiWUTw8bCJppNFBszm0g2EWzC2YSxMbEJZRPCJphNEBsjGwMbhY3oNUoPm5NsTrD5jc2vbI6z+RebX9j8zOYnNj+y+YHN92y+Y/Mtm2/YfM3mKzbH2HzJ5gs2n7P5jM2nbP7J5h9s/s7mEzZ/Y/Mxm6NsjrD5iM2HbD5g8z6b99i8y+YdNm+zeYvNm2zeYPM6m9fYHGbzKptX2LzM5hCbl9i8yOYFNs+zeY7Ns2yeYfM0m6fYHGTzJJsn2DzO5gCb/WweY/Mom0fYPMxmH5u9bLrZ7GHzEJsH2exms4tNgE0XG43NA2zuZ3Mfm3vZdLK5h83dbO5is5PNnWzuYHM7m9vY3MrmFjY72NzMZjubm9jcyOYGNtezuY7NtWyuYbONzdVsrmJzJZsr2FzO5jI2l7K5hM1WNhezuYiNn82FbLaw2czmAjab2JzPZiObDWzOY9PBZj2bdWza2axls4bNajar2Kxks4LNcjZtbFrZtLBpZrOMTRObpWyWsFnMppHNIjYL2TSwqWezgE0dm1o2NWyq2VSx8bGpZDOfzTw2FWzK2cxlU8bGy8bD5lw2c9i42ZSyKWEzm00Rm1lsZrKZzqaQzTQ2BWymspnCxsUmn00em9xd8tNyt+H8wMBJNnxmDgyMh2yg6LzAwHGIOihaT7IuMDASyXaK1pKsIVlNsiqQNBlVVgaSciErSJaTtFFZK0UtJM2UXBZIykGDJpKlJEuoymKSRpJFgQH5qLmQpIGknmQBSV1gQB6q1FJUQ1JNUkXiI6kkmU8yj9pVUFROMpekjMRL4iE5l2QOiZuklKSEZDZJMUkRySySmSQzSKaTFJJMC1gLMIcCkqkB6zREU0hcAWshovyAdTokjySXJIfKJlM7J0k2tZtEMpFkAtUcTzKOmo8lySIZQzKaZBR1lkkyknoZQTKcZBh1lkEylNqlk6SROEjOIRlCMpjkbOo6lSSF+jyLRCUZRF0nk9ipnY1kIEkSyQASK0n/QP+ZWKx+JImB/rMQ9SVJoGQ8SRwl+5DEksRQmYUkmpJRJGaSSCqLIAknCaMyE0koSUigXxGOHhzoVwwJIjFS0kCRQiJ0UXpITupVlBMU/UbyK8lxKvsXRb+Q/EzyE8mPgcRSW7fyQyCxBPI9Rd+RfEvyDZV9TdFXJMdIvqSyL0g+p+RnJJ+S/JPkH1Tl7xR9QtHfKPqY5CjJESr7iORDSn5A8j7JeyTvUpV3KHqb5K1A33MxlTcDfedA3iB5nZKvkRwmeZXkFaryMskhSr5E8iLJCyTPU5XnSJ6l5DMkT5M8RXKQ5Emq+QRFj5McINlPZY+RPErJR0geJtlHspekm2ruoeghkgdJdpPsCiRkY9KBQMJcSBeJRvIAyf0k95HcS9JJck8gAXd95W7q5S6SnVR2J8kdJLeT3EZyK8ktJDtIbqbOtlMvN5HcSGU3kFxPch3JtdTgGoq2kVxNchWVXUm9XEFyOZVdRnIpySUkW0kuppoXUeQnuZBkC8lmkgsC8T7MfVMgvgpyPsnGQHwdog0k5wXi3Yg6AvF42CjrA/GjIetI2qn5Wmq3hmR1IL4GVVZR85UkK0iWk7SRtJK0UNfN1HwZSVMgvhq9LKXOllDNxSSNJItIFpI0ULt6kgU0sjpqXktSQzWrSapIfCSVJPNJ5tGkK2hk5SRzadJl1LWXDuQhOZeGO4cO5KZeSklKSGaTFAfinJhYUSBOLuusQJy8YGcG4jZCZgTi0iHTqUohybRAHD5IKAUUTSWZQklXIG4dyvIDcZsheYG49ZDcQFwHJCcQ64JMJnGSZJNMCsTic4EykaIJgRgvovEk4wIx8joaS5IViJmCaEwgxgMZHYgpg4yiskySkYGYNCRHUM3hgRg5sWGBGHlDyiAZSs3T6QhpJA7q7BySIdTZYJKzSVJJUgIxcpXOIlGpz0HUZzJ1ZqdebCQDqV0SyQASK0l/kn4BSwX6TAxY5kH6BizzIQkk8SRxJH1IYqlBDDWwUDKaJIrETBJJNSOoZjglw0hMJKEkIVQzmGoGUdJIYiBRSISzJ7rKJjkZXW07EV1j+w3+V3Ac/Au5X5D7GfwEfgQ/IP89+A5l3yL+BnwNvgLHkP8SfIGyzxF/Bj4F/wT/iFpg+3tUve0T8DfwMTiK3BHoR+BD8AHi96HvgXfBO+Bt8yLbW+bhtjehb5gbba+bU22vgcPwr5odtlfAy+AQyl9C7kXzYtsL8M/DPwf/rHmh7Rlzg+1pc73tKfMC20G0fRL9PQEeB86eA3jfDx4Dj0Yusz0S2Wx7OLLFti+y1bYXdIM9yD8EHkTZbpTtQi4AuoAGHohYZbs/YrXtvoi1tnsj2m2dEets94C7wV1gJ7gT3BGRbrsdehu4FW1uge6IWGS7GX47/E3gRvgb0Nf16Os69HUtcteAbeBqcBW4ElyBdpejv8vCZ9ouDZ9luyR8gW1r+B22i8N32jYZU2znG7NsG5Us2wZ3h/u8zg73ene7e11nuzuiXYlot7YXtq9p72x/r90ZGxK+1r3avaZztXuVe4V7ZecK9z7DBaLOsMk5wb28s80d1BbX1tpm/KFN6WxT8tqUYW2KQbRZ2uxtxshWd7O7pbPZLZqLmjuateag8VrzkWaDaFbCu3sO7Gq2DnRBnWubzRbXMvdSd1PnUveSusXuhRhgQ9YCd33nAnddVo27trPGXZ1V5fZlVbrnZ1W453VWuMuzytxzO8vc3iyP+1zUn5NV6nZ3lrpLsordszuL3bOyZrpnIj8jq9A9vbPQPS1rqrugc6p7SpbLnY/JiwGWAfYBRoscwMwBGImwKjnDrE7rEes31iBh1awHrMbY6P62/oYh0f2U3Fn9lKX91ve7tJ8xOvHlRIMzcUiaK7rvy30/6vt136A+zr5DhrpEgiXBnmCMl3NLmFEq57YrITuPdPgofa62BDXVFR2vRMfb4g35X8crFwijYlcUoVggRhPa7FbibS7jo0jhj2VCUS4TpY7CbpOYXaiZiuZqyhYtpUS+O4vLtJAtmnCXzfV0Kcol3i7FkFuqxRUWl1G8aetWkZRTqCWVeALGHTuScryFWof0Tqfue6QXqOJ1zGtpa3F4nBNFzJGYb2KM8fstL1sM0dFKdHRPtMEZjcFHR9miDPKtJ8rojBo+xhVttpkN8q3HbExwmpGRS3l2ZFGpKzrCFmFwZ0fMijA4I7JzXc6I9GGuf5vnLjlPOrKjdV6LA7bVof8i8iptMsQLJfhtaUUsfyCIhSz58xdVQ735LXjp3VD3f97k/0GJ8v9gjH/xIXYJXCKeyT2G8/G3zI1gAzgPdID1YB1oB2vBGrAarAIrwQqwHLSBVtACloEmsBQsAYtBI1gEFoIGUA8WgDpQC2pANagCPlAJ5oN5oAKUg7mgDHiBB5wL5gA3KAUlYDYoBkVgFpgJZoDpoBBMAwVgKpgCXCAf5IFckAMmAyfIBpPARDABjAfjwFiQBcaA0WAUyAQjwQgwHAwDGWAoSAdpwAHOAUPAYHA2SAUp4CyggkEgGdiBDQwESWAAsIL+oB9IBH1BAogHcaAPiAUxwAKiQRQwg0gQAcJBGDCBUBACgkHQ5B68G4EBKECIGgU55SQ4AX4Dv4Lj4F/gF/Az+An8CH4A34PvwLfgG/A1+AocA1+CL8Dn4DPwKfgn+Af4O/gE/A18DI6CI+Aj8CH4ALwP3gPvgnfA2+At8CZ4A7wOXgOHwavgFfAyOAReAi+CF8Dz4DnwLHgGPA2eAgfBk+AJ8Dg4APaDx8Cj4BHwMNgH9oJusAc8BB4Eu8EuEABdQAMPgPvBfeBe0AnuAXeDu8BOcCe4A9wObgO3glvADnAz2A5uAjeCG8D14DpwLbgGbANXg6vAleAKcDm4DFwKLgFbwcXgIuAHF4ItYDO4AGwSNZM7lPPhNoIN4DzQAdaDdaAdrAVrwGqwCqwEK8By0AZaQQtoBstAE1gKloDFoBEsAgtBA6gHC0AdqAU1oBpUAR+oBPPBPFABysFcUAa8wAPOBXOAG5SCEjAbFIFZYCaYDgrBNFAApoIpwAXyQR7IFTV/8dv0X3143r/6AP/i4xPyY9mpD2ZysInz5+E/fArdLsTJK8/4L6CKxELRIjrwc4HYKq4U+8V7okpshLtO7BB3iruFJh4Xz4m3zmj1vwxOrgpeLCKNe0SI6CNEz/GeYyfvBN3BUadlrkTUJ8j+e6bH0vPVH3Jfnbyyx3KyOyRWhOttzYbD6O175UTPcTxyQ4S5Z7SMDZvho/UjfRu6/eQDJ3eeMYEiUSzKxFxRLipEpfBh/jWiXjRgZRaJRrFYLNGjJShbAF+HaD5q4fai+99rLRVNYqloFq2iTSzHTxN8S28ky5bpcZtYgZ+VYpVYLdaItaK9932FnlmLktV6diVK1on12JnzxAbdsVJmozhfbMKubRZbxIXYsT+PLjxVyy8uEhdjny8Rl4o/81vPKLlMXCYuF1fgfLhKXC22iWtxXtwgbvxD9ho9f73YLm7GOSNbXI3MzbrbJq4Rj4inxYPifvGAeEhfy2qsLa0Ir0udvtJNWIO1mPPG00ZMq7ni1Gqtw2rIeft7570S67fhtBbLe9dRrt5G1JSr4+/dB9lLe2+GV+IyzIz87/OUayTncOkZ8+QW/1NWzliu041YL14ZuWbbkLv+37Kn1zjdbxM34Qq8Be9yVaW7FZ7czbo/Pb/9VN0detlt4nZxB/Zip5COlTJ3IrdT3IVr+x7RKe7Fz+/+dEel94v79J3TRJcIiF1iN3byIbFHdOv5/1T2AO4df2yzq7evwKle9op94mGcIY+JA7jTPIEfzjyK3P7e7EG9FsVPiCfFQb2WLH0C59YzuEM9L14QL4qXxVOIDunvzyJ6RRwWr4m3FDPcq+IzvJ8QrwR/IqLEZPzzfx9240YxDz//h6/g/iJe7Oj5pWdFzy/GqaJOKcUHyHuxS7vFxfhmYsnvh1ZsIjzoYxEndvf8ZCyHDj7xbnD9yVt7vnaWXbCptaV5WdPSJYsbFy1sqF9QV1tTNX9eRfncMq/HXVoyu7ho1swZ0wunFUyd4srPy82Z7MyeNHHC+HFjs8aMHpUxND1tcGrKWeogW2JcjCXaHBEeZgoNCQ4y4vN5Wr7qqrRrqZVaUKo6dWq6jFUfEr7TEpWaHSnXmXU0u2znQ9EZNZ2oWfeHmk6q6TxVU7HYJ4gJ6Wn2fNWuvZSn2ruVsmIP/NY81WvXjul+hu6DUvXAjCA5GS3s+Yn1eXZNqbTna67l9f78yrz0NKUrIjxXza0NT08TXeERsBFw2mC1qUsZPEnRjWFw/rgugzCZ5WE1Y0q+r0YrKvbk51mTk716TuTqfWkhuVqo3pe9QcOYxUX2rrQD/ou7LaKq0hFZo9b4yj2a0YdGfmO+379Zi3FoQ9Q8bcjqTxKxgLVampqXrzlUDKxw9qkDKFpwikW1+38UGLx67EuM+rSMrzcTkmL5UchCOcVTy6QpPvYCY8MIMb/kZDmWi7qdogqB1lHsodguqqwB4cxweDVDpSw5wCXxblnSwSWnmleqWNl8Nb+y93d5faLWUWVPT8PO6r8pWlAKyu2aMbWyqrpeqq/Wr+ZhhlhLUerRnHkwTl/vYuZ3DctAfV8lJtEgl6HYo2WoTVqcmkOrjQQ6SclvKPHoTSibr8XlaqKyureVlpGPtjhF8v1yY+QAZV9qsWevGNlzpCvTbt01UmQKrxyHlpCLTUnN93tq6jRbpbUG52ed3WNN1pxeLJ9X9dR65S6pFm3IERwOL2yg3gpz+0Ntroxpa6EpJrvHYDV65W4hYXfhTc2ZgAKLFkKh3NGcCXaPYhVcDUfprSHdGf0gMKbkTkVjKJrmTrUm4+TWX/9hSFaaAIahmU6NKQiDCP59THScPx0a1ZYDGmLPr807bYBndIpAH2Bvb//9OA1yLXoXA0Mwye2cKueQnmaAt6PYpBkwTz0ldzHRrokiu0etVb0qziFnkUdujlxrfX8LS1T59aq+271nSekZEZVnUZkmkgtLPRzIb540l0PfV7mtejxFj0+FU/9QXMDFuO+IIr+/pksYU+SpbO1SdBOce5FXm+XwqlqVQ02W40xP6zKJyOTSylxcvS7cOVWXT7Vb7C6/r7uno8rf5XT6m/Ir68fhuvCrBTV+tcQzAZur3wjaravlWGJFoVJYmoOuDCKnS1W2FHc5lS0lZZ69FiHsW0o9AQO+a67M8XadhTLPXrsQTj1rkFmZlFXsMpA9zUZg0utb9zqF6NBLg/SEHld3K0LPUSXkFFHdbaCcRa/XlaofyIn/d6K6O4hKnNxDEHImynVQ7cG9tU0osciSfQIPEnz5hzHTi74JdIYHO03OMGekwWzAksotCSCzD3XDFLErUjEr1i70iRkgjT9Jd4U5rXv1nii1T+lATZnrQO+91QxCVjutIxySJu6G9M7AXebZFSnQv/6OGjnyhVtIYj3OMTxo8u018vxb6633V3rl3UMk4FzFr6Ip6iShGdRJGHFIpBau1uZoEWqOzGfLfDblQ2Q+VM3RlAQFm92Nm66/UsWNGNeUB3/u8OL0t8jL25Bi7+7pKfUkv2Q95k3GNV8OyjxamAMPuuCUaag3RVKJ9BSto9onxyHcuJfJW09BtRcXO3eIKgVaGHoI6+0BNVx6G3m9oVE1zjWckHr7DgRah1fzOuRBPQ1yRHa7RRNT1XFaSCr1GZwqD5Th9ceqI+SVi6paeMpmKWEYmyjxUMaKEAfDE0XOKDQSI69WUVRdaceq4xwpwbVMD4tweR4iU4t7flBqrU64tbdQyGkZUyLM4VrYUHSIX+kjhqJD/IZ6sShy8nq0ubcCjm3RIjCi1NOWsrcBVgdFBXIs+N2Mwcuqj8tuirvFbHUl7v1y0PqhQlGsmVMKfHi6UfsIZNQsboy+TCkyJfs4SNlQOfNIrDtuCd09O9VV8hbHr/Q0VT795PknrHtxoQqv/48Jba4jPc30x6xZT/v9JvN/34DWy2Q+pbIXTKRaPtag8oTTzzd7vnzAqtO6DDNRA6ro6p+m4qFmSJHgg44Rl0+yvcYra2HIRfq9TP2zSujiVCX5mNY791vGy08lMkK5HiHAr19bcGZYfyp0odiFD4MpQ4H+m4qNkff9hVatEWcmivUqckfsfrtFHafKN0zViKsBVGKfTl0WOP1x1smLpqPa7qnCyY7lcVX6XX4cxF7tQzN5DvYeSVviOKNLXBcKrkMsiFwFraPIXum1V+KjqVLsSU624mqE2ut8mlP1yUdBEY6P3yI8kiA+vzzFhRcHtWqheDDV+WrVZDxwkPPq66rvD45Ol42w+v2qX9NvBC5URvepuOwKpOC3yaH6auVHaBzP7qvV27owXH115Pis+Squ5VqMVq475oX/+0tUybdqv4reKiodWIkYf6zfPtaPW3AFnh5BqdVzKvGokk8ku77VPisirGuBjLzoiCqGpciKdAnI0Sx2dFWEpvyekdeittRBlU16rxjZbI9WxI3060nWWubQDH2zUIiRasps3Nmw/vI+hcULTinA8jpx6llla7tmwOOVtkdvXyCb4tZAG0bNkNEfIvolhockP234OVRuxZr+aV4ERQmBr+uF8Q18owOLH/mKxHdAKBHJeEIYenP7xX7lcvwVWJxsMR7GN0hGESrGihliprhG2+TwPILnx2yRIMYpDz4Yn5dnSg99TMlFYzu+HzbhT8e5zuggg3lP//7Z6p5RIVuNMQXdSvru7NCt+MtH9okPTxzKOPHhsdixGceUjA+OfnjU8u2hmLEZI4++fnQ4/hIe19+8pxFNR6l7GkcZQ7Y2GmOyZXtnWGO20xC6tRGdJGY7+h9yHMpwHHKgG8ew4V4lJjlGJy7KEBoaF6IOGmoYdXbq6JEjR0wyjMpMVQdFGfRc5ugxk4wjRww0GFGTMpMMMlaMh38rM846EWJYp2bPGRk8sH90nDkk2DAgMTZ9QoqlZG7KhKFJocbQEGOwKXTwmJxBhY35g94NjUmKT0iKNZlikxLik2JCT7wXHHX8u+CoX3ODGn+9yhgyvjz7LOO14SZDUEhI98DEfueMTy6YE93HEhTRxxKTYAqNjYkcnFd+4oL4AbKPAfHx1NeJGVjO8p5jxmzj82Ikbp4/yXV32qNzbDkZOcaIsL6ZkZHKjEyLGW+JEdJFW5Tpmd3Kz84ocfbZ0UKJFJZoZYYY193zDT5QzIB+ugu1dUUDqbtlm3HdBpMzLqbvUyLTkmkYfyBTEZlKZubQyed0K1Zn9CuDlEGDgpI+Hzpt4vuRM4JERvaxbLl3Fcdi5PuyeRXYxaPyu9SDjnkVYzMsuh8xdviweRVWpzmir5LZ96lG2d8gvcOERjFISQhCn0OTPm8cOi1y4vuNst/EjGxHttxN/OPdIbt2VGBbU+JCsJWpqaNGScWWZmKzRo7KHIqtO7V9QXL74kNlJj4uYeSI0WOM2ZYB1v62qPGXF09pKU6f1HpXw9qE4TPHTvQVDI80RYYFhVpz5tRl+raUpt6+Na8mx+Ytmrx0YmJkZEhIZGRZtivFVTd5etO0FFdm0ShrkppksvSL7pfUX03qk+ZeV3qwb3r2EFdJTp5+/Sgitveq0a+jyfKV68j1NTZUNTf8F047UUYKZW5kc3RyZWFtCmVuZG9iagoxMyAwIG9iago8PCAvVGl0bGUgKP7/XDAwME1cMDAwaVwwMDBjXDAwMHJcMDAwb1wwMDBzXDAwMG9cMDAwZlwwMDB0XDAwMCBcMDAwV1wwMDBvXDAwMHJcMDAwZFwwMDAgXDAwMC1cMDAwIGWHTvZcMDAwMSkKL1Byb2R1Y2VyICj+/1wwMDBtXDAwMGFcMDAwY1wwMDBPXDAwMFNcMDAwIHJIZyxcMDAwMVwwMDAzXDAwMC5cMDAwMP9cMDEwckiGX1wwMDAyXDAwMDJcMDAwQVwwMDAzXDAwMDhcMDAwMP9cMDExXDAwMCBcMDAwUVwwMDB1XDAwMGFcMDAwclwwMDB0XDAwMHpcMDAwIFwwMDBQXDAwMERcMDAwRlwwMDBDXDAwMG9cMDAwblwwMDB0XDAwMGVcMDAweFwwMDB0KQovQ3JlYXRvciAoV29yZCkgL0NyZWF0aW9uRGF0ZSAoRDoyMDIyMTIwMzE2NDAwN1owMCcwMCcpIC9Nb2REYXRlIChEOjIwMjIxMjAzMTY0MDA3WjAwJzAwJykKPj4KZW5kb2JqCnhyZWYKMCAxNAowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAyMDQgMDAwMDAgbiAKMDAwMDAwMzE1MiAwMDAwMCBuIAowMDAwMDAwMDIyIDAwMDAwIG4gCjAwMDAwMDAzMDggMDAwMDAgbiAKMDAwMDAwMzExNyAwMDAwMCBuIAowMDAwMDAwMDAwIDAwMDAwIG4gCjAwMDAwMDMyODQgMDAwMDAgbiAKMDAwMDAwMDQwNSAwMDAwMCBuIAowMDAwMDAzMjM1IDAwMDAwIG4gCjAwMDAwMDM3NTcgMDAwMDAgbiAKMDAwMDAwMzQ1MCAwMDAwMCBuIAowMDAwMDAzOTkzIDAwMDAwIG4gCjAwMDAwMTExODkgMDAwMDAgbiAKdHJhaWxlcgo8PCAvU2l6ZSAxNCAvUm9vdCA5IDAgUiAvSW5mbyAxMyAwIFIgL0lEIFsgPDkwYjViN2M4MzQyODRlNGVhZjMwZGRhMzBiOGQ3MWExPgo8OTBiNWI3YzgzNDI4NGU0ZWFmMzBkZGEzMGI4ZDcxYTE+IF0gPj4Kc3RhcnR4cmVmCjExNjExCiUlRU9GCg=='
		},
	}
);

const load = computed(() => {
	if (isLoading.value) {
		return true;
	}
	return false;
});

const toast = useToast();
function saveScore() {
	const today = new Date();
	if (
		inputScore_1.value > 100 ||
		inputScore_2.value > 100 ||
		inputScore_3.value > 100
	) {
		toast.add({
			severity: "error",
			summary: "成績請輸入0~100",
			life: 3000,
		});
		return;
	}
	if (
		inputScore_1.value < 0 ||
		inputScore_2.value < 0 ||
		inputScore_3.value < 0
	) {
		toast.add({
			severity: "error",
			summary: "成績請輸入0~100",
			life: 3000,
		});
		return;
	}
	if (accessChecked.value && !accessReason.value) {
		toast.add({ severity: "error", summary: "請輸入理由", life: 3000 });
		return;
	}
	try {
		newApplicantGrade.mutate({
			docs_grade_1: inputScore_1.value,
			docs_grade_2: inputScore_2.value,
			docs_grade_3: inputScore_3.value,
			docs_grade_4: inputScore_4.value,
			docs_grade_5: inputScore_5.value,
			isImmediateEnroll: accessChecked.value,
			immediate_enroll_comment: accessReason.value,
		});
	} catch (error) {
		// console.log(error);
	}
}
</script>
