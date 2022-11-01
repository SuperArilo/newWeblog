<template>
    <div class="article-content">
        <main class="article-container">
            <nav class="top-info">
                <img :src="this.articleContent.articlePicture" class="article-img" title="test"/>
                <p class="article-title">{{this.articleContent.articleTitle}}</p>
                <div class="article-user-info">
                    <div class="left-user-info">
                        <img :src="this.articleContent.avatar" :title="this.articleContent.nickName"/>
                        <div class="name-div">
                            <span>{{this.articleContent.nickName}}</span>
                            <span>{{this.articleContent.createTime}}</span>
                        </div>
                    </div>
                    <div class="right-article-info">
                        <div>
                            <i class="far fa-eye"/>
                            <span>{{this.articleContent.articleViews}}</span>
                        </div>
                        <div v-wave="{color: this.$store.getters.darkModel ? 'rgba(255, 255, 255, 0.7)':'rgba(0, 0, 0, 0.7)'}"  @click="addArticleLike(this.articleContent.id)">
                            <i class="fas fa-heart" :style="this.articleContent.hasLike ? 'color: red;':''"/>
                            <span>{{this.articleContent.articleLikes}}</span>
                        </div>
                    </div>
                </div>
            </nav>
            <div class="article-show-content editor-render" v-html="this.articleContent.articleContent"/>
            <footer class="article-vistor">
                <span class="article-vistor-title">评论</span>
                <div class="vistor-editor-box" v-if="this.$store.getters.userInfo">
                    <editor :clickButtonStatus="this.clickButtonStatus" @getContent="makeComment" :isDark="this.$store.getters.darkModel"/>
                </div>
                <div class="article-vistor-comment-list">
                    <transition-group name="list">
                        <comment v-for="item in commentList" :key="item.commentId" ref="comment" :renderData="item" @getContent="replyToServe" @deleteComment="deleteArtComment" @likeComment="likeArtComment" :clickButtonStatus="this.clickButtonStatus"/>
                        <span class="empty-list" v-if="this.commentList.length === 0">没有评论哦，赶快留下你的评论吧！</span>
                    </transition-group>
                </div>
                <el-pagination
                    style="padding: 1rem 0;"
                    v-if="this.pageInstance.total !== 0" 
                    small 
                    background
                    layout="sizes, prev, pager, next" 
                    :total="this.pageInstance.total" 
                    :page-sizes="[15, 30, 50, 100]" 
                    :current-page="this.requestInstance.pageNum" 
                    @update:current-page="currentPageChange" 
                    :page-size="this.requestInstance.pageSize"
                    @update:page-size="pageSizeChange"
                />
            </footer>
        </main>
    </div>
