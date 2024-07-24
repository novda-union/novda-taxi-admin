import { defineStore } from 'pinia'
import { ref } from 'vue'
import { defaultInstance } from '@/http'
import Cookies from 'js-cookie'
import { useNotification } from '@/composables/useNotification'

interface Admin {
	id?: string
	oneId: string
	password: string
	[key: string]: any
}

export const useAuth = defineStore('auth-store', () => {
	const { notify } = useNotification()

	const admin = ref<Admin>({
		id: '',
		oneId: '',
		password: '',
	})

	async function auth() {
		try {
			const response = await defaultInstance.post('/auth', { ...admin.value })
		} catch (error) {}
	}

	return { admin, auth }
})
