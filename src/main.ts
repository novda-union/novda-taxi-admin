import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router'
import { createPinia } from 'pinia'
import 'leaflet/dist/leaflet.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // Import the progress bar styles

NProgress.configure({ showSpinner: false,  })

const app = createApp(App)

app
	.use(createPinia())
	.use(router)
	.mount('#app')

router.beforeEach((to, from, next) => {
	NProgress.start()
	return next()
})

router.afterEach(() => {
	NProgress.done()
})
