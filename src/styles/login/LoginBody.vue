<template>
	<div flex="~ col gap-16" w="3/4" mx="auto">
		<div flex="~ col gap-6"><slot name="Content" /></div>
		<div flex="~ col gap-4"><slot name="Footer" /></div>
	</div>
</template>
