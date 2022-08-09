<template>
    <div class="links-content">
        <p class="rules-title">申请规则</p>
        <header class="rules-content editer-render" v-html="'<p>测试</p>'"></header>
        <p class="links-title">朋友们 (默认按添加时间排序)</p>
        <main class="links-friend-list">
            <div class="links-friend-item" v-for="item in friendList" :key="item.id">
                <img :src="item.head" :title="item.name"/>
                <div class="friend-info">
                    <span>{{item.name}}</span>
                    <p>{{item.infoText}}</p>
                </div>
            </div>
        </main>
    </div>
</template>
<script>
export default {
    data(){
        return{
            friendList:[
                {
                    id: 0,
                    head: require('@/assets/image/userHead.jpg'),
                    name: '王小美',
                    infoText: '这是我的个人简介，希望你能够多关心我一些'
                },
                {
                    id: 1,
                    head: require('@/assets/image/userHead.jpg'),
                    name: '得不到的永远',
                    infoText: '得不到的永远在骚动，被偏爱的都有恃无恐'
                },
                {
                    id: 2,
                    head: require('@/assets/image/userHead.jpg'),
                    name: '外面下雨了吗',
                    infoText: '外面已经下雨了啊，下得这么大我怎么感受不到呢？'
                },
                {
                    id: 3,
                    head: require('@/assets/image/userHead.jpg'),
                    name: '王小美',
                    infoText: '这是我的个人简介，希望你能够多关心我一些'
                },
                {
                    id: 4,
                    head: require('@/assets/image/userHead.jpg'),
                    name: '得不到的永远',
                    infoText: '得不到的永远在骚动，被偏爱的都有恃无恐'
                },
                {
                    id: 5,
                    head: require('@/assets/image/userHead.jpg'),
                    name: '外面下雨了吗',
                    infoText: '外面已经下雨了啊，下得这么大我怎么感受不到呢？'
                },
                {
                    id: 0,
                    head: require('@/assets/image/userHead.jpg'),
                    name: '王小美',
                    infoText: '这是我的个人简介，希望你能够多关心我一些'
                },
                {
                    id: 1,
                    head: require('@/assets/image/userHead.jpg'),
                    name: '得不到的永远',
                    infoText: '得不到的永远在骚动，被偏爱的都有恃无恐'
                },
                {
                    id: 2,
                    head: require('@/assets/image/userHead.jpg'),
                    name: '外面下雨了吗',
                    infoText: '外面已经下雨了啊，下得这么大我怎么感受不到呢？'
                },
                {
                    id: 3,
                    head: require('@/assets/image/userHead.jpg'),
                    name: '王小美',
                    infoText: '这是我的个人简介，希望你能够多关心我一些'
                },
                {
                    id: 4,
                    head: require('@/assets/image/userHead.jpg'),
                    name: '得不到的永远',
                    infoText: '得不到的永远在骚动，被偏爱的都有恃无恐'
                },
                {
                    id: 5,
                    head: require('@/assets/image/userHead.jpg'),
                    name: '外面下雨了吗',
                    infoText: '外面已经下雨了啊，下得这么大我怎么感受不到呢？'
                },
                {
                    id: 0,
                    head: require('@/assets/image/userHead.jpg'),
                    name: '王小美',
                    infoText: '这是我的个人简介，希望你能够多关心我一些'
                },
                {
                    id: 1,
                    head: require('@/assets/image/userHead.jpg'),
                    name: '得不到的永远',
                    infoText: '得不到的永远在骚动，被偏爱的都有恃无恐'
                },
                {
                    id: 2,
                    head: require('@/assets/image/userHead.jpg'),
                    name: '外面下雨了吗',
                    infoText: '外面已经下雨了啊，下得这么大我怎么感受不到呢？'
                },
                {
                    id: 3,
                    head: require('@/assets/image/userHead.jpg'),
                    name: '王小美',
                    infoText: '这是我的个人简介，希望你能够多关心我一些'
                },
                {
                    id: 4,
                    head: require('@/assets/image/userHead.jpg'),
                    name: '得不到的永远',
                    infoText: '得不到的永远在骚动，被偏爱的都有恃无恐'
                },
                {
                    id: 5,
                    head: require('@/assets/image/userHead.jpg'),
                    name: '外面下雨了吗',
                    infoText: '外面已经下雨了啊，下得这么大我怎么感受不到呢？'
                },
                {
                    id: 0,
                    head: require('@/assets/image/userHead.jpg'),
                    name: '王小美',
                    infoText: '这是我的个人简介，希望你能够多关心我一些'
                },
                {
                    id: 1,
                    head: require('@/assets/image/userHead.jpg'),
                    name: '得不到的永远',
                    infoText: '得不到的永远在骚动，被偏爱的都有恃无恐'
                },
                {
                    id: 2,
                    head: require('@/assets/image/userHead.jpg'),
                    name: '外面下雨了吗',
                    infoText: '外面已经下雨了啊，下得这么大我怎么感受不到呢？'
                },
                {
                    id: 3,
                    head: require('@/assets/image/userHead.jpg'),
                    name: '王小美',
                    infoText: '这是我的个人简介，希望你能够多关心我一些'
                },
                {
                    id: 4,
                    head: require('@/assets/image/userHead.jpg'),
                    name: '得不到的永远',
                    infoText: '得不到的永远在骚动，被偏爱的都有恃无恐'
                },
                {
                    id: 5,
                    head: require('@/assets/image/userHead.jpg'),
                    name: '外面下雨了吗',
                    infoText: '外面已经下雨了啊，下得这么大我怎么感受不到呢？'
                }
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.links-content
{
    width: 100%;
    max-width: 740px;
    padding-top: 2.7rem;
    margin: 0 auto;
    .links-title , .rules-title
    {
        width: 100%;
        height: 2.5rem;
        text-align: left;
        line-height: 2.5rem;
        font-size: 0.72rem;
        letter-spacing: 0.05rem;
        transition: color 0.3s;
    }
    .rules-title
    {
        color: #ef5350;
    }
    .rules-content
    {
        width: 100%;
        min-height: 6rem;
        transition: background-color 0.3s;
        border-radius: 0.5rem;
        padding: 0.5rem;
    }
    .links-friend-list
    {
        width: 100%;
        min-height: 12rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 4.5rem 4.5rem;
        grid-row-gap: 1.6rem;
        grid-column-gap: 1.6rem;
        transition: background-color 0.3s;
        .links-friend-item
        {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            cursor: pointer;
            transition: background-color 0.3s;
            border-radius: 0.5rem;
            padding: 0.5rem 1.5rem;
            img
            {
                width: 2.8rem;
                min-width: 2.8rem;
                height: 2.8rem;
                border-radius: 50%;
            }
            .friend-info
            {
                height: 100%;
                margin-left: 1rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                span
                {
                    font-size: 0.72rem;
                    color: #0478be;
                }
                P
                {
                    width: 100%;
                    margin-top: 0.4rem;
                    text-align: left;
                    font-size: 0.6rem;
                    letter-spacing: 0.02rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    transition: color 0.3s;
                }
            }
        }
    }
}
</style>