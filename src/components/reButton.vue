<template>
    <button class="button" :style="{'width': width, 'height': height}">{{text}}</button>
</template>
<script>
import 'node-waves/dist/waves.css'
import 'node-waves/dist/waves.min.js'
import $ from 'jquery'
export default {
    mounted(){
    },
    props: {
        width: {
            type: String,
            default: '4rem'
        },
        height: {
            type: String,
            default: '2rem'
        },
        text: {
           type: String,
           default: '空' 
        }
    },
    methods: {
        createWave(e){
        }
    }
}
</script>
<style scoped lang='scss'>
.button
{
    background-color: #0478be;
    border: none;
    outline: none;
    border-radius: 0.3rem;
    transition: all 0.3s;
    cursor: pointer;
    color: #ffffff;
    letter-spacing: 0.08rem;
    font-size: 0.7rem;
}
.button:hover
{
    background-color: #0082d3;
}
</style>