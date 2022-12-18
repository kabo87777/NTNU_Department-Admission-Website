<template>
	<div flex="~ col gap-8" w="5/6" mx="auto">
		<div flex="~ col gap-6">
			<!-- Regist Successful -->
			<div flex="~ col" text="secondary xl" class="items-center py-10">
				<i class="pi pi-send" m="b-4 r-2" style="font-size: 4rem" />
				<div>電郵已寄出</div>
				<div>E-mail Sent</div>
			</div>
		</div>
		<div flex="~ col gap-4">
			<!-- Remind Message -->
			<div
				class="flex flex-col p-6 gap-1 justify-center space-y-1"
				text="sm info"
				bg="info-50"
				border="rounded-xl"
			>
				<div>請至郵箱點擊連結並重新設定密碼</div>
				<div>Please Check your E-mail, then reset your password.</div>
			</div>
		</div>
	</div>
</template>
