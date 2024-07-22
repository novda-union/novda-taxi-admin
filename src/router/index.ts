import { createRouter, createWebHistory } from 'vue-router'
import Cookie from 'js-cookie'

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
