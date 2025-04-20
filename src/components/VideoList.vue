<!-- src/components/VideoList.vue -->
<template>
    <div class="video-list">
      <h2 class="section-title">🎬 视频</h2>
      <div class="video-grid">
        <el-card
          v-for="(item, index) in videos"
          :key="index"
          shadow="hover"
          class="video-card"
        >
          <iframe
            :src="item.url"
            frameborder="0"
            allowfullscreen
            class="video-frame"
          ></iframe>
          <div style="padding: 12px;">
            <span>{{ item.title }}</span>
          </div>
        </el-card>
      </div>
    </div>
  </template>
  
  <script setup>
  const videos = [
    {
      title: 'Vue3 入门教程',
      url: 'https://www.youtube.com/embed/FXpIoQ_rT_c',
    },
    {
      title: '前端部署技巧',
      url: 'https://www.youtube.com/embed/1Z3oLe0Lrwg',
    },
    {
      title: '我的学习Vlog',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
  ]
  </script>
  
  <style scoped>
  .video-list {
    width: 32%;
  }
  .section-title {
    font-size: 18px;
    margin-bottom: 12px;
    font-weight: bold;
  }
  .video-grid {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .video-frame {
    width: 100%;
    height: 180px;
    border-radius: 6px;
  }
  .video-card {
    overflow: hidden;
  }
  </style>
  