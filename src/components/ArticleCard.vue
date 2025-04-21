<template>
  <div class="article-detail">
    <!-- 文章头部 -->
    <div class="article-header">
      <h1 class="article-title">{{ currentArticle.title }}</h1>
      <div class="article-meta">
        <div class="meta-item">
          <el-icon><Calendar /></el-icon>
          <span>{{ currentArticle.date }}</span>
        </div>
        <div class="meta-item">
          <el-icon><User /></el-icon>
          <span>{{ currentArticle.author }}</span>
        </div>
        <div class="meta-item">
          <el-icon><View /></el-icon>
          <span>{{ currentArticle.views }} 阅读</span>
        </div>
      </div>
      <div class="article-tags">
        <el-tag 
          v-for="tag in currentArticle.tags" 
          :key="tag" 
          size="small" 
          effect="plain" 
          class="article-tag"
        >
          {{ tag }}
        </el-tag>
      </div>
    </div>

    <!-- 文章封面图 -->
    <div class="article-cover" v-if="currentArticle.cover">
      <img :src="currentArticle.cover" :alt="currentArticle.title" />
    </div>

    <!-- 文章内容 -->
    <div class="article-content" v-html="currentArticle.content"></div>

    <!-- 文章底部 -->
    <div class="article-footer">
      <div class="article-actions">
        <el-button type="primary" plain size="small" @click="handleBack">
          <el-icon><Back /></el-icon> 返回文章列表
        </el-button>
        <el-button type="primary" plain size="small" class="like-btn" :class="{ 'liked': isLiked }" @click="toggleLike">
          <el-icon><Star /></el-icon> {{ isLiked ? '已收藏' : '收藏' }}
        </el-button>
      </div>
    </div>

    <!-- 相关文章推荐 -->
    <div class="related-articles" v-if="relatedArticles.length > 0">
      <h3 class="related-title">相关推荐</h3>
      <div class="related-list">
        <div 
          v-for="article in relatedArticles" 
          :key="article.id" 
          class="related-item"
          @click="loadArticle(article.id)"
        >
          <div class="related-cover" v-if="article.cover" :style="`background-image: url(${article.cover})`"></div>
          <div class="related-info">
            <h4 class="related-article-title">{{ article.title }}</h4>
            <div class="related-meta">
              <span>{{ article.date }}</span>
              <span>{{ article.author }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Calendar, User, View, Back, Star } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const isLiked = ref(false)

