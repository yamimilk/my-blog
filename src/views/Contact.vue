<template>
  <!-- 这个页面只是一个占位符，实际上会自动打开联系对话框 -->
  <div></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { inject } from 'vue'
import mitt from 'mitt'

const router = useRouter()
const emitter = inject('emitter')

// 组件挂载时触发打开联系对话框
onMounted(() => {
  // 通过事件总线触发打开联系对话框
  emitter.emit('openContactDialog')
  // 将用户路由重定向到首页，但不会影响导航栏的高亮状态
  setTimeout(() => {
    router.replace('/home')
  }, 10)
})
</script> 