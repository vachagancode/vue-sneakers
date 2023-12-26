import './assets/main.css'

import { autoAnimatePlugin } from '@formkit/auto-animate/vue'


import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(autoAnimatePlugin)

app.mount('#app')
