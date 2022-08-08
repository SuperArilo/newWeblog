<template>
    <div class="index-main">
        <router-view v-slot="{ Component }">
            <transition name="router-transform" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>
<script>
export default {
}
</script>
<style scoped lang='scss'>
.index-main
{
    width: 100%;
    min-height: 100vh;
    .router-transform-enter-active, .router-transform-leave-active
    {
        transition: opacity 0.3s
    }
    .router-transform-enter-from, .router-transform-leave-to
    {
        opacity: 0;
    }
}
</style>