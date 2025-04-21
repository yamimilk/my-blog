<template>
  <div class="article-container">
    <h2 class="section-title">文章合集</h2>
    
    <div class="article-grid">
      <el-card v-for="article in articles" :key="article.id" class="article-card" shadow="hover">
        <div class="article-cover" v-if="article.cover" :style="`background-image: url(${article.cover})`"></div>
        
        <div class="article-content">
          <div class="article-meta">
            <el-tag size="small" effect="plain" class="article-date">{{ article.date }}</el-tag>
            <div class="article-tags">
              <el-tag v-for="tag in article.tags" :key="tag" size="small" type="info" effect="plain" class="article-tag">{{ tag }}</el-tag>
            </div>
          </div>
          
          <h3 class="article-title">{{ article.title }}</h3>
          <p class="article-summary">{{ article.summary }}</p>
          
          <div class="article-footer">
            <span class="article-author">
              <el-icon><User /></el-icon>
              {{ article.author }}
            </span>
            <span class="article-views">
              <el-icon><View /></el-icon>
              {{ article.views }}
            </span>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { User, View } from '@element-plus/icons-vue'

// 示例文章数据，后期可以从后端API获取
const articles = [
  { 
    id: 1, 
    title: 'Git提交规范：提升团队协作与项目质量的必备实践', 
    summary: 'Git提交规范：提升团队协作与项目质量的必备实践在软件开发过程中，版本控制是确保项目稳定性和协作效率的关键环节，Git作为目前最流行的版本控制系统，其提交信息(commit message)的规范化对于项目的可维护性至关重要。', 
    date: '2023-03-27',
    author: 'Auroral',
    views: 1024,
    tags: ['Git', '团队协作'],
    cover: 'https://picsum.photos/600/300?random=1'
  },
  { 
    id: 2, 
    title: 'Vue中Vue Router中静态导入与动态导入的奇妙关系', 
    summary: '构建理想的开发环境开发个人博客的过程中，发现了一个有趣的现象：当我在router/index.js文件中删除预先的静态导入操作后，页面布局出现了问题，我在路由配置中使用...', 
    date: '2023-04-01',
    author: 'Auroral',
    views: 832,
    tags: ['Vue', 'Vue Router'],
    cover: 'https://picsum.photos/600/300?random=2'
  },
  { 
    id: 3, 
    title: 'RESTful API设计精髓：从原则到实践的完全指南', 
    summary: '什么是RESTful API？REST (Representational State Transfer) 是Roy Fielding在2000年博士论文中提出的一种架构风格，用于设计网络应用程序，RESTful API是遵循REST架构的Web应用程序接口。', 
    date: '2023-03-30',
    author: '林莺',
    views: 1560,
    tags: ['REST', 'API设计', 'Java Web'],
    cover: 'https://picsum.photos/600/300?random=3'
  },
  { 
    id: 4, 
    title: 'Spring Boot 微服务架构实践', 
    summary: 'Spring Boot 微服务架构设计与实现：学习构建现代化云原生应用的最佳实践，本文将深入探讨如何利用Spring Boot构建可扩展的微服务系统。', 
    date: '2023-03-27',
    author: '林莺',
    views: 967,
    tags: ['Spring Boot', '微服务'],
    cover: 'https://picsum.photos/600/300?random=4'
  },
  { 
    id: 5, 
    title: 'Vue3 组合式API深入理解', 
    summary: 'Vue3的组合式API（Composition API）提供了一种全新的组织组件逻辑的方式，本文将深入探讨其工作原理和最佳实践。', 
    date: '2023-04-02',
    author: '林莺',
    views: 1201,
    tags: ['Vue3', '前端开发'],
    cover: 'https://picsum.photos/600/300?random=5'
  },
  { 
    id: 6, 
    title: '深入理解JavaScript异步编程', 
    summary: '异步编程是JavaScript的核心特性之一，从回调函数到Promise再到async/await，本文将全面解析JavaScript异步编程的演进历程。', 
    date: '2023-03-25',
    author: '林莺',
    views: 1438,
    tags: ['JavaScript', '异步编程'],
    cover: 'https://picsum.photos/600/300?random=6'
  }
]
</script>

<style scoped>
.article-container {
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

.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.article-card {
  height: 100%;
  transition: transform 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.article-card:hover {
  transform: translateY(-5px);
}

.article-cover {
  height: 180px;
  background-size: cover;
  background-position: center;
  margin: -20px -20px 15px;
}

.article-content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.article-date {
  font-size: 12px;
}

.article-tags {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}

.article-tag {
  font-size: 12px;
}

.article-title {
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

.article-summary {
  color: #606266;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 15px;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  font-size: 13px;
  color: #909399;
}

.article-author, .article-views {
  display: flex;
  align-items: center;
  gap: 5px;
}

@media (max-width: 768px) {
  .article-grid {
    grid-template-columns: 1fr;
  }
}
</style>
  