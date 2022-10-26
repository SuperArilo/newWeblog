<template>
    <div class="gossip-box" v-if="this.renderData">
        <header class="gossip-title">
            <div class="gossip-title-left">
                <img :src="this.renderData.avatar" :title="this.renderData.nickName"/>
                <div class="gossip-title-left-info">
                    <div>
                        <span>{{this.renderData.nickName}}</span>
                        <span>{{this.renderData.createTime}}</span>
                    </div>
                    <span class="user-describe"></span>
                </div>
            </div>
        </header>
        <div class="gossip-render-content editor-render" v-html="this.renderData.content"/>
        <div class="gossip-state">
            <span>{{this.renderData.likes}}个喜欢</span>
            <span>|</span>
            <span>{{this.renderData.comments}}个评论</span>
        </div>
        <div class="gossip-button-box">
            <button type="button" v-wave="{color: this.$store.getters.darkModel ? 'rgba(255, 255, 255, 0.7)':'rgba(0, 0, 0, 0.7)'}">
                <i class="fas fa-heart"/>
                喜欢
            </button>
            <button @click="openCommentList" type="button" v-wave="{color: this.$store.getters.darkModel ? 'rgba(255, 255, 255, 0.7)':'rgba(0, 0, 0, 0.7)'}">
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
                <editor :isDark="this.$store.getters.darkModel" @getContent="replySendToServer"/>
                <div class="gossip-comment-list">
                    <transition-group name="list" mode="out-in">
                        <comment v-for="item in this.commentList" :key="item.commentId" :renderData="item" />
                    </transition-group>
                </div>
            </footer>
        </el-collapse-transition>
    </div>
</template>
<script>
import editor from '@/components/Tinymce.vue'
import comment from '@/components/comment.vue'
import { gossipCommentList , gossipCommentCreate } from '@/util/gossip.js'
import { ElMessage , ElMessageBox } from 'element-plus'
export default {
    components: { 
        editor, comment
    },
    data(){
        return{

            clickButtonStatus: false,

            isOpenComment: false,
            commentList: [],

            //请求参数实例
            requestInstance: {
                pageNum: 1,
                pageSize: 10,
                gossipId: this.renderData ? this.renderData.id : null
            }
        }
    },
    props:{
        renderData: {
            type: Object,
            default: null
        }
    },
    mounted(){
    },
    methods:{
        getCommentList(){
            gossipCommentList(this.requestInstance).then(resq => {
                if(resq.code === 200) {
                    this.commentList = resq.data.list
                } else {
                    ElMessage({type: 'error', message: resq.message})
                }
            }).catch(err => {
                ElMessage({type: 'error', message: err.message})
            })
        },
        openCommentList(){
            this.isOpenComment =! this.isOpenComment
            if(this.commentList.length === 0){
                setTimeout(() => {
                    this.getCommentList()
                }, 1000)
            }
        },
        replySendToServer(value){
            this.clickButtonStatus = true
            let data = new FormData()
            data.append('gossipId', this.renderData.id)
            data.append('content', value)
            gossipCommentCreate(data).then(resq => {
                if(resq.code === 200) {
                    ElMessage({type: 'success', message: resq.message})
                    this.getCommentList()
                } else {
                    ElMessage({type: 'error', message: resq.message})
                }
                this.clickButtonStatus = false
            }).catch(err => {
                ElMessage({type: 'error', message: err.message})
                this.clickButtonStatus = false
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.gossip-box
{
    width: 100%;
    margin-top: 0.8rem;
    padding: 0.5rem 1rem;
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
                min-width: 2.2rem;
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
    .gossip-render-content
    {
        width: 100%;
        flex: 1;
        min-height: 3rem;
        padding: 0.5rem 1rem;
        transition: background-color 0.3s;
        margin-top: 0.25rem;
        border-radius: 0.25rem;
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
        padding-top: 0.5rem;
        .gossip-comment-list
        {
            width: 100%;
        }
        .list-move , .list-enter-active , .list-leave-active
        {
            transition: all 0.3s ease-in-out;
        }
        .list-enter-from , .list-leave-to
        {
            opacity: 0;
            transform: translateY(2rem);
        }
        .list-leave-active
        {
            position: absolute;
        }
    }
}
</style>