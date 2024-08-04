<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { Toaster } from 'vue-sonner'
import { toast } from 'vue-sonner'
import Silent from '@/assets/silent.mp3'

const audioButton = ref<HTMLButtonElement | null>(null)

const getAudioPermission = async () => {
	const silentAudio = new Audio(Silent)
	try {
		await silentAudio.play()
		silentAudio.pause()
	} catch (error: any) {
		toast(error.message || error)
		console.error('Audio playback failed:', error)
	}
}
</script>

<template>
	<div class="sub-app overflow-y-hidden">
		<button ref="audioButton" @click="getAudioPermission" style="display: none">Initialize</button>
		<Toaster class="my-toast" position="bottom-right" />
		<RouterView></RouterView>
	</div>
</template>

<style scoped></style>