</template>
<script>
import comment from '@/components/comment.vue'
import editor from '@/components/Tinymce.vue'
import { articleContentGet , increaseArticleLike , articleCommentGet , replyComment , deleteComment , likeComment } from '@/util/article.js'
import { ElMessage , ElMessageBox } from 'element-plus'
export default {
    components:{
        comment, editor
    },
    data(){
        return{

            increaseLikeStatus: false,
            clickButtonStatus: false,

            articleContent: '',
            commentList: [],

            //请求参数实例
            requestInstance: {
                pageNum: 1,
                pageSize: 15,
                articleId: this.$route.query.id,
            },

            //分页参数实例
            pageInstance: {
                total: 0,
                current: 1,
                size: 15,
            }
        }
    },
    mounted(){
        articleContentGet({'articleId': this.$route.query.id}).then(resq => {
            if(resq.code == 200){
                this.articleContent = resq.data
                this.mainGetComment()
            } else {
                ElMessage({type: 'error', message: resq.message})
            }
        }).catch(err => {
            ElMessage({type: 'error', message: err.message})
        })
    },
    methods:{
        mainGetComment(){
            articleCommentGet(this.requestInstance).then(resq => {
                if(resq.code === 200){
                    this.commentList = resq.data.list
                    this.pageInstance.total = resq.data.total
                    this.pageInstance.current = resq.data.current
                    this.pageInstance.size = resq.data.size
                } else {
                    ElMessage({type: 'error', message: resq.message})
                }
            }).catch(err => {
                ElMessage({type: 'error', message: err.message})
            })
        },
        addArticleLike(articleId){
            if(!this.increaseLikeStatus){
                this.increaseLikeStatus = true
                let data = new FormData()
                data.append('articleId', articleId)
                increaseArticleLike(data).then(resq => {
                    if(resq.code === 200){
                        if(!resq.data.status){
                            this.articleContent.articleLikes--
                            
                        } else {
                            this.articleContent.articleLikes++
                        }
                        this.articleContent.hasLike = resq.data.status
                        ElMessage({type: 'success', message: resq.message})
                    } else {
                        ElMessage({tyep: 'error', message: resq.message})
                    }
                    this.increaseLikeStatus = false
                }).catch(err => {
                    ElMessage({type: 'error', message: err.message})
                    this.increaseLikeStatus = false
                })
            }
        },
        makeComment(value){
            this.clickButtonStatus = true
            if(value === null || value === ''){
                ElMessage({type: 'warning', message: '不能提交空白哦 ˋ( ° ▽、° )'})
                this.clickButtonStatus = false
                return 
            }
            let data = new FormData()
            data.append('articleId', this.$route.query.id)
            data.append('content', value)
            replyComment(data).then(resq => {
                if(resq.code === 200){
                    ElMessage({type: 'success', message: resq.message})
                    this.mainGetComment()
                    value = ''
                } else {
                    ElMessage({type: 'error', message: resq.message})
                }
                this.clickButtonStatus = false
            }).catch(err => {
                ElMessage({type: 'error', message: err.message})
                this.clickButtonStatus = false
            })
        },
        replyToServe(object, value){
            this.clickButtonStatus = true
            let data = new FormData()
            data.append('articleId', this.$route.query.id)
            data.append('content', value)
            data.append('replyCommentId', object.commentId)
            data.append('replyUserId', object.replyUser.replyUserId)
            replyComment(data).then(resq => {
                if(resq.code === 200){
                    ElMessage({type: 'success', message: resq.message})
                    this.mainGetComment()
                    setTimeout(() => {
                        this.$refs.comment[this.$refs.comment.findIndex(item => item.renderData.commentId === object.commentId)].commentEditorStatus = false
                    }, 500)
                } else {
                    ElMessage({type: 'error', message: resq.message})
                }
                this.clickButtonStatus = false
            }).catch(err => {
                ElMessage({type: 'error', message: err.message})
                this.clickButtonStatus = false
            })
        },
        pageSizeChange(e){
            this.requestInstance.pageSize = e
            this.mainGetComment()
        },
        currentPageChange(e){
            this.requestInstance.pageNum = e
            this.mainGetComment()
        },
        deleteArtComment(commentId){
            ElMessageBox.confirm('确定要删除评论吗？', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
                let data = new FormData()
                data.append('articleId', this.$route.query.id)
                data.append('commentId', commentId)
                deleteComment(data).then(resq => {
                    if(resq.code === 200) {
                        ElMessage({type: 'success', message: resq.message})
                        this.commentList.splice(this.commentList.findIndex(item => item.commentId === commentId), 1)
                    } else {
                        ElMessage({type: 'error', message: resq.message})
                    }
                }).catch(err => {
                    ElMessage({type: 'error', message: err.message})
                })
            }).catch(() => {})
        },
        likeArtComment(commentId){
            let data = new FormData()
            data.append('articleId', this.$route.query.id)
            data.append('commentId', commentId)
            likeComment(data).then(resq => {
                if(resq.code === 200){
                    ElMessage({type: 'success', message: resq.message})
                    let index = this.commentList.findIndex(item => item.commentId === commentId)
                    if(resq.data.status){
                        this.commentList[index].likes++
                    } else {
                        this.commentList[index].likes--
                    }
                    this.commentList[index].isLike = resq.data.status
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
.article-content
{
    width: 100%;
    max-width: 768px;
    padding-top: 2.7rem;
    position: relative;
    margin: 0 auto;
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
                min-height: 18rem;
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
                .right-article-info
                {
                    height: inherit;
                    display: flex;
                    flex-direction: column;
                    
                    div
                    {
                        padding: 0.2rem;
                        border-radius: 0.1rem;
                        i
                        {
                            width: 0.8rem;
                        }
                        span , i
                        {
                            transition: color 0.3s;
                            font-size: 0.72rem;
                            color: rgb(115, 115, 115);
                        }
                        span
                        {
                            margin-left: 0.5rem;
                        }
                    }
                    div:last-child
                    {
                        cursor: pointer;
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
            align-items: center;
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
            }
            .article-vistor-comment-list
            {
                width: 100%;
                .empty-list
                {
                    width: 100%;
                    height: 4rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 0.72rem;
                    transition: color 0.3s;
                }
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
    .comment-reply
    {
        width: 100%;
        z-index: 10;
        position: fixed;
        max-width: 768px;
        height: 25rem;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        background-color: #ffffff;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
        border-radius: 0.3rem 0.3rem 0 0;
        transition: transform 0.25s ease-out, opacity 0.25s ease-out;
        .comment-title
        {
            width: 100%;
            height: 1.5rem;
            padding: 0 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span
            {
                font-size: 0.65rem;
            }
            i
            {
                cursor: pointer;
                transition: color 0.3s;
            }
            i:hover
            {
                color: cadetblue;
            }
        }
    }
}
</style>