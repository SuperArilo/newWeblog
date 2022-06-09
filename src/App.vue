<template>
    <div class="main-content" :class="this.$store.getters.darkModel ? 'dark-model':'light-model'">
        <nav class="top-nav-pc" v-if="!this.$store.getters.isPhone">
            <span class="left-name">鸽王BLOG</span>
            <ul class="menu-list">
                <li class="menu-list-item" v-ripple="{ duration: 500, color: this.$store.getters.darkModel ? 'invert' : ''}" v-for="item in menuList" :key="item.id" @click="menuListFunc(item.id, item.path)" :class="this.menuListIndex === item.id ? 'menu-list-item-active' : ''">{{item.title}}</li>
            </ul>
            <div class="right-button">
                <div class="dark-button" v-ripple="{ duration: 800, color: this.$store.getters.darkModel ? 'invert' : ''}" @click="chagenDarkModel">
                    <transition name="dark-model" mode="out-in">
                        <i class="fas fa-moon" v-if="!this.$store.getters.darkModel"/>
                        <i class="fas fa-sun" v-else/>
                    </transition>
                </div>
                <button class="login-button" v-ripple="{ duration: 800, color: 'invert'}" @click="openLoginBox">登录</button>
            </div>
        </nav>
        <nav class="top-nav-mobile" v-else>
            <span class="left-placeholder"></span>
            <span class="center-name">鸽王BLOG</span>
            <div v-ripple="{ duration: 500, color: this.$store.getters.darkModel ? 'invert' : ''}" class="menu-fold" @click="this.isOpenDrawer = true">
                <i class="fas fa-bars"/>
            </div>
        </nav>
        <div class="router-content">
            <router-view v-slot="{ Component }">
                <transition name="router-transform" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>
        <el-drawer v-model="this.isOpenDrawer" size="14rem" direction="ltr" :show-close="false" :with-header="false">
            <div class="user-top-box">
                <div class="left-dl-model" @click="chagenDarkModel" v-ripple="{ duration: 500, color: this.$store.getters.darkModel ? 'invert' : ''}">
                    <transition name="dark-model" mode="out-in">
                        <i class="fas fa-moon" v-if="!this.$store.getters.darkModel"/>
                        <i class="fas fa-sun" v-else/>
                    </transition>
                </div>
            </div>
            <div class="user-head">
                <img src=""/>
                <span>鸽王老曹</span>
            </div>
            <ul class="drawer-menu">
                <li class="drawer-menu-item" v-for="item in menuList" :key="item.id" v-ripple="{ duration: 800, color: 'invert'}" @click="menuListFunc(item.id, item.path)" :class="item.id === this.menuListIndex ? 'drawer-menu-item-active':''">
                    <i class="fas" :class="item.iconClass"/>
                    <span>{{item.title}}</span>
                </li>
            </ul>
            <button class="drawer-login-button" v-ripple="{ duration: 800, color: 'invert'}" @click="openLoginBox">登录</button>
        </el-drawer>
        <transition name="app-mask" mode="out-in">
            <div class="app-mask" v-show="this.isOpenLogin">
                <div class="login-box" :style="this.$store.getters.isPhone ? 'width: 100%;height: 100%;':'width: 24rem;'">
                    <header class="top-function">
                        <div class="left-back" v-ripple="{ duration: 800, color: this.$store.getters.darkModel ? 'invert':''}" @click="closeLoginBox">
                            <i class="far fa-arrow-alt-circle-left" />
                        </div>
                    </header>
                    <div class="top-tips">
                        <span class="left-span">欢迎回来,</span>
                        <button class="right-register" v-ripple="{ duration: 800, color: this.$store.getters.darkModel ? 'invert':''}">注册</button>
                    </div>
                    <p class="top-tips-line">请填写以下信息进行登录</p>
                    <label class="input-list">
                        <div class="input-item">
                            <div class="input-top-div">
                                <span>用户名</span>
                                <span>*</span>
                            </div>
                            <input type="text"/>
                            <div class="input-tips-div">
                                <transition>
                                    <span class="input-tips-span">{{userNameFailMessage}}</span>
                                </transition>
                            </div>
                        </div>
                    </label>
                </div>
            </div>
        </transition>
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
            menuListIndex: '',
            menuList: [
                {
                    id: 0,
                    title: '首页',
                    path: '/',
                    iconClass: 'fa-home'
                },
                {
                    id: 1,
                    title: '碎语',
                    path: '/say',
                    iconClass: 'fa-feather-alt'
                },
                {
                    id: 2,
                    title: '留言',
                    path: '',
                    iconClass: 'fa-comment-alt'
                },
                {
                    id: 3,
                    title: '友邻',
                    path: '',
                    iconClass: 'fa-user-friends'
                },
                {
                    id: 4,
                    title: '圈子',
                    path: '',
                    iconClass: 'fa-paw'
                }
            ],
            isOpenDrawer: false,
            isOpenLogin: false,
            userNameFailMessage: ''
        }
    },
    created(){
        start()
        this.setUserProfile()
        this.windowWidth()
        window.addEventListener('resize', this.windowWidth)
        window.addEventListener('beforeunload', this.saveUserProfile)
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
                if(!this.isOpenDrawer) return
                this.isOpenDrawer = false
            }
        },
        menuListFunc(id, path){
            this.menuListIndex = id
            this.$router.push(path)
            if(!this.isOpenDrawer) return
            setTimeout(() => {
                this.isOpenDrawer = false
            },1000)
            
        },
        setMenuStyle(path){
            this.menuListIndex = this.menuList.findIndex(item => item.path === path)
        },
        chagenDarkModel(){
            let temp = this.$store.getters.darkModel
            temp =! temp
            this.$store.commit('darkModelSet', temp)
        },
        saveUserProfile(){
            let json = {
                uid: '',
                darkModel: this.$store.getters.darkModel
            }
            localStorage.setItem('userProfile', JSON.stringify(json))
        },
        async setUserProfile(){
            let json = JSON.parse(localStorage.getItem('userProfile'))
            this.$store.commit('darkModelSet', json.darkModel)
        },
        openLoginBox(){
            if(this.isOpenLogin) return
            if(this.isOpenDrawer){
                this.isOpenDrawer = false
            }
            this.isOpenLogin = true
        },
        closeLoginBox(){
            if(this.isOpenLogin){
                setTimeout(() => {
                    this.isOpenLogin = false
                }, 500)
            }
        },
        checkUserNameMatch(content){

        }
    },
    watch:{
        $route:{
            handler(n, o){
                this.setMenuStyle(n.path)
            },
            deep: false
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
ul , li
{
    list-style: none;
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
            .left-placeholder , .menu-fold
            {
                height: 2.5rem;
                width: 2.5rem;
            }
            .menu-fold
            {
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
        .router-content
        {
            width: 100%;
            padding-top: 2.5rem;
            .router-transform-enter-active, .router-transform-leave-active
            {
                transition: opacity 0.3s
            }
            .router-transform-enter-from, .router-transform-leave-to
            {
                opacity: 0;
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
            display: flex;
            flex-direction: column;
            align-items: center;
            transition: background 0.3s;
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
            .user-head
            {
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 2rem 0;
                img
                {
                    width: 4rem;
                    height: 4rem;
                    border-radius: 50%;
                    border: solid 1px #e0e0e0;
                    overflow: hidden;
                }
                span
                {
                    font-size: 1rem;
                    font-weight: bold;
                    letter-spacing: 0.08rem;
                    color: #ffffff;
                    margin-top: 1rem;
                }
            }
            .drawer-menu
            {
                width: 100%;
                display: flex;
                flex: 1;
                border-radius: 1.8rem 1.8rem 0.5rem 0.5rem;
                padding: 1.8rem 1.5rem;
                flex-direction: column;
                transition: background 0.3s;
                .drawer-menu-item
                {
                    width: 100%;
                    height: 2rem;
                    margin: 0.5rem 0;
                    padding: 0 0.5rem;
                    cursor: pointer;
                    border-radius: 1rem;
                    display: flex;
                    align-items: center;
                    i , span
                    {
                        transition: color 0.3s;
                    }
                    i
                    {
                        width: 2rem;
                        height: 2rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 1.1rem;
                        color: rgb(185, 184, 204);
                    }
                    span
                    {
                        flex: 1;
                        margin-left: 1.5rem;
                        color: #b9b8cc;
                        font-size: 0.88rem;
                        letter-spacing: 0.1rem;
                    }
                }
                .drawer-menu-item-active
                {
                    i , span
                    {
                        color: #ffffff;
                    }
                }
            }
            .drawer-login-button
            {
                width: 12rem;
                height: 2rem;
                border-radius: 0.3rem;
                margin: 1rem 0;
                background-color: #0478be;
                cursor: pointer;
                color: #ffffff;
                font-size: 0.8rem;
                letter-spacing: 0.2rem;
            }
        }
    }
    .dark-model-enter-active, .dark-model-leave-active
    {
        transition: opacity 0.5s
    }
    .dark-model-enter-from, .dark-model-leave-to
    {
        opacity: 0
    }
    .app-mask
    {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        background-color: rgba(0, 0, 0, 0.2);
        display: flex;
        justify-content: center;
        align-items: center;
        .login-box
        {
            box-shadow: 0 1.2rem 2.5rem -1rem rgba(0, 0, 0, 0.05);
            border-radius: 0.3rem;
            transition: transform 0.3s;
            padding: 1rem 1.5rem;
            .top-function
            {
                width: 100%;
                height: 2rem;
                .left-back
                {
                    width: 3rem;
                    height: 2rem;
                    border-radius: 0.5rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    i
                    {
                        transition: color 0.3s;
                        font-size: 1.5rem;
                    }
                }
            }
            .top-tips
            {
                width: 100%;
                margin-top: 1rem;
                display: flex;
                justify-content: space-between;
                .left-span
                {
                    font-size: 1.15rem;
                    letter-spacing: 0.1rem;
                    font-weight: bold;
                }
                .right-register
                {
                    width: 3.5rem;
                    height: 1.8rem;
                    color: #ec558c;
                    background-color: transparent;
                    font-size: 0.82rem;
                    border-radius: 0.2rem;
                }
            }
            .top-tips-line
            {
                width: 100%;
                color: #999;
                font-size: 0.9rem;
                letter-spacing: 0.1rem;
                margin-bottom: 1rem;
            }
            .input-list
            {
                width: 100%;
                .input-item
                {
                    display: flex;
                    flex-direction: column;
                    .input-top-div
                    {
                        width: 100%;
                        display: flex;
                        justify-content: flex-start;
                        span
                        {
                            height: 1rem;
                            display: flex;
                        }
                        span:nth-child(1)
                        {
                            align-items: center;
                            font-size: 0.75rem;
                            font-weight: bold;
                        }
                        span:nth-child(2)
                        {
                            align-items: flex-start;
                            color: red;
                        }
                    }
                    input
                    {
                        width: 100%;
                        height: 1.8rem;
                        border-radius: 0.3rem;
                        background-color: #f3f3f4;
                        border: none;
                        margin-top: 0.5rem;
                        transition: all 0.3s;
                        outline: none;
                        padding: 0 0.8rem;
                        border: solid 1px transparent;
                    }
                    input:hover , input:focus
                    {
                        box-shadow: 0 0 0.3rem rgb(147, 182, 211);
                        border: solid 1px rgb(89, 164, 240);
                    }
                    .input-tips-div
                    {
                        width: 100%;
                        height: 1rem;
                        span
                        {
                            font-size: 0.6rem;
                            color: red;
                        }
                    }
                }
            }
        }
    }
    .app-mask-enter-active, .app-mask-leave-active
    {
        transition: all 0.5s;
    }
    .app-mask-enter-from , .app-mask-leave-to
    {
        opacity: 0;
        .login-box
        {
            transform: translateY(300%);
        }
    }
    .app-mask-enter-to , .app-mask-leave-from
    {
        opacity: 1;
        .login-box
        {
            transform: translateY(0);
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
        .user-top-box
        {
            .left-dl-model i
            {
                color: #ffffff;
            }
        }
        .drawer-menu
        {
            background-color: #1b1e21;
        }
    }
    .app-mask .login-box
    {
        background-color: #2f3133;
        .top-function
        {
            .left-back i
            {
                color: #ffffff;
            }
        }
        .top-tips
        {
            .left-span
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
        .user-top-box
        {
            .left-dl-model i
            {
                color: rgb(255, 255, 255);
            }
        }
        .drawer-menu
        {
            background-color: #1a1d53;
        }
    }
    .app-mask .login-box
    {
        background-color: #ffffff;
        .top-function
        {
            .left-back i
            {
                color: rgb(111, 111, 111);
            }
        }
    }
}
</style>