<template>
  <div class="article-detail">
    <!-- 文章头部 -->
    <div class="article-header">
      <h1 class="article-title">{{ currentArticle?.title }}</h1>
      <div class="article-meta">
        <div class="meta-item">
          <el-icon><Calendar /></el-icon>
          <span>{{ currentArticle?.date }}</span>
        </div>
        <div class="meta-item">
          <el-icon><User /></el-icon>
          <span>{{ currentArticle?.author }}</span>
        </div>
        <div class="meta-item">
          <el-icon><View /></el-icon>
          <span>{{ currentArticle?.views }} 阅读</span>
        </div>
      </div>
      <div class="article-tags">
        <el-tag 
          v-for="tag in currentArticle?.tags" 
          :key="tag" 
          size="small" 
          effect="plain" 
          class="article-tag"
        >
          {{ tag }}
        </el-tag>
      </div>
    </div>

    <!-- 文章封面图 -->
    <div class="article-cover" v-if="currentArticle?.cover">
      <img :src="currentArticle.cover" :alt="currentArticle.title" />
    </div>

    <!-- 文章内容 -->
    <div class="article-content" v-html="currentArticle?.content || currentArticle?.summary"></div>

    <!-- 文章底部 -->
    <div class="article-footer">
      <div class="article-actions">
        <el-button type="primary" plain size="small" @click="handleBack">
          <el-icon><Back /></el-icon> 返回文章列表
        </el-button>
        <el-button type="primary" plain size="small" class="like-btn" :class="{ 'liked': isLiked }" @click="toggleLike">
          <el-icon><Star /></el-icon> {{ isLiked ? '已收藏' : '收藏' }}
        </el-button>
      </div>
    </div>

    <!-- 相关文章推荐 -->
    <div class="related-articles" v-if="relatedArticles.length > 0">
      <h3 class="related-title">相关推荐</h3>
      <div class="related-list">
        <div 
          v-for="article in relatedArticles" 
          :key="article.id" 
          class="related-item"
          @click="loadArticle(article.id)"
        >
          <div class="related-cover" v-if="article.cover" :style="`background-image: url(${article.cover})`"></div>
          <div class="related-info">
            <h4 class="related-article-title">{{ article.title }}</h4>
            <div class="related-meta">
              <span>{{ article.date }}</span>
              <span>{{ article.author }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Calendar, User, View, Back, Star } from '@element-plus/icons-vue'
import { articlesData } from '../data/articles.js' // 直接导入文章数据

const router = useRouter()
const route = useRoute()
const isLiked = ref(false)

// 使用导入的文章数据
const articles = ref(articlesData)

// 获取当前文章ID（从路由参数获取）
const articleId = computed(() => {
  return parseInt(route.params.id) || 1
})

// 获取当前文章
const currentArticle = computed(() => {
  const article = articles.value.find(a => a.id === articleId.value)
  if (!article) return null
  
  // 如果文章没有content属性，我们使用summary作为备用内容
  if (!article.content) {
    article.content = `<p>${article.summary}</p>`
  }
  
  return article
})

// 获取相关文章（基于标签匹配）
const relatedArticles = computed(() => {
  if (!currentArticle.value) return []
  
  const currentTags = currentArticle.value.tags || []
  return articles.value
    .filter(a => a.id !== articleId.value) // 排除当前文章
    .filter(a => a.tags.some(tag => currentTags.includes(tag))) // 至少有一个标签匹配
    .slice(0, 3) // 最多显示3篇
})

// 回到文章列表
const handleBack = () => {
  router.push('/article')
}

// 加载特定文章
const loadArticle = (id) => {
  router.push(`/article/${id}`)
}

// 切换收藏状态
const toggleLike = () => {
  isLiked.value = !isLiked.value
}
</script>

<style scoped>
.article-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px 20px;
  background-color: var(--card-background);
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.article-header {
  margin-bottom: 30px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 20px;
}

.article-title {
  font-size: 28px;
  color: var(--text-color);
  margin: 0 0 20px 0;
  line-height: 1.4;
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 15px;
  color: var(--info-color);
  font-size: 14px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.article-tag {
  font-size: 12px;
}

.article-cover {
  margin-bottom: 30px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.article-cover img {
  width: 100%;
  height: auto;
  display: block;
}

.article-content {
  line-height: 1.8;
  color: var(--text-color);
  font-size: 16px;
}

/* 文章内容中的样式 */
:deep(h2) {
  font-size: 24px;
  margin: 35px 0 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-color);
}

:deep(h3) {
  font-size: 20px;
  margin: 25px 0 15px;
  color: var(--text-color);
}

:deep(p) {
  margin: 16px 0;
  line-height: 1.8;
}

:deep(ul), :deep(ol) {
  margin: 16px 0;
  padding-left: 20px;
}

:deep(li) {
  margin: 8px 0;
}

:deep(pre) {
  background-color: var(--hover-background);
  padding: 15px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 20px 0;
}

:deep(code) {
  font-family: Consolas, Monaco, 'Andale Mono', monospace;
  font-size: 14px;
  color: var(--primary-color);
}

:deep(a) {
  color: var(--primary-color);
  text-decoration: none;
}

:deep(a:hover) {
  text-decoration: underline;
}

:deep(blockquote) {
  border-left: 4px solid var(--primary-color);
  padding: 15px;
  margin: 20px 0;
  background-color: var(--hover-background);
  color: var(--text-color);
}

:deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 15px;
}

:deep(th), :deep(td) {
  border: 1px solid var(--border-color);
  text-align: left;
}

:deep(th) {
  background-color: var(--hover-background);
  font-weight: bold;
}

:deep(.image-container) {
  margin: 30px 0;
  text-align: center;
}

:deep(.image-container img) {
  max-width: 100%;
  border-radius: 6px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
}

:deep(.image-caption) {
  margin-top: 8px;
  color: var(--info-color);
  font-size: 14px;
  font-style: italic;
}

.article-footer {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
}

.article-actions {
  display: flex;
  justify-content: space-between;
}

.like-btn.liked {
  color: var(--danger-color);
}

.related-articles {
  margin-top: 50px;
}

.related-title {
  font-size: 20px;
  margin-bottom: 20px;
  color: var(--text-color);
  position: relative;
  padding-left: 15px;
}

.related-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 18px;
  background: var(--primary-color);
  border-radius: 2px;
}

.related-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.related-item {
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--card-background);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.3s;
}

.related-item:hover {
  transform: translateY(-5px);
}

.related-cover {
  height: 150px;
  background-size: cover;
  background-position: center;
}

.related-info {
  padding: 15px;
}

.related-article-title {
  font-size: 16px;
  margin: 0 0 10px;
  color: var(--text-color);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.related-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--info-color);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .article-detail {
    padding: 20px 15px;
  }
  
  .article-title {
    font-size: 24px;
  }
  
  .related-list {
    grid-template-columns: 1fr;
  }
}
</style>