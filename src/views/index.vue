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
                        <img :src="item.image"/>
                    </el-carousel-item>
                </el-carousel>
                <div class="carousel-index">
                    <div>
                        <i class="fas" v-for="(item, index) in carouselData" :key="item.id" :class="this.carouselIndex === index ? 'fa-circle':'fa-circle-notch'" @click="choiceCarouseIndex(index)"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
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
            carouselActiveData: '',
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
                img
                {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
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
}
</style>