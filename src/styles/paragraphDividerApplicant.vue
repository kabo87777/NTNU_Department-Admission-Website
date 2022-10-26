<template>
	<div class="flex relative">
		<div class="smallYellowDivider"></div>
		<div class="container">
			<div class="smallContainer">
				<div class="yellowCube"></div>
				<div class="yellowDash"></div>
				<div class="yellowCube"></div>
				<div class="yellowDash"></div>
				<div class="yellowCube"></div>
				<div class="yellowDash"></div>
				<div class="yellowCube"></div>
				<div class="yellowDash"></div>
				<div class="yellowCube"></div>
				<div class="yellowDash"></div>
				<div class="yellowCube"></div>
				<div class="yellowDash"></div>
				<div class="yellowCube"></div>
				<div class="yellowDash"></div>
				<div class="yellowCube"></div>
				<div class="yellowDash"></div>
			</div>
		</div>
		<div class="smallYellowDivider absolute right-0"></div>
	</div>
</template>

<style setup lang="css">
.container {
	display: flex;
	width: 10%;
}

.smallContainer {
	margin: auto;
	display: flex;
}

.yellowCube {
	background-color: #736028;
	height: 8px;
	width: 4px;
	margin-top: -4px;
}

.yellowDash {
	background-color: #736028;
	height: 2px;
	width: 4px;
	margin-top: -1px;
}
</style>
