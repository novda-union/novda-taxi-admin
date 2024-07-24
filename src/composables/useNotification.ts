import { toast } from 'vue-sonner'
import Notification from '@/assets/notif-admin-panel.mp3'
import { onMounted, ref } from 'vue'

const notifAudio = new Audio(Notification)

type TypesToast = 'warning' | 'success' | 'description' | 'default' | 'error'

export function useNotification() {
	const typeToast = ref<TypesToast>('default')
	const message = ref<string>('')
	const description = ref<string>('')

	async function notify(options: { typeToast: TypesToast; message: string; description?: string }) {
		notifAudio.play()
		switch (options.typeToast) {
			case 'warning':
				toast.warning(options.message)
				break
			case 'success':
				toast.success(options.message)
				break
			case 'description':
				toast(options.message, {
					description: options.description,
				})
				break
			case 'default':
				toast(options.message)
				break
			case 'error':
				toast.error(options.message)
				break
			default:
				toast(options.message)
				break
		}
	}

	return {
		notify,
		typeToast,
		message,
		description,
	}
}
