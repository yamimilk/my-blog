<!-- src/components/GalleryList.vue -->
<template>
  <div class="gallery-container">
    <h2 class="section-title">我的画廊</h2>
    
    <div class="gallery-grid">
      <el-card 
        v-for="(item, index) in galleries" 
        :key="index" 
        class="gallery-card" 
        shadow="hover"
      >
        <div class="gallery-image" :style="`background-image: url(${item.img})`"></div>
        <div class="gallery-caption">
          <p class="gallery-text">{{ item.caption }}</p>
          <span class="gallery-date">{{ item.date }}</span>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
// 示例画廊数据，后期可以从后端API获取
const galleries = [
  { 
    id: 1, 
    caption: '日落西山，余晖满天，美不胜收', 
    img: 'https://picsum.photos/800/600?random=1',
    date: '2023-05-15'
  },
  { 
    id: 2, 
    caption: '雨后初晴，空气清新，心旷神怡', 
    img: 'https://picsum.photos/800/600?random=2',
    date: '2023-04-28'
  },
  { 
    id: 3, 
    caption: '春花烂漫，蜂蝶翩跹，岁月静好', 
    img: 'https://picsum.photos/800/600?random=3',
    date: '2023-04-12'
  },
  { 
    id: 4, 
    caption: '雪落无声，银装素裹，宛如仙境', 
    img: 'https://picsum.photos/800/600?random=4',
    date: '2023-03-20'
  },
  { 
    id: 5, 
    caption: '碧海蓝天，椰影婆娑，心灵净地', 
    img: 'https://picsum.photos/800/600?random=5',
    date: '2023-03-05'
  },
  { 
    id: 6, 
    caption: '城市夜景，灯火阑珊，繁华盛世', 
    img: 'https://picsum.photos/800/600?random=6',
    date: '2023-02-18'
  },
  { 
    id: 7, 
    caption: '青山绿水，鸟语花香，恬淡自然', 
    img: 'https://picsum.photos/800/600?random=7',
    date: '2023-02-01'
  },
  { 
    id: 8, 
    caption: '星空璀璨，银河闪烁，浩渺宇宙', 
    img: 'https://picsum.photos/800/600?random=8',
    date: '2023-01-15'
  }
]
</script>

<style scoped>
.gallery-container {
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

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.gallery-card {
  transition: all 0.3s ease;
  overflow: hidden;
}

.gallery-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.gallery-image {
  height: 250px;
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
}

.gallery-card:hover .gallery-image {
  transform: scale(1.05);
}

.gallery-caption {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.gallery-text {
  flex: 1;
  margin: 0;
  font-size: 14px;
  color: #303133;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.gallery-date {
  font-size: 12px;
  color: #909399;
  flex-shrink: 0;
  margin-left: 10px;
}

@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
  
  .gallery-image {
    height: 200px;
  }
}

@media (max-width: 480px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }
}
</style>
  