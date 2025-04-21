<template>
  <div class="article-container">
    <h2 class="section-title">文章合集</h2>
    
    <div class="article-grid">
      <el-card 
        v-for="article in articles" 
        :key="article.id" 
        class="article-card" 
        shadow="hover"
        @click="navigateToArticle(article.id)"
      >
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
import { useRouter } from 'vue-router'
import { articlesData } from '../data/articles'
import { ref } from 'vue'

const router = useRouter()
// 使用导入的文章数据
const articles = ref(articlesData)

// 导航到文章详情页
const navigateToArticle = (articleId) => {
  router.push(`/article/${articleId}`)
}
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
  transition: transform 0.3s ease, box-shadow 0.3s;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.article-cover {
  height: 180px;
  background-size: cover;
  background-position: center;
  margin: -20px -20px 15px;
  transition: transform 0.3s;
}

.article-card:hover .article-cover {
  transform: scale(1.05);
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
  transition: color 0.3s;
}

.article-card:hover .article-title {
  color: var(--primary-color, #409EFF);
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
  