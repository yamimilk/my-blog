import { ref } from 'vue'
import { articlesData } from './articles'

// 创建存储库，模拟数据库
export const contentStore = {
  // 文章数据
  articles: ref(articlesData),

  // 画廊数据
  gallery: ref([
    {
      id: 1,
      title: '春日花海',
      description: '四月的花海，色彩斑斓',
      imageUrl: 'https://picsum.photos/800/600?random=1',
      tags: ['风景', '春天', '花卉'],
      author: '林莺',
      date: '2023-04-15',
      views: 245
    },
    {
      id: 2,
      title: '城市夜景',
      description: '都市霓虹灯下的繁华夜色',
      imageUrl: 'https://picsum.photos/800/600?random=2',
      tags: ['城市', '夜景', '摄影'],
      author: '林莺',
      date: '2023-03-20',
      views: 187
    },
    {
      id: 3,
      title: '山间小屋',
      description: '远离尘嚣的宁静山居',
      imageUrl: 'https://picsum.photos/800/600?random=3',
      tags: ['风景', '自然', '山水'],
      author: '林莺',
      date: '2023-02-10',
      views: 312
    }
  ]),

  // 视频数据
  videos: ref([
    {
      id: 1,
      title: 'Vue 3 完全指南',
      summary: '从零开始学习Vue 3的全新特性',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      source: 'youtube',
      cover: 'https://picsum.photos/800/450?random=11',
      tags: ['编程', 'Vue', '前端'],
      author: '林莺',
      date: '2023-05-05',
      views: 876
    },
    {
      id: 2,
      title: '中国传统文化之美',
      summary: '探索中国传统文化的精髓和魅力',
      videoUrl: 'https://www.youtube.com/embed/PWmhl6rzVpM',
      source: 'bilibili',
      cover: 'https://picsum.photos/800/450?random=12',
      tags: ['文化', '传统', '中国'],
      author: '林莺',
      date: '2023-04-25',
      views: 543
    },
    {
      id: 3,
      title: '自然摄影技巧分享',
      summary: '如何拍摄出令人惊艳的自然风光照片',
      videoUrl: 'https://www.youtube.com/embed/VSTtjL13SYs',
      source: 'myself',
      cover: 'https://picsum.photos/800/450?random=13',
      tags: ['摄影', '技巧', '自然'],
      author: '林莺',
      date: '2023-03-15',
      views: 421
    }
  ]),

  // 添加新文章
  addArticle(article) {
    // 生成新ID
    const newId = this.articles.value.length > 0 
      ? Math.max(...this.articles.value.map(a => a.id)) + 1 
      : 1
    
    // 构建新文章对象
    const newArticle = {
      id: newId,
      title: article.title,
      summary: article.summary,
      content: article.content,
      tags: article.tags,
      author: article.author,
      date: article.date,
      views: 0,
      cover: article.cover || 'https://picsum.photos/800/400?random=' + newId
    }
    
    // 添加到文章数组
    this.articles.value.unshift(newArticle)
    return newArticle
  },

  // 添加新画廊项目
  addGalleryItem(item) {
    // 生成新ID
    const newId = this.gallery.value.length > 0 
      ? Math.max(...this.gallery.value.map(g => g.id)) + 1 
      : 1
    
    // 构建新画廊项目
    const newGalleryItem = {
      id: newId,
      title: item.title,
      description: item.summary,
      imageUrl: item.imageUrl,
      tags: item.tags,
      author: item.author,
      date: item.date,
      views: 0
    }
    
    // 添加到画廊数组
    this.gallery.value.unshift(newGalleryItem)
    return newGalleryItem
  },

  // 添加新视频
  addVideo(video) {
    // 生成新ID
    const newId = this.videos.value.length > 0 
      ? Math.max(...this.videos.value.map(v => v.id)) + 1 
      : 1
    
    // 构建新视频对象
    const newVideo = {
      id: newId,
      title: video.title,
      summary: video.summary,
      videoUrl: video.videoUrl,
      source: video.videoSource,
      cover: video.cover || 'https://picsum.photos/800/450?random=' + (10 + newId),
      tags: video.tags,
      author: video.author,
      date: video.date,
      views: 0
    }
    
    // 添加到视频数组
    this.videos.value.unshift(newVideo)
    return newVideo
  }
} 