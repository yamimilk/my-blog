<!-- src/components/VideoList.vue -->
<template>
  <div class="video-container">
    <h2 class="section-title">收藏视频</h2>
    
    <div class="video-grid">
      <el-card 
        v-for="video in videos" 
        :key="video.id" 
        class="video-card" 
        shadow="hover"
        @click="showVideoDetails(video)"
      >
        <div class="video-cover-container">
          <img :src="video.cover" :alt="video.title" class="video-cover" />
          <div class="video-overlay">
            <el-icon class="play-icon"><VideoPlay /></el-icon>
          </div>
          <div class="video-source" :class="video.source">
            {{ getSourceLabel(video.source) }}
          </div>
        </div>
        
        <div class="video-content">
          <h3 class="video-title">{{ video.title }}</h3>
          <p class="video-summary">{{ video.summary }}</p>
          
          <div class="video-meta">
            <div class="meta-info">
              <span class="meta-author">
                <el-icon><User /></el-icon>
                {{ video.author }}
              </span>
              <span class="meta-date">{{ video.date }}</span>
            </div>
            <div class="meta-views">
              <el-icon><View /></el-icon>
              {{ video.views }}
            </div>
          </div>
          
          <div class="video-tags">
            <el-tag 
              v-for="tag in video.tags.slice(0, 3)" 
              :key="tag" 
              size="small" 
              effect="plain" 
              class="video-tag"
            >
              {{ tag }}
            </el-tag>
          </div>
        </div>
      </el-card>
    </div>
    
    <!-- 视频详情弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="selectedVideo?.title"
      width="80%"
      center
      destroy-on-close
    >
      <div class="video-detail-container">
        <div class="video-player-container">
          <iframe 
            class="video-player"
            :src="selectedVideo?.videoUrl" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
          ></iframe>
        </div>
        
        <div class="video-detail-content">
          <h3 class="detail-title">{{ selectedVideo?.title }}</h3>
          <p class="detail-summary">{{ selectedVideo?.summary }}</p>
          
          <div class="detail-meta">
            <div class="detail-source" :class="selectedVideo?.source">
              {{ getSourceLabel(selectedVideo?.source) }}
            </div>
            <div class="detail-author">
              <el-icon><User /></el-icon>
              <span>{{ selectedVideo?.author }}</span>
            </div>
            <div class="detail-date">
              <el-icon><Calendar /></el-icon>
              <span>{{ selectedVideo?.date }}</span>
            </div>
            <div class="detail-views">
              <el-icon><View /></el-icon>
              <span>{{ selectedVideo?.views }} 浏览</span>
            </div>
          </div>
          
          <div class="detail-tags">
            <el-tag
              v-for="tag in selectedVideo?.tags"
              :key="tag"
              effect="plain"
              class="detail-tag"
            >
              {{ tag }}
            </el-tag>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { View, User, Calendar, VideoPlay } from '@element-plus/icons-vue'
import { contentStore } from '../data/store'

// 视频数据
const videos = ref([])

// 详情弹窗相关
const dialogVisible = ref(false)
const selectedVideo = ref(null)

// 显示视频详情
const showVideoDetails = (video) => {
  selectedVideo.value = video
  dialogVisible.value = true
}

// 获取来源标签
const getSourceLabel = (source) => {
  const sourceMap = {
    'myself': '原创',
    'youtube': 'YouTube',
    'bilibili': 'B站',
    'other': '其他'
  }
  return sourceMap[source] || '未知'
}

// 从store加载视频数据
onMounted(() => {
  videos.value = contentStore.videos.value
})
</script>

<style scoped>
.video-container {
  padding: 20px;
}

.section-title {
  margin-bottom: 30px;
  font-size: 28px;
  color: var(--text-color);
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
  background: var(--primary-color);
  border-radius: 2px;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 25px;
}

.video-card {
  height: 100%;
  transition: all 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.video-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.video-cover-container {
  height: 180px;
  position: relative;
  overflow: hidden;
  margin: -20px -20px 15px;
}

.video-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.video-card:hover .video-cover {
  transform: scale(1.05);
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.video-card:hover .video-overlay {
  opacity: 1;
}

.play-icon {
  font-size: 50px;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-source {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  color: white;
}

.video-source.myself {
  background-color: #67c23a;
}

.video-source.youtube {
  background-color: #f56c6c;
}

.video-source.bilibili {
  background-color: #409eff;
}

.video-source.other {
  background-color: #909399;
}

.video-content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.video-title {
  margin: 0 0 10px;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-color);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 2.8em;
}

.video-summary {
  color: var(--info-color);
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 15px;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.video-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 13px;
  color: var(--info-color);
}

.meta-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.meta-author, .meta-date, .meta-views {
  display: flex;
  align-items: center;
  gap: 5px;
}

.video-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
}

.video-tag {
  font-size: 11px;
}

/* 详情弹窗样式 */
.video-detail-container {
  display: flex;
  flex-direction: column;
}

.video-player-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  margin-bottom: 20px;
}

.video-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.video-detail-content {
  padding: 0;
}

.detail-title {
  font-size: 24px;
  margin-bottom: 15px;
  color: var(--text-color);
}

.detail-summary {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
  color: var(--text-color);
}

.detail-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
  color: var(--info-color);
}

.detail-source {
  padding: 2px 10px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  color: white;
}

.detail-source.myself {
  background-color: #67c23a;
}

.detail-source.youtube {
  background-color: #f56c6c;
}

.detail-source.bilibili {
  background-color: #409eff;
}

.detail-source.other {
  background-color: #909399;
}

.detail-author, .detail-date, .detail-views {
  display: flex;
  align-items: center;
  gap: 5px;
}

.detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.detail-tag {
  font-size: 13px;
}

@media (max-width: 768px) {
  .video-grid {
    grid-template-columns: 1fr;
  }
}
</style>
  