<script setup lang="ts">
import Button from '../ui/button/Button.vue'
import { Diamond } from 'lucide-vue-next'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps<{ link: { name: string; path: string } }>()

const isPageEqual = computed(() => {
	return props.link.path === router.currentRoute.value.path
})
</script>

<template>
	<Button
		@click="router.push(link.path)"
		variant="ghost"
		:class="{ 'bg-accent': isPageEqual }"
		class="flex items-center justify-start font-medium transition-all w-[90%] truncate"
		><Diamond class="w-4 h-4 mr-2 flex-shrink-0" />
		<span class="truncate">{{ link.name }}</span></Button
	>
</template>
