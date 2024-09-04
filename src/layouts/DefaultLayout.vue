<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useAuth } from '@/stores/auth'
import Sidebar from '@/components/Sidebar/Sidebar.vue'

const authStore = useAuth()

onMounted(async () => {
	await authStore.check()
})
</script>

<template>
	<div class="default-layout flex overflow-y-hidden max-h-screen">
		<Sidebar class="z-50" />
		<main class="main-content overflow-y-scroll w-full py-[20px]">
			<RouterView></RouterView>
		</main>
	</div>
</template>
