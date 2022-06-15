<template>
    <div class="gossip-comment-box">
        <Toolbar style="height: 40px;" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
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
                'clearStyle'
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
    padding-top: 0.5rem;
}
::v-deep(.w-e-full-screen-container)
{
    z-index: 10;
}
</style>