<template>
    <button type="button" :class="this.$store.getters.darkModel ? 'dark':'normal'" v-wave="{ color: this.$store.getters.darkModel ? 'rgba(255, 255, 255, 0.7)':'rgba(0, 0, 0, 0.7)'}">
        <i :class="this.icon" v-if="this.isShowIcon"/>
        {{this.text}}
    </button>
</template>
<script>
export default {
    props: {
        class: {
            type: String,
            default: 'normal'
        },
        text: {
            type: String,
            default: '未设置'
        },
        icon: {
            type: String
        },
        isShowIcon: {
            type: Boolean,
            default: true
        }
    }
}
</script>
<style lang="scss" scoped>
button
{
    min-width: 4.5rem;
    padding: 0 0.5rem;
    height: 1.5rem;
    border-radius: 0.2rem;
    font-size: 0.6rem;
    margin-right: 1rem;
    outline: none;
    transition: color 0.3s, background-color 0.3s;
    white-space: nowrap;
    
}
.normal
{
    background-color: rgb(245, 245, 245);
    color: #777777;
}
.dark
{
    background-color: rgb(43, 43, 43);
    color: #ffffff;
}
</style>