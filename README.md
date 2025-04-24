# Vue 3 + Vite

如果你想查看这个vue3项目：
账号：admin
密码：password   

# 🧠 Vue3 前端博客项目 - 当前开发进度快照

## ✅ 项目基本情况
- 类型：前端博客项目，无数据库
- 技术栈：Vue3 + Vite + Element + JavaScript + Axios + localStorage（登录模块二次封装）
- 部署方式：GitHub Pages 静态托管
- 数据来源：全部为前端 mock / JSON 结构本地保存

## ✅ 已完成模块

### 🔐 登录模块
- 使用 `axios.create()` 实例完成二次封装；
- 设置了请求拦截器自动注入 token；
- 登录逻辑中加入了 fallback mock 数据，模拟后端接口；
- 本地保存认证状态（token + user）到 `localStorage`；
- 实现了登录、登出、用户信息初始化、资料更新等完整流程；
- 已封装为 `useAuth()` 组合式函数；
- 支持上传头像（含模拟上传 + 预览），使用 `FormData` 方式上传；
- 模拟接口使用默认用户数据（如昵称、头像、社交链接）初始化 userProfile 状态。

### ✅ 项目结构和代码管理
- 登录相关功能集中在 `useAuth` 文件内，逻辑清晰，职责明确；
- 页面 UI 与逻辑模块解耦

### ✅ 主题切换模块
- 使用 Pinia 管理主题状态，提供全局的 isDark 响应式变量；
- 可通过 toggleDarkMode() 方法手动切换亮/暗模式；
- 应用启动时会调用 initDarkMode() 自动读取上次用户选择或系统偏好；
- 样式切换通过修改 document.documentElement 和 body 属性实现；
- 当前主题状态持久化存储于 localStorage 中（键名为 darkMode）；
- 封装为独立的 Pinia Store 模块 useTheme，在主入口初始化即可使用。

### ✅ 个人信息修改模块
- 支持用户修改个人资料（昵称、简介、社交链接等），界面通过 Element Plus 表单构建；
- 使用响应式 ref 数据绑定输入项，实现双向数据更新；
- 用户信息修改后会同步更新本地缓存（localStorage 中的 userProfile）；
- 提交更新使用封装好的 updateProfile 方法，模拟后端接口行为；
- 提交表单前自动进行字段校验，确保数据完整性；
- 支持用户头像上传：使用 FormData 模拟上传图片，上传后即时预览并保存；
- 修改成功后自动刷新页面展示信息，并触发提示反馈（使用 ElMessage）；
- 所有数据交互均基于前端本地 JSON mock 数据，适用于无后端部署环境。



## ✅ 模块实现亮点
- 对 axios 实现了封装，并统一管理 API 请求；
- 所有请求加入了异常兜底（mock 数据）机制；
- 登录状态持久化，刷新页面仍能保持用户状态；
- 实现了前端用户信息修改和头像上传；
- 没有依赖真实后端，也能完整演示登录流程；
- 模块设计贴近真实开发需求。




