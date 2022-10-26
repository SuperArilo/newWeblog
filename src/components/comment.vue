<template>
    <div class="comment-box" v-if="this.renderData">
        <div class="comment-top">
            <div class="comment-top-left">
                <img :src="this.renderData.replyUser.replyAvatar" :title="this.renderData.replyUser.replyNickName"/>
                <div class="vistor-info">
                    <div>
                        <span>{{this.renderData.replyUser.replyNickName}}</span>
                        <button class="relply-button" type="button" v-if="this.$store.getters.userInfo != null && this.$store.getters.userInfo.uid !== this.renderData.replyUser.replyUserId" @click="clickReply(this.renderData)">回复</button>
                        <button class="delete-button" type="button" v-if="this.$store.getters.userInfo != null && this.$store.getters.userInfo.uid === this.renderData.replyUser.replyUserId" @click="clickDeleteComment(this.renderData.commentId)">删除</button>
                    </div>
                    <span class="vistor-info-time">{{this.renderData.createTime}}</span>
                </div>
            </div>
            <div class="comment-top-right">
                <i class="fas fa-heart" :style="this.renderData.isLike ? 'color: red;':''" @click="clickLikeComment(this.renderData.commentId)"/>
                <span>{{this.renderData.likes}}</span>
            </div>
        </div>
        <div class="comment-content-render editor-render" v-html="this.reRenderContent" />
         <el-collapse-transition>
            <div v-if="this.commentEditorStatus" class="comment-editor">
                <tinymce @getContent="getContent" :clickButtonStatus="clickButtonStatus"/>
            </div>
         </el-collapse-transition>
        <!-- <transition name="editor-fade" mode="out-in">
            
        </transition> -->
    </div>
</template>
<script>
import tinymce from '@/components/Tinymce.vue'
export default {
    components: {
        tinymce
    },
    props:{
        renderData: {
            type: Object,
            default: null
        },
        clickButtonStatus: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return{

            commentEditorStatus: false,

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
    mounted(){
    },
    methods:{
        clickReply(){
            this.commentEditorStatus =! this.commentEditorStatus
        },
        clickLikeComment(commentId){
            this.$emit('likeComment', commentId)
        },
        clickDeleteComment(commentId){
            this.$emit('deleteComment', commentId)
        },
        getContent(value){
            this.$emit('getContent', this.renderData, value)
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
    position: relative;
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
                        
                        font-size: 0.6rem;
                        padding: 0.1rem 0.3rem;
                        cursor: pointer;
                        border-radius: 0.25rem;
                        margin-left: 0.5rem;
                    }
                    .relply-button
                    {
                        background-color: #0478be;
                    }
                    .delete-button
                    {
                        background-color: rgb(255, 85, 85);
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
    }
    .comment-editor
    {
        width: 100%;
    }
    .editor-fade-move , .editor-fade-enter-active , .editor-fade-leave-active
    {
        transition: all 0.2s;
    }
    .editor-fade-enter-from , .editor-fade-leave-to
    {
        opacity: 0;
        transform: translateY(-1rem);
    }
    .editor-fade-leave-active
    {
        position: absolute;
    }
}
</style>