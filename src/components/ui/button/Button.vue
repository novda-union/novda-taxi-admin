<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Primitive, type PrimitiveProps } from 'radix-vue'
import { type ButtonVariants, buttonVariants } from '.'
import { cn } from '@/lib/utils'

import { useLoading } from '@/stores/loading'
import { storeToRefs } from 'pinia'

const loadingStore = useLoading()

const { getLoading } = storeToRefs(loadingStore)

const props = withDefaults(defineProps<Props>(), {
	as: 'button',
})

interface Props extends PrimitiveProps {
	variant?: ButtonVariants['variant']
	size?: ButtonVariants['size']
	class?: HTMLAttributes['class']
}
</script>

<template>
	<Primitive
		:disabled="getLoading"
		:as="as"
		:as-child="asChild"
		:class="cn(buttonVariants({ variant, size }), props.class)"
	>
		<slot />
	</Primitive>
</template>
