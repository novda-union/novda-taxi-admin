<script setup lang="ts">
import { useMaps } from '@/stores/maps'
import { onMounted } from 'vue'

const mapsStore = useMaps()

onMounted(async () => {
	await mapsStore.loadMap('map')
})
</script>

<template>
	<div class="default-home-page h-screen px-4 text-4xl">
		<h1 class="text-2xl font-bold pb-6">Xarita</h1>
		<div id="map" class="map h-[90vh] w-full z-[49]"></div>
	</div>
</template>

<style scoped>
#map {
	border-radius: 20px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>