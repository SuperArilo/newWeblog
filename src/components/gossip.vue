<template>
    <div class="gossip-box">
        <header class="gossip-title">
            <div class="gossip-title-left">
                <img :src="data.userHead" :title="data.name"/>
                <div class="gossip-title-left-info">
                    <div>
                        <span>{{data.name}}</span>
                        <span>1天前</span>
                    </div>
                    <span class="user-describe">{{data.describe}}</span>
                </div>
            </div>
        </header>
        <div class="gossip-render-content editer-render" v-html="data.content"/>
        <div class="gossip-state">
            <span>0个喜欢</span>
            <span>|</span>
            <span>1个评论</span>
        </div>
        <div class="gossip-button-box">
            <button type="button" v-wave="{color: this.$store.getters.darkModel ? 'rgba(255, 255, 255, 0.7)':'rgba(0, 0, 0, 0.7)'}">
                <i class="fas fa-heart"/>
                喜欢
            </button>
            <button @click="this.isOpenComment =! this.isOpenComment" type="button" v-wave="{color: this.$store.getters.darkModel ? 'rgba(255, 255, 255, 0.7)':'rgba(0, 0, 0, 0.7)'}">
                <i class="fas fa-comment-dots"/>
                评论
            </button>
            <button type="button" v-wave="{color: this.$store.getters.darkModel ? 'rgba(255, 255, 255, 0.7)':'rgba(0, 0, 0, 0.7)'}">
                <i class="fas fa-share-alt"/>
                分享
            </button>
        </div>
        <el-collapse-transition>
            <footer v-if="this.isOpenComment" class="gossip-comment-box">
                <editor/>
                <div class="submit-button">
                    <button type="button" v-wave="{color: 'rgba(0, 0, 0, 0.7)'}">提交</button>
                </div>
                <ul class="gossip-comment-list">
                    <li>
                        <header class="comment-top">
                            <div class="comment-top-left">
                                <img src="../assets/image/userHead.jpg"/>
                                <div class="left-user-info">
                                    <div>
                                        <span>老曹</span>
                                        <button type="button">回复</button>
                                    </div>
                                    <span class="comment-time">2021-06-03 11:25</span>
                                </div>
                            </div>
                            <div class="comment-right-like">
                                <i class="fas fa-heart"/>
                                <span>12</span>
                            </div>
                        </header>
                        <div class="editer-render">
                            <p>后端太垃圾了</p>
                        </div>
                    </li>
                    <li>
                        <header class="comment-top">
                            <div class="comment-top-left">
                                <img src="../assets/image/userHead.jpg"/>
                                <div class="left-user-info">
                                    <div>
                                        <span>老曹</span>
                                        <button>回复</button>
                                    </div>
                                    <span class="comment-time">2021-06-03 11:25</span>
                                </div>
                            </div>
                            <div class="comment-right-like">
                                <i class="fas fa-heart"/>
                                <span>12</span>
                            </div>
                        </header>
                        <div class="editer-render">
                            <p>后端太垃圾了</p>
                        </div>
                    </li>
                </ul>
            </footer>
        </el-collapse-transition>
    </div>
</template>
<script>
import editor from '@/components/editor.vue'
export default {
    components: { 
        editor
    },
    data(){
        return{
            isOpenComment: false
        }
    },
    props:{
        data: {
            type: Object
        }
    },
    mounted(){
    },
    methods:{
    }
}
</script>
<style lang="scss" scoped>
.gossip-box
{
    width: 100%;
    margin: 0.8rem 0;
    padding: 0.5rem;
    border-radius: 0.3rem;
    transition: background-color 0.3s;
    .gossip-title
    {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        .gossip-title-left
        {
            height: 2.5rem;
            display: flex;
            align-items: center;
            img
            {
                width: 2.2rem;
                height: 2.2rem;
                overflow: hidden;
                border-radius: 50%;
            }
            .gossip-title-left-info
            {
                height: inherit;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                margin-left: 0.5rem;
                div
                {
                    span:nth-child(1)
                    {
                        font-size: 0.75rem;
                        font-weight: bold;
                        transition: color 0.3s;
                    }
                    span:nth-child(2)
                    {
                        margin-left: 0.5rem;
                    }
                }
                .user-describe , div span:nth-child(2)
                {
                    font-size: 0.6rem;
                    color: #777777;
                }
            }
        }
    }
    .gossip-render-content , .editer-render
    {
        width: 100%;
        flex: 1;
        min-height: 3rem;
        
    }
    .gossip-state
    {
        width: 100%;
        height: 1.5rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        span
        {
            font-size: 0.62rem;
            color: #777777;
        }
        span:nth-child(2)
        {
            margin: 0 0.5rem;
        }
    }
    .gossip-button-box
    {
        width: 100%;
        display: flex;
        margin-top: 0.3rem;
        button
        {
            flex: 1;
            height: 1.8rem;
            border-radius: 0.25rem;
            cursor: pointer;
            font-size: 0.7rem;
            transition: color 0.3s, background-color, 0.3s;
        }
        button:nth-child(2)
        {
            margin: 0 0.3rem;
        }
    }
    .gossip-comment-box
    {
        width: 100%;
        .submit-button
        {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            margin: 0.5rem 0;
            button
            {
                padding: 0.3rem 0.6rem;
                border-radius: 0.3rem;
                background-color: rgb(4, 120, 190);
            }
        }
        .gossip-comment-list
        {
            width: 100%;
            li
            {
                width: 100%;
                padding-top: 0.5rem;
                border-top: solid 1px rgb(211, 211, 211);
                .comment-top
                {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .comment-top-left , .comment-right-like
                    {
                        height: 2.5rem;
                        display: flex;
                    }
                    .comment-top-left
                    {
                        align-items: center;
                        img
                        {
                            width: 2.2rem;
                            height: 2.2rem;
                            border-radius: 50%;
                            overflow: hidden;
                        }
                        .left-user-info
                        {
                            height: inherit;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-around;
                            margin-left: 0.5rem;
                            div
                            {
                                span
                                {
                                    font-size: 0.75rem;
                                    transition: color 0.3s;
                                }
                                button
                                {
                                    font-size: 0.5rem;
                                    padding: 0.05rem 0.4rem;
                                    border-radius: 0.3rem;
                                    cursor: pointer;
                                    margin-left: 0.5rem;
                                    background-color: rgb(4, 120, 190);
                                }
                            }
                            .comment-time
                            {
                                font-size: 0.6rem;
                                color: #777777;
                            }
                        }
                    }
                    .comment-right-like
                    {
                        width: 2rem;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        i
                        {
                            color: #777777;
                            cursor: pointer;
                            transition: transform 0.3s, color 0.3s;
                        }
                        i:hover
                        {
                            
                            transform: scale(1.2);
                            color: rgb(250, 73, 73);
                        }
                        span
                        {
                            font-size: 0.6rem;
                            margin-top: 0.3rem;
                            color: #777777;
                        }
                    }
                }
            }
        }
    }
}
</style>