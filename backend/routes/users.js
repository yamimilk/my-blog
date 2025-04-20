const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { users } = require('./auth');

// 配置文件上传
const uploadsDir = path.join(__dirname, '../uploads');

// 确保上传目录存在
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// 配置存储
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `${req.user.id}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB限制
  fileFilter: function(req, file, cb) {
    // 只接受图片
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('只允许上传图片文件'));
    }
    cb(null, true);
  }
});

// 获取当前用户信息
router.get('/me', (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  
  if (!user) {
    return res.status(404).json({ message: '用户不存在' });
  }
  
  // 不返回密码
  const { password, ...userInfo } = user;
  
  res.json(userInfo);
});

// 更新用户信息
router.put('/me', (req, res) => {
  const userIndex = users.findIndex(u => u.id === req.user.id);
  
  if (userIndex === -1) {
    return res.status(404).json({ message: '用户不存在' });
  }
  
  // 更新用户信息
  const { nickname, signature, github, gitee, email, netease } = req.body;
  
  if (nickname) users[userIndex].nickname = nickname;
  if (signature) users[userIndex].signature = signature;
  if (github) users[userIndex].github = github;
  if (gitee) users[userIndex].gitee = gitee;
  if (email) users[userIndex].email = email;
  if (netease) users[userIndex].netease = netease;
  
  // 不返回密码
  const { password, ...userInfo } = users[userIndex];
  
  res.json(userInfo);
});

// 上传头像
router.post('/avatar', upload.single('avatar'), (req, res) => {
  const userIndex = users.findIndex(u => u.id === req.user.id);
  
  if (userIndex === -1) {
    // 删除上传的文件
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(404).json({ message: '用户不存在' });
  }
  
  if (!req.file) {
    return res.status(400).json({ message: '未提供头像文件' });
  }
  
  // 更新用户头像
  const avatarUrl = `/uploads/${req.file.filename}`;
  users[userIndex].avatar = avatarUrl;
  
  res.json({
    message: '头像上传成功',
    avatar: avatarUrl
  });
});

module.exports = router; 