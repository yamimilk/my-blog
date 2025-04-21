<template>
  <div class="home-content-wrapper">
    <!-- 主内容卡片区域 -->
    <el-row :gutter="20" class="main-grid">
      <el-col :span="8">
        <el-card class="hover-card" shadow="hover" @click="navigateTo('/article')">
          <div class="card-content">
            <el-icon class="card-icon"><Document /></el-icon>
            <div class="card-link">文章合集</div>
            <p class="card-desc">记录技术思考与生活感悟</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="hover-card" shadow="hover" @click="navigateTo('/gallery')">
          <div class="card-content">
            <el-icon class="card-icon"><Picture /></el-icon>
            <div class="card-link">我的画廊</div>
            <p class="card-desc">分享生活中的美好瞬间</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="hover-card" shadow="hover" @click="navigateTo('/videos')">
          <div class="card-content">
            <el-icon class="card-icon"><VideoPlay /></el-icon>
            <div class="card-link">收藏视频</div>
            <p class="card-desc">精选值得一看的视频内容</p>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 备忘录区域 -->
    <!-- <div class="memo-wrapper">
      <el-card class="memo-card" shadow="always">
        <div class="memo-content">
          <el-icon class="memo-icon"><Edit /></el-icon>
          <span class="memo-text">今天要完成：设计画廊页面、备忘录样式优化...</span>
        </div>
      </el-card>
    </div> -->

    <!-- 日志记录区域 -->
    <div class="log-wrapper">
      <el-card class="log-card" shadow="hover">
        <div class="log-header">
          <el-icon class="log-title-icon"><Calendar /></el-icon>
          <h3 class="log-title">最近动态</h3>
        </div>
        <div class="log-content">
          <el-scrollbar height="300px">
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :type="activity.type"
                :color="activity.color"
                :timestamp="activity.timestamp"
                :hollow="activity.hollow"
              >
                {{ activity.content }}
              </el-timeline-item>
            </el-timeline>
          </el-scrollbar>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { Document, Picture, VideoPlay, Edit, Calendar } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 导航函数
const navigateTo = (path) => {
  router.push(path)
}

// 示例日志数据
const activities = ref([
  {
    content: '发布了新文章《Vue3 组合式 API 最佳实践》',
    timestamp: '2023-06-28',
    type: 'primary',
    color: '#409EFF'
  },
  {
    content: '更新了个人画廊',
    timestamp: '2023-06-25',
    type: 'success',
    color: '#67C23A'
  },
  {
    content: '添加了新的视频收藏《Element Plus 完全指南》',
    timestamp: '2023-06-20',
    type: 'warning',
    color: '#E6A23C',
    hollow: true
  },
  {
    content: '完成了博客改版',
    timestamp: '2023-06-15',
    type: 'info',
    color: '#909399'
  },
  {
    content: '发布了新文章《CSS Grid 布局详解》',
    timestamp: '2023-06-10',
    type: 'primary',
    color: '#409EFF'
  },
  {
    content: '参加了线上技术分享会',
    timestamp: '2023-06-05',
    type: 'success',
    color: '#67C23A',
    hollow: true
  },
  {
    content: '更新了个人简介',
    timestamp: '2023-06-01',
    type: 'info',
    color: '#909399'
  },
])
</script>

<style scoped>
.home-content-wrapper {
  background-color: var(--background-color);
  padding: 40px;
  min-height: calc(100vh - 120px);
  transition: background-color 0.3s;
}

.main-grid {
  margin-bottom: 40px;
}

.hover-card {
  /* 保留原样式 */
  text-align: center;
  padding: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 16px; /* 稍微大一点的圆角 */
  background-color: var(--card-background);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05); /* 添加浅浅边框 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); /* 基础阴影 */

  /* 增强立体感 */
  backdrop-filter: blur(4px);
  background: linear-gradient(145deg, rgba(255,255,255,0.8), rgba(240,240,240,0.9));
}

.hover-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12); /* 更浓阴影 */
  border-color: var(--primary-color); /* hover 时强调边框 */
  background: linear-gradient(145deg, rgba(255,255,255,0.95), rgba(240,240,240,1));
}


.hover-card:hover .card-link {
  color: var(--primary-color);
}

.hover-card:active {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.hover-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, transparent 0%, transparent 50%, rgba(var(--primary-color-rgb), 0.05) 50%, rgba(var(--primary-color-rgb), 0.05) 100%);
  /* opacity: 0; */
  transition: opacity 0.3s ease;
  z-index: 0;
}

.hover-card:hover::before {
  opacity: 1;
}

/* 添加点击波纹效果 */
.hover-card::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(var(--primary-color-rgb), 0.3);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%, -50%);
  transform-origin: 50% 50%;
  z-index: 0;
}

.hover-card:active::after {
  opacity: 1;
  animation: ripple 0.4s ease-out;
}

@keyframes ripple {
  0% {
    transform: scale(0, 0) translate(-50%, -50%);
    opacity: 0.5;
  }
  100% {
    transform: scale(30, 30) translate(-50%, -50%);
    opacity: 0;
  }
}

.card-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.card-icon {
  font-size: 36px;
  color: var(--primary-color);
  margin-bottom: 8px;
}

.card-link {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-color);
  text-decoration: none;
  transition: color 0.3s ease;
  position: relative;
  display: inline-block;
  padding-bottom: 2px;
}

.card-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 50%;
  background-color: var(--primary-color);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.hover-card:hover .card-link::after {
  width: 70%;
}

.card-link:hover {
  color: var(--primary-color);
}

.card-desc {
  font-size: 14px;
  color: var(--info-color);
  margin: 0;
}

.memo-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.memo-card {
  width: 80%;
  border-radius: 12px;
  padding: 20px 30px;
  background-color: var(--card-background);
  border: none;
}

.memo-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.memo-icon {
  font-size: 20px;
  color: var(--warning-color);
}

.memo-text {
  font-size: 16px;
  color: var(--text-color);
}

/* 日志区域样式 */
.log-wrapper {
  display: flex;
  justify-content: center;
}

.log-card {
  width: 80%;
  border-radius: 12px;
  padding: 20px;
  background-color: var(--card-background);
}

.log-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.log-title-icon {
  font-size: 22px;
  color: var(--primary-color);
}

.log-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-color);
  margin: 0;
}

.log-content {
  padding: 0 10px;
}
</style>
