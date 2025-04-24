import { reactive, readonly } from 'vue'
import axios from 'axios'
import { userProfile, initUserProfile, updateUserProfile } from './userProfile'

// API基础URL
const API_URL = 'http://localhost:3000/api'

// 认证状态
const state = reactive({
  token: localStorage.getItem('token') || '',
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('token')
})

// 创建axios实例
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器添加token
api.interceptors.request.use(config => {
  if (state.token) {
    config.headers['Authorization'] = `Bearer ${state.token}`
  }
  return config
})

// 认证方法
const login = async (username, password, remember = false) => {
  try {
    // 调用后端API (后端尚未准备好，将使用模拟数据)
    let response
    try {
      response = await api.post('/auth/login', { username, password })
    } catch (error) {
      console.warn('后端API不可用，使用模拟数据')
      // 模拟登录响应
      response = {
        data: {
          token: 'mock-jwt-token',
          user: {
            id: 1,
            username,
            nickname: '林莺',
            avatar: userProfile.avatar || new URL('../assets/cat.jpg', import.meta.url).href,
            role: 'user'
          }
        }
      }
    }
    
    // 保存认证信息
    state.token = response.data.token
    state.user = response.data.user
    state.isAuthenticated = true
    
    // 保存到本地存储
    if (remember) {
      localStorage.setItem('token', state.token)
      localStorage.setItem('user', JSON.stringify(state.user))
    }
    
    // 初始化用户配置
    await loadUserData()
    
    return response.data
  } catch (error) {
    console.error('登录失败:', error)
    throw new Error('用户名或密码错误')
  }
}

const logout = () => {
  // 清除认证状态
  state.token = ''
  state.user = null
  state.isAuthenticated = false
  
  // 清除本地存储
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('userProfile')
}

// 获取用户信息并同步到本地用户配置
const loadUserData = async () => {
  if (!state.isAuthenticated) return null
  
  try {
    // 调用后端API (后端尚未准备好，将使用模拟数据)
    let userData
    try {
      const response = await api.get('/users/me')
      userData = response.data
    } catch (error) {
      console.warn('后端API不可用，使用模拟数据')
      userData = {
        id: state.user?.id || 1,
        username: state.user?.username || 'admin',
        nickname: '林莺',
        avatar: userProfile.avatar || new URL('../assets/cat.jpg', import.meta.url).href,
        signature: '我向往的不是岸',
        github: 'https://github.com/yamimilk',
        gitee: 'https://gitee.com/yourusername',
        email: 'admin@example.com',
        netease: 'https://music.163.com/#/user/home?id=123456'
      }
    }
    
    // 同步到用户配置
    updateUserProfile({
      nickname: userData.nickname,
      avatar: userData.avatar,
      signature: userData.signature,
      github: userData.github,
      gitee: userData.gitee,
      email: userData.email,
      netease: userData.netease
    })
    
    return userData
  } catch (error) {
    console.error('获取用户信息失败:', error)
    throw error
  }
}

// 更新用户信息
const updateUserInfo = async (userData) => {
  if (!state.isAuthenticated) return null
  
  try {
    // 调用后端API (后端尚未准备好，将使用模拟数据)
    let response
    try {
      response = await api.put('/users/me', userData)
    } catch (error) {
      console.warn('后端API不可用，使用模拟数据')
      response = { data: { ...state.user, ...userData } }
    }
    
    // 更新本地状态
    if (response.data.nickname) {
      state.user.nickname = response.data.nickname
      localStorage.setItem('user', JSON.stringify(state.user))
    }
    
    return response.data
  } catch (error) {
    console.error('更新用户信息失败:', error)
    throw error
  }
}

// 上传头像
const uploadAvatar = async (file) => {
  if (!state.isAuthenticated || !file) return null
  
  const formData = new FormData()
  formData.append('avatar', file)
  
  try {
    // 调用后端API (如果后端尚未准备好，将使用模拟数据)
    let response
    try {
      response = await api.post('/users/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    } catch (error) {
      console.warn('后端API不可用，使用模拟数据')
      
      // 创建本地URL
      const reader = new FileReader()
      const avatarPromise = new Promise((resolve) => {
        reader.onload = () => resolve(reader.result)
        reader.readAsDataURL(file)
      })
      
      const avatarUrl = await avatarPromise
      response = { 
        data: { 
          message: '头像上传成功',
          avatar: avatarUrl
        } 
      }
    }
    
    // 更新本地状态
    state.user.avatar = response.data.avatar
    localStorage.setItem('user', JSON.stringify(state.user))
    
    // 更新用户配置
    updateUserProfile({
      avatar: response.data.avatar
    })
    
    return response.data
  } catch (error) {
    console.error('上传头像失败:', error)
    throw error
  }
}

// 检查认证状态
const checkAuth = () => {
  return state.isAuthenticated
}

// 创建认证Hook
export const useAuth = () => {
  return {
    // 只读状态
    state: readonly(state),
    // 方法
    login,
    logout,
    loadUserData,
    updateUserInfo,
    uploadAvatar,
    checkAuth,
    // API实例
    api
  }
} 