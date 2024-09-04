<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router'

// ... existing imports ...

// Import the new pages
import DriversAllPage from '@/pages/Default/drivers/AllPage.vue'
import DriversBlockedPage from '@/pages/Default/drivers/BlockedPage.vue'
import DriversTopExpensivePage from '@/pages/Default/drivers/TopExpensivePage.vue'
import DriversTopActivePage from '@/pages/Default/drivers/TopActivePage.vue'
import DriversControlPage from '@/pages/Default/drivers/ControlPage.vue'

// ... existing code ...

const routes: RouteRecordRaw[] = [
  // ... existing routes ...

  {
    path: '/drivers',
    component: DriversAllPage,
    meta: { title: 'All Drivers' }
  },
  {
    path: '/drivers/blocked',
    component: DriversBlockedPage,
    meta: { title: 'Blocked Drivers' }
  },
  {
    path: '/drivers/top-expensive',
    component: DriversTopExpensivePage,
    meta: { title: 'Top Expensive Drivers' }
  },
  {
    path: '/drivers/top-active',
    component: DriversTopActivePage,
    meta: { title: 'Top Active Drivers' }
  },
  {
    path: '/drivers/control',
    component: DriversControlPage,
    meta: { title: 'Driver Control' }
  },

  // ... other existing routes ...
]

// ... rest of the existing code ...
</script>

// ... rest of the component ...