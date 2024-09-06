<script setup lang="ts">
import { ref } from 'vue'
import { useDriversStore } from '@/stores/drivers'
import { storeToRefs } from 'pinia'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-vue-next'

const driversStore = useDriversStore()
const { drivers } = storeToRefs(driversStore)

const searchQuery = ref('')
</script>

<template>
	<div class="driver-search-page sm:px-4 px-2">
		<div class="search-bar mb-4 flex items-center bg-white flex-col">
			<SearchIcon class="mt-4 h-20 w-20" />
			<h2 class="text-lg font-semibold mb-9 mt-4">Haydovchilarni izlash</h2>
			<Input
				v-model:model-value="searchQuery"
				placeholder="Ism, mashina rusumi, raqami, idsi..."
				class="p-2 w-full"
			/>
		</div>
	</div>
</template>
