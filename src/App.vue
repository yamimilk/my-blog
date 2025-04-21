<template>
  <div class="app-container">
    <router-view/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useTheme } from './stores/theme';
import UserCard from './components/HomeContent.vue';

const themeStore = useTheme();
const isDark = themeStore.isDark;

const activeMenu = ref('/')
</script>

<style>
:root {
  --background-color: #ffffff;
  --text-color: #333333;
  --border-color: #e0e0e0;
  --card-background: #ffffff;
  --hover-background: #f5f5f5;
}

:root.dark {
  --background-color: #1a1a1a;
  --text-color: #f0f0f0;
  --border-color: #444444;
  --card-background: #2a2a2a;
  --hover-background: #383838;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--background-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
}

html, body {
  height: 100%;
}

.app-container {
  min-height: 100vh;
}
</style>