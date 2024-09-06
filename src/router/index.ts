import Cookie from 'js-cookie'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'default-layout',
			component: () => import('@/layouts/DefaultLayout.vue'),
			async beforeEnter(to, from, next) {
				const authToken = Cookie.get('authToken')
				if (!authToken) {
					return next({ path: '/auth' })
				}

				return next()
			},
			children: [
				{
					path: '',
					name: 'default-home-page',
					component: () => import('@/pages/Default/HomePage.vue'),
				},
				{
					path: '/drivers/all',
					component: () => import('@/pages/Default/drivers/AllPage.vue'),
					meta: { title: 'All Drivers' },
				},
				{
					path: '/drivers/blocked',
					component: () => import('@/pages/Default/drivers/BlockedPage.vue'),
					meta: { title: 'Blocked Drivers' },
				},
				{
					path: '/drivers/top-expensive',
					component: () => import('@/pages/Default/drivers/TopExpensivePage.vue'),
					meta: { title: 'Top Expensive Drivers' },
				},
				{
					path: '/drivers/top-active',
					component: () => import('@/pages/Default/drivers/TopActivePage.vue'),
					meta: { title: 'Top Active Drivers' },
				},
				{
					path: '/drivers/control',
					component: () => import('@/pages/Default/drivers/ControlPage.vue'),
					meta: { title: 'Driver Control' },
				},
				{
					path: '/drivers/search',
					component: () => import('@/pages/Default/drivers/SearchPage.vue'),
					meta: { title: 'Driver Search' },
				},
			],
		},
		{
			path: '/auth',
			name: 'auth-layout',
			component: () => import('@/layouts/AuthLayout.vue'),
			async beforeEnter(to, from, next) {
				const authToken = Cookie.get('authToken')
				if (authToken) {
					return next({ path: '/' })
				}

				return next()
			},
			children: [
				{
					path: '',
					name: 'auth-main-page',
					component: () => import('@/pages/Auth/LoginPage.vue'),
				},
			],
		},
	],
})

export default router
