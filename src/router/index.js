import { createRouter, createWebHistory , createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('@/views/index.vue')
    },
    {
        path: '/say',
        component: () => import('@/views/say.vue')
    }
]
// const router = createRouter({history: createWebHistory(process.env.BASE_URL), routes})
const router = createRouter({history: createWebHashHistory(), routes})
export default router
