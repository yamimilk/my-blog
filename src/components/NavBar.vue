<template>
   <el-header class="nav-bar">
     <!-- 博客名 -->
     <div class="logo">MYBLOG</div>
 
     <!-- 中间导航区域 -->
     <div class="nav-center">
       <el-input
         placeholder="搜索文章"
         size="small"
         prefix-icon="Search"
         class="search-box"
       />
 
       <el-menu
         mode="horizontal"
         class="el-menu-demo"
         @select="handleSelect"
         router 
         :default-active="$route.path"
         :ellipsis="false"
       >
         <el-menu-item index="/home">首页</el-menu-item>
         <el-menu-item index="#">设置</el-menu-item>
         <el-menu-item index="#">联系我</el-menu-item>
         <el-menu-item index="#">暗黑模式</el-menu-item>
       </el-menu>
     </div>
 
     <!-- 右侧头像及下拉菜单 -->
     <div class="nav-right">
       <el-dropdown trigger="click">
         <el-avatar size="small" :src="userProfile.avatar" />
         <template #dropdown>
           <el-dropdown-menu>
             <el-dropdown-item @click="handleUserProfile">
               <el-icon><User /></el-icon> 个人信息
             </el-dropdown-item>
             <el-dropdown-item @click="handleLogout">
               <el-icon><SwitchButton /></el-icon> 退出登录
             </el-dropdown-item>
           </el-dropdown-menu>
         </template>
       </el-dropdown>
     </div>
   </el-header>
 </template>
 
 <script setup>
 import { ref } from 'vue'
 import { useRouter } from 'vue-router'
 import { Search, User, SwitchButton } from '@element-plus/icons-vue'
 import { userProfile } from '../stores/userProfile'
 import { useAuth } from '../stores/auth'
 import { ElMessageBox } from 'element-plus'
 
 const router = useRouter()
 const auth = useAuth()
 const activeIndex = ref('/')
 
 const handleSelect = (key) => {
   activeIndex.value = key
   router.push(key)
 }
 
 const handleUserProfile = () => {
   router.push('/profile')
 }
 
 const handleLogout = async () => {
   try {
     await ElMessageBox.confirm(
       '确定要退出登录吗？',
       '提示',
       {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }
     )
     
     // 执行登出
     auth.logout()
     
     // 跳转到登录页
     router.push('/login')
   } catch {
     // 用户取消了确认
   }
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
   flex-shrink: 0;
   margin-right: 20px;
 }
 .nav-center {
   display: flex;
   align-items: center;
   justify-content: space-between;
   flex: 1;
   margin: 0 40px;
   overflow: visible;
   flex-direction: row-reverse
 }
 .search-box {
   width: 200px;
   margin-left: 20px;
   flex-shrink: 0;
 }
 .nav-right {
   display: flex;
   align-items: center;
   gap: 12px;
   flex-shrink: 0;
   cursor: pointer;
   margin-left: 20px;
 }
 .el-dropdown-menu__item {
   display: flex;
   align-items: center;
   gap: 5px;
 }
 .el-menu-demo {
   border-bottom: none !important;
   flex-grow: 1;
   white-space: nowrap;
   min-width: 400px;
 }
 .el-menu-item {
   font-size: 14px;
   padding: 0 15px !important;
 }
 </style>
 