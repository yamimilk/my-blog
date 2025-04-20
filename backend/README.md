# 个人博客后端

这是一个基于 Express.js 构建的个人博客后端服务。

## 功能

- 用户认证（登录/登出）
- JWT 令牌验证
- 用户信息管理
- 头像上传

## 安装

```bash
# 安装依赖
npm install

# 开发模式运行
npm run dev

# 生产模式运行
npm start
```

## API 文档

### 认证

- `POST /api/auth/login` - 用户登录
  - 请求体: `{ username, password }`
  - 响应: `{ token, user }`

### 用户

- `GET /api/users/me` - 获取当前用户信息
  - 请求头: `Authorization: Bearer <token>`
  - 响应: 用户对象

- `PUT /api/users/me` - 更新用户信息
  - 请求头: `Authorization: Bearer <token>`
  - 请求体: 要更新的用户字段
  - 响应: 更新后的用户对象

- `POST /api/users/avatar` - 上传用户头像
  - 请求头: `Authorization: Bearer <token>`
  - 请求体: 表单数据 (avatar文件)
  - 响应: `{ message, avatar }`

## 开发说明

- 使用 `.env` 文件配置环境变量
- 实际项目中应使用数据库存储用户数据
- 默认用户: admin/password 