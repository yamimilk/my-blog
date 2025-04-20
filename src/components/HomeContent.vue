<template>
  <div class="home-content-wrapper">
    <!-- 主内容卡片区域 -->
    <el-row :gutter="20" class="main-grid">
      <el-col :span="8">
        <el-card class="hover-card" shadow="hover">
          <div class="card-content">
            <el-icon class="card-icon"><Document /></el-icon>
            <router-link to="/articles" class="card-link">文章合集</router-link>
            <p class="card-desc">记录技术思考与生活感悟</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="hover-card" shadow="hover">
          <div class="card-content">
            <el-icon class="card-icon"><Picture /></el-icon>
            <router-link to="/gallery" class="card-link">我的画廊</router-link>
            <p class="card-desc">分享生活中的美好瞬间</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="hover-card" shadow="hover">
          <div class="card-content">
            <el-icon class="card-icon"><VideoPlay /></el-icon>
            <router-link to="/videos" class="card-link">收藏视频</router-link>
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
  background: #f5f7fa;
  padding: 40px;
  min-height: calc(100vh - 120px);
}

.main-grid {
  margin-bottom: 40px;
}

.hover-card {
  text-align: center;
  padding: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 12px;
  background: #ffffff;
}

.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.card-icon {
  font-size: 36px;
  color: #409EFF;
  margin-bottom: 8px;
}

.card-link {
  font-size: 24px;
  font-weight: 600;
  color: #303133;
  text-decoration: none;
  transition: color 0.3s ease;
}

.card-link:hover {
  color: #409EFF;
}

.card-desc {
  font-size: 14px;
  color: #909399;
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
  background: #fffbe6;
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
  color: #E6A23C;
}

.memo-text {
  font-size: 16px;
  color: #606266;
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
  background: #ffffff;
}

.log-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.log-title-icon {
  font-size: 22px;
  color: #409EFF;
}

.log-title {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  margin: 0;
}

.log-content {
  padding: 0 10px;
}
</style>
