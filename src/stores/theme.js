import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTheme = defineStore('theme', () => {
  const isDark = ref(false)
  
  function toggleDarkMode() {
    isDark.value = !isDark.value
    localStorage.setItem('darkMode', isDark.value ? 'dark' : 'light')
    applyTheme()
  }
  
  function initDarkMode() {
    const savedTheme = localStorage.getItem('darkMode')
    if (savedTheme === 'dark') {
      isDark.value = true
    } else if (savedTheme === 'light') {
      isDark.value = false
    } else {
      // 检查系统主题偏好
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      isDark.value = prefersDark
      localStorage.setItem('darkMode', prefersDark ? 'dark' : 'light')
    }
    applyTheme()
  }
  
  function applyTheme() {
    // 应用主题到文档根元素
    if (isDark.value) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.add('dark-mode') // Element Plus 暗黑模式类
      document.body.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.remove('dark-mode') // Element Plus 暗黑模式类
      document.body.setAttribute('data-theme', 'light')
    }
  }
  
  return {
    isDark,
    toggleDarkMode,
    initDarkMode
  }
}) 