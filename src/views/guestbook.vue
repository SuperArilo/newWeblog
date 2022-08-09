<template>
    <div class="guestbook">
        <header class="guestbook-editor-box">
            <editor :toolbarConfig="{
                excludeKeys: [
                    // 'blockquote',  引用
                    'header1',
                    'header2',
                    'header3',
                    'bulletedList',
                    // 'codeBlock', 代码块
                    'insertImage',
                    'insertLink',
                    // 'insertTable', 表格
                    'insertVideo',
                    // 'justifyCenter', 剧中
                    // 'justifyLeft',  剧左
                    // 'justifyRight',  剧右
                    // 'numberedList', 
                    'redo',
                    'todo',
                    'undo',
                    'uploadImage',
                    'group-image',
                    'fullScreen',
                    '|',
                    // 'clearStyle',
                    // 'bold',
                    // 'underline',
                    // 'italic',
                    // 'through'
                ]
            }"/>
            <div class="editor-function-box">
                <button  v-wave="{color: 'rgba(0, 0, 0, 0.7)'}">媒体管理器</button>
                <button  v-wave="{color: 'rgba(0, 0, 0, 0.7)'}">提交</button>
            </div>
        </header>
        <main class="guestbook-comment-list">
            <comment v-for="item in commentList" :key="item.id" :renderData="item"/>
        </main>
    </div>
</template>
<script>
import editor from '@/components/editor.vue'
import comment from '@/components/comment.vue'
export default {
    components:{
        editor, comment
    },
    data(){
        return{
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
    }
}
</script>
<style lang="scss" scoped>
.guestbook
{
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
    padding-top: 4rem;
    .guestbook-editor-box
    {
        width: 100%;
        padding: 0.5rem;
        border-radius: 0.3rem;
        overflow: hidden;
        transition: background-color 0.3s;
        display: flex;
        flex-direction: column;
        .editor-function-box
        {
            width: 100%;
            height: 2.5rem;
            padding: 0 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            button
            {
                height: 1.5rem;
                padding: 0 0.6rem;
                border-radius: 0.3rem;
                background-color: rgb(4, 120, 190);
            }
        }
    }
    .guestbook-comment-list
    {
        width: 100%;
        margin-top: 0.5rem;
        padding: 0 1rem;
        border-radius: 0.3rem;
        transition: background-color 0.3s;
        .comment-box:last-child
        {
            border-bottom: none;
        }
    }
}
</style>