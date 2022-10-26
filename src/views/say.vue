<template>
    <div class="say-gossip">
        <div class="say-gossip-list">
            <gossip v-for="item in gossipList" :key="item.id" :renderData="item" />
        </div>
        <transition name="fade">
            <div class="comment-reply" v-if="this.commentReplyBoxStatus">
                <div class="comment-title">
                    <span>回复 @ {{}}</span>
                    <i class="fas fa-arrow-alt-circle-down" @click="this.commentReplyBoxStatus = false" />
                </div>
                <editor :toolbarConfig="{ excludeKeys: ['header1', 'header2','header3', 'redo', 'todo', 'undo', 'fullScreen', '|']}"/>
            </div>
        </transition>
    </div>
</template>
<script>
import gossip from '@/components/gossip.vue'
import { gossipList } from '@/util/gossip.js'
import { ElMessage , ElMessageBox } from 'element-plus'
export default {
    components: { 
        gossip
    },
    data(){
        return{

            commentReplyBoxStatus: false,

            gossipList: [],
            //请求实例
            requestInstance: {
                pageNum: 1,
                pageSize: 10
            }
        }
    },
    created(){
        gossipList(this.requestInstance).then(resq => {
            if(resq.code === 200) {
                this.gossipList = resq.data.list
            } else {
                ElMessage({type: 'error', message: resq.message})
            }
        }).catch(err => {
            ElMessage({type: 'error', message: err.message})
        })
    }
}
</script>
<style scoped lang='scss'>
.say-gossip
{
    width: 100%;
    max-width: 768px;
    padding-top: 2.7rem;
    margin: 0 auto;
    position: relative;
    .say-gossip-list
    {
        width: 100%;
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
    .fade-enter-from
    {
        transform: translateY(25rem);
        opacity: 0;
    }
    .fade-enter-to
    {
        transform: translateY(0);
        opacity: 1;
    }
    .fade-leave-from
    {
        transform: translateY(0);
        opacity: 1;
    }
    .fade-leave-to
    {
        transform: translateY(25rem);
        opacity: 0;
    }
}
</style>