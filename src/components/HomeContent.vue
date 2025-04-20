<template>
    <div class="home-content-wrapper">
        <ArticleList/>
        <GalleryList/>
        <VideoList/>
    </div>
</template>

<script setup>
import ArticleList from './ArticleList.vue';
import GalleryList from './GalleryList.vue';
import VideoList from './VideoList.vue';
</script>

<style scoped>
.home-content-wrapper {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 20px;
}
</style>