import { createApp } from 'vue'
// import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入Element Plus暗黑模式CSS
import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/css/theme.css'
import './assets/css/element-dark.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useTheme } from './stores/theme'
import { useSettings } from './stores/settings'
import mitt from 'mitt'

const app = createApp(App)
const pinia = createPinia()
const emitter = mitt()

// 全局事件总线
app.provide('emitter', emitter)

app.use(router)
app.use(ElementPlus, {
  size: 'default'
})
app.use(pinia)

// 初始化主题模式
const themeStore = useTheme()
themeStore.initDarkMode()

// 初始化设置
const settingsStore = useSettings()
settingsStore.initSettings()

app.mount('#app')
