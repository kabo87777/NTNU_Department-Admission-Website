<template>
	<div class="flex relative mt-40px">
		<div class="smallRedDivider"></div>
		<div class="container">
			<div class="smallContainer">
				<div class="cube"></div>
				<div class="dash"></div>
				<div class="cube"></div>
				<div class="dash"></div>
				<div class="cube"></div>
				<div class="dash"></div>
				<div class="cube"></div>
				<div class="dash"></div>
				<div class="cube"></div>
				<div class="dash"></div>
				<div class="cube"></div>
				<div class="dash"></div>
				<div class="cube"></div>
				<div class="dash"></div>
				<div class="cube"></div>
				<div class="dash"></div>
			</div>
		</div>
		<div class="smallRedDivider absolute right-0"></div>
	</div>
</template>

<style setup lang="css">
.container {
	display: flex;
	width: 10%;

	.smallContainer {
		margin: auto;
		display: flex;

		.cube {
			background-color: #874b52;
			height: 8px;
			width: 4px;
			margin-top: -4px;
		}

		.dash {
			background-color: #874b52;
			height: 2px;
			width: 4px;
			margin-top: -1px;
		}
	}
}
</style>
