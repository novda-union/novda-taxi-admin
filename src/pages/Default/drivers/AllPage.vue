<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { useDriversStore } from '@/stores/drivers'
import { Eye, EyeOff } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'

const driversStore = useDriversStore()
const { drivers, error, driversCount } = storeToRefs(driversStore)

onMounted(async () => {
	try {
		await driversStore.fetchDrivers()
	} catch (err) {
		console.error('Failed to fetch drivers:', err)
	}
})

const columns = [
	{ key: 'oneId', label: 'One ID', width: '120px' },
	{ key: 'fullname', label: 'Full Name', width: '200px' },
	{ key: 'phone', label: 'Phone', width: '150px' },
	{ key: 'status', label: 'Status', width: '120px' },
	{ key: 'type', label: 'Type', width: '100px' },
	{ key: 'lastOnline', label: 'Last Online', width: '180px' },
	{ key: 'createdAt', label: 'Created At', width: '180px' },
	{ key: 'account', label: 'Account', width: '120px' },
	{ key: 'rating', label: 'Rating', width: '100px' },
	{ key: 'car', label: 'Car', width: '200px' },
]

const passwordVisibility = ref<Record<string, boolean>>({})

const togglePasswordVisibility = (driverId: string) => {
	passwordVisibility.value[driverId] = !passwordVisibility.value[driverId]
}

const formatDriverData = (driver: any, key: string) => {
	switch (key) {
		case 'phone':
			return driver.phone[0] || 'N/A'
		case 'lastOnline':
		case 'createdAt':
			return new Date(driver[key]).toLocaleString('en-US', {
				dateStyle: 'short',
				timeStyle: 'short',
			})
		case 'rating':
			return driver.rating.length > 0
				? (driver.rating.reduce((a: number, b: number) => a + b) / driver.rating.length).toFixed(2)
				: 'N/A'
		case 'car':
			return driver.car ? `${driver.car.name} (${driver.car.number})` : 'N/A'
		case 'account':
			let formattedCurrency = new Intl.NumberFormat('uz-UZ', {
				style: 'currency',
				currency: 'UZS',
				compactDisplay: 'short',
				minimumFractionDigits: 0,
				maximumFractionDigits: 0,
			}).format(driver[key])
			return formattedCurrency // Adjusted formatting
		default:
			return driver[key] || 'N/A'
	}
}

const getStatusVariant = (status: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
	switch (status.toUpperCase()) {
		case 'ONLINE':
		case 'APPROVED':
			return 'secondary'
		case 'GOINGTOCLIENT':
		case 'WAITING':
		case 'ONTHEWAY':
			return 'secondary'
		case 'BANNED':
		case 'LIMITED':
			return 'destructive'
		case 'OFFLINE':
		case 'IGNORED':
			return 'outline'
		default:
			return 'default'
	}
}

const formattedDrivers = computed(() => {
	return drivers.value.map((driver: any) => {
		const formattedDriver: Record<string, any> = {}
		columns.forEach(column => {
			formattedDriver[column.key] = formatDriverData(driver, column.key)
		})
		return formattedDriver
	})
})
</script>

<template>
	<div class="drivers-all-page p-4">
		<h1 class="text-2xl font-bold mb-4">Drivers</h1>

		<!-- Handle Errors -->
		<p v-if="error">{{ error }}</p>

		<div v-if="drivers.length" class="overflow-auto max-h-[calc(100vh-200px)] border rounded-md">
			<Table class="min-w-[1200px]">
				<TableHeader>
					<TableRow>
						<TableHead
							class="font-bold sticky top-0 bg-background z-10 whitespace-nowrap"
							v-for="column in columns"
							:key="column.key"
							:style="{ width: column.width }"
						>
							{{ column.label }}
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow v-for="driver in formattedDrivers" :key="driver.oneId">
						<TableCell
							v-for="column in columns"
							:key="column.key"
							:style="{ width: column.width }"
							class="whitespace-nowrap"
						>
							<template v-if="column.key === 'status'">
								<Badge :variant="getStatusVariant(driver[column.key])">
									{{ driver[column.key] }}
								</Badge>
							</template>

							<!-- Rating with Color Highlight -->
							<template v-else-if="column.key === 'rating'">
								<span
									:class="{
										'text-green-500': parseFloat(driver[column.key]) >= 4.5,
										'text-yellow-500':
											parseFloat(driver[column.key]) >= 3.5 && parseFloat(driver[column.key]) < 4.5,
										'text-red-500': parseFloat(driver[column.key]) < 3.5,
									}"
								>
									{{ driver[column.key] }}
								</span>
							</template>
							<template v-else-if="column.key === 'car'">
								<RouterLink :to="`/cars/${driver[column.key].oneId}`"
									>{{ driver[column.key].name }} ({{ driver[column.key].number }})</RouterLink
								>
							</template>

							<!-- Default Rendering -->
							<template v-else>
								{{ driver[column.key] }}
							</template>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>

		<p v-if="drivers.length" class="text-gray-600 text-right my-6">
			Jami <b>{{ driversCount }}</b>
		</p>

		<!-- Empty State -->
		<h1 v-else class="text-2xl text-center font-bold my-32">No drivers found!</h1>
	</div>
</template>

<style scoped>
.drivers-all-page {
	height: 100%;
}

.overflow-auto {
	overflow-x: auto;
	overflow-y: auto;
}

/* Ensure that the table takes up the full width of its container */
.drivers-all-page :deep(table) {
	width: 100%;
}

/* Add some padding to the last cell to ensure it's not cut off */
.drivers-all-page :deep(td:last-child),
.drivers-all-page :deep(th:last-child) {
	padding-right: 1rem;
}
</style>