// 示例文章数据
const articles = [
  { 
    id: 1, 
    title: 'Git提交规范：提升团队协作与项目质量的必备实践', 
    summary: 'Git提交规范：提升团队协作与项目质量的必备实践在软件开发过程中，版本控制是确保项目稳定性和协作效率的关键环节，Git作为目前最流行的版本控制系统，其提交信息(commit message)的规范化对于项目的可维护性至关重要。', 
    content: `<p>在软件开发过程中，版本控制是确保项目稳定性和协作效率的关键环节。Git作为目前最流行的版本控制系统，其提交信息(commit message)的规范化对于项目的可维护性至关重要。</p>
    
    <h2>为什么需要Git提交规范？</h2>
    <p>团队协作中，良好的Git提交规范可以:</p>
    <ul>
      <li>提高代码审查效率</li>
      <li>快速定位和追踪bug</li>
      <li>自动生成变更日志</li>
      <li>理清版本演进历史</li>
    </ul>
    
    <h2>Conventional Commits规范</h2>
    <p>目前使用最广泛的提交规范是<a href="https://www.conventionalcommits.org/" target="_blank">Conventional Commits</a>，基本格式如下：</p>
    
    <pre><code>&lt;type&gt;[optional scope]: &lt;description&gt;
    
    [optional body]
    
    [optional footer(s)]</code></pre>
    
    <p>其中type表示提交类型，常见的有：</p>
    
    <ul>
      <li><strong>feat</strong>: 新功能</li>
      <li><strong>fix</strong>: 错误修复</li>
      <li><strong>docs</strong>: 文档更新</li>
      <li><strong>style</strong>: 代码格式调整，不影响功能</li>
      <li><strong>refactor</strong>: 代码重构，不新增功能也不修复bug</li>
      <li><strong>perf</strong>: 性能优化</li>
      <li><strong>test</strong>: 添加或修改测试</li>
      <li><strong>chore</strong>: 工具配置或依赖更新</li>
    </ul>
    
    <h2>提交规范的工具支持</h2>
    <p>为了确保团队成员遵循统一的提交规范，可以使用以下工具：</p>
    
    <h3>1. commitlint</h3>
    <p>用于检查提交信息是否符合规范。</p>
    
    <pre><code># 安装
    npm install --save-dev @commitlint/cli @commitlint/config-conventional
    
    # 创建配置文件
    echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js</code></pre>
    
    <h3>2. husky</h3>
    <p>用于设置Git钩子，在提交前自动执行commitlint检查。</p>
    
    <pre><code># 安装
    npm install --save-dev husky
    
    # 配置
    npx husky install
    npx husky add .husky/commit-msg 'npx --no -- commitlint --edit $1'</code></pre>
    
    <h3>3. commitizen</h3>
    <p>提供交互式界面，引导开发者按规范提交。</p>
    
    <pre><code># 安装
    npm install --save-dev commitizen cz-conventional-changelog
    
    # 配置
    echo '{ "path": "cz-conventional-changelog" }' > .czrc</code></pre>
    
    <p>配置完成后，可以使用<code>git cz</code>代替<code>git commit</code>进行提交。</p>
    
    <h2>示例</h2>
    <p>一个符合规范的提交信息：</p>
    
    <pre><code>feat(user): add login function
    
    - Add login page
    - Implement authentication logic
    - Add JWT token handling
    
    Closes #123</code></pre>
    
    <h2>总结</h2>
    <p>规范化的Git提交不仅能提高团队协作效率，也是项目管理和版本控制的基础。通过工具和团队培训的结合，可以快速建立起良好的提交习惯，为项目的可维护性打下坚实基础。</p>
    
    <p>希望本文对您有所帮助！</p>
    
    <div class="image-container">
      <img src="https://picsum.photos/800/400?random=101" alt="Git工作流示意图" />
      <p class="image-caption">图1：Git工作流示意图</p>
    </div>`,
    date: '2023-03-27',
    author: 'Auroral',
    views: 1024,
    tags: ['Git', '团队协作'],
    cover: 'https://picsum.photos/800/400?random=1'
  },
  { 
    id: 2, 
    title: 'Vue中Vue Router中静态导入与动态导入的奇妙关系', 
    summary: '构建理想的开发环境开发个人博客的过程中，发现了一个有趣的现象：当我在router/index.js文件中删除预先的静态导入操作后，页面布局出现了问题，我在路由配置中使用...', 
    content: `<p>在开发个人博客的过程中，我发现了一个有趣的现象：当我在router/index.js文件中删除预先的静态导入操作后，页面布局出现了问题。这引发了我对Vue Router中静态导入与动态导入关系的深入探索。</p>
    
    <h2>问题场景</h2>
    <p>最初，我的路由配置是这样的：</p>
    
    <pre><code>// 预先静态导入组件
    import Home from '../views/Home.vue'
    import About from '../views/About.vue'
    
    const routes = [
      { path: '/', component: Home },
      { path: '/about', component: About }
    ]</code></pre>
    
    <p>为了实现懒加载，我修改为：</p>
    
    <pre><code>const routes = [
      { 
        path: '/', 
        component: () => import('../views/Home.vue') 
      },
      { 
        path: '/about', 
        component: () => import('../views/About.vue') 
      }
    ]</code></pre>
    
    <p>令我惊讶的是，页面布局发生了微妙的变化，特别是CSS样式的应用顺序似乎不同了。</p>
    
    <h2>深入分析</h2>
    
    <h3>静态导入vs动态导入</h3>
    <p>两者的主要区别在于：</p>
    
    <table border="1" cellpadding="10">
      <tr>
        <th>特性</th>
        <th>静态导入</th>
        <th>动态导入</th>
      </tr>
      <tr>
        <td>加载时机</td>
        <td>构建时加载</td>
        <td>运行时按需加载</td>
      </tr>
      <tr>
        <td>bundle影响</td>
        <td>包含在主bundle中</td>
        <td>单独的chunk文件</td>
      </tr>
      <tr>
        <td>初始加载速度</td>
        <td>较慢</td>
        <td>较快</td>
      </tr>
    </table>
    
    <div class="image-container">
      <img src="https://picsum.photos/800/400?random=102" alt="静态导入vs动态导入示意图" />
      <p class="image-caption">图1：静态导入vs动态导入加载流程对比</p>
    </div>
    
    <h3>样式加载顺序</h3>
    <p>深入Vue源码分析后发现，组件的加载顺序会影响样式的注入顺序。静态导入的组件样式会按照导入顺序构建到主CSS文件中，而动态导入的组件样式则按照实际加载顺序注入到DOM中。</p>
    
    <pre><code>// 静态导入 - 样式顺序由导入顺序决定
    import ComponentA from './ComponentA.vue' // style1
    import ComponentB from './ComponentB.vue' // style2
    
    // 动态导入 - 样式顺序由加载顺序决定
    const ComponentA = () => import('./ComponentA.vue') // style loaded when needed
    const ComponentB = () => import('./ComponentB.vue') // style loaded when needed</code></pre>
    
    <h2>解决方案</h2>
    <p>针对这一问题，我尝试了以下几种解决方案：</p>
    
    <h3>1. 使用更具体的CSS选择器</h3>
    <p>通过提高CSS选择器的优先级，可以减轻加载顺序对样式的影响。</p>
    
    <h3>2. 使用CSS Modules</h3>
    <p>Vue的CSS Modules功能可以有效避免样式冲突：</p>
    
    <pre><code>&lt;style module&gt;
    .myClass {
      color: red;
    }
    &lt;/style&gt;
    
    &lt;template&gt;
      &lt;div :class="$style.myClass"&gt;...&lt;/div&gt;
    &lt;/template&gt;</code></pre>
    
    <h3>3. 在应用层控制样式优先级</h3>
    <p>通过在App.vue中设置全局样式优先级规则。</p>
    
    <h2>最佳实践</h2>
    <ul>
      <li>为共享组件创建一致的样式规范</li>
      <li>使用作用域样式（scoped）或CSS Modules</li>
      <li>重要样式使用!important或更高优先级的选择器</li>
      <li>考虑使用CSS-in-JS方案如styled-components</li>
    </ul>
    
    <h2>总结</h2>
    <p>Vue Router中的静态导入与动态导入不仅影响应用的加载性能，还可能对样式应用顺序产生微妙影响。理解这种关系对构建稳定、可预测的UI非常重要。在实际开发中，需要根据具体情况选择合适的导入方式，并采取相应措施确保样式的一致性。</p>`,
    date: '2023-04-01',
    author: 'Auroral',
    views: 832,
    tags: ['Vue', 'Vue Router'],
    cover: 'https://picsum.photos/800/400?random=2'
  },
  { 
    id: 3, 
    title: 'RESTful API设计精髓：从原则到实践的完全指南', 
    summary: '什么是RESTful API？REST (Representational State Transfer) 是Roy Fielding在2000年博士论文中提出的一种架构风格，用于设计网络应用程序，RESTful API是遵循REST架构的Web应用程序接口。', 
    content: `<p>REST (Representational State Transfer) 是Roy Fielding在2000年博士论文中提出的一种架构风格，用于设计网络应用程序。RESTful API是遵循REST架构的Web应用程序接口。</p>
    
    <h2>REST核心原则</h2>
    
    <h3>资源（Resources）</h3>
    <p>REST的核心概念是资源，每个资源通过URI唯一标识：</p>
    <pre><code>https://api.example.com/users       // 用户集合
    https://api.example.com/users/123  // 特定用户</code></pre>
    
    <h3>HTTP方法（Verbs）</h3>
    <p>REST使用标准HTTP方法来操作资源：</p>
    <ul>
      <li><strong>GET</strong>: 获取资源</li>
      <li><strong>POST</strong>: 创建新资源</li>
      <li><strong>PUT</strong>: 完全更新资源</li>
      <li><strong>PATCH</strong>: 部分更新资源</li>
      <li><strong>DELETE</strong>: 删除资源</li>
    </ul>
    
    <div class="image-container">
      <img src="https://picsum.photos/800/400?random=103" alt="RESTful API方法示意图" />
      <p class="image-caption">图1：RESTful API HTTP方法与CRUD操作对应关系</p>
    </div>
    
    <h3>表现层（Representation）</h3>
    <p>资源可以有多种表现形式，如JSON、XML、HTML等，客户端可通过HTTP头指定：</p>
    <pre><code>Accept: application/json
    Content-Type: application/json</code></pre>
    
    <h3>无状态（Stateless）</h3>
    <p>每个请求都包含所需的全部信息，服务器不存储会话状态。</p>
    
    <h2>RESTful API设计最佳实践</h2>
    
    <h3>1. 使用名词命名资源端点</h3>
    <pre><code>✅ /users
    ❌ /getUsers</code></pre>
    
    <h3>2. 复数资源名称</h3>
    <pre><code>✅ /users/123
    ❌ /user/123</code></pre>
    
    <h3>3. 层级关系使用嵌套资源</h3>
    <pre><code>/users/123/orders    // 用户123的所有订单
    /users/123/orders/456  // 用户123的订单456</code></pre>
    
    <h3>4. 正确使用HTTP状态码</h3>
    <table border="1" cellpadding="8">
      <tr>
        <th>状态码</th>
        <th>含义</th>
        <th>示例场景</th>
      </tr>
      <tr>
        <td>200 OK</td>
        <td>请求成功</td>
        <td>GET请求成功返回数据</td>
      </tr>
      <tr>
        <td>201 Created</td>
        <td>资源创建成功</td>
        <td>POST请求成功创建资源</td>
      </tr>
      <tr>
        <td>204 No Content</td>
        <td>请求成功，无返回内容</td>
        <td>DELETE请求成功</td>
      </tr>
      <tr>
        <td>400 Bad Request</td>
        <td>客户端错误</td>
        <td>参数校验失败</td>
      </tr>
      <tr>
        <td>401 Unauthorized</td>
        <td>未认证</td>
        <td>用户未登录</td>
      </tr>
      <tr>
        <td>403 Forbidden</td>
        <td>权限不足</td>
        <td>用户无访问权限</td>
      </tr>
      <tr>
        <td>404 Not Found</td>
        <td>资源不存在</td>
        <td>请求的用户ID不存在</td>
      </tr>
      <tr>
        <td>500 Internal Server Error</td>
        <td>服务器错误</td>
        <td>服务器异常</td>
      </tr>
    </table>
    
    <h3>5. 版本控制</h3>
    <p>在URI中包含版本信息：</p>
    <pre><code>/api/v1/users</code></pre>
    
    <h3>6. 分页、过滤和排序</h3>
    <pre><code>/users?page=2&per_page=10
    /users?status=active
    /users?sort=name:asc</code></pre>
    
    <h3>7. HATEOAS (Hypermedia as the Engine of Application State)</h3>
    <p>在响应中包含相关资源的链接：</p>
    <pre><code>{
      "id": 123,
      "name": "John Doe",
      "links": [
        { "rel": "self", "href": "/users/123" },
        { "rel": "orders", "href": "/users/123/orders" }
      ]
    }</code></pre>
    
    <h2>实现示例</h2>
    <p>下面是一个基于Spring Boot的RESTful API示例：</p>
    
    <pre><code>@RestController
    @RequestMapping("/api/v1/users")
    public class UserController {
    
      @GetMapping
      public ResponseEntity<List<User>> getAllUsers(
          @RequestParam(defaultValue = "0") int page,
          @RequestParam(defaultValue = "10") int size) {
          // 实现分页查询
      }
    
      @GetMapping("/{id}")
      public ResponseEntity<User> getUserById(@PathVariable Long id) {
          // 实现获取单个用户
      }
    
      @PostMapping
      public ResponseEntity<User> createUser(@RequestBody User user) {
          // 实现创建用户
      }
    
      @PutMapping("/{id}")
      public ResponseEntity<User> updateUser(
          @PathVariable Long id,
          @RequestBody User user) {
          // 实现更新用户
      }
    
      @DeleteMapping("/{id}")
      public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
          // 实现删除用户
      }
    }</code></pre>
    
    <h2>总结</h2>
    <p>RESTful API设计遵循以下核心原则：</p>
    <ul>
      <li>基于资源的URI设计</li>
      <li>正确使用HTTP方法</li>
      <li>无状态通信</li>
      <li>标准的数据格式</li>
      <li>一致的错误处理</li>
    </ul>
    
    <p>通过遵循这些设计原则，可以创建出易于理解、使用和维护的API，提高开发效率和用户体验。</p>`,
    date: '2023-03-30',
    author: '林莺',
    views: 1560,
    tags: ['REST', 'API设计', 'Java Web'],
    cover: 'https://picsum.photos/800/400?random=3'
  },
  { 
    id: 4, 
    title: 'Spring Boot 微服务架构实践', 
    summary: 'Spring Boot 微服务架构设计与实现：学习构建现代化云原生应用的最佳实践，本文将深入探讨如何利用Spring Boot构建可扩展的微服务系统。', 
    date: '2023-03-27',
    author: '林莺',
    views: 967,
    tags: ['Spring Boot', '微服务'],
    cover: 'https://picsum.photos/800/400?random=4'
  },
  { 
    id: 5, 
    title: 'Vue3 组合式API深入理解', 
    summary: 'Vue3的组合式API（Composition API）提供了一种全新的组织组件逻辑的方式，本文将深入探讨其工作原理和最佳实践。', 
    date: '2023-04-02',
    author: '林莺',
    views: 1201,
    tags: ['Vue3', '前端开发'],
    cover: 'https://picsum.photos/800/400?random=5'
  },
  { 
    id: 6, 
    title: '深入理解JavaScript异步编程', 
    summary: '异步编程是JavaScript的核心特性之一，从回调函数到Promise再到async/await，本文将全面解析JavaScript异步编程的演进历程。', 
    date: '2023-03-25',
    author: '林莺',
    views: 1438,
    tags: ['JavaScript', '异步编程'],
    cover: 'https://picsum.photos/800/400?random=6'
  }
]

