<template>
    <div class="index-main" ref="indexMain">
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
    display: flex;
    flex-direction: column;
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