<template>
  <el-header class="nav-bar">
    <!-- 博客名 -->
    <div class="logo">MYBLOG</div>

    <!-- 中间导航区域 -->
    <div class="nav-center">
      <el-input v-model="searchStore.keyword" placeholder="搜索文章" size="small" prefix-icon="Search" class="search-box"
        @input="searchStore.setKeyword" @focus="searchStore.showResults = true" />

      <!-- 搜索结果下拉框 -->
      <div v-if="searchStore.showResults && searchStore.keyword" class="search-results">
        <div v-if="searchStore.searchResults.length === 0" class="no-results">
          没有找到相关文章
        </div>
        <div v-else>
          <div v-for="article in searchStore.searchResults" :key="article.id" class="search-result-item"
            @click="handleSearchItemClick(article)">
            <h4>{{ article.title }}</h4>
            <p>{{ article.summary.substring(0, 50) }}...</p>
          </div>
        </div>
      </div>

      <el-menu mode="horizontal" class="el-menu-demo" @select="handleSelect" router :default-active="$route.path"
        :ellipsis="false">
        <el-menu-item index="/home">首页</el-menu-item>
        <el-menu-item index="/settings">设置</el-menu-item>
        <el-menu-item index="/contact">联系我</el-menu-item>
        <el-menu-item index="/todo">待办日程</el-menu-item>
        <el-menu-item index="#">上传日志</el-menu-item>
        <el-menu-item index="#" @click="themeStore.toggleDarkMode">
          <el-icon v-if="themeStore.isDark">
            <Moon />
          </el-icon>
          <el-icon v-else>
            <Sunny />
          </el-icon>
          {{ themeStore.isDark ? '亮色模式' : '暗黑模式' }}
        </el-menu-item>
      </el-menu>

      <el-dialog v-model="dialogVisible" title="联系方式" width="30%" :before-close="handleClose">
        <div style="line-height: 1.8;">
          📧 邮箱：123456@gmail.com <br>
          ☕ 欢迎联系我交流！
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">关闭</el-button>
          </span>
        </template>
      </el-dialog>
    </div>

    <!-- 右侧头像及下拉菜单 -->
    <div class="nav-right">
      <el-dropdown trigger="click">
        <el-avatar size="small" :src="userProfile.avatar" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleUserProfile">
              <el-icon>
                <User />
              </el-icon> 个人信息
            </el-dropdown-item>
            <el-dropdown-item @click="handleLogout">
              <el-icon>
                <SwitchButton />
              </el-icon> 退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import { Search, User, SwitchButton, Moon, Sunny } from '@element-plus/icons-vue'
import { userProfile } from '../stores/userProfile'
import { useAuth } from '../stores/auth'
import { useTheme } from '../stores/theme'
import { useSearch } from '../stores/search'
import { ElMessageBox } from 'element-plus'

const router = useRouter()
const auth = useAuth()
const themeStore = useTheme()
const searchStore = useSearch()
const activeIndex = ref('/')

const dialogVisible = ref(false)
// 事件总线
const emitter = inject('emitter')

// 监听打开联系对话框事件
onMounted(() => {
  emitter.on('openContactDialog', () => {
    dialogVisible.value = true
  })
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  emitter.off('openContactDialog')
  document.removeEventListener('click', handleClickOutside)
})

const handleClose = () => {
  dialogVisible.value = false
}

const handleSelect = (key) => {
  activeIndex.value = key
  // 如果点击了联系我菜单项，直接打开对话框
  if (key === '/contact') {
    dialogVisible.value = true
  } else {
    router.push(key)
  }
}

const handleUserProfile = () => {
  router.push('/profile')
}

const handleLogout = async () => {
  try {
    await ElMessageBox.confirm(
      '确定要退出登录吗？',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )

    // 执行登出
    auth.logout()

    // 跳转到登录页
    router.push('/login')
  } catch {
    // 用户取消了确认
  }
}

const handleSearchItemClick = (article) => {
  searchStore.toggleShowResults(false);
  searchStore.setKeyword('');
  // 假设文章详情页的路由是 /article/:id
  router.push(`/article/${article.id}`)
}

// 点击页面其他区域关闭搜索结果
const handleClickOutside = (event) => {
  const searchBox = document.querySelector('.search-box')
  const searchResults = document.querySelector('.search-results')

  if (searchBox && searchResults &&
    !searchBox.contains(event.target) &&
    !searchResults.contains(event.target)) {
    searchStore.toggleShowResults(false);
  }
}
</script>

<style scoped>
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  background-color: var(--header-background);
  color: var(--text-color);
  padding: 0 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  z-index: 1000;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  flex-shrink: 0;
  margin-right: 20px;
  color: var(--text-color);
}

.nav-center {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  margin: 0 40px;
  overflow: visible;
  flex-direction: row-reverse;
  position: relative;
}

.search-box {
  width: 200px;
  margin-left: 20px;
  flex-shrink: 0;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  cursor: pointer;
  margin-left: 20px;
}

.el-dropdown-menu__item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.el-menu-demo {
  border-bottom: none !important;
  flex-grow: 1;
  white-space: nowrap;
  min-width: 400px;
  background-color: var(--menu-background);
}

.el-menu-item {
  font-size: 14px;
  padding: 0 15px !important;
  color: var(--text-color);
}

.search-results {
  position: absolute;
  top: 40px;
  right: 0;
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  background-color: var(--card-background);
  color: var(--text-color);
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  z-index: 1001;
}

.search-result-item {
  padding: 10px 15px;
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
}

.search-result-item:hover {
  background-color: var(--hover-background);
}

.search-result-item h4 {
  margin: 0 0 5px 0;
  font-size: 14px;
  color: var(--text-color);
}

.search-result-item p {
  margin: 0;
  font-size: 12px;
  color: var(--info-color);
}

.no-results {
  padding: 15px;
  text-align: center;
  color: var(--info-color);
}
</style>