<template>
	<div flex="~ col gap-8" w="5/6" mx="auto">
		<div flex="~ col gap-6">
			<!-- Register Successful -->
			<div flex="~ col" text="secondary xl" class="items-center py-10">
				<i class="pi pi-send" m="b-4 r-2" style="font-size: 4rem" />
				<div>已寄出一封確認信，請檢查您的電子信箱。</div>
				<div>Please check your Email for confirmation.</div>
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
				<div>請至電子信箱點擊連結並重新設定密碼</div>
				<div>
					Please check your mailbox and follow the link to reset your
					password.
				</div>
			</div>
		</div>
	</div>
</template>
