<template>
   <el-header class="nav-bar">
     <!-- 博客名 -->
     <div class="logo">MYBLOG</div>
 
     <!-- 中间导航区域 -->
     <div class="nav-center">
       <el-input
         placeholder="搜索文章"
         size="small"
         prefix-icon="el-icon-search"
         class="search-box"
       />
 
       <el-menu
         mode="horizontal"
         class="el-menu-demo"
         @select="handleSelect"
         router 
         :default-active="$route.path"
       >
         <el-menu-item index="/home">首页</el-menu-item>
         <el-menu-item index="#">关于</el-menu-item>
         <el-menu-item index="#">设置</el-menu-item>
         <el-menu-item index="#">暗黑模式</el-menu-item>
       </el-menu>
     </div>
 
     <!-- 右侧图标 -->
     <div class="nav-right">
       <el-tooltip content="RSS订阅">
         <el-button type="link" icon="el-icon-sugar" />
       </el-tooltip>
       <el-tooltip content="设置">
         <el-button type="link" icon="el-icon-setting" />
       </el-tooltip>
       <el-avatar size="small" src="https://your-avatar.jpg" />
     </div>
   </el-header>
 </template>
 
 <script setup>
 import { ref } from 'vue'
 import { useRouter } from 'vue-router'
 
 const router = useRouter()
 const activeIndex = ref('/')
 
 const handleSelect = (key) => {
   activeIndex.value = key
   router.push(key)
 }
 </script>
 
 <style scoped>
 .nav-bar {
   display: flex;
   align-items: center;
   justify-content: space-between;
   height: 60px;
   background: white;
   padding: 0 20px;
   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
   z-index: 1000;
 }
 .logo {
   font-size: 20px;
   font-weight: bold;
 }
 .nav-center {
   display: flex;
   flex-direction: row-reverse;
   align-items: center;
   flex: 1;
   margin: 0 40px;
 }
 .search-box {
   width: 200px;
   margin-right: 20px;
 }
 .nav-right {
   display: flex;
   align-items: center;
   gap: 12px;
 }
 </style>
 