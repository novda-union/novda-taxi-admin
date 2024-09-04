<script lang="ts" setup>
import { computed, ref, toRefs } from 'vue'
import Collapsible from '../ui/collapsible/Collapsible.vue'
import CollapsibleTrigger from '../ui/collapsible/CollapsibleTrigger.vue'
import Button from '../ui/button/Button.vue'
import CollapsibleContent from '../ui/collapsible/CollapsibleContent.vue'
import { ChevronsDown } from 'lucide-vue-next'
import { RouterLink, useRouter } from 'vue-router'
import SidebarLink from './SidebarLink.vue'

const router = useRouter()

const props = defineProps<{
	links: { name: string; path: string }[]
	isSingle?: boolean
}>()

const isOpen = ref(false)

const { links } = toRefs(props)

const isPageEqual = computed(() => {
	return props.links[0].path === router.currentRoute.value.path
})
</script>

<template>
	<Collapsible v-if="!isSingle" class="drivers" v-model:open="isOpen">
		<CollapsibleTrigger as-child>
			<Button
				variant="ghost"
				class="text-lg flex items-center justify-start relative font-semibold py-6 transition-all w-full hover:bg-accent group"
				:class="{ 'bg-accent': isOpen }"
				><slot name="name-and-icon"></slot>
				<ChevronsDown
					class="absolute w-5 h-5 right-4 opacity-0 transition-all group-hover:opacity-30"
					:class="{ 'rotate-180': isOpen }" /></Button
		></CollapsibleTrigger>
		<CollapsibleContent class="flex flex-col justify-end items-end space-y-2 mt-2">
			<SidebarLink v-for="(link, index) in links" :link="link" :key="index" />
		</CollapsibleContent>
	</Collapsible>
	<Button v-else variant="ghost" class="w-full py-6 mb-2" :class="{ 'bg-accent': isPageEqual }">
		<RouterLink
			:to="links[0].path"
			class="text-lg flex items-center justify-start font-semibold transition-all w-full"
		>
			<slot name="name-and-icon"></slot>
		</RouterLink>
	</Button>
</template>
