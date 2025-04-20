import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs'
import {createRouter,createWebHistory } from 'vue-router'

import AppLayout from '../components/AppLayout.vue'
import HomeContent from '../components/HomeContent.vue'

const routes = [
    {
        path:'/',
        component:AppLayout,
        children:[
            {path:'',component:HomeContent},
            {path:'home',component:HomeContent}
        ]
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router