import { defineStore } from 'pinia'
import { ref } from 'vue'
import { defaultInstance } from '@/http'

export const useDriversStore = defineStore('drivers-store', () => {
	const drivers = ref<any>([])
	const driversCount = ref<number>(0)
	const loading = ref(false)
	const error = ref<any>(null)

	async function fetchDrivers() {
		loading.value = true
		error.value = null
		try {
			const response = await defaultInstance.get('/drivers/all')

			if (response.data.status === 'bad') {
				error.value = response.data
				return
			}

			response.data.drivers.forEach((driver: any) => {
				drivers.value.push(driver)
			})

			driversCount.value = response.data.count
		} catch (err: any) {
			error.value = err
		} finally {
			loading.value = false
		}
	}

	return {
		drivers,
		loading,
		error,
		driversCount,
		fetchDrivers,
	}
})
