import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuth } from '../stores/auth'
import Gallery from '../components/GalleryList.vue'
import AppLayout from '../components/AppLayout.vue'
import HomeContent from '../components/HomeContent.vue'
import Video from '../components/VideoList.vue'
import ArticleList from '../components/ArticleList.vue'
import ArticleCard from '../components/ArticleCard.vue'
import ProfileEdit from '../components/ProfileEdit.vue'
import Upload from '../views/Upload.vue'
import Login from '../views/Login.vue'
import Settings from '../views/Settings.vue'
import Todo from '../views/Todo.vue'
import Contact from '../views/Contact.vue'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { requiresAuth: false }
    },
    {
        path: '/',
        component: AppLayout,
        meta: { requiresAuth: true },
        children: [
            { path: '', component: HomeContent },
            { path: 'home', component: HomeContent },
            { path: 'gallery', component: Gallery },
            { path: 'videos', component: Video },
            { path: 'article', component: ArticleList },
            { path: 'article/:id', component: ArticleCard },
            { path: 'profile', component: ProfileEdit },
            { path: 'settings', component: Settings },
            { path: 'todo', component: Todo },
            { path: 'contact', component: Contact },
            { path: 'upload', component: Upload }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
    const auth = useAuth()
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const isAuthenticated = auth.checkAuth()

    // 如果页面需要认证且用户未登录，重定向到登录页
    if (requiresAuth && !isAuthenticated) {
        next({ path: '/login' })
    } 
    // 如果用户已登录但访问登录页，重定向到首页
    else if (isAuthenticated && to.path === '/login') {
        next({ path: '/' })
    } 
    // 其他情况正常导航
    else {
        next()
    }
})

export default router