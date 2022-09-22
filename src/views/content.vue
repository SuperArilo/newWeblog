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
                        <img :src="item.image" :title="item.articleTitle"/>
                        <div class="article-item-content">
                            <p>{{item.articleTitle}}</p>
                            <span class="time-span">{{item.createTime}}</span>
                            <span class="introduction-content">{{item.articleIntroduction}}</span>
                        </div>
                        <div class="bottom-function">
                            <button type="button" v-wave="{color: 'rgb(228, 177, 177)'}" @click="this.$router.push({path: '/article', query: {id: item.id}})">开始阅读</button>
                            <div class="right-state">
                                <div v-wave="{color: this.$store.getters.darkModel ? 'rgba(255, 255, 255, 0.7)':'rgba(0, 0, 0, 0.7)'}">
                                    <i class="fas fa-eye"/>
                                    <span>{{item.articleViews}}</span>
                                </div>
                                <div v-wave="{color: this.$store.getters.darkModel ? 'rgba(255, 255, 255, 0.7)':'rgba(0, 0, 0, 0.7)'}">
                                    <i class="fas fa-heart"/>
                                    <span>{{item.articleLikes}}</span>
                                </div>
                                <div v-wave="{color: this.$store.getters.darkModel ? 'rgba(255, 255, 255, 0.7)':'rgba(0, 0, 0, 0.7)'}">
                                    <i class="fas fa-comment-alt"/>
                                    <span>{{item.commentTotal}}</span>
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
                <div class="gossip-data-list">
                    <gossip v-for="item in gossipList" :key="item.id" :data="item"></gossip>
                </div>
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
import gossip from '@/components/gossip.vue'
import { articleListGet } from '@/util/article.js'
import { ElMessage , ElMessageBox } from 'element-plus'
export default {
    components: { 
        gossip
    },
    data(){
        return{
            isAutoPlay: true,
            carouselData:[
                {
                    id: 0,
                    title: 'test1',
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
            articleList: [],
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
            visitorList:[
                {
                    id: 0,
                    name: '222',
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
        this.articleListServer()
    },
    methods:{
        getCarouselIndex(index){
            this.carouselIndex = index
        },
        choiceCarouseIndex(index){
            this.$refs.carouselContent.setActiveItem(index)
        },
        articleListServer(){
            articleListGet().then(resq => {
                if(resq.code === 200){
                    this.articleList = resq.data.list
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
                height: 3.5rem;
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
                    margin-bottom: 0.8rem;
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
            .index-article-list li:last-child
            {
                margin-bottom: 0;
            }
        }
        .right-lately-container
        {
            .gossip-data-list
            {
                width: 100%;
                display: flex;
                align-content: flex-start;
                flex-wrap: wrap;
                .gossip-box:first-child
                {
                    margin-top: 0;
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
                        min-width: 2rem;
                        height: 2rem;
                        border-radius: 50%;
                        overflow: hidden;
                    }
                    .visitor-name
                    {
                        font-size: 0.7rem;
                        margin: 0.3rem 0;
                        transition: color 0.3s;
                    }
                    .visitor-time
                    {
                        font-size: 0.6rem;
                        color: #777777;
                        transition: color 0.3s;
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