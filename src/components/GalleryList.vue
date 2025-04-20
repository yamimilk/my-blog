<!-- src/components/GalleryList.vue -->
<template>
    <div class="gallery-list">
      <h2 class="section-title">📸 画集</h2>
      <div class="gallery-grid">
        <el-card
          v-for="(item, index) in galleries"
          :key="index"
          :body-style="{ padding: '0px' }"
          shadow="hover"
          class="gallery-card"
        >
          <img :src="item.img" class="gallery-img" />
          <div style="padding: 14px;">
            <span>{{ item.title }}</span>
          </div>
        </el-card>
      </div>
    </div>
  </template>
  
  <script setup>
  const galleries = [
    { title: '山川湖海', img: 'https://picsum.photos/300/200?random=1' },
    { title: '夏日黄昏', img: 'https://picsum.photos/300/200?random=2' },
    { title: '深林探秘', img: 'https://picsum.photos/300/200?random=3' },
  ]
  </script>
  
  <style scoped>
  .gallery-list {
    width: 32%;
  }
  .section-title {
    font-size: 18px;
    margin-bottom: 12px;
    font-weight: bold;
  }
  .gallery-grid {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .gallery-img {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }
  .gallery-card {
    cursor: pointer;
  }
  </style>
  