<template>
	<div class="pdf-preview !h-1670px">
		<div class="pdf-wrap !h-1590px">
			<vue-pdf-embed
				:source="state.source"
				:height="state.height"
				class="!ml-280px"
			/>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import VuePdfEmbed from "vue-pdf-embed";

const props = defineProps({
	pdfUrl: {
		type: String,
		required: true,
	},
});

const state = {
	source: props.pdfUrl,
	pageNum: 1,
	scale: 2.5,
	numPages: 0,
	height: 1000,
};

function lastPage() {
	if (state.pageNum > 1) {
		state.pageNum -= 1;
	}
}
function nextPage() {
	if (state.pageNum < state.numPages) {
		state.pageNum += 1;
	}
}
function pageZoomOut() {
	if (state.scale < 2) {
		state.scale += 0.1;
	}
}
function pageZoomIn() {
	if (state.scale > 1) {
		state.scale -= 0.1;
	}
}

// TODO: finished here while add API

onMounted(async () => {
	interface loadingTaskResponse {
		numPages: number;
	}

	// try {
	//     const pdf: Promise<loadingTaskResponse> = await createLoadingTask(state.source);
	//     state.numPages = pdf.numpages
	// } catch (e: any) { // handle errors... }
});
</script>
<style lang="css" scoped>
.pdf-preview {
	position: relative;
	height: 100vh;
	padding: 20px 0;
	box-sizing: border-box;
	background: rgb(66, 66, 66);
}

.vue-pdf-embed {
	text-align: center;
	width: 515px;
	border: 1px solid #e5e5e5;
	margin: 0 auto;
	box-sizing: border-box;
}
.pdf-wrap {
	overflow-y: auto;
}

.page-tool {
	position: absolute;
	/* bottom: 35px; */
	padding-left: 15px;
	padding-right: 15px;
	display: flex;
	align-items: center;
	background: rgb(136, 136, 136);
	color: white;
	border-radius: 19px;
	z-index: 10;
	cursor: pointer;
	margin-left: 650px;
	transform: translateX(-50%);
}
.page-tool-item {
	padding: 8px 15px;
	padding-left: 10px;
	cursor: pointer;
}
</style>
