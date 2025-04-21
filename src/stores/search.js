import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// 示例文章数据，后期应从数据库获取
const demoArticles = [
  { 
    id: 1, 
    title: 'Git提交规范：提升团队协作与项目质量的必备实践', 
    summary: 'Git提交规范：提升团队协作与项目质量的必备实践在软件开发过程中，版本控制是确保项目稳定性和协作效率的关键环节，Git作为目前最流行的版本控制系统，其提交信息(commit message)的规范化对于项目的可维护性至关重要。', 
    date: '2023-03-27',
    author: '林莺',
    tags: ['Git', '团队协作']
  },
  { 
    id: 2, 
    title: 'Vue中Vue Router中静态导入与动态导入的奇妙关系', 
    summary: '构建理想的开发环境开发个人博客的过程中，发现了一个有趣的现象：当我在router/index.js文件中删除预先的静态导入操作后，页面布局出现了问题，我在路由配置中使用...', 
    date: '2023-04-01',
    author: '林莺',
    tags: ['Vue', 'Vue Router']
  },
  { 
    id: 3, 
    title: 'RESTful API设计精髓：从原则到实践的完全指南', 
    summary: '什么是RESTful API？REST (Representational State Transfer) 是Roy Fielding在2000年博士论文中提出的一种架构风格，用于设计网络应用程序，RESTful API是遵循REST架构的Web应用程序接口。', 
    date: '2023-03-30',
    author: '林莺',
    tags: ['REST', 'API设计', 'Java Web']
  },
  { 
    id: 4, 
    title: 'Spring Boot 微服务架构实践', 
    summary: 'Spring Boot 微服务架构设计与实现：学习构建现代化云原生应用的最佳实践，本文将深入探讨如何利用Spring Boot构建可扩展的微服务系统。', 
    date: '2023-03-27',
    author: '林莺',
    tags: ['Spring Boot', '微服务']
  },
  { 
    id: 5, 
    title: 'Vue3 组合式API深入理解', 
    summary: 'Vue3的组合式API（Composition API）提供了一种全新的组织组件逻辑的方式，本文将深入探讨其工作原理和最佳实践。', 
    date: '2023-04-02',
    author: '林莺',
    tags: ['Vue3', '前端开发']
  },
  { 
    id: 6, 
    title: '深入理解JavaScript异步编程', 
    summary: '异步编程是JavaScript的核心特性之一，从回调函数到Promise再到async/await，本文将全面解析JavaScript异步编程的演进历程。', 
    date: '2023-03-25',
    author: '林莺',
    tags: ['JavaScript', '异步编程']
  }
]

export const useSearch = defineStore('search', () => {
  const keyword = ref('')
  const showResults = ref(false)
  const articles = ref(demoArticles)

  const searchResults = computed(() => {
    if (!keyword.value.trim()) return []
    return articles.value.filter(article => 
      article.title.toLowerCase().includes(keyword.value.toLowerCase())
    )
  })

  const setKeyword = (value) => {
    keyword.value = value
  }

  const toggleShowResults = (value) => {
    showResults.value = value
  }

  return {
    keyword,
    showResults,
    articles,
    searchResults,
    setKeyword,
    toggleShowResults
  }
}) 