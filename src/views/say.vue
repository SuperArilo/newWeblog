<template>
    <div class="say-gossip">
        <div class="say-gossip-list">
            <gossip v-for="item in gossipList" :key="item.id" :data="item"></gossip>
        </div>
    </div>
</template>
<script>
import gossip from '@/components/gossip.vue'
export default {
    components: { 
        gossip
    },
    data(){
        return{
            gossipList:[
                {
                    id: 0,
                    userHead: require('@/assets/image/userHead.jpg'),
                    name: '老王',
                    time: '1天前',
                    describe: '博主，前端牛逼工程师',
                    content: '<p>嗯哼哼，啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</P>'
                },
                {
                    id: 1,
                    userHead: require('@/assets/image/userHead.jpg'),
                    name: '老王',
                    time: '1天前',
                    describe: '博主，前端牛逼工程师',
                    content: '<p>嗯哼哼，啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</P>'
                }
            ],
        }
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
    .say-gossip-list
    {
        width: 100%;
    }
}
</style>