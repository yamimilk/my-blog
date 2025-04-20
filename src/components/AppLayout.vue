<template>
        <el-container style="min-height: 100vh; flex-direction: column;">
    <!-- 顶部导航 -->
    <NavBar />
      <!-- 左侧竖栏 -->
      <el-container style="flex: 1;">
        <el-aside width="260px" style="background-color: #f9f9f9; padding: 20px;">
        <!-- 头像卡片 -->
        <el-card shadow="hover" class="mb-4">
          <div style="text-align: center;">
            <el-avatar
              :size="100"
              :src="userProfile.avatar"
            />
            <h3 style="margin-top: 10px;">{{ userProfile.nickname }}</h3>
            <p style="color: #666;">{{ userProfile.signature }}</p>
          </div>
          <el-divider />
          <div style="display: flex; justify-content: space-around;">
            <div>日志<br /><strong>6</strong></div>
            <div>浏览量<br /><strong>17</strong></div>
            <div>分类<br /><strong>16</strong></div>
          </div>
          <el-button type="primary" round size="small" style="margin-top: 10px; width: 100%;" @click="goToProfile">编辑资料</el-button>
        </el-card>
        
        <!-- 社交链接区域 -->
        <el-card shadow="hover" class="social-links">
          <div class="social-links">
            <a v-if="userProfile.github" :href="userProfile.github" target="_blank" class="social-link">
              <el-icon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></el-icon>
              <span>GitHub</span>
            </a>
            <a v-if="userProfile.gitee" :href="userProfile.gitee" target="_blank" class="social-link">
              <el-icon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon"><path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.667c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296z"/></svg></el-icon>
              <span>Gitee</span>
            </a>
            <a v-if="userProfile.email" :href="`mailto:${userProfile.email}`" class="social-link">
              <el-icon><Message /></el-icon>
              <span>E-Mail</span>
            </a>
            <a v-if="userProfile.netease" :href="userProfile.netease" target="_blank" class="social-link">
              <el-icon><Headset /></el-icon>
              <span>网易云</span>
            </a>
          </div>
        </el-card>
  
        <!-- 公告栏 -->
        <el-card shadow="hover">
          <template #header>
            <span>📢 公告板</span>
          </template>
          <ul>
            <li>使用 https 协议</li>
            <li>博客已支持 RSS 订阅</li>
            <li>博客正式上线啦~</li>
          </ul>
        </el-card>
      </el-aside>
        
      <!-- 主内容 -->
      <el-main style="background: #f4f4f4; padding: 24px;">
        <router-view />
      </el-main>
      </el-container>
    </el-container>
    <footer class="footer-bar">
  ©2025 MYBLOG. 保留所有权利。| 备案号：粤ICP备12345678号
</footer>

  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { Message, Headset } from '@element-plus/icons-vue'
  import { userProfile, initUserProfile } from '../stores/userProfile'
  
  const router = useRouter()
  
  // 初始化用户配置
  onMounted(() => {
    initUserProfile()
  })
  
  // 跳转到个人资料页面
  const goToProfile = () => {
    router.push('/profile')
  }
  </script>
  
  <style scoped>
  .mb-4 {
    margin-bottom: 16px;
  }

  .social-links {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .footer-bar {
    background: #222;
    color: #ccc;
    text-align: center;
    padding: 20px;
    font-size: 14px;
  }

  .memo-area {
    background: #fff;
    border-radius: 40px;
    padding: 30px;
    text-align: center;
    font-size: 18px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    margin-bottom: 40px;
  }
  
  .social-links {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  
  .social-link {
    display: flex;
    align-items: center;
    gap: 5px;
    text-decoration: none;
    color: #409EFF;
    padding: 8px 10px;
    border-radius: 4px;
    transition: all 0.3s;
    width: calc(50% - 6px);
  }
  
  .social-link:hover {
    background-color: #f0f9ff;
  }
  
  .icon {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }
  </style>
  