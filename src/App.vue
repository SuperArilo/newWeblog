<template>
    <div class="main-content" :class="this.$store.getters.darkModel ? 'dark-model':'light-model'">
        <nav class="top-nav-pc" v-if="!this.$store.getters.isPhone">
            <span class="left-name">鸽王BLOG</span>
            <ul class="menu-list">
                <li class="menu-list-item" v-ripple="{ duration: 500, color: this.$store.getters.darkModel ? 'invert' : ''}" v-for="item in menuList" :key="item.id">{{item.title}}</li>
            </ul>
            <div class="right-button">
                <div class="dark-button" v-ripple="{ duration: 500, color: this.$store.getters.darkModel ? 'invert' : ''}" @click="chagenDarkModel">
                    <transition name="dark-model" mode="out-in">
                        <i class="fas fa-moon" v-if="!this.$store.getters.darkModel"/>
                        <i class="fas fa-sun" v-else/>
                    </transition>
                </div>
                <button class="login-button" v-ripple="{ duration: 500, color: this.$store.getters.darkModel ? 'invert' : ''}">登录</button>
            </div>
        </nav>
        <nav class="top-nav-mobile" v-else>
            <span></span>
            <span class="center-name">鸽王BLOG</span>
            <div v-ripple="{ duration: 500, color: this.$store.getters.darkModel ? 'invert' : ''}" class="menu-fold" @click="this.isOpenMask = true">
                <i class="fas fa-bars"/>
            </div>
        </nav>
        <el-drawer v-model="this.isOpenMask" size="14rem" direction="ltr" :show-close="false" :with-header="false">
            <div class="user-box">
                <div class="user-top-box">
                    <div class="left-dl-model" @click="chagenDarkModel" v-ripple="{ duration: 500, color: this.$store.getters.darkModel ? 'invert' : ''}">
                        <transition name="dark-model" mode="out-in">
                            <i class="fas fa-moon" v-if="!this.$store.getters.darkModel"/>
                            <i class="fas fa-sun" v-else/>
                        </transition>
                    </div>
                </div>
            </div>
        </el-drawer>
    </div>
