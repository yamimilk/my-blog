<template>
  <div class="upload-container">
    <h2 class="section-title">发布内容</h2>
    
    <el-form :model="uploadForm" label-position="top" :rules="rules" ref="uploadFormRef">
      <!-- 分类选择 -->
      <el-form-item label="内容分类" prop="category">
        <el-radio-group v-model="uploadForm.category" class="category-group">
          <el-radio-button label="article">文章</el-radio-button>
          <el-radio-button label="gallery">图片</el-radio-button>
          <el-radio-button label="video">视频</el-radio-button>
        </el-radio-group>
      </el-form-item>
      
      <!-- 标题 -->
      <el-form-item label="标题" prop="title">
        <el-input v-model="uploadForm.title" placeholder="请输入标题" />
      </el-form-item>
      
      <!-- 引言/描述 -->
      <el-form-item label="引言/描述" prop="summary">
        <el-input 
          v-model="uploadForm.summary" 
          type="textarea" 
          :autosize="{ minRows: 3, maxRows: 6 }" 
          placeholder="请输入内容描述或引言" 
        />
      </el-form-item>
      
      <!-- 标签 -->
      <el-form-item label="标签">
        <el-tag
          v-for="tag in uploadForm.tags"
          :key="tag"
          closable
          :disable-transitions="false"
          @close="handleTagClose(tag)"
          class="tag-item"
        >
          {{ tag }}
        </el-tag>
        <el-input
          v-if="tagInputVisible"
          ref="tagInputRef"
          v-model="tagInput"
          class="tag-input"
          size="small"
          @keyup.enter="handleTagConfirm"
          @blur="handleTagConfirm"
        />
        <el-button v-else class="button-new-tag" size="small" @click="showTagInput">
          + 添加标签
        </el-button>
      </el-form-item>
      
      <!-- 文章/图片/视频特定选项 -->
      <div v-if="uploadForm.category === 'article'" class="category-specific">
        <el-form-item label="文章内容" prop="content">
          <el-input 
            v-model="uploadForm.content" 
            type="textarea" 
            :autosize="{ minRows: 10, maxRows: 20 }" 
            placeholder="请输入文章内容，支持基础HTML格式" 
          />
        </el-form-item>
      </div>
      
      <div v-if="uploadForm.category === 'gallery'" class="category-specific">
        <el-form-item label="上传图片" prop="imageUrl">
          <el-upload
            class="image-uploader"
            action="#"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handleImageChange"
          >
            <img v-if="uploadForm.imageUrl" :src="uploadForm.imageUrl" class="preview-image" />
            <el-icon v-else class="image-uploader-icon"><Plus /></el-icon>
          </el-upload>
          <div class="upload-tip">点击上传图片，支持jpg、png、gif格式</div>
        </el-form-item>
      </div>
      
      <div v-if="uploadForm.category === 'video'" class="category-specific">
        <el-form-item label="视频链接" prop="videoUrl">
          <el-input v-model="uploadForm.videoUrl" placeholder="请输入视频链接" />
        </el-form-item>
        <el-form-item label="视频来源">
          <el-radio-group v-model="uploadForm.videoSource">
            <el-radio label="myself">自己的作品</el-radio>
            <el-radio label="youtube">YouTube</el-radio>
            <el-radio label="bilibili">哔哩哔哩</el-radio>
            <el-radio label="other">其他来源</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      
      <!-- 封面图 -->
      <el-form-item label="封面图">
        <el-upload
          class="cover-uploader"
          action="#"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="handleCoverChange"
        >
          <img v-if="uploadForm.cover" :src="uploadForm.cover" class="preview-cover" />
          <el-icon v-else class="cover-uploader-icon"><Picture /></el-icon>
        </el-upload>
        <div class="upload-tip">添加封面图可以让内容更吸引人</div>
      </el-form-item>
      
      <!-- 发布按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm(uploadFormRef)" :loading="loading">发布内容</el-button>
        <el-button @click="resetForm(uploadFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
    
    <!-- 成功提示 -->
    <el-dialog
      v-model="successDialogVisible"
      title="发布成功"
      width="30%"
      center
    >
      <span>您的{{ categoryText }}已成功发布！</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="viewContent">查看内容</el-button>
          <el-button type="primary" @click="newUpload">
            继续上传
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from 'vue'
import { Plus, Picture } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { contentStore } from '../data/store' // 导入内容存储

const router = useRouter()

// 表单引用
const uploadFormRef = ref(null)
const loading = ref(false)
const successDialogVisible = ref(false)

// 标签输入
const tagInputRef = ref(null)
const tagInput = ref('')
const tagInputVisible = ref(false)

// 表单数据
const uploadForm = ref({
  category: 'article',
  title: '',
  summary: '',
  content: '',
  tags: [],
  imageUrl: '',
  videoUrl: '',
  videoSource: 'myself',
  cover: '',
  author: '林莺',
  date: ''
})

