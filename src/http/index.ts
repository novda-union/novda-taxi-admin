import axios from 'axios'
import Cookie from 'js-cookie'
import { config } from '@/config'
import { ref } from 'vue'
import { useLoading } from '@/stores/loading'
import { toast } from 'vue-sonner'

const token = ref('')

const getToken = async () => {
	const value = Cookie.get('authToken')
	token.value = value as string
}

export const defaultInstance = axios.create({
	baseURL: config.API_URL + '/admin',
})

// Add a request interceptor to set the Authorization header
defaultInstance.interceptors.request.use(
	async function (config) {
		// Ensure token is fetched before making the request
		if (!token.value) {
			await getToken()
		}
		if (token.value) {
			config.headers.Authorization = `Bearer ${token.value}`
		}

		// Set loading state
		const loadingStore = useLoading()
		await loadingStore.setLoading(true)
		return config
	},
	async function (error) {
		// Handle request error
		const loadingStore = useLoading()
		await loadingStore.setLoading(false)
		return Promise.reject(error)
	}
)

// Add a response interceptor to manage loading state
defaultInstance.interceptors.response.use(
	async function (response) {
		// Handle response success
		const loadingStore = useLoading()
		await loadingStore.setLoading(false)

		if (!response) {
			toast.error('Internet yoki server bilan aloqa mavjud emas!')
		}
		return response
	},
	async function (error) {
		// Handle response error
		const loadingStore = useLoading()
		await loadingStore.setLoading(false)
		return Promise.reject(error)
	}
)
