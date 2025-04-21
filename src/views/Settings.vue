<template>
  <div class="settings-container">
    <div class="settings-header">
      <h1 class="settings-title">设置</h1>
      <p class="settings-description">调整您的博客外观偏好</p>
    </div>

    <el-card class="settings-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <el-icon class="header-icon"><Setting /></el-icon>
          <span>外观设置</span>
        </div>
      </template>
      
      <!-- 字体大小设置 -->
      <div class="setting-item">
        <div class="setting-info">
          <h3 class="setting-title">字体大小</h3>
          <p class="setting-desc">调整网站文字大小</p>
        </div>
        <div class="setting-control">
          <el-slider
            v-model="settings.fontSize"
            :min="80"
            :max="150"
            :step="5"
            :format-tooltip="formatFontSize"
            @change="handleFontSizeChange"
            style="width: 300px"
          />
          <div class="slider-labels">
            <span>较小</span>
            <span>推荐</span>
            <span>较大</span>
          </div>
        </div>
        <div class="setting-preview font-preview">
          <span :style="`font-size: ${settings.fontSize * 0.16}px`">文字预览</span>
        </div>
      </div>

      <el-divider />

      <!-- 颜色主题设置 -->
      <div class="setting-item">
        <div class="setting-info">
          <h3 class="setting-title">颜色主题</h3>
          <p class="setting-desc">选择网站主色调</p>
        </div>
        <div class="setting-control">
          <el-radio-group v-model="settings.currentTheme" @change="handleThemeChange">
            <el-radio-button 
              v-for="theme in settings.colorThemes" 
              :key="theme.value" 
              :label="theme.value"
              :style="{
                '--el-color-primary': theme.primaryColor,
                '--el-radio-button-checked-bg-color': theme.primaryColor
              }"
            >
              {{ theme.name }}
            </el-radio-button>
          </el-radio-group>
        </div>
        <div class="setting-preview color-preview">
          <div 
            v-for="theme in settings.colorThemes" 
            :key="theme.value"
            class="color-box"
            :style="{ 
              'background-color': theme.primaryColor,
              'border': settings.currentTheme === theme.value ? '2px solid #333' : '2px solid transparent'
            }"
            @click="handleThemeChange(theme.value)"
          ></div>
        </div>
      </div>
    </el-card>

    <el-card class="settings-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <el-icon class="header-icon"><Moon /></el-icon>
          <span>主题模式</span>
        </div>
      </template>
      
      <!-- 暗黑模式设置 -->
      <div class="setting-item">
        <div class="setting-info">
          <h3 class="setting-title">暗黑模式</h3>
          <p class="setting-desc">切换亮色/暗色主题</p>
        </div>
        <div class="setting-control">
          <el-switch
            v-model="isDark"
            active-text="开启"
            inactive-text="关闭"
            @change="handleDarkModeChange"
          />
        </div>
        <div class="setting-preview mode-preview">
          <div class="mode-box light" :class="{ active: !isDark }">
            <el-icon><Sunny /></el-icon>
            <span>亮色</span>
          </div>
          <div class="mode-box dark" :class="{ active: isDark }">
            <el-icon><Moon /></el-icon>
            <span>暗色</span>
          </div>
        </div>
      </div>
    </el-card>

    <el-card class="settings-card reset-card" shadow="hover">
      <div class="setting-item">
        <div class="setting-info">
          <h3 class="setting-title">重置设置</h3>
          <p class="setting-desc">将所有设置恢复为默认值</p>
        </div>
        <div class="setting-control">
          <el-button type="danger" @click="resetSettings">恢复默认设置</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { Setting, Monitor, Moon, Sunny } from '@element-plus/icons-vue'
import { useSettings } from '../stores/settings'
import { useTheme } from '../stores/theme'
import { ElMessageBox } from 'element-plus'

const settings = useSettings()
const themeStore = useTheme()

// 计算属性用于绑定暗黑模式开关
const isDark = computed({
  get: () => themeStore.isDark,
  set: (value) => value 
})

// 初始化设置
onMounted(() => {
  settings.initSettings()
})

// 格式化字体大小显示
const formatFontSize = (val) => {
  return `${val}%`
}

// 字体大小变化处理
const handleFontSizeChange = (val) => {
  settings.setFontSize(val)
}

// 主题变化处理
const handleThemeChange = (val) => {
  settings.setColorTheme(val)
}

// 暗黑模式变化处理
const handleDarkModeChange = (val) => {
  themeStore.toggleDarkMode()
}

// 重置所有设置
const resetSettings = async () => {
  try {
    await ElMessageBox.confirm(
      '确定要恢复所有设置为默认值吗？此操作不可撤销。',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    // 重置字体大小
    settings.setFontSize(100)
    // 重置颜色主题
    settings.setColorTheme('default')
    // 重置暗黑模式为关闭
    if (themeStore.isDark) {
      themeStore.toggleDarkMode()
    }
  } catch {
    // 用户取消了确认
  }
}
</script>

<style scoped>
.settings-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.settings-header {
  margin-bottom: 30px;
}

.settings-title {
  font-size: 24px;
  color: var(--text-color);
  margin: 0 0 8px 0;
}

.settings-description {
  font-size: 14px;
  color: var(--info-color);
  margin: 0;
}

.settings-card {
  margin-bottom: 20px;
  border-radius: 8px;
  background-color: var(--card-background);
}

.card-header {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
}

.header-icon {
  margin-right: 8px;
  color: var(--primary-color);
}

.setting-item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 16px 0;
}

.setting-info {
  width: 200px;
  flex-shrink: 0;
}

.setting-title {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-color);
  margin: 0 0 4px 0;
}

.setting-desc {
  font-size: 13px;
  color: var(--info-color);
  margin: 0;
}

.setting-control {
  flex-grow: 1;
  min-width: 200px;
}

.setting-preview {
  width: 100%;
  margin-top: 16px;
  display: flex;
  justify-content: center;
  padding: 16px;
  border-radius: 8px;
  background-color: var(--hover-background);
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  font-size: 12px;
  color: var(--info-color);
}

.font-preview {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  color: var(--text-color);
}

.color-preview {
  justify-content: flex-start;
  gap: 16px;
}

.color-box {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s;
}

.color-box:hover {
  transform: scale(1.1);
}

.mode-preview {
  justify-content: center;
  gap: 30px;
}

.mode-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.mode-box.light {
  background-color: #ffffff;
  color: #333333;
}

.mode-box.dark {
  background-color: #333333;
  color: #ffffff;
}

.mode-box.active {
  outline: 2px solid var(--primary-color);
}

.reset-card {
  background-color: rgba(var(--danger-color-rgb), 0.05);
}

@media (max-width: 768px) {
  .setting-info, .setting-control {
    width: 100%;
  }
  
  .setting-control {
    margin-top: 16px;
  }
}
</style> 