<template>
  <router-view/>
</template>

<script setup>
import { ref } from 'vue';
import UserCard from './components/HomeContent.vue';

const activeMenu = ref('/')
</script>