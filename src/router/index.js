import $ from 'jquery'
import { createRouter, createWebHistory , createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('@/views/index.vue'),
        redirect: '/',
        children: [
            {
                path: '',
                component: () => import('@/views/content.vue')
            },
            {
                path: 'article',
                component: () => import('@/views/article.vue')
            }
        ]
    },
    {
        path: '/say',
        component: () => import('@/views/say.vue')
    }
]
// const router = createRouter({history: createWebHistory(process.env.BASE_URL), routes})
const router = createRouter({history: createWebHashHistory(), routes})
router.beforeEach((to, from, next) => {
    $('html,body').stop().animate({'scrollTop': 0})
    next()
})
export default router
