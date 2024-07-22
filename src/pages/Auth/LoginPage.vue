<script setup lang="ts">
import { ref } from 'vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { CircleHelp } from 'lucide-vue-next'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
const user = ref<{
	oneId: string
	password: string
	emergencyPassword?: string
}>({
	oneId: '',
	password: '',
	emergencyPassword: '',
})
</script>

<template>
	<div
		class="auth-main-page container mx-auto sm:px-4 px-3 flex flex-col items-center justify-evenly h-screen"
	>
		<h1 class="text-2xl font-bold">Admin panel</h1>
		<form class="w-full">
			<div class="form-group mb-6">
				<Label class="mb-2" for="oneId">One Id</Label>
				<Input
					autocomplete="off"
					id="oneId"
					name="oneId"
					type="text"
					v-model:model-value="user.oneId"
					required
				/>
			</div>
			<div class="form-group mb-6">
				<Label class="mb-2" for="password">Parol</Label>
				<Input
					autocomplete="off"
					id="password"
					name="password"
					type="password"
					v-model:model-value="user.password"
					required
				/>
			</div>
			<div class="form-group mb-6">
				<div class="group flex items-center mb-2">
					<Label class="flex items-center" for="emergencyPassword">Favqulodda parol</Label>
					<TooltipProvider :delayDuration="100">
						<Tooltip>
							<TooltipTrigger>
								<CircleHelp class="ml-2 w-4 h-4" />
							</TooltipTrigger>
							<TooltipContent>
								<p>Super admin uchun</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
				<Input
					autocomplete="off"
					id="emergencyPassword"
					name="emergencyPassword"
					type="password"
					v-model:model-value="user.emergencyPassword"
					required
				/>
			</div>
			<div class="btns space-x-4 mt-6">
				<Button variant="outline" type="button">Tozalash</Button>
				<Button type="submit">Kirish</Button>
			</div>
		</form>
		<footer class="text-sm font-bold">@ telegram_bot</footer>
	</div>
</template>
