import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs'
import {createRouter,createWebHistory } from 'vue-router'

const routes = [
    {
        path:'/',
        name:'Home',
        component:() => import('@/views/HomeView.vue')
    },
    {
        path:'/post/:id',
        name:'Post',
        component:() => import('@/views/Postview.vue'),
        props:true
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router