<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Toaster } from 'vue-sonner'
</script>

<template>
	<div class="sub-app">
		<Toaster class="my-toast" position="" />
		<RouterView></RouterView>
	</div>
</template>

<style scoped></style>
