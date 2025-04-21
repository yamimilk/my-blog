<!-- src/components/GalleryList.vue -->
<template>
  <div class="gallery-container">
    <h2 class="section-title">我的画廊</h2>
    
    <div class="gallery-grid">
      <el-card 
        v-for="item in galleryItems" 
        :key="item.id" 
        class="gallery-card" 
        shadow="hover"
        @click="showImageDetails(item)"
      >
        <div class="gallery-img-container">
          <img :src="item.imageUrl" :alt="item.title" class="gallery-img" />
        </div>
        
        <div class="gallery-content">
          <h3 class="gallery-title">{{ item.title }}</h3>
          <p class="gallery-desc">{{ item.description }}</p>
          
          <div class="gallery-meta">
            <div class="meta-tags">
              <el-tag 
                v-for="tag in item.tags.slice(0, 2)" 
                :key="tag" 
                size="small" 
                effect="plain" 
                class="meta-tag"
              >
                {{ tag }}
              </el-tag>
              <span v-if="item.tags.length > 2" class="more-tags">+{{ item.tags.length - 2 }}</span>
            </div>
            <div class="meta-info">
              <span class="meta-date">{{ item.date }}</span>
              <span class="meta-views">
                <el-icon><View /></el-icon>
                {{ item.views }}
              </span>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    
    <!-- 图片详情弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="selectedItem?.title"
      width="70%"
      center
      destroy-on-close
    >
      <div class="image-detail-container">
        <img :src="selectedItem?.imageUrl" :alt="selectedItem?.title" class="detail-image" />
        
        <div class="detail-content">
          <h3 class="detail-title">{{ selectedItem?.title }}</h3>
          <p class="detail-desc">{{ selectedItem?.description }}</p>
          
          <div class="detail-meta">
            <div class="detail-author">
              <el-icon><User /></el-icon>
              <span>{{ selectedItem?.author }}</span>
            </div>
            <div class="detail-date">
              <el-icon><Calendar /></el-icon>
              <span>{{ selectedItem?.date }}</span>
            </div>
            <div class="detail-views">
              <el-icon><View /></el-icon>
              <span>{{ selectedItem?.views }} 浏览</span>
            </div>
          </div>
          
          <div class="detail-tags">
            <el-tag
              v-for="tag in selectedItem?.tags"
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
import { View, User, Calendar } from '@element-plus/icons-vue'
import { contentStore } from '../data/store'

// 画廊数据
const galleryItems = ref([])

// 详情弹窗相关
const dialogVisible = ref(false)
const selectedItem = ref(null)

// 显示图片详情
const showImageDetails = (item) => {
  selectedItem.value = item
  dialogVisible.value = true
}

// 从store加载画廊数据
onMounted(() => {
  galleryItems.value = contentStore.gallery.value
})
</script>

<style scoped>
.gallery-container {
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

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.gallery-card {
  height: 100%;
  transition: all 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.gallery-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.gallery-img-container {
  height: 200px;
  overflow: hidden;
  margin: -20px -20px 15px;
  position: relative;
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.gallery-card:hover .gallery-img {
  transform: scale(1.05);
}

.gallery-content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.gallery-title {
  margin: 0 0 10px;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-color);
  line-height: 1.4;
}

.gallery-desc {
  color: var(--info-color);
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 15px;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.gallery-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  font-size: 12px;
}

.meta-tags {
  display: flex;
  align-items: center;
  gap: 5px;
}

.meta-tag {
  font-size: 11px;
}

.more-tags {
  font-size: 11px;
  color: var(--info-color);
}

.meta-info {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--info-color);
}

.meta-views {
  display: flex;
  align-items: center;
  gap: 3px;
}

/* 详情弹窗样式 */
.image-detail-container {
  display: flex;
  flex-direction: column;
}

.detail-image {
  width: 100%;
  max-height: 60vh;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 20px;
}

.detail-content {
  padding: 20px 0;
}

.detail-title {
  font-size: 22px;
  margin-bottom: 15px;
  color: var(--text-color);
}

.detail-desc {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
  color: var(--text-color);
}

.detail-meta {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  color: var(--info-color);
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

@media (min-width: 768px) {
  .image-detail-container {
    flex-direction: row;
    gap: 30px;
  }
  
  .detail-image {
    width: 50%;
    margin-bottom: 0;
  }
  
  .detail-content {
    width: 50%;
    padding: 0;
  }
}

@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }
}
</style>
  