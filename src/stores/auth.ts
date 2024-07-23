import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Admin {
	id?: string
	oneId: string
	password: string
  [key: string]: any
}

export const useAuth = defineStore('auth-store', () => {
	const admin = ref<Admin>()

	async function auth() {
		try {
			
		} catch (error) {

		}
	}
})
