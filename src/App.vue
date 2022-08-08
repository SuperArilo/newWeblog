<template>
    <div class="main-content" :class="this.$store.getters.darkModel ? 'dark-model':'light-model'">
        <nav class="top-nav-pc" v-if="!this.$store.getters.isPhone">
            <span class="left-name">鸽王BLOG</span>
            <ul class="menu-list">
                <li class="menu-list-item" v-for="item in menuList" :key="item.id" @click="menuListFunc(item.id, item.path)" :class="this.menuListIndex === item.id ? 'menu-list-item-active' : ''" v-wave="{color: this.$store.getters.darkModel ? 'rgba(255, 255, 255, 0.7)':'rgba(0, 0, 0, 0.7)'}">{{item.title}}</li>
            </ul>
            <div class="right-button">
                <div class="dark-button" @click="chagenDarkModel" v-wave="{color: this.$store.getters.darkModel ? 'rgba(0, 0, 0, 0.7)':'rgba(255, 255, 255, 0.7)'}">
                    <transition name="dark-model" mode="out-in">
                        <i class="fas fa-moon" v-if="!this.$store.getters.darkModel"/>
                        <i class="fas fa-sun" v-else/>
                    </transition>
                </div>
                <button type="button" class="login-button" @click="openLoginBox" v-wave="{color: 'rgba(255, 255, 255, 0.7)'}">登录</button>
            </div>
        </nav>
        <nav class="top-nav-mobile" v-else>
            <span class="left-placeholder"></span>
            <span class="center-name">鸽王BLOG</span>
            <div class="menu-fold" @click="this.isOpenDrawer = true" v-wave="{color: this.$store.getters.darkModel ? 'rgba(255, 255, 255, 0.7)':'rgba(0, 0, 0, 0.7)'}">
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
        <transition name="app-mask" mode="out-in">
            <keep-alive>
                <div class="app-mask" v-if="this.isOpenLogin || this.isOpenDrawer" :style="[this.isOpenLogin ? 'justify-content: center;':'', this.isOpenDrawer ? 'justify-content: flex-start;':'']" @click="closeUserInfoBox">
                    <div class="login-box" :style="this.$store.getters.isPhone ? 'width: 100%;height: 100%;':'width: 24rem;'" v-if="this.isOpenLogin">
                        <header class="top-function">
                            <div class="left-back" @click="closeLoginBox" v-wave="{color: this.$store.getters.darkModel ? 'rgba(255, 255, 255, 0.7)':'rgba(0, 0, 0, 0.7)'}">
                                <i class="far fa-arrow-alt-circle-left"/>
                            </div>
                        </header>
                        <div class="top-tips">
                            <span class="left-span">欢迎回来,</span>
                            <button type="button" class="right-register" v-wave="{color: this.$store.getters.darkModel ? 'rgba(255, 255, 255, 0.7)':'rgba(0, 0, 0, 0.7)'}">注册</button>
                        </div>
                        <p class="top-tips-line">请填写以下信息进行登录</p>
                        <div class="input-list">
                            <label class="input-item">
                                <div class="input-top-div">
                                    <span>用户名</span>
                                    <span>*</span>
                                </div>
                                <input type="text" @change="checkUserNameMatch" placeholder="请输入用户名"/>
                                <div class="input-tips-div">
                                    <span>{{userNameFailMessage}}</span>
                                </div>
                            </label>
                            <form class="input-password">
                                <div class="input-top-div">
                                    <span>密码</span>
                                    <span>*</span>
                                </div>
                                <div class="input-password-lable">
                                    <input :type="this.isShowPassword ? 'text':'password'" maxlength="16" placeholder="请输入密码" autocomplete="off"/>
                                    <i class="far input-show-password" :class="this.isShowPassword ? 'fa-eye-slash':'fa-eye'" @click="this.isShowPassword =! this.isShowPassword" v-wave="{color: this.$store.getters.darkModel ? 'rgba(255, 255, 255, 0.7)':'rgba(0, 0, 0, 0.7)'}"/>
                                </div>
                            </form>
                        </div>
                        <button type="button" class="login-button" :class="this.$store.getters.isPhone ? 'login-button-mobile':'login-button-pc'" v-wave="{color: this.$store.getters.darkModel ? 'rgba(255, 255, 255, 0.7)':'rgba(0, 0, 0, 0.7)'}">登录</button>
                        <span class="other-login-tips">其他登录方式</span>
                        <div class="other-login-list">
                            <i class="fab fa-qq" v-wave="{color: this.$store.getters.darkModel ? 'rgba(255, 255, 255, 0.7)':'rgba(0, 0, 0, 0.7)'}"/>
                            <i class="fab fa-github" v-wave="{color: this.$store.getters.darkModel ? 'rgba(255, 255, 255, 0.7)':'rgba(0, 0, 0, 0.7)'}"/>
                            <i class="fab fa-google" v-wave="{color: this.$store.getters.darkModel ? 'rgba(255, 255, 255, 0.7)':'rgba(0, 0, 0, 0.7)'}"/>
                            <i class="fab fa-xbox" v-wave="{color: this.$store.getters.darkModel ? 'rgba(255, 255, 255, 0.7)':'rgba(0, 0, 0, 0.7)'}"/>
                        </div>
                    </div>
                    <div class="user-info-box" v-if="this.isOpenDrawer">
                        <div class="user-top-box">
                            <div class="left-dl-model" @click="chagenDarkModel" v-wave="{color: 'rgba(255, 255, 255, 0.7)'}">
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
                            <li class="drawer-menu-item" v-for="item in menuList" :key="item.id" @click="menuListFunc(item.id, item.path)" :class="item.id === this.menuListIndex ? 'drawer-menu-item-active':''"  v-wave="{color: 'rgba(255, 255, 255, 0.7)'}">
                                <i class="fas" :class="item.iconClass"/>
                                <span>{{item.title}}</span>
                            </li>
                        </ul>
                        <button class="drawer-login-button" @click="openLoginBox"  v-wave="{color: 'rgba(0, 0, 0, 0.7)'}">登录</button>
                    </div>
                </div>
            </keep-alive>
        </transition>
        <transition name="scroll-up" mode="out-in">
            <div v-show="this.$store.getters.windowScrollValue >= 400" class="scroll-up" @click="scrollToTop">
                <i class="far fa-arrow-alt-circle-up"/>
                <span>UP</span>
            </div>
        </transition>
    </div>
