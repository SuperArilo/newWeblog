<template>
    <div class="main-content">
        <router-link to="/login">login</router-link>
        <span>&nbsp;</span>
        <router-link to="/">index</router-link>
        <hr/>
        <router-view/>
    </div>
</template>
<script setup>
import '@/assets/fontawesome/css/all.min.css'
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
const store = useStore()
const route = useRoute()
const router = useRouter()
const data = reactive({})
onBeforeMount(() => {
})
onMounted(() => {
})
watchEffect(()=>{
})
// 使用toRefs解构
// let { } = { ...toRefs(data) } 
defineExpose({
  ...toRefs(data)
})
</script>
<script>
export default {
    
}
</script>
<style scoped lang='scss'>
*
{
    box-sizing: border-box;
}
ul , li
{
    margin: 0;
    padding: 0;
    list-style: none;
}
body , html
{
    margin: 0;
    padding: 0;
    min-width: 1400px;
    width: 100%;
    height: 100%;
}
a
{
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    -moz-user-focus: none;
}
input
{
    outline: none;
}
img
{
    max-width: 100%;
}
span , p
{
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
#app
{
    width: 100%;
    height: 100%;
    .main-content
    {
        width: 100%;
        height: 100%;
    }
}
</style>