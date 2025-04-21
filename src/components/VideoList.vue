<!-- src/components/VideoList.vue -->
<template>
  <div class="video-container">
    <h2 class="section-title">收藏视频</h2>
    
    <div class="video-grid">
      <el-card 
        v-for="(item, index) in videos" 
        :key="index" 
        class="video-card" 
        shadow="hover"
      >
        <div class="video-thumbnail-container">
          <div class="video-thumbnail" :style="{ backgroundImage: `url(${item.thumbnail})` }">
            <div class="video-platform-badge" :class="getPlatformClass(item.platform)">
              <el-icon><component :is="getPlatformIcon(item.platform)" /></el-icon>
              <span>{{ item.platform }}</span>
            </div>
            <a :href="item.url" target="_blank" class="video-play-button">
              <el-icon><VideoPlay /></el-icon>
            </a>
          </div>
        </div>
        
        <div class="video-content">
          <h3 class="video-title">{{ item.title }}</h3>
          <p class="video-description">{{ item.description }}</p>
          
          <div class="video-footer">
            <div class="video-creator">
              <el-icon><User /></el-icon>
              {{ item.creator }}
            </div>
            <div class="video-date">{{ item.date }}</div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { User, VideoPlay, Link, Film, Apple } from '@element-plus/icons-vue'

// 获取平台图标
const getPlatformIcon = (platform) => {
  const icons = {
    'YouTube': 'VideoPlay',
    'Bilibili': 'Film',
    'TikTok': 'Film',
    'Xigua': 'Film',
    'NetEase': 'Apple',
    'Other': 'Link'
  }
  return icons[platform] || 'Link'
}

// 获取平台样式类
const getPlatformClass = (platform) => {
  return `platform-${platform.toLowerCase()}`
}

// 示例视频数据，后期可以从后端API获取
const videos = [
  {
    id: 1,
    title: 'Vue3 组合式API完全指南 - 从入门到精通',
    description: '本视频详细讲解Vue3组合式API的使用方法，包括响应式系统、生命周期钩子、依赖注入等核心概念。',
    thumbnail: 'https://picsum.photos/600/400?random=1',
    url: 'https://www.youtube.com/watch?v=FXpIoQ_rT_c',
    platform: 'YouTube',
    creator: '技术学院',
    date: '2023-05-20'
  },
  {
    id: 2,
    title: 'Spring Boot 微服务架构实战 - 从零搭建电商平台',
    description: '从零开始，手把手教你如何使用Spring Boot构建微服务架构的电商平台，涵盖服务注册、配置中心、网关等组件。',
    thumbnail: 'https://picsum.photos/600/400?random=2',
    url: 'https://www.bilibili.com/video/BV1LQ4y127n4',
    platform: 'Bilibili',
    creator: 'Java架构师',
    date: '2023-04-15'
  },
  {
    id: 3,
    title: 'CSS Grid布局精通 - 现代网页布局技术',
    description: '详解CSS Grid布局的所有属性和用法，通过实际案例演示如何创建复杂的响应式网格布局。',
    thumbnail: 'https://picsum.photos/600/400?random=3',
    url: 'https://www.youtube.com/watch?v=9zBsdzdE4sM',
    platform: 'YouTube',
    creator: '前端开发者',
    date: '2023-04-05'
  },
  {
    id: 4,
    title: 'Git工作流与团队协作 - 企业级开发实践',
    description: '介绍企业开发中常用的Git工作流程，包括Gitflow、GitHub Flow等，以及如何通过规范提高团队协作效率。',
    thumbnail: 'https://picsum.photos/600/400?random=4',
    url: 'https://www.bilibili.com/video/BV1dT411E7LH',
    platform: 'Bilibili',
    creator: '程序员小林',
    date: '2023-03-28'
  },
  {
    id: 5,
    title: 'JavaScript异步编程 - Promise/Async/Await全解析',
    description: '彻底讲解JavaScript异步编程的发展历程，从回调地狱到Promise再到Async/Await的完整演进过程。',
    thumbnail: 'https://picsum.photos/600/400?random=5',
    url: 'https://www.youtube.com/watch?v=vn3tm0quoqE',
    platform: 'YouTube',
    creator: 'JS大神',
    date: '2023-03-18'
  },
  {
    id: 6,
    title: 'Docker容器化应用实战 - 从开发到部署',
    description: '全面介绍Docker的使用方法，包括镜像构建、容器管理、数据卷、网络配置以及在CI/CD流程中的应用。',
    thumbnail: 'https://picsum.photos/600/400?random=6',
    url: 'https://www.bilibili.com/video/BV1kv411q7Qc',
    platform: 'Bilibili',
    creator: '运维老司机',
    date: '2023-03-10'
  }
]
</script>

<style scoped>
.video-container {
  padding: 20px;
}

.section-title {
  margin-bottom: 30px;
  font-size: 28px;
  color: #333;
  position: relative;
  padding-left: 15px;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 24px;
  background: #409EFF;
  border-radius: 2px;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.video-card {
  transition: all 0.3s ease;
  overflow: hidden;
}

.video-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.video-thumbnail-container {
  position: relative;
  overflow: hidden;
}

.video-thumbnail {
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;
  transition: transform 0.5s ease;
}

.video-card:hover .video-thumbnail {
  transform: scale(1.05);
}

.video-platform-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 4px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.platform-youtube {
  background: rgba(255, 0, 0, 0.7);
}

.platform-bilibili {
  background: rgba(0, 174, 236, 0.7);
}

.platform-tiktok {
  background: rgba(0, 0, 0, 0.7);
}

.video-play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.video-card:hover .video-play-button {
  opacity: 1;
}

.video-content {
  padding: 16px;
}

.video-title {
  margin: 0 0 10px;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.video-description {
  color: #606266;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.video-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #909399;
}

.video-creator {
  display: flex;
  align-items: center;
  gap: 5px;
}

@media (max-width: 768px) {
  .video-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

@media (max-width: 480px) {
  .video-grid {
    grid-template-columns: 1fr;
  }
}
</style>
  