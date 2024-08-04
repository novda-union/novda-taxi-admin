<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useAuth } from '@/stores/auth'
import { ChevronsRight, LayoutDashboard } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import Sidebar from '@/components/Sidebar.vue'

const authStore = useAuth()

const sidebarVisible = ref(true)

onMounted(async () => {
	await authStore.check()
})
</script>

<template>
	<div class="default-layout flex overflow-y-hidden max-h-screen">
		<nav class="navbar border-b py-2 fixed w-full top-0 bg-white">
			<div class="container">
				<div class="open-sidebar flex items-center">
					<p class="text-lg font-bold ml-2">Dashboard</p>
				</div>
			</div>
		</nav>
		<Sidebar />
		<main class="main-content overflow-y-scroll w-full py-[64px]">
			<RouterView></RouterView>
		</main>
	</div>
</template>
