<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { Toaster } from 'vue-sonner'
import { toast } from 'vue-sonner'
import Silent from '@/assets/silent.mp3'

const audioButton = ref<HTMLButtonElement | null>(null)
const hasAudioPermission = ref(false)

const getAudioPermission = async () => {
	// Play a silent audio to get the audio permission
	const silentAudio = new Audio(Silent)
	try {
		await silentAudio.play()
		silentAudio.pause()
		// Now you have audio permission
		hasAudioPermission.value = true
	} catch (error: any) {
		toast(error.message || error)
		console.error('Audio playback failed:', error)
	}
}

</script>

<template>
	<div class="sub-app">
		<button ref="audioButton" @click="getAudioPermission" style="display: none">Initialize</button>
		<Toaster class="my-toast" position="bottom-right" />
		<RouterView></RouterView>
	</div>
</template>

<style scoped></style>