// 表单验证规则
const rules = {
  category: [{ required: true, message: '请选择内容分类', trigger: 'change' }],
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  summary: [{ required: true, message: '请输入引言或描述', trigger: 'blur' }],
  content: [{ 
    required: true, 
    message: '请输入文章内容', 
    trigger: 'blur',
    validator: (rule, value, callback) => {
      if (uploadForm.value.category === 'article' && !value) {
        callback(new Error('请输入文章内容'))
      } else {
        callback()
      }
    }
  }],
  imageUrl: [{ 
    validator: (rule, value, callback) => {
      if (uploadForm.value.category === 'gallery' && !value) {
        callback(new Error('请上传图片'))
      } else {
        callback()
      }
    }, 
    trigger: 'change' 
  }],
  videoUrl: [{ 
    validator: (rule, value, callback) => {
      if (uploadForm.value.category === 'video' && !value) {
        callback(new Error('请输入视频链接'))
      } else {
        callback()
      }
    }, 
    trigger: 'blur' 
  }]
}

// 处理标签输入相关函数
const showTagInput = () => {
  tagInputVisible.value = true
  nextTick(() => {
    tagInputRef.value.input.focus()
  })
}

const handleTagClose = (tag) => {
  uploadForm.value.tags = uploadForm.value.tags.filter(t => t !== tag)
}

const handleTagConfirm = () => {
  if (tagInput.value) {
    if (uploadForm.value.tags.length >= 5) {
      ElMessage.warning('最多只能添加5个标签')
    } else if (!uploadForm.value.tags.includes(tagInput.value)) {
      uploadForm.value.tags.push(tagInput.value)
    }
  }
  tagInputVisible.value = false
  tagInput.value = ''
}

// 文件上传处理函数
const handleImageChange = (file) => {
  // 模拟上传，实际情况应该是上传到服务器获取URL
  const reader = new FileReader()
  reader.readAsDataURL(file.raw)
  reader.onload = () => {
    uploadForm.value.imageUrl = reader.result
  }
}

const handleCoverChange = (file) => {
  const reader = new FileReader()
  reader.readAsDataURL(file.raw)
  reader.onload = () => {
    uploadForm.value.cover = reader.result
  }
}

// 返回分类的中文名称
const categoryText = computed(() => {
  const map = {
    article: '文章',
    gallery: '图片',
    video: '视频'
  }
  return map[uploadForm.value.category] || '内容'
})

// 获取当前日期
const getCurrentDate = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 提交表单
const submitForm = async (formEl) => {
  if (!formEl) return
  
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading.value = true
      
      // 设置发布日期
      uploadForm.value.date = getCurrentDate()
      
      // 模拟提交到后端
      setTimeout(() => {
        // 根据分类添加到对应的存储
        let addedContent
        switch(uploadForm.value.category) {
          case 'article':
            // 添加到文章数据
            addedContent = addNewArticle()
            break
          case 'gallery':
            // 添加到画廊数据
            addedContent = addNewGallery()
            break
          case 'video':
            // 添加到视频数据
            addedContent = addNewVideo()
            break
        }
        
        console.log('添加的内容:', addedContent)
        loading.value = false
        successDialogVisible.value = true
      }, 1500)
    } else {
      console.log('验证失败', fields)
    }
  })
}

// 添加新文章
const addNewArticle = () => {
  // 使用contentStore添加文章
  return contentStore.addArticle(uploadForm.value)
}

// 添加新画廊图片
const addNewGallery = () => {
  // 使用contentStore添加画廊项目
  return contentStore.addGalleryItem(uploadForm.value)
}

// 添加新视频
const addNewVideo = () => {
  // 使用contentStore添加视频
  return contentStore.addVideo(uploadForm.value)
}

// 重置表单
const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
  uploadForm.value = {
    category: 'article',
    title: '',
    summary: '',
    content: '',
    tags: [],
    imageUrl: '',
    videoUrl: '',
    videoSource: 'myself',
    cover: '',
    author: '林莺',
    date: ''
  }
}

// 查看上传的内容
const viewContent = () => {
  const path = `/${uploadForm.value.category}`
  successDialogVisible.value = false
  router.push(path)
}

// 继续上传
const newUpload = () => {
  successDialogVisible.value = false
  resetForm(uploadFormRef.value)
}

onMounted(() => {
  // 初始化操作，可以在这里加载用户信息等
})
</script>

<style scoped>
.upload-container {
  max-width: 800px;
  margin: 0 auto;
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

.category-group {
  margin-bottom: 20px;
}

.category-specific {
  margin-top: 20px;
  padding: 20px;
  background-color: var(--hover-background);
  border-radius: 8px;
}

.tag-item {
  margin-right: 10px;
  margin-bottom: 10px;
}

.tag-input {
  width: 90px;
  margin-right: 10px;
  vertical-align: bottom;
}

.image-uploader,
.cover-uploader {
  border: 1px dashed var(--border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s;
}

.image-uploader:hover,
.cover-uploader:hover {
  border-color: var(--primary-color);
}

.image-uploader-icon,
.cover-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
  line-height: 178px;
}

.preview-image,
.preview-cover {
  display: block;
  width: 100%;
  max-height: 400px;
  object-fit: contain;
}

.upload-tip {
  font-size: 12px;
  color: var(--info-color);
  margin-top: 5px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style> 