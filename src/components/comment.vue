<template>
    <div class="comment-box">
        <div class="comment-top">
            <div class="comment-top-left">
                <img :src="this.renderData.commentHead" title="head"/>
                <div class="vistor-info">
                    <div>
                        <span>{{this.renderData.commentName}}</span>
                        <button type="button">回复</button>
                    </div>
                    <span class="vistor-info-time">{{this.renderData.commentTime}}</span>
                </div>
            </div>
            <div class="comment-top-right">
                <i class="fas fa-heart"/>
                <span>{{this.renderData.commentLike}}</span>
            </div>
        </div>
        <div class="comment-content-render editer-render" v-html="this.renderData.commentContent"></div>
    </div>
</template>
<script>
export default {
    props:{
        renderData: {
            type: Object
        }
    }
}
</script>
<style lang="scss" scoped>
.comment-box
{
    width: 100%;
    // padding: 0.25rem 0;
    display: flex;
    flex-direction: column;
    transition: border 0.3s;
    .comment-top
    {
        width: 100%;
        height: 3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .comment-top-left
        {
            height: inherit;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            img
            {
                width: 2rem;
                height: 2rem;
                border-radius: 50%;
                object-fit: cover;
            }
            .vistor-info
            {
                height: inherit;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                margin-left: 0.5rem;
                div
                {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    span
                    {
                        font-size: 0.65rem;
                        color: #4c4e4d;
                        transition: color 0.3s;
                    }
                    button
                    {
                        background-color: #0478be;
                        font-size: 0.6rem;
                        padding: 0.1rem 0.3rem;
                        cursor: pointer;
                        border-radius: 0.25rem;
                        margin-left: 0.5rem;
                    }
                }
                .vistor-info-time
                {
                    font-size: 0.6rem;
                    transition: color 0.3s;
                    color: #4c4e4d;
                    font-weight: 400;
                    letter-spacing: 0.05rem;
                }
            }
        }
        .comment-top-right
        {
            height: inherit;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            i
            {
                color: darkgray;
                cursor: pointer;
                transition: transform 0.3s, color 0.3s;
            }
            i:hover
            {
                
                transform: scale(1.2);
                color: rgb(250, 73, 73);
            }
            span
            {
                font-size: 0.6rem;
                color: rgb(204, 204, 204);
                margin-top: 0.25rem;
                transition: color 0.3s;
            }
        }
    }
    .comment-content-render
    {
        width: 100%;
        min-height: 3rem;
    }
}
</style>