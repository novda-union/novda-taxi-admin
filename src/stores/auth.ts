import { defineStore } from 'pinia'
import { ref } from 'vue'
import { defaultInstance } from '@/http'
import Cookies from 'js-cookie'
import { useNotification } from '@/composables/useNotification'
import { useRouter } from 'vue-router'
import { AxiosError, isAxiosError } from 'axios'

interface Admin {
	id?: string
	oneId: string
	password: string
	[key: string]: any
}

export const useAuth = defineStore('auth-store', () => {
	const { notify } = useNotification()
	const router = useRouter()

	const admin = ref<Admin>({
		id: '',
		oneId: '',
		password: '',
	})

	async function auth() {
		try {
			const response = await defaultInstance.post('/auth', {
				...admin.value,
				oneId: admin.value.oneId.toUpperCase(),
			})

			if (!response) {
				await notify({
					message: 'Server yoki internet bilan aloqa mavjud emas!',
					typeToast: 'error',
				})
				return
			}
			if (response.data) {
				if (response.data.status === 'bad') {
					await notify({ message: response.data.msg, typeToast: 'warning' })
				}
				if (response.data.status === 'ok') {
					Cookies.set('authToken', response.data.token)
					Cookies.set('admin', JSON.stringify(response.data.admin))
					admin.value = response.data.admin
					await notify({ message: response.data.msg, typeToast: 'success' })
					await router.push('/')
					return
				}

				if (response.data.status === 'super-ok') {
					Cookies.set('authToken', response.data.token)
					Cookies.set('admin', JSON.stringify(response.data.admin))
					Cookies.set('isSuper', 'true')
					admin.value = response.data.admin
					await notify({ message: response.data.msg, typeToast: 'success' })
					await router.push('/')
					return
				}
			}
		} catch (error: Error | AxiosError | any) {
			if (isAxiosError(error)) {
				if (error.code === 'ERR_NETWORK') {
					await notify({
						typeToast: 'error',
						message: 'Server yoki internet bilan aloqa mavjud emas!',
					})
					return
				}

				await notify({
					typeToast: 'error',
					message: error.message,
				})
				return
			}

			await notify({
				typeToast: 'error',
				message:
					error.message ||
					error.response.data.msg ||
					'Server yoki internetda xatolik yuzaga keldi!',
			})
		}
	}

	async function check() {
		const admin = JSON.parse(Cookies.get('admin') as string)
		try {
			const response = await defaultInstance.get(`/check/${admin.oneId}`)

			if (!response) {
				await notify({
					message: 'Internet yoki server bilan aloqa mavjud emas',
					typeToast: 'error',
				})
				return
			}

			if (response.data.status === 'bad') {
				Cookies.remove('authToken')
				Cookies.remove('admin')
				Cookies.remove('isSuper')
				await router.push('/auth')
				await notify({ message: response.data.msg, typeToast: 'error' })
				return
			}

			if (response.data.status === 'ok') {
				Cookies.set('authToken', response.data.token)
				Cookies.set('admin', JSON.stringify(response.data.admin))

				return
			}
		} catch (error) {
			console.log(error)
		}
	}

	return { admin, auth, check }
})
