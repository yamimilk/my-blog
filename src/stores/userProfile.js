import { reactive, watchEffect } from 'vue'

// 创建一个响应式的用户配置存储
const userProfile = reactive({
  nickname: '林莺',
  avatar: '',
  signature: '我向往的不是岸',
  github: 'https://github.com/yamimilk',
  gitee: 'https://gitee.com/yamimilk',
  email: '1989783329@qq.com',
  netease: 'https://music.163.com/#/user/home?id=5154981743'
})

// 初始化函数
const initUserProfile = () => {
  // 设置默认头像
  try {
    userProfile.avatar = new URL('../assets/cat.jpg', import.meta.url).href
  } catch (error) {
    console.error('无法加载默认头像', error)
  }
  
  // 从本地存储加载用户配置
  const savedProfile = localStorage.getItem('userProfile')
  
  if (savedProfile) {
    try {
      const profileData = JSON.parse(savedProfile)
      Object.assign(userProfile, profileData)
    } catch (error) {
      console.error('解析用户配置失败:', error)
    }
  }

  // 监听变化并保存到本地存储
  watchEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify({
      nickname: userProfile.nickname,
      avatar: userProfile.avatar,
      signature: userProfile.signature,
      github: userProfile.github,
      gitee: userProfile.gitee,
      email: userProfile.email,
      netease: userProfile.netease
    }))
  })
}

// 更新用户配置的函数
const updateUserProfile = (newProfile) => {
  Object.assign(userProfile, newProfile)
}

export { userProfile, initUserProfile, updateUserProfile } 