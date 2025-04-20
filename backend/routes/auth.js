const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

// 导入用户数据 (实际项目中应从数据库获取)
// 模拟用户数据库
const users = [
  {
    id: 1,
    username: 'admin',
    password: '$2a$10$G9m6LTuQ4XfA8fQFoSw3v.vCUw.8uo4uFKI3OgOgd3NzB5ZL74/ZK', // "password"
    nickname: '林莺',
    avatar: '/assets/cat.jpg',
    signature: '我向往的不是岸',
    github: 'https://github.com/yamimilk',
    gitee: 'https://gitee.com/yourusername',
    email: 'admin@example.com',
    netease: 'https://music.163.com/#/user/home?id=123456'
  }
];

// JWT密钥
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// 登录路由
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  // 查找用户
  const user = users.find(u => u.username === username);
  
  if (!user) {
    return res.status(401).json({ message: '用户名或密码错误' });
  }
  
  // 验证密码
  const validPassword = await bcrypt.compare(password, user.password);
  
  if (!validPassword) {
    return res.status(401).json({ message: '用户名或密码错误' });
  }
  
  // 创建JWT
  const token = jwt.sign(
    { id: user.id, username: user.username }, 
    JWT_SECRET, 
    { expiresIn: '24h' }
  );
  
  // 返回用户信息和令牌
  res.json({
    token,
    user: {
      id: user.id,
      username: user.username,
      nickname: user.nickname,
      avatar: user.avatar,
      role: 'user'
    }
  });
});

// 后续可以添加注册、重置密码等路由

module.exports = { router, users }; 