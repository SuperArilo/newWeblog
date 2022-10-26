<template>
    <div class="editor-box" :class="this.$store.getters.darkModel ? 'editor-dark-model':''">
        <Toolbar class="toolbar" :editor="editorRef" :defaultConfig="props.toolbarConfig" mode="default" />
        <Editor style="height: 17.5rem;" v-model="data.valueHtml" :defaultConfig="data.editorConfig" mode="default" @onCreated="handleCreated" @onChange="handleChange" />
        <div class="editor-button">
            <asuka-button text="提交" :icon="props.clickButtonStatus ? 'fas fa-circle-notch fa-spin':'fas fa-check'" @click="sendToServer" />
        </div>
    </div>
</template>
<script setup>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { DomEditor } from '@wangeditor/editor'
import '@wangeditor/editor/dist/css/style.css'
import asukaButton from '@/components/asukaButton.vue'
import { onBeforeUnmount, ref, shallowRef, onMounted , toRefs, reactive , watch } from 'vue'
import { customUploadImage } from '@/util/upload.js'
const emit = defineEmits(['editorHtml'])
const props = defineProps({
    toolbarConfig: {
        type: Object,
        default: {}
    },
    clickButtonStatus: {
        type: Boolean,
        default: false
    }
})
const data = reactive({
    valueHtml: '',
    editorConfig: {
        placeholder: '友好的留言吧',
        autoFocus: false,
        MENU_CONF: {
            uploadImage: {
                async customUpload(file, insertFn){
                    let data = new FormData()
                    data.append('file', file)
                    customUploadImage(data).then(resq => {
                        if(resq.code === 200){
                            insertFn(resq.data)
                        } else {
                            ElMessage({type: 'error', message: resq.message})
                        }
                    }).catch(err => {
                        ElMessage({type: 'error', message: err.message})
                    })
                },
            }
        }
    }
})
const editorRef = shallowRef()
onMounted(() => {})
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    setTimeout(() => {
        editor.destroy()
    }, 1000)
})
const handleCreated = (editor) => {
    editorRef.value = editor
}
const sendToServer = () => {
    if(!props.clickButtonStatus){
        emit('editorHtml', data.valueHtml)
    }
}
const handleChange = (editor) => {
}
watch(
    () => props.clickButtonStatus, (n, o) => {
        if(!n){
            data.valueHtml = ''
        }
    }
)
</script>
<style lang="scss" scoped>
.editor-box
{
    width: 100%;
    height: 100%;
    .toolbar
    {
        height: 4rem;
        transition: border 0.3s;
        border-top: solid 1px rgb(158, 158, 158);
        border-bottom: solid 1px rgb(158, 158, 158);
    }
    .editor-button
    {
        width: 100%;
        height: 2rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;

    }
}
::v-deep(.w-e-bar)
{
    padding: 0;
    transition: background-color 0.3s;
    .w-e-bar-item
    {
        button
        {
            height: 100%;
        }
    }
}
::v-deep(.w-e-text-placeholder)
{
    font-size: 0.6rem;
}
::v-deep(.w-e-text-container)
{
    transition: background-color 0.3s;
    h1 , h2 , h3 , h4 , h5 , p , table , pre
    {
        transition: color 0.3s;
        margin: 0.5rem 0;
        line-height: 1.5;
    }
    ul , li , ol , span , p
    {
        font-size: 0.6rem;
    }
    blockquote
    {
        padding: 0.15rem 0.3rem;
        margin: 0.3rem 0;
        line-height: 2;
    }
    hr
    {
        height: 0;
        border: 0;
        border-top: 0.1rem solid #ccc;
        margin: 0.6rem 0;
    }
    table
    {
        border-top: 0.08rem solid #ccc;
        border-left: 0.08rem solid #ccc;
        th , td
        {
            border-bottom: 0.08rem solid #ccc;
            border-right: 0.08rem solid #ccc;
            padding: 0.1rem 0.3rem;
            min-height: 1.2rem;
            height: 1.2rem;
        }
        th
        {
            border-bottom: 0.1rem solid #ccc;
            text-align: center;
            background-color: #f1f1f1;
        }
    }
}
.editor-dark-model
{
    .toolbar
    {
        border-bottom: solid 1px rgb(143, 143, 143);
        ::v-deep(.w-e-bar)
        {
            background-color: rgb(43, 43, 43);
            .w-e-bar-item button:hover
            {
                background-color:rgb(143, 143, 143);
            }
            .w-e-drop-panel
            {
                background-color: rgb(46, 46, 46);
                border: solid 1px rgb(143, 143, 143);
                li
                {
                    border: solid 1px rgb(143, 143, 143);
                }
                li:hover
                {
                    border: solid 1px rgb(199, 199, 199);
                }
            }
        }
    } 
    ::v-deep(.w-e-text-container)
    {
        background-color: rgb(43, 43, 43);
        ul , li , ol , span , p
        {
            color: #ffffff;
        }
    }
    ::v-deep(.w-e-bar-item-menus-container)
    {
        background-color: transparent !important;
    }
}
</style>