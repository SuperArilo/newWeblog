import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import VWave from 'v-wave'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus, {locale: zhCn})
app.use(VWave, {initialOpacity: 0.5, easing: 'ease-out'})
app.mount('#app')
app.config.globalProperties.$axios = axios
