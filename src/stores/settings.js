import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useSettings = defineStore('settings', () => {
  // 默认字体大小（百分比）
  const fontSize = ref(100)
  
  // 页面颜色主题预设
  const colorThemes = [
    { name: '默认', value: 'default', primaryColor: '#409eff' },
    { name: '绿色', value: 'green', primaryColor: '#67c23a' },
    { name: '紫色', value: 'purple', primaryColor: '#8e44ad' },
    { name: '橙色', value: 'orange', primaryColor: '#e67e22' },
    { name: '红色', value: 'red', primaryColor: '#e74c3c' }
  ]
  
  // 当前选中的颜色主题
  const currentTheme = ref('default')
  
  // 初始化设置
  function initSettings() {
    // 读取保存的字体大小
    const savedFontSize = localStorage.getItem('fontSize')
    if (savedFontSize) {
      fontSize.value = parseInt(savedFontSize)
      applyFontSize()
    }
    
    // 读取保存的颜色主题
    const savedTheme = localStorage.getItem('colorTheme')
    if (savedTheme) {
      currentTheme.value = savedTheme
      applyColorTheme()
    }
  }
  
  // 更改字体大小
  function setFontSize(size) {
    fontSize.value = size
    localStorage.setItem('fontSize', size.toString())
    applyFontSize()
  }
  
  // 应用字体大小到文档
  function applyFontSize() {
    document.documentElement.style.fontSize = `${fontSize.value}%`
  }
  
  // 更改颜色主题
  function setColorTheme(theme) {
    currentTheme.value = theme
    localStorage.setItem('colorTheme', theme)
    applyColorTheme()
  }
  
  // 应用颜色主题到文档
  function applyColorTheme() {
    const theme = colorThemes.find(t => t.value === currentTheme.value) || colorThemes[0]
    document.documentElement.style.setProperty('--primary-color', theme.primaryColor)
    
    // 根据主色生成其他相关颜色
    // 例如根据主色自动计算hover颜色、disabled颜色等
  }
  
  return {
    fontSize,
    colorThemes,
    currentTheme,
    initSettings,
    setFontSize,
    setColorTheme
  }
}) 