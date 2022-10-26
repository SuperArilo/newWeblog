<template>
    <div class="friend-box">
        <div class="friend-list">
            <div class="friend-item" v-for="item in 2" :key="item">
                <img src="../assets/image/userHead.jpg" title="head"/>
                <span class="friend-name">王小美</span>
                <span class="last-time">2个月前</span>
            </div>
        </div>
        <tinymce />
    </div>
</template>
<script>
import tinymce from '@/components/Tinymce.vue'
export default {
    components:{
        tinymce
    }
}
</script>
<style lang="scss" scoped>
.friend-box
{
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
    padding-top: 2.7rem;
    .friend-list
    {
        width: 100%;
        margin-top: 1rem;
        height: 30rem;
        background-color: #ffffff;
        border-radius: 0.5rem;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        padding: 1rem;
        grid-row-gap: 0.5rem;
        grid-column-gap: 0.5rem;
        .friend-item
        {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .friend-name , .last-time
            {
                letter-spacing: 0.02rem;
            }
            .friend-name
            {
                font-weight: bold;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                max-width: 6rem;
                font-size: 0.67rem;
                color: rgb(71, 71, 71);
                margin: 0.25rem 0;
            }
            .last-time
            {
                color: darkgray;
                font-size: 0.6rem;
            }
            img
            {
                width: 2.5rem;
                height: 2.5rem;
                border-radius: 50%;
            }
        }
    }
}
</style>