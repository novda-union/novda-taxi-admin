<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { CircleHelp } from 'lucide-vue-next'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import NovdaAdmin from '@/assets/novda-admin.svg'
import { defaultInstance } from '@/http'
import { toast } from 'vue-sonner'
const user = ref<{
	oneId: string
	password: string
	emergencyPassword?: string
}>({
	oneId: '',
	password: '',
	emergencyPassword: '',
})
const adminExists = ref<boolean | null>()
const showPass = ref<boolean>(false)
async function checkForAdmins() {
	try {
		const response = await defaultInstance.get('/check-admins')

		if (!response) {
			toast.error("Server yoki internet bilan aloqa yo'q")
			return
		}

		if (!response.data.count) {
			adminExists.value = false
		} else {
			adminExists.value = true
		}

		return
	} catch (error: any) {
		console.log(error)
		toast(error.message || error.response.data.msg || 'Server yoki internetda xatolik')
	}
}
onMounted(async () => {
	await checkForAdmins()
})
</script>

<template>
	<div
		class="auth-main-page container mx-auto sm:px-4 px-3 flex flex-col items-center justify-evenly h-screen"
	>
		<h1 class="font-bold w-20 sm:w-40">
			<img class="w-full h-full" :src="NovdaAdmin" alt="novda admin logo" />
		</h1>
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
					:type="showPass ? 'text' : 'password'"
					v-model:model-value="user.password"
					required
				/>
			</div>
			<div class="form-group mb-6">
				<div class="group flex items-center mb-2">
					<Label class="flex items-center" for="emergencyPassword">Favqulodda parol</Label>
					<TooltipProvider :delayDuration="100">
						<Tooltip>
							<TooltipTrigger type="button">
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
				/>
			</div>
			<div class="form-group flex items-center mb-6">
				<Checkbox id="showPass" v-model:checked="showPass" />
				<Label class="ml-2 cursor-pointer" for="showPass">Parolni ko'rsatish</Label>
			</div>
			<div class="btns space-x-4 mt-6">
				<Button variant="outline" type="reset">Tozalash</Button>
				<Button v-if="adminExists" type="submit">Kirish</Button>
				<Button v-else-if="adminExists === false" type="submit">Ro'yxatdan o'tish</Button>
			</div>
		</form>
		<footer class="text-sm font-bold">@ telegram_bot</footer>
	</div>
</template>
