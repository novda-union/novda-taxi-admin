<script setup lang="ts">
import { LayoutDashboard, CarTaxiFront, User, HomeIcon } from 'lucide-vue-next'
import SidebarButton from './SidebarButton.vue'
import Button from '../ui/button/Button.vue'

const driversLinks = [
	{
		name: 'Barcha haydovchilar',
		path: '/drivers/all',
	},
	{
		name: 'Nazorat punkti',
		path: '/drivers/control',
	},
	{
		name: 'Bloklangan haydovchilar',
		path: '/drivers/blocked',
	},
	{
		name: 'Eng qimmat haydovchilar',
		path: '/drivers/top-expensive',
	},
	{
		name: 'Eng aktiv haydovchilar',
		path: '/drivers/top-active',
	},
]

const clientsLinks = [
	{
		name: 'Barcha mijozlar',
		path: '/clients/all',
	},
	{
		name: 'Bloklangan mijozlar',
		path: '/clients/blocked',
	},
	{
		name: 'Eng qimmat mijozlar',
		path: '/clients/top-expensive',
	},
]
</script>

<template>
	<aside class="sidebar bg-white max-w-[340px] w-[340px] border-r max-h-screen h-screen p-4">
		<div class="top-title flex items-center space-x-2">
			<LayoutDashboard />
			<p class="text-lg font-bold">Admin</p>
		</div>
		<div class="links overflow-y-scroll max-h-[80%] mt-6 space-y-1">
			<SidebarButton :is-single="true" :links="[{ name: 'Bosh sahifa', path: '/' }]">
				<template #name-and-icon> <HomeIcon class="w-5 h-5 mr-3" /> Bosh sahifa </template>
			</SidebarButton>
			<SidebarButton :is-single="false" :links="driversLinks">
				<template #name-and-icon> <CarTaxiFront class="w-5 h-5 mr-3" /> Haydovchilar </template>
			</SidebarButton>
			<SidebarButton :is-single="false" :links="clientsLinks">
				<template #name-and-icon> <User class="w-5 h-5 mr-3" /> Mijozlar </template>
			</SidebarButton>
		</div>
	</aside>
</template>
