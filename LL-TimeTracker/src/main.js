import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Import your router instance
import store from './store' // Import your Vuex store instance

const app = createApp(App)
app.use(router)
app.use(store) // Use the Vuex store
app.mount('#app')
