<template>
    <div class="gossip-comment-box">
        <Toolbar class="toolbar" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
        <Editor style="height: 300px;" v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" @onFocus="handleFocus" />
    </div>
</template>
<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { DomEditor } from '@wangeditor/editor'
import '@wangeditor/editor/dist/css/style.css'
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
export default {
    components: { 
        Editor, Toolbar
    },
    setup() {
        const editorRef = shallowRef()
        const valueHtml = ''
        onMounted(() => {
        })
        const toolbarConfig = {
            excludeKeys: [
                'blockquote',
                'header1',
                'header2',
                'header3',
                'bulletedList',
                'codeBlock',
                'insertImage',
                'insertLink',
                'insertTable',
                'insertVideo',
                'justifyCenter',
                'justifyLeft',
                'justifyRight',
                'numberedList',
                'redo',
                'todo',
                'undo',
                'uploadImage',
                'group-image',
                'fullScreen',
                '|',
                'clearStyle',
                'bold',
                'underline',
                'italic',
                'through'
            ]
        }
        const editorConfig = { placeholder: '', autoFocus: false }
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

        const handleFocus = (editor) => {
            // console.log(DomEditor.getToolbar(editor).getConfig().toolbarKeys)
        }
        return {
            editorRef,
            valueHtml,
            mode: 'simple', // 或 'simple'
            toolbarConfig,
            editorConfig,
            handleCreated,
            handleFocus
        }
    },
}
</script>
<style lang="scss" scoped>
.gossip-comment-box
{
    width: 100%;
    .toolbar
    {
        height: 1.9rem;
        border-bottom: solid 1px rgb(242, 246, 252);
    }
}
::v-deep(.w-e-full-screen-container)
{
    z-index: 10;
}
::v-deep(.w-e-bar)
{
    padding: 0;
    .w-e-bar-item
    {
        height: 1.8rem;
        button
        {
            height: 100%;
        }
    }
}
::v-deep(.w-e-text-container)
{
    h1 , h2 , h3 , h4 , h5 , p , table , pre
    {
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
</style>