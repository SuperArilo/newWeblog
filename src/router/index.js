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
            },
            {
                path: 'guestbook',
                component: () => import('@/views/guestbook.vue')
            },
            {
                path: 'links',
                component: () => import('@/views/links.vue')
            },
            {
                path: 'friends',
                component: () => import('@/views/friends.vue')
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
    $('.main-content').stop().animate({'scrollTop': 0})
    next()
})
export default router
