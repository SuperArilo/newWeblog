<template>
    <div class="comment-box" v-if="this.renderData">
        <div class="comment-top">
            <div class="comment-top-left">
                <img :src="this.renderData.replyUser.replyAvatar" :title="this.renderData.replyUser.replyNickName"/>
                <div class="vistor-info">
                    <div>
                        <span>{{this.renderData.replyUser.replyNickName}}</span>
                        <button type="button" @click="clickReply(this.renderData)">回复</button>
                    </div>
                    <span class="vistor-info-time">{{this.renderData.createTime}}</span>
                </div>
            </div>
            <div class="comment-top-right">
                <i class="fas fa-heart" :style="this.renderData.isLike ? 'color: red;':''" @click="clikcLikeComment(this.renderData.articleId, this.renderData.commentId)"/>
                <span>{{this.renderData.likes}}</span>
            </div>
        </div>
        <div class="comment-content-render editer-render" v-html="this.reRenderContent" />
    </div>
</template>
<script>
import { likeComment } from "@/util/article.js"
import { ElMessage , ElMessageBox } from 'element-plus'
export default {
    props:{
        renderData: {
            type: Object
        }
    },
    data(){
        return{
            reRenderContent: ''
        }
    },
    created(){
        if(this.renderData.byReplyUser){
            this.reRenderContent = '<blockquote>@' + this.renderData.byReplyUser.byReplyName + '</blockquote>' + this.renderData.content
        } else {
            this.reRenderContent = this.renderData.content
        }
    },
    methods:{
        clickReply(object){
            this.$emit('getReplyUser', object)
        },
        clikcLikeComment(articleId, commentId){
            let data = new FormData()
            data.append('articleId', articleId)
            data.append('commentId', commentId)
            likeComment(data).then(resq => {
                if(resq.code === 200 ){
                    ElMessage({type: 'success', message: resq.message})
                    if(resq.data.status){
                        this.renderData.likes++
                    } else {
                        this.renderData.likes--
                    }
                    this.renderData.isLike = resq.data.status
                } else {
                    ElMessage({type: 'error', message: resq.message})
                }
            }).catch(err => {
                ElMessage({type: 'error', message: err.message})
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.comment-box
{
    width: 100%;
    display: flex;
    flex-direction: column;
    transition: border 0.3s;
    .comment-top
    {
        width: 100%;
        height: 3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .comment-top-left
        {
            height: inherit;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            img
            {
                width: 2rem;
                height: 2rem;
                border-radius: 50%;
                object-fit: cover;
            }
            .vistor-info
            {
                height: inherit;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                margin-left: 0.5rem;
                div
                {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    span
                    {
                        font-size: 0.65rem;
                        color: #4c4e4d;
                        transition: color 0.3s;
                    }
                    button
                    {
                        background-color: #0478be;
                        font-size: 0.6rem;
                        padding: 0.1rem 0.3rem;
                        cursor: pointer;
                        border-radius: 0.25rem;
                        margin-left: 0.5rem;
                    }
                }
                .vistor-info-time
                {
                    font-size: 0.6rem;
                    transition: color 0.3s;
                    color: #4c4e4d;
                    font-weight: 400;
                    letter-spacing: 0.05rem;
                }
            }
        }
        .comment-top-right
        {
            height: inherit;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            i
            {
                color: darkgray;
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
                color: rgb(204, 204, 204);
                margin-top: 0.25rem;
                transition: color 0.3s;
            }
        }
    }
    .comment-content-render
    {
        width: 100%;
        padding: 0.5rem 1rem;
        min-height: 3rem;
        border-radius: 0.2rem;
        transition: background-color 0.3s;
    }
}
</style>