</template>
<script>
import '@/assets/fontawesome/css/all.min.css'
import { start, close } from '@/util/nprogress'
import '@/assets/custom/darkAndLight.scss'
import $ from 'jquery'
export default {
    data(){
        return{
            menuListIndex: null,
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
            isShowPassword: false,
            userNameFailMessage: ''
        }
    },
    created(){
        start()
        this.setUserProfile()
        this.windowWidth()
        window.addEventListener('resize', this.windowWidth)
        window.addEventListener('scroll', this.scrollValue, true)
        window.addEventListener('beforeunload', this.saveUserProfile)
    },
    mounted(){
        close()
    },
    methods:{
        windowWidth(){
            if(window.innerWidth <= 767){
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
            },300)
            
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
            setTimeout(() => {
                this.isOpenLogin = true
            }, 100)
            this.userNameFailMessage = ''
            this.isShowPassword = false
        },
        closeLoginBox(){
            if(this.isOpenLogin){
                setTimeout(() => {
                    this.isOpenLogin = false
                }, 400)
            }
        },
        checkUserNameMatch(e){
            let value = e.target.value
            if(value === ''){
                this.userNameFailMessage = '用户名不能为空'
                return
            }
            //判断长度
            const matchLineRule = /^.{4,16}$/
            const matchZHCN = /^[\\u4E00-\\u9FA5A-Za-z0-9]+$/
            if(matchLineRule.test(value)){
                this.userNameFailMessage = '长度不匹配'
            } if(!matchZHCN.test(value)) {
                this.userNameFailMessage = '用户名不能使用中文'
            } else {
                this.userNameFailMessage = ''
            }
        },
        closeUserInfoBox(e){
            if(e.target.className === 'app-mask' && this.isOpenDrawer){
                this.isOpenDrawer = false
            }
        },
        scrollToTop(){
            $('html,body').stop().animate({'scrollTop': 0})
        },
        scrollValue(e){
            this.$store.commit('windowScrollValueSet', $(e.target).scrollTop())
        },
    },
    watch:{
        $route:{
            handler(n, o){
                this.menuListIndex = this.menuList.findIndex(item => item.path === n.path)
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
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    overflow-x: hidden;
    overflow-y: overlay;
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
    background-color: transparent;
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
    width: 0.4rem;
}
::-webkit-scrollbar-thumb
{
    background-color: rgb(79, 130, 241);
    border-radius: 0.2rem;
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
            height: 2.7rem;
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
                cursor: pointer;
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
            max-width: 1080px;
            margin: 0 auto;
            padding: 0 2rem;
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
    .dark-model-enter-active, .dark-model-leave-active
    {
        transition: opacity 0.3s
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
                margin-top: 1.5rem;
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
                margin-bottom: 1.5rem;
            }
            .input-list
            {
                width: 100%;
                .input-item , .input-password
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
                    input , .input-password-lable input
                    {
                        width: 100%;
                        height: 2rem;
                        border-radius: 0.3rem;
                        border: none;
                        margin-top: 0.5rem;
                        transition: all 0.3s;
                        outline: none;
                        padding: 0 0.8rem;
                        border: solid 1px transparent;
                    }
                    
                }
                .input-item
                {
                    margin-bottom: 0.5rem;
                }
                .input-password .input-password-lable
                {
                    width: 100%;
                    display: flex;
                    .input-show-password
                    {
                        min-width: 2.5rem;
                        flex: 1;
                        margin-left: 0.5rem;
                        margin-top: 0.5rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                        border-radius: 0.6rem;
                        transition: color 0.3s;
                    }
                    input[type="password"]::-ms-reveal
                    {
                        display: none;
                    }
                }
            }
            .login-button
            {
                width: 100%;
                height: 2.4rem;
                border-radius: 1.2rem;
                font-size: 0.8rem;
                letter-spacing: 0.1rem;
                transition: all 0.3s;
            }
            .login-button-pc
            {
                margin: 1.5rem 0;
            }
            .login-button-mobile
            {
                margin: 4rem 0 1rem 0;
            }
            .other-login-tips
            {
                width: 100%;
                height: 1rem;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 0.6rem;
                letter-spacing: 0.08rem;
            }
            .other-login-tips::before , .other-login-tips::after
            {
                content: "";
                display: flex;
                flex: 1;
                height: 0.05rem;
            }
            .other-login-tips::before
            {
                margin-right: 1rem;
            }
            .other-login-tips::after
            {
                margin-left: 1rem;
            }
            .other-login-list
            {
                width: 100%;
                display: flex;
                justify-content: center;
                flex-wrap: nowrap;
                margin-top: 1rem;
                i
                {
                    width: 3rem;
                    height: 3rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 50%;
                    font-size: 1.5rem;
                    cursor: pointer;
                }
            }
        }
        .user-info-box
        {
            width: 14rem;
            height: 100%;
            transition: all 0.3s;
            display: flex;
            flex-direction: column;
            align-items: center;
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
        .user-info-box
        {
            transform: translateX(-100%);
        }
    }
    .app-mask-enter-to , .app-mask-leave-from
    {
        opacity: 1;
        .login-box
        {
            transform: translateY(0);
        }
        .user-info-box
        {
            transform: translateX(0);
        }
    }
    .scroll-up
    {
        display: flex;
        justify-content: center;
        align-content: flex-start;
        flex-wrap: wrap;
        position: fixed;
        right: 0;
        bottom: 0;
        margin: 2rem 1rem;
        z-index: 600;
        color: #3773f3;
        background-color: #ffffff;
        padding: 0.4rem 0;
        border-radius: 0.5rem;
        box-shadow: 0 0 0.15rem rgba(0, 0, 0, 0.521);
        cursor: pointer;
        i , span
        {
            width: 100%;
            display: flex;
            justify-content: center;
        }
        i
        {
            font-size: 2rem;
        }
        span
        {
            margin-top: 0.2rem;
            font-size: 0.8rem;
        }
    }
    .scroll-up-enter-active , .scroll-up-leave-active
    {
        transition: all 0.3s;
    }
    .scroll-up-enter-from , .scroll-up-leave-to
    {
        opacity: 0;
        transform: translateY(1rem);
    }
    .editer-render
    {
        font-size: 0.6rem !important;
        blockquote
        {
            display: block;
            padding: 0.15rem 1rem;
            margin: 0.3rem 0;
            line-height: 2;
            font-size: 100%;
        }
        hr
        {
            cursor: pointer;
            display: block;
            height: 0;
            border: 0;
            margin: 0.6rem 0;
        }
        img
        {
            height: auto !important;
            cursor: pointer;
        }
        h1 , h2 , h3 , h4 , h5 , p , table , pre
        {
            transition: color 0.3s;
            margin: 0.5rem 0;
            line-height: 1.5;
        }
        table
        {
            th , td
            {

                padding: 0.1rem 0.3rem;
                min-height: 1.2rem;
                height: 1.2rem;
            }
            th
            {
                text-align: center;
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