<template>
	<!-- Title -->
	<div mx="8" space="y-2">
		<div text="lg secondary">
			<slot name="Subtitle" />
		</div>
		<div text="4xl title" font="medium">
			<slot name="Chinese" />
		</div>
		<div text="2xl title" font="medium">
			<slot name="English" />
		</div>
	</div>
	<!-- Divider -->
	<div mx="12">
		<Divider align="center">
			<div p="x-4 y-6" text="secondary">
				<slot name="Divider" />
			</div>
		</Divider>
	</div>
</template>