// 获取当前文章ID（从路由参数或props中获取）
const articleId = computed(() => {
  return parseInt(route.params.id) || 1
})

// 获取当前文章
const currentArticle = computed(() => {
  return articles.find(a => a.id === articleId.value) || articles[0]
})

// 获取相关文章
const relatedArticles = computed(() => {
  // 基于标签匹配推荐相关文章
  const currentTags = currentArticle.value.tags || []
  return articles
    .filter(a => a.id !== articleId.value) // 排除当前文章
    .filter(a => a.tags.some(tag => currentTags.includes(tag))) // 至少有一个标签匹配
    .slice(0, 3) // 最多显示3篇
})

// 回到文章列表
const handleBack = () => {
  router.push('/article')
}

// 加载特定文章
const loadArticle = (id) => {
  router.push(`/article/${id}`)
}

// 切换收藏状态
const toggleLike = () => {
  isLiked.value = !isLiked.value
}
</script>

<style scoped>
.article-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px 20px;
  background-color: var(--card-background);
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.article-header {
  margin-bottom: 30px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 20px;
}

.article-title {
  font-size: 28px;
  color: var(--text-color);
  margin: 0 0 20px 0;
  line-height: 1.4;
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 15px;
  color: var(--info-color);
  font-size: 14px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.article-tag {
  font-size: 12px;
}

.article-cover {
  margin-bottom: 30px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.article-cover img {
  width: 100%;
  height: auto;
  display: block;
}

.article-content {
  line-height: 1.8;
  color: var(--text-color);
  font-size: 16px;
}

/* 文章内容中的样式 */
:deep(h2) {
  font-size: 24px;
  margin: 35px 0 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-color);
}

:deep(h3) {
  font-size: 20px;
  margin: 25px 0 15px;
  color: var(--text-color);
}

:deep(p) {
  margin: 16px 0;
  line-height: 1.8;
}

:deep(ul), :deep(ol) {
  margin: 16px 0;
  padding-left: 20px;
}

:deep(li) {
  margin: 8px 0;
}

:deep(pre) {
  background-color: var(--hover-background);
  padding: 15px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 20px 0;
}

:deep(code) {
  font-family: Consolas, Monaco, 'Andale Mono', monospace;
  font-size: 14px;
  color: var(--primary-color);
}

:deep(a) {
  color: var(--primary-color);
  text-decoration: none;
}

:deep(a:hover) {
  text-decoration: underline;
}

:deep(blockquote) {
  border-left: 4px solid var(--primary-color);
  padding: 15px;
  margin: 20px 0;
  background-color: var(--hover-background);
  color: var(--text-color);
}

:deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 15px;
}

