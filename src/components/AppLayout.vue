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
              src="../assets/cat.jpg"
            />
            <h3 style="margin-top: 10px;">林莺</h3>
            <p style="color: #666;">今天不学习，明天变垃圾。</p>
          </div>
          <el-divider />
          <div style="display: flex; justify-content: space-around;">
            <div>日志<br /><strong>6</strong></div>
            <div>浏览量<br /><strong>17</strong></div>
            <div>分类<br /><strong>16</strong></div>
          </div>
          <el-button type="primary" round size="small" style="margin-top: 10px; width: 100%;">加入书签</el-button>
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
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .mb-4 {
    margin-bottom: 16px;
  }
  </style>
  