<template>
    <div class="article-content">
        <main class="article-container">
            <nav class="top-info">
                <img :src="require('@/assets/image/test2.png')" class="article-img" title="test"/>
                <p class="article-title">{{this.articleContent.articleTitle}}</p>
                <div class="article-user-info">
                    <div class="left-user-info">
                        <img :src="this.articleContent.avatar" :title="this.articleContent.nickName"/>
                        <div class="name-div">
                            <span>{{this.articleContent.nickName}}</span>
                            <span>{{this.articleContent.createTime}}</span>
                        </div>
                    </div>
                    <div class="right-watch-sum">
                        <i class="far fa-eye"/>
                        <span>{{this.articleContent.articleViews}}</span>
                    </div>
                </div>
            </nav>
            <div class="article-show-content editer-render" v-html="this.articleContent.articleContent">

            </div>
            <footer class="article-vistor">
                <span class="article-vistor-title">评论</span>
                <div class="vistor-editor-box">
                    <editor :toolbarConfig="{
                        excludeKeys: [
                            'blockquote',
                            'header1',
                            'header2',
                            'header3',
                            'bulletedList',
                            'codeBlock',
                            'insertImage',
                            'insertLink',
                            'insertTable',
                            'insertVideo',
                            'justifyCenter',
                            'justifyLeft',
                            'justifyRight',
                            'numberedList', 
                            'redo',
                            'todo',
                            'undo',
                            'uploadImage',
                            'group-image',
                            'fullScreen',
                            '|',
                            'clearStyle',
                            'bold',
                            'underline',
                            'italic',
                            'through'
                        ]
                    }"/>
                </div>
                <div class="article-vistor-comment-list">
                    <comment v-for="item in commentList" :key="item.id" :renderData="item"/>
                </div>
            </footer>
        </main>
    </div>
</template>
<script>
import comment from '@/components/comment.vue'
import editor from '@/components/editor.vue'
import { articleContentGet } from '@/util/article.js'
import { ElMessage , ElMessageBox } from 'element-plus'
export default {
    components:{
        comment, editor
    },
    data(){
        return{
            articleContent: '',
            commentList: [
                {
                    id: 0,
                    commentHead: require('@/assets/image/userHead.jpg'),
                    commentName: '老王',
                    commentTime: '2022-08-08',
                    commentLike: '12',
                    commentContent: '<p>aaaaaaaaaaa</p>'
                },
                {
                    id: 1,
                    commentHead: require('@/assets/image/userHead.jpg'),
                    commentName: '老王',
                    commentTime: '2022-08-08',
                    commentLike: '12',
                    commentContent: '<p>bbbbbbbbbb</p>'
                }
            ]
        }
    },
    mounted(){
        articleContentGet({'articleId': this.$route.query.id}).then(resq => {
            if(resq.code == 200){
                this.articleContent = resq.data
            } else {
                ElMessage({type: 'error', message: resq.message})
            }
        }).catch(err => {
            ElMessage({type: 'error', message: err.message})
        })
    }
}
</script>
<style lang="scss" scoped>
.article-content
{
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
    padding-top: 2.7rem;
    .article-container
    {
        width: 100%;
        margin-top: 1rem;
        border-radius: 0.5rem;
        overflow: hidden;
        transition: background-color 0.3s;
        .top-info
        {
            width: 100%;
            .article-img
            {
                width: 100%;
                max-height: 18rem;
                object-fit: cover;
            }
            .article-title
            {
                width: 100%;
                font-size: 1.1rem;
                font-weight: 600;
                margin: 1rem 0;
                padding: 0 1rem;
                text-align: left;
                word-break: break-all;
                transition: color 0.3s;
            }
            .article-user-info
            {
                width: 100%;
                height: 3rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 1rem;
                .left-user-info
                {
                    height: inherit;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    img
                    {
                        width: 2.5rem;
                        min-width: 2.5rem;
                        height: 2.5rem;
                        overflow: hidden;
                        border-radius: 50%;
                    }
                    .name-div
                    {
                        height: 2.5rem;
                        margin-left: 0.5rem;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        white-space: nowrap;
                        span
                        {
                            transition: color 0.3s;
                        }
                        span:nth-child(1)
                        {
                            font-size: 0.78rem;
                        }
                        span:nth-child(2)
                        {
                            font-size: 0.6rem;
                        }
                    }
                }
                .right-watch-sum
                {
                    height: inherit;
                    display: flex;
                    align-items: center;
                    span , i
                    {
                        transition: color 0.3s;
                    }
                    span
                    {
                        color: rgba(0, 0, 0, 0.87);
                        font-size: 0.7rem;
                        margin-left: 0.5rem;
                    }
                }
            }
        }
        .article-show-content
        {
            width: 100%;
            min-height: 40vh;
            padding: 1rem;
        }
        .article-vistor
        {
            width: 100%;
            padding: 0 1rem;
            display: flex;
            flex-direction: column;
            .article-vistor-title
            {
                width: 100%;
                height: 3.5rem;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                font-size: 1rem;
                color: rgba(0, 0, 0, 0.87);
                transition: color 0.3s;
            }
            .vistor-editor-box
            {
                width: 100%;
                border-radius: 0.3rem;
                overflow: hidden;
            }
            .article-vistor-comment-list
            {
                width: 100%;
                margin-top: 0.5rem;
            }
        }
    }
    
}
</style>