<template>
    <div class="index-content">
        <div class="index-carousel-box">
            <header class="header-tips">
                <span class="header-left-tips">猜你喜欢</span>
                <div class="header-right-switch">
                    <div class="switch-box" :class="this.isAutoPlay ? 'switch-open':'switch-close'">
                        <span class="switch-radius" @click="this.isAutoPlay =! this.isAutoPlay"></span>
                    </div>
                    <span class="switch-info">自动播放</span>
                </div>
            </header>
            <div class="carousel-content">
                <el-carousel ref="carouselContent" trigger="click" height="100%" indicator-position="none" arrow="never" :autoplay="this.isAutoPlay" @change="getCarouselIndex">
                    <el-carousel-item v-for="item in carouselData" :key="item.id">
                        <img :src="item.image" :title="item.title"/>
                        <div class="carousel-img-bottom">
                            <p>{{item.title}}</p>
                            <button v-wave="{color: 'rgba(0, 0, 0, 0.7)'}">开始阅读</button>
                        </div>
                    </el-carousel-item>
                </el-carousel>
                <div class="carousel-index">
                    <div>
                        <i class="fas" v-for="(item, index) in carouselData" :key="item.id" :class="this.carouselIndex === index ? 'fa-circle':'fa-circle-notch'" @click="choiceCarouseIndex(index)"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="index-container" :class="this.$store.getters.isPhone ? 'index-container-mobile':'index-container-pc'">
            <article class="left-container-article">
                <header class="title-function">
                    <span class="left-title-span">全部文章</span>
                </header>
                <ul class="index-article-list">
                    <li v-for="item in articleList" :key="item.id">
                        <img :src="item.image" :title="item.title"/>
                        <div class="article-item-content">
                            <p>{{item.title}}</p>
                            <span class="time-span">{{item.time}}</span>
                            <span class="introduction-content">{{item.content}}</span>
                        </div>
                        <div class="bottom-function">
                            <button type="button" v-wave="{color: 'rgb(228, 177, 177)'}">开始阅读</button>
                            <div class="right-state">
                                <div v-wave="{color: this.$store.getters.darkModel ? 'rgba(255, 255, 255, 0.7)':'rgba(0, 0, 0, 0.7)'}">
                                    <i class="fas fa-eye"/>
                                    <span>908</span>
                                </div>
                                <div v-wave="{color: this.$store.getters.darkModel ? 'rgba(255, 255, 255, 0.7)':'rgba(0, 0, 0, 0.7)'}">
                                    <i class="fas fa-heart"/>
                                    <span>10</span>
                                </div>
                                <div v-wave="{color: this.$store.getters.darkModel ? 'rgba(255, 255, 255, 0.7)':'rgba(0, 0, 0, 0.7)'}">
                                    <i class="fas fa-comment-alt"/>
                                    <span>10</span>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </article>
            <aside class="right-lately-container">
                <header class="title-function">
                    <span class="left-title-span">最近碎语</span>
                </header>
                <ul class="gossip-box">
                    <li v-for="item in gossipList" :key="item.id">
                        <header class="gossip-title">
                            <div class="gossip-title-left">
                                <img :src="item.userHead" :title="item.name"/>
                                <div class="gossip-title-left-info">
                                    <div>
                                        <span>{{item.name}}</span>
                                        <span>1天前</span>
                                    </div>
                                    <span class="user-describe">{{item.describe}}</span>
                                </div>
                            </div>
                        </header>
                        <div class="gossip-render-content editer-render" v-html="item.content"/>
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
                            <button @click="openGossipComment(item.id)" type="button" v-wave="{color: this.$store.getters.darkModel ? 'rgba(255, 255, 255, 0.7)':'rgba(0, 0, 0, 0.7)'}">
                                <i class="fas fa-comment-dots"/>
                                评论
                            </button>
                            <button type="button" v-wave="{color: this.$store.getters.darkModel ? 'rgba(255, 255, 255, 0.7)':'rgba(0, 0, 0, 0.7)'}">
                                <i class="fas fa-share-alt"/>
                                分享
                            </button>
                        </div>
                        <el-collapse-transition>
                            <editor v-if="isOpenGossipCommentBox && item.id === this.gossipTempId"></editor>
                        </el-collapse-transition>
                    </li>
                </ul>
                <header class="title-function">
                    <span class="left-title-span">最近来访</span>
                </header>
                <div class="visitor-box">
                    <div class="visitor-item" v-for="item in visitorList" :key="item.id">
                        <img :src="item.userHead" :title="item.name"/>
                        <span class="visitor-name">{{item.name}}</span>
                        <span class="visitor-time">{{item.time}}</span>
                    </div>
                </div>
            </aside>
        </div>
    </div>
