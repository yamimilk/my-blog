<template>
    <div class="content-card">
      <h3>文章</h3>
      <div v-for="article in articles" :key="article.id" class="card">
        <h4>{{ article.title }}</h4>
        <p>{{ article.summary }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  const articles = [
    { id: 1, title: 'Vue学习笔记', summary: '介绍响应式系统的基本原理' },
    { id: 2, title: 'SpringBoot初体验', summary: '快速搭建后台服务接口' },
  ]
  </script>
  
  <style scoped>
  .content-card {
    flex: 1;
    background: #fff;
    padding: 16px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }
  .card {
    margin-bottom: 16px;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  </style>
  