:deep(th), :deep(td) {
  border: 1px solid var(--border-color);
  text-align: left;
}

:deep(th) {
  background-color: var(--hover-background);
  font-weight: bold;
}

:deep(.image-container) {
  margin: 30px 0;
  text-align: center;
}

:deep(.image-container img) {
  max-width: 100%;
  border-radius: 6px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
}

:deep(.image-caption) {
  margin-top: 8px;
  color: var(--info-color);
  font-size: 14px;
  font-style: italic;
}

.article-footer {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
}

.article-actions {
  display: flex;
  justify-content: space-between;
}

.like-btn.liked {
  color: var(--danger-color);
}

.related-articles {
  margin-top: 50px;
}

.related-title {
  font-size: 20px;
  margin-bottom: 20px;
  color: var(--text-color);
  position: relative;
  padding-left: 15px;
}

.related-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 18px;
  background: var(--primary-color);
  border-radius: 2px;
}

.related-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.related-item {
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--card-background);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.3s;
}

.related-item:hover {
  transform: translateY(-5px);
}

.related-cover {
  height: 150px;
  background-size: cover;
  background-position: center;
}

.related-info {
  padding: 15px;
}

.related-article-title {
  font-size: 16px;
  margin: 0 0 10px;
  color: var(--text-color);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.related-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--info-color);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .article-detail {
    padding: 20px 15px;
  }
  
  .article-title {
    font-size: 24px;
  }
  
  .related-list {
    grid-template-columns: 1fr;
  }
}
</style>