</template>
<script>
import editor from '@/components/editor.vue'
export default {
    components: { 
        editor
    },
    data(){
        return{
            isAutoPlay: true,
            carouselData:[
                {
                    id: 0,
                    title: '焯尼玛',
                    image: require('@/assets/image/test.png')
                },
                {
                    id: 1,
                    title: 'test2',
                    image: require('@/assets/image/test2.png')
                },
                {
                    id: 2,
                    title: 'test3',
                    image: require('@/assets/image/test3.png')
                }
            ],
            carouselIndex: 0,
            articleList:[
                {
                    id: 0,
                    image: require('@/assets/image/test.png'),
                    title: '2021年6月24日，数据分析当前是否还适合投资FIL云算力',
                    time: '六月 24, 2021',
                    content: '随着币价的下跌，最近不少人蠢蠢欲动，开始考虑是否要布局一下FIL云算力。为了让一部分不明所以、跑步入场的小白，对自己投资的项目有个较为客观的认知，接下来我会在数据面上分析下这项投资的实际可'
                },
                {
                    id: 0,
                    image: require('@/assets/image/test.png'),
                    title: '2021年6月24日，数据分析当前是否还适合投资FIL云算力',
                    time: '六月 24, 2021',
                    content: '随着币价的下跌，最近不少人蠢蠢欲动，开始考虑是否要布局一下FIL云算力。为了让一部分不明所以、跑步入场的小白，对自己投资的项目有个较为客观的认知，接下来我会在数据面上分析下这项投资的实际可'
                },
                {
                    id: 0,
                    image: require('@/assets/image/test.png'),
                    title: '2021年6月24日，数据分析当前是否还适合投资FIL云算力',
                    time: '六月 24, 2021',
                    content: '随着币价的下跌，最近不少人蠢蠢欲动，开始考虑是否要布局一下FIL云算力。为了让一部分不明所以、跑步入场的小白，对自己投资的项目有个较为客观的认知，接下来我会在数据面上分析下这项投资的实际可'
                },
                {
                    id: 0,
                    image: require('@/assets/image/test.png'),
                    title: '2021年6月24日，数据分析当前是否还适合投资FIL云算力',
                    time: '六月 24, 2021',
                    content: '随着币价的下跌，最近不少人蠢蠢欲动，开始考虑是否要布局一下FIL云算力。为了让一部分不明所以、跑步入场的小白，对自己投资的项目有个较为客观的认知，接下来我会在数据面上分析下这项投资的实际可'
                }
            ],
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
            gossipTempId: '',
            isOpenGossipCommentBox: false,
            visitorList:[
                {
                    id: 0,
                    name: '大帅逼',
                    userHead: require('@/assets/image/userHead.jpg'),
                    time: '4个月前'
                },
                {
                    id: 0,
                    name: '111',
                    userHead: require('@/assets/image/userHead.jpg'),
                    time: '4个月前'
                },
                {
                    id: 0,
                    name: '111',
                    userHead: require('@/assets/image/userHead.jpg'),
                    time: '4个月前'
                },
                {
                    id: 0,
                    name: '111',
                    userHead: require('@/assets/image/userHead.jpg'),
                    time: '4个月前'
                },
                {
                    id: 0,
                    name: '111',
                    userHead: require('@/assets/image/userHead.jpg'),
                    time: '4个月前'
                },
                {
                    id: 0,
                    name: '111',
                    userHead: require('@/assets/image/userHead.jpg'),
                    time: '4个月前'
                },
                {
                    id: 0,
                    name: '111',
                    userHead: require('@/assets/image/userHead.jpg'),
                    time: '4个月前'
                },
                {
                    id: 0,
                    name: '111',
                    userHead: require('@/assets/image/userHead.jpg'),
                    time: '4个月前'
                },
                {
                    id: 0,
                    name: '111',
                    userHead: require('@/assets/image/userHead.jpg'),
                    time: '4个月前'
                }
            ]
        }
    },
    mounted(){
    },
    methods:{
        getCarouselIndex(index){
            this.carouselIndex = index
        },
        choiceCarouseIndex(index){
            this.$refs.carouselContent.setActiveItem(index)
        },
        openGossipComment(id){
            if(this.gossipTempId === '') {
                this.gossipTempId = id
                this.isOpenGossipCommentBox = true
            } else if(this.gossipTempId === id){
                this.gossipTempId = ''
                if(this.isOpenGossipCommentBox){
                    this.isOpenGossipCommentBox = false
                }
            } else if(this.gossipTempId !== id){
                this.gossipTempId = id
            }
            
        }
    }
}
</script>
<style scoped lang='scss'>
.index-content
{
    width: 100%;
    .index-carousel-box
    {
        width: 100%;
        padding-top: 2.7rem;
        height: 100vh;
        display: flex;
        flex-direction: column;
        .header-tips
        {
            width: 100%;
            height: 2.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .header-left-tips
            {
                font-size: 0.85rem;
                letter-spacing: 0.08rem;
            }
            .header-right-switch
            {
                height: inherit;
                display: flex;
                align-items: center;
                .switch-info
                {
                    font-size: 0.85rem;
                    letter-spacing: 0.08rem;
                    margin-left: 0.5rem;
                    transition: color 0.3s;
                }
                .switch-box
                {
                    width: 2.8rem;
                    height: 1.2rem;
                    border-radius: 1rem;
                    padding: 0.15rem 0.3rem;
                    display: flex;
                    transition: background 0.3s;
                    .switch-radius
                    {
                        width: 0.9rem;
                        height: 0.9rem;
                        border-radius: 50%;
                        cursor: pointer;
                        transition: transform 0.3s, background-color 0.3s;
                    }
                }
            }
        }
        .carousel-content
        {
            width: 100%;
            flex: 1;
            margin: 1rem 0 2rem 0;
            border-radius: 1rem;
            overflow: hidden;
            position: relative;
            ::v-deep(.el-carousel)
            {
                height: 100%;
                .el-carousel__item
                {
                    img
                    {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        transition: transform 0.5s;
                    }
                    img:hover
                    {
                        transform: scale(1.02);
                    }
                    .carousel-img-bottom
                    {
                        width: 100%;
                        position: absolute;
                        bottom: 4rem;
                        left: 0;
                        display: flex;
                        flex-direction: column;
                        padding: 0 3rem;
                        p
                        {
                            font-size: 1.2rem;
                            font-weight: bold;
                            color: #ffffff;
                            letter-spacing: 0.08rem;
                        }
                        button
                        {
                            width: 4rem;
                            height: 1.4rem;
                            border-radius: 0.2rem;
                            font-size: 0.6rem;
                            background-color: #e54d42;
                            margin-top: 1rem;
                        }
                    }
                }
                
            }
            .carousel-index
            {
                width: 100%;
                position: absolute;
                bottom: 1rem;
                left: 0;
                display: flex;
                justify-content: center;
                div
                {
                    padding: 0 1rem;
                    border-radius: 0.5rem;
                    background-color: rgba(0, 0, 0, 0.4);
                    display: flex;
                    justify-content: center;
                    i
                    {
                        width: 1.5rem;
                        height: 1.5rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 0.8rem;
                        cursor: pointer;
                        transition: color 0.3s;
                        color: rgb(145, 142, 147);
                    }
                    i:hover
                    {
                        color: rgb(201, 201, 201);
                    }
                    .carousel-index-active
                    {
                        color: rgb(145, 142, 147);
                    }
                }
                
            }
        }
    }
    .index-container
    {
        width: 100%;
        display: flex;
        .left-container-article , .right-lately-container
        {
            .title-function
            {
                width: 100%;
                height: 2.5rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .left-title-span
                {
                    font-size: 0.85rem;
                    transition: color 0.3s;
                    letter-spacing: 0.08rem;
                }
            }
        }
        .left-container-article
        {
            display: flex;
            align-content: flex-start;
            flex-wrap: wrap;
            .index-article-list
            {
                width: 100%;
                display: flex;
                align-content: flex-start;
                flex-wrap: wrap;
                li
                {
                    width: 100%;
                    margin: 0.8rem 0;
                    border-radius: 0.5rem;
                    overflow: hidden;
                    transition: background-color 0.3s;
                    display: flex;
                    flex-direction: column;
                    img
                    {
                        width: 100%;
                        height: 18rem;
                        object-fit: cover;
                        transition: transform 0.5s;
                    }
                    img:hover
                    {
                        transform: scale(1.01);
                    }
                    .article-item-content
                    {
                        width: 100%;
                        padding: 0 0.8rem;
                        margin-top: 1rem;
                        display: flex;
                        flex-direction: column;
                        justify-items: flex-start;
                        p , .time-span , .introduction-content
                        {
                            width: 100%;
                            word-break: break-all;
                            transition: color 0.3s;
                        }
                        p
                        {
                            text-align: left;
                            
                            font-weight: 500;
                            font-size: 1.1rem;
                        }
                        .time-span
                        {
                            font-size: 0.75rem;
                            margin-top: 0.5rem;
                        }
                        .introduction-content
                        {
                            text-align: left;
                            margin-top: 1rem;
                            font-size: 0.72rem;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }
                    }
                    .bottom-function
                    {
                        width: 100%;
                        height: 1.8rem;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin: 0.5rem 0;
                        padding: 0 0.8rem;
                        button
                        {
                            width: 4rem;
                            height: 1.8rem;
                            transition: all 0.3s;
                            border-radius: 0.3rem;
                            cursor: pointer;
                            color: #ec558c;
                        }
                        .right-state
                        {
                            height: inherit;
                            display: flex;
                            div
                            {
                                display: flex;
                                align-items: center;
                                border-radius: 0.3rem;
                                padding: 0 0.3rem;
                                cursor: pointer;
                                span
                                {
                                    font-size: 0.7rem;
                                    margin-left: 0.5rem;
                                    transition: color 0.3s;
                                }
                                i
                                {
                                    font-size: 0.8rem;
                                    transition: transform 0.3s, color 0.3s;
                                }
                            }
                            div:hover
                            {
                                i
                                {
                                    transform: scale(1.2);
                                }
                            }
                        }
                    }
                }
            }
        }
        .right-lately-container
        {
            .gossip-box
            {
                width: 100%;
                display: flex;
                align-content: flex-start;
                flex-wrap: wrap;
                li
                {
                    width: 100%;
                    margin: 0.8rem 0;
                    padding: 0.5rem;
                    border-radius: 0.3rem;
                    display: flex;
                    align-content: flex-start;
                    flex-wrap: wrap;
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
                                height: 2.2rem;
                                overflow: hidden;
                                border-radius: 50%;
                            }
                            .gossip-title-left-info
                            {
                                height: inherit;
                                display: flex;
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
                    
                }
            }
            .visitor-box
            {
                width: 100%;
                border-radius: 0.25rem;
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                padding: 1rem 0.5rem;
                grid-row-gap: 0.5rem;
                grid-column-gap: 0.5rem;
                transition: background-color 0.3s;
                .visitor-item
                {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    img
                    {
                        width: 2rem;
                        height: 2rem;
                        border-radius: 50%;
                        overflow: hidden;
                    }
                    .visitor-name
                    {
                        font-size: 0.7rem;
                        margin: 0.3rem 0;
                    }
                    .visitor-time
                    {
                        font-size: 0.6rem;
                        color: #777777;
                    }
                }
            }
        }
    }
    .index-container-pc
    {
        justify-content: space-between;
        .left-container-article
        {
            flex: 1;
            flex-wrap: wrap;
            align-content: flex-start;
            margin-right: 2rem;
        }
        .right-lately-container
        {
            width: 16rem;
        }
    }
    .index-container-mobile
    {
        flex-direction: column;
        .left-container-article
        {
            width: 100%;
        }
        .right-lately-container
        {
            width: 100%;
        }
    }
}
</style>