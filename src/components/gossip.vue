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
                <editor :toolbarConfig="{
                    excludeKeys: [
                        'blockquote',
                        'header1',
                        'header2',
                        'header3',
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
                <div class="gossip-comment-list">
                    
                </div>
            </footer>
        </el-collapse-transition>
    </div>
</template>
<script>
import editor from '@/components/editor.vue'
import comment from '@/components/comment.vue'
export default {
    components: { 
        editor, comment
    },
    data(){
        return{
            isOpenComment: false,
            commentList:[
                {
                    id: 0,
                    commentHead: require('@/assets/image/userHead.jpg'),
                    commentName: '老王',
                    commentTime: '2022-08-08',
                    commentLike: '12',
                    commentContent: '<p>aaaaaaaaaaa</p>'
                }
            ]
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
    margin-top: 0.8rem;
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
        padding-top: 0.5rem;
        .gossip-comment-list
        {
            width: 100%;
        }
    }
}
</style>