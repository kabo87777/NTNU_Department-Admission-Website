<template>
	<div class="pdf-preview !h-670px">
		<div class="pdf-wrap !h-590px">
			<vue-pdf-embed
				:source="state.source"
				class="vue-pdf-embed"
				:page="state.pageNum"
			/>
		</div>
		<div class="page-tool mt-10px">
			<div class="page-tool-item" @click="lastPage">上一頁</div>
			<div class="page-tool-item" @click="nextPage">下一頁</div>
			<div class="page-tool-item">
				{{ state.pageNum }}/{{ state.numPages }}
			</div>
			<div class="page-tool-item" @click="pageZoomOut">放大</div>
			<div class="page-tool-item" @click="pageZoomIn">缩小</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { reactive, onMounted, } from "vue";
import VuePdfEmbed from "vue-pdf-embed";
import { createLoadingTask } from "vue3-pdfjs";

const props = defineProps({
	pdfUrl: {
		type: String,
		required: true,
	},
});

const state = reactive({
	source: props.pdfUrl,
	pageNum: 1,
	scale: 1.9,
	numPages: 0,
});

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

onMounted(() => {
	const loadingTask = createLoadingTask(state.source);
	loadingTask.promise.then((pdf: { numPages: number }) => {
		state.numPages = pdf.numPages;
	});
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
	z-index: 100;
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
