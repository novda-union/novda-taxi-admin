import { defineStore } from 'pinia'
import { ref } from 'vue'
import L, { LatLngExpression } from 'leaflet'
import { toast } from 'vue-sonner'
import 'leaflet-rotatedmarker'

export interface CustomMarker extends L.Marker {
	latLng?: L.LatLng
	_custom_id?: string
}

const CENTER_GURLEN = [41.84055431058051, 60.39339848031728]

// Define a store for maps
export const useMaps = defineStore('maps-store', () => {
	const sharedMap = ref<L.Map>()
	const defaultZoom = ref(14)
	const mapLoaded = ref(false)
	const markers = ref<CustomMarker[]>([])

	async function loadMap(id: string) {
		try {
			sharedMap.value = L.map(id, { zoomControl: false, maxZoom: 20 }).setView(
				[...CENTER_GURLEN] as LatLngExpression,
				defaultZoom.value
			)

			L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
				maxZoom: 20,
			})
				.addTo(sharedMap.value)
				.addEventListener('load', async () => {
					if (mapLoaded.value) return
					mapLoaded.value = true
				})
		} catch (error: any) {
			console.log(error)
			toast(error)
		}
	}

	return { loadMap, markers }
})
