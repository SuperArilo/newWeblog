import { createRouter, createWebHistory , createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('@/views/index.vue')
    },
    {
        path: '/login',
        component: () => import('@/views/login.vue')
    }
]
// const router = createRouter({history: createWebHistory(process.env.BASE_URL), routes})
const router = createRouter({history: createWebHashHistory(), routes})
export default router