</template>
<script>
import '@/assets/fontawesome/css/all.min.css'
import ripple from "vue-ripple-dir"
import { start, close } from '@/util/nprogress'
export default {
    directives: {
        ripple
    },
    data(){
        return{
            menuListIndex: 0,
            menuList: [
                {
                    id: 0,
                    title: '首页',
                    path: '/'
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
            ],
            isOpenMask: false
        }
    },
    created(){
        this.setUserProfile()
        this.setMenuStyle(this.$router.currentRoute._value.path)
        start()
        this.windowWidth()
        window.addEventListener('resize', this.windowWidth)
        window.addEventListener('beforeunload', () => {
            let json = {
                uid: '',
                darkModel: this.$store.getters.darkModel
            }
            localStorage.setItem('userProfile', JSON.stringify(json))
        })
    },
    mounted(){
        close()
    },
    methods:{
        windowWidth(){
            if(window.innerWidth <= 936){
                this.$store.commit('isPhoneSet', true)
            } else {
                this.$store.commit('isPhoneSet', false)
            }
        },
        menuListFunc(id){
            this.menuListIndex = id
        },
        setMenuStyle(path){
            this.menuListIndex = this.menuList.findIndex(item => item.path === path)
        },
        chagenDarkModel(){
            let temp = this.$store.getters.darkModel
            temp =! temp
            this.$store.commit('darkModelSet', temp)
        },
        setUserProfile(){
            let json = JSON.parse(localStorage.getItem('userProfile'))
            this.$store.commit('darkModelSet', json.darkModel)
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
    width: 100%;
    height: 100%;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    overflow-x: hidden;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    .img-viewr__body-lock
    {
        overflow: auto !important;
    }
}
button
{
    border: none;
    outline: none;
    cursor: pointer;
    color: #ffffff;
    letter-spacing: 0.08rem;
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
    height: 100%;
    .main-content
    {
        width: 100%;
        height: 100%;
        transition: background 0.3s;
        position: relative;
        .top-nav-pc , .top-nav-mobile
        {
            width: 100%;
            height: 2.5rem;
            transition: background 0.3s;
            display: flex;
            align-items: center;
            position: fixed;
            z-index: 5;
            top: 0;
            left: 0;
            .left-name , .center-name
            {
                height: inherit;
                display: flex;
                align-items: center;
                font-size: 1rem;
                letter-spacing: 0.1rem;
                transition: color 0.3s;
            }
        }
        .top-nav-pc
        {
            justify-content: space-around;
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
                    font-size: 0.75rem;
                    font-weight: 400;
                    cursor: pointer;
                    letter-spacing: 0.08rem;
                    transition: all 0.3s;
                }
            }
            .right-button
            {
                height: inherit;
                display: flex;
                align-items: center;
                .login-button
                {
                    min-width: 3rem;
                    height: 1.5rem;
                    background-color: #0478be;
                    border-radius: 0.3rem;
                    transition: all 0.3s;
                    font-size: 0.65rem;
                }
                .login-button:hover
                {
                    background-color: #0082d3;
                }
                .dark-button
                {
                    width: 2rem;
                    height: 2rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 50%;
                    cursor: pointer;
                    margin-right: 2rem;
                }
            }
        }
        .top-nav-mobile
        {
            padding: 0 1rem;
            justify-content: space-between;
            .menu-fold
            {
                height: 2.5rem;
                width: 2.5rem;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                cursor: pointer;
                i
                {
                    font-size: 1.2rem;
                }
            }
        }
        
    }
    .el-drawer
    {
        border-radius: 0.1rem;
        .el-drawer__sr-focus
        {
            display: none;
        }
        .el-drawer__body
        {
            width: 100%;
            height: 100%;
            padding: 0;
            .user-top-box
            {
                width: 100%;
                height: 3rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 1rem;
                .left-dl-model
                {
                    width: 2rem;
                    height: 2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    border-radius: 50%;
                }
            }
        }
    }
    .dark-model-enter-active, .dark-modelleave-active
    {
        transition: opacity 0.3s
    }
    .dark-model-enter-from, .dark-modelleave-to
    {
        opacity: 0
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
.dark-model
{
    background-color: rgb(23, 29, 32);
    .top-nav-pc , .top-nav-mobile
    {
        background-color: rgb(23, 29, 32);
        .left-name , .center-name
        {
            color: rgb(221, 221, 221);
        }
    }
    .top-nav-pc
    {
        .menu-list
        {
            .menu-list-item
            {
                color: lightgray;
            }
            .menu-list-item:hover
            {
                background-color: rgba(85, 85, 85, 0.2)        
            }
            .menu-list-item-active
            {
                background-color: rgb(51, 51, 51)            
            }
        }
        .right-button .dark-button i
        {
            color: #ffffff;
        }
    }
    .top-nav-mobile
    {
        .menu-fold i
        {
            color: #ffffff;
        }
    }
    .el-drawer .el-drawer__body
    {
        background-color: #171719;
        .user-box
        {
            .left-dl-model i
            {
                color: #ffffff;
            }
        }
    }
}
.light-model
{
    background-color: #f4f4f4;
    .top-nav-pc , .top-nav-mobile
    {
        background-color: #f4f4f4;
        .left-name , .center-name
        {
            color: rgb(97, 97, 97);
        }
    }
    .top-nav-pc
    {
        .menu-list
        {
            .menu-list-item
            {
                color: rgb(126, 126, 126);
            }
            .menu-list-item-active
            {
                background-color: rgba(80, 80, 80, 0.2)            
            }
            .menu-list-item:hover
            {
                background-color: rgb(231, 231, 231);
            }
        }
        .right-button .dark-button i
        {
            color: rgb(111, 111, 111);
        }
    }
    .top-nav-mobile
    {
        .menu-fold i
        {
            color: rgb(111, 111, 111);
        }
    }
    .el-drawer .el-drawer__body
    {
        background-color: #242663;
        .user-box
        {
            .left-dl-model i
            {
                color: rgb(255, 255, 255);
            }
        }
    }
}
</style>