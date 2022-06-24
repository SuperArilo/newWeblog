<template>
    <div class="article-content">
        <main class="article-container">
            <nav class="top-info">
                <img src="../assets/image/test2.png" class="article-img" title="test"/>
                <p class="article-title">标题标题标题</p>
                <div class="article-user-info">
                    <div class="left-user-info">
                        <img src="../assets/image/userHead.jpg" title="head"/>
                        <div class="name-div">
                            <span>老王</span>
                            <span>六月 16, 2022</span>
                        </div>
                    </div>
                </div>
            </nav>
            
        </main>
    </div>
</template>
<script>
export default {
    mounted(){
    }
}
</script>
<style lang="scss" scoped>
.article-content
{
    max-width: 768px;
    margin: 0 auto;
    padding-top: 2.7rem;
    .article-container
    {
        width: 100%;
        height: 92vh;
        margin-top: 1rem;
        background-color: #ffffff;
        border-radius: 0.5rem;
        overflow: hidden;
        .top-info
        {
            width: 100%;
            .article-img
            {
                width: 100%;
                max-height: 18rem;
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
            }
        }
    }
    
}
</style>