<template>
  <div class="profile-edit-container">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <h2>个人信息设置</h2>
        </div>
      </template>
      
      <el-form :model="form" label-width="100px" :rules="rules" ref="formRef">
        <!-- 基本信息 -->
        <h3 class="section-title">基本信息</h3>
        
        <!-- 头像 -->
        <el-form-item label="头像" prop="avatar">
          <div class="avatar-uploader">
            <el-avatar :size="100" :src="form.avatar || userProfile.avatar" class="preview-avatar" />
            <el-upload
              class="avatar-upload"
              action="#"
              :auto-upload="false"
              :show-file-list="false"
              :on-change="handleAvatarChange"
            >
              <el-button type="primary">更换头像</el-button>
              <el-button v-if="isAvatarChanged" @click.stop="resetAvatar" type="text">恢复默认</el-button>
            </el-upload>
          </div>
        </el-form-item>
        
        <!-- 昵称 -->
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname" placeholder="请输入昵称"></el-input>
        </el-form-item>
        
        <!-- 个性签名 -->
        <el-form-item label="个性签名" prop="signature">
          <el-input v-model="form.signature" placeholder="请输入个性签名" type="textarea" :rows="2"></el-input>
        </el-form-item>
        
        <!-- 社交链接 -->
        <h3 class="section-title">社交链接</h3>
        
        <el-form-item label="GitHub" prop="github">
          <el-input v-model="form.github" placeholder="请输入GitHub链接">
            <template #prepend>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </template>
          </el-input>
        </el-form-item>
        
        <el-form-item label="Gitee" prop="gitee">
          <el-input v-model="form.gitee" placeholder="请输入Gitee链接">
            <template #prepend>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon"><path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.667c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296z"/></svg>
            </template>
          </el-input>
        </el-form-item>
        
        <el-form-item label="E-Mail" prop="email">
          <el-input v-model="form.email" placeholder="请输入电子邮箱">
            <template #prepend>
              <el-icon><Message /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        
        <el-form-item label="网易云音乐" prop="netease">
          <el-input v-model="form.netease" placeholder="请输入网易云主页链接">
            <template #prepend>
              <el-icon><Headset /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="submitForm">保存修改</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { Message, Headset } from '@element-plus/icons-vue'
import { ElMessage, ElLoading } from 'element-plus'
import { userProfile, updateUserProfile } from '../stores/userProfile'
import { useAuth } from '../stores/auth'

// 认证服务
const auth = useAuth()

// 表单引用
const formRef = ref(null)
// 原始头像
const originalAvatar = ref('')
// 是否正在保存
const isSaving = ref(false)
// 上传的文件对象
const uploadedFile = ref(null)

// 表单数据
const form = reactive({
  nickname: '',
  avatar: '',
  signature: '',
  github: '',
  gitee: '',
  email: '',
  netease: ''
})

// 判断头像是否已更改
const isAvatarChanged = computed(() => {
  return uploadedFile.value !== null || (form.avatar && form.avatar !== originalAvatar.value)
})

// 表单验证规则
const rules = reactive({
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: false, type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  github: [
    { required: false, pattern: /^https?:\/\/(www\.)?github\.com\/[\w\-]+\/?.*$/, message: '请输入有效的GitHub链接', trigger: 'blur' }
  ],
  gitee: [
    { required: false, pattern: /^https?:\/\/(www\.)?gitee\.com\/[\w\-]+\/?.*$/, message: '请输入有效的Gitee链接', trigger: 'blur' }
  ],
  netease: [
    { required: false, pattern: /^https?:\/\/(music\.)?163\.com.*$/, message: '请输入有效的网易云音乐链接', trigger: 'blur' }
  ]
})

// 从共享存储加载用户配置
const loadUserProfile = () => {
  Object.assign(form, {
    nickname: userProfile.nickname,
    avatar: userProfile.avatar,
    signature: userProfile.signature,
    github: userProfile.github,
    gitee: userProfile.gitee,
    email: userProfile.email,
    netease: userProfile.netease
  })
  
  // 保存原始头像用于重置
  originalAvatar.value = userProfile.avatar
}

// 头像处理
const handleAvatarChange = (file) => {
  // 保存文件对象用于后续上传
  uploadedFile.value = file.raw
  
  // 预览头像
  const reader = new FileReader()
  reader.readAsDataURL(file.raw)
  reader.onload = () => {
    form.avatar = reader.result
  }
}

// 重置头像为原始头像
const resetAvatar = () => {
  form.avatar = originalAvatar.value
  uploadedFile.value = null
}

// 提交表单
const submitForm = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate(async (valid) => {
    if (valid) {
      // 显示加载状态
      isSaving.value = true
      const loading = ElLoading.service({
        lock: true,
        text: '保存中...',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      
      try {
        // 如果头像已更改，先上传头像
        if (uploadedFile.value) {
          const result = await auth.uploadAvatar(uploadedFile.value)
          form.avatar = result.avatar
          uploadedFile.value = null
        }
        
        // 更新用户信息
        await auth.updateUserInfo({
          nickname: form.nickname,
          signature: form.signature,
          github: form.github,
          gitee: form.gitee,
          email: form.email,
          netease: form.netease
        })
        
        // 更新本地用户配置
        updateUserProfile({
          nickname: form.nickname,
          avatar: form.avatar,
          signature: form.signature,
          github: form.github,
          gitee: form.gitee,
          email: form.email,
          netease: form.netease
        })
        
        // 更新原始头像
        originalAvatar.value = form.avatar
        
        // 显示成功消息
        ElMessage({
          message: '个人信息保存成功！',
          type: 'success'
        })
      } catch (error) {
        ElMessage({
          message: error.message || '保存失败，请稍后重试',
          type: 'error'
        })
      } finally {
        // 关闭加载状态
        loading.close()
        isSaving.value = false
      }
    } else {
      ElMessage({
        message: '请检查填写的信息',
        type: 'error'
      })
      return false
    }
  })
}

// 重置表单
const resetForm = () => {
  formRef.value?.resetFields()
  uploadedFile.value = null
  loadUserProfile()
}

// 页面加载时获取个人信息
onMounted(() => {
  loadUserProfile()
})
</script>

<style scoped>
.profile-edit-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title {
  margin: 30px 0 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
  color: #409EFF;
  font-weight: 600;
}

.avatar-uploader {
  display: flex;
  align-items: center;
  gap: 20px;
}

.preview-avatar {
  border: 1px dashed #d9d9d9;
}

.icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
}
</style> 