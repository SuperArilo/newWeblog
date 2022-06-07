<template>
    <div class="main-content">
        <nav class="top-nav-pc">
            <span class="left-name">鸽王BLOG</span>
            <ul class="menu-list">
                <li class="menu-list-item" v-for="item in data.menuList" :key="item.id">{{item.title}}</li>
            </ul>
            <re-buttom width="3rem" height="1.8rem" text="登录"/>
        </nav>
        <router-view/>
    </div>
</template>
<script setup>
import '@/assets/fontawesome/css/all.min.css'
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { start, close } from '@/util/nprogress'
const store = useStore()
const route = useRoute()
const router = useRouter()
const data = reactive({
    menuList: [
        {
            id: 0,
            title: '首页',
            path: ''
        },
        {
            id: 1,
            title: '碎语',
            path: ''
        },
        {
            id: 2,
            title: '留言',
            path: ''
        },
        {
            id: 3,
            title: '友邻',
            path: ''
        },
        {
            id: 4,
            title: '圈子',
            path: ''
        }
    ]
})
onBeforeMount(() => {
    start()
})
onMounted(() => {
    close()
})
watchEffect(()=>{
})
// 使用toRefs解构
// let { } = { ...toRefs(data) } 
defineExpose({
  ...toRefs(data)
})
</script>
<script>
import reButtom from '@/components/reButton.vue'
export default {
    components: {
        reButtom
    },
    data(){
        return{
        }
    },
    created(){
        window.addEventListener('resize', this.windowWidth)
    },
    mounted(){
    },
    methods:{
        windowWidth(){
            if(window.innerWidth <= 936){
                this.$store.commit('isPhoneSet', true)
            } else {
                this.$store.commit('isPhoneSet', false)
            }
        }
    }
}
</script>
<style lang='scss'>
img
{
    -webkit-user-drag: none;
    max-width: 100%;
}
body, html
{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    overflow-x: hidden;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    background-color: #f4f4f4;
    .img-viewr__body-lock
    {
        overflow: auto !important;
    }
}
*
{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
a
{
    text-decoration: none;
}
::-webkit-scrollbar
{
    width: 0.3rem;
}
::-webkit-scrollbar-thumb
{
    background-color: rgb(79, 130, 241);
}
#app
{
    width: 100%;
    .main-content
    {
        width: 100%;
        .top-nav-pc
        {
            width: 100%;
            height: 3rem;
            background-color: #f4f4f4;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .left-name
            {
                height: inherit;
                display: flex;
                align-items: center;
                font-size: 1rem;
                letter-spacing: 0.1rem;
            }
            .menu-list
            {
                height: inherit;
                display: flex;
                align-items: center;
                .menu-list-item
                {
                    min-width: 4rem;
                    height: inherit;
                    margin: 0 0.2rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 0.8rem;
                    font-weight: 400;
                    cursor: pointer;
                    letter-spacing: 0.06rem;
                    transition: all 0.3s;
                    color: rgb(126, 126, 126);
                }
                .menu-list-item:hover
                {
                    background-color: rgb(231, 231, 231);
                }
            }
        }
    }
}
@media screen and (min-width:1400px)
{
    html
    {
        font-size: 20px;
    }
}
@media screen and (max-width:1400px) and (min-width:1200px)
{
    html
    {
        font-size: 20px;
    }
}
@media screen and (max-width:1200px) and (min-width:936px)
{
    html
    {
        font-size: 18px;
    }
}
@media screen and (max-width:936px) and (min-width:767px)
{
    html
    {
        font-size: 18px;
    }
}
@media screen and (max-width:767px) and (min-width:676px)
{
    html
    {
        font-size: 18px;
    }
}
@media screen and (max-width:676px)
{
    html
    {
        font-size: 16px;
    }
}
</style>