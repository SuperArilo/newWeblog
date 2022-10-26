<template>
	<div class="editor-box">
		<editor v-model="htmlValue" :init="init" :id="init.selector" v-if="!switchChange" />
		<div class="editor-button">
			<asuka-button text="提交" :icon="props.clickButtonStatus ? 'fas fa-circle-notch fa-spin':'fas fa-check'" @click="clickSubmitButton" />
		</div>
	</div>
</template>
<script setup>
import asukaButton from '@/components/asukaButton.vue'
import tinymce from 'tinymce/tinymce'
import editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
import 'tinymce/themes/silver/theme'
import 'tinymce/icons/default'
import 'tinymce/models/dom'
import "tinymce/icons/default/icons"
import "tinymce/plugins/image" // 插入上传图片插件
import "tinymce/plugins/media" // 插入视频插件
import "tinymce/plugins/table" // 插入表格插件
import "tinymce/plugins/lists" // 列表插件
import "tinymce/plugins/wordcount" // 字数统计插件
import { reactive, ref, watch, nextTick, onBeforeUnmount, onMounted } from "vue"
import { useStore } from "vuex"
const store = useStore()
const emits = defineEmits(['getContent'])
const props = defineProps({
	clickButtonStatus: {
		type: Boolean,
		default: false
	},
	plugins: {
		type: [String, Array],
		default: "lists  table image",
	},
	toolbar: {
		type: [String, Array],
		// default: "codesample bold italic underline alignleft aligncenter alignright alignjustify | undo redo | formatselect | fontselect | fontsizeselect | forecolor backcolor | bullist numlist outdent indent | lists link table code | removeformat blockquote"
	},
	isDark: {
		type: Boolean,
		default: false
	}
})
const htmlValue = ref('')
const switchChange = ref(false)
let tempData = ref('')
const init = reactive({
	selector: 'tinymce' + (Math.random() * 1000).toFixed(0),
	language_url: "/tinymce/langs/zh_cn.js",
	language: "zh_CN",
	skin_url: props.isDark ? '/tinymce/skins/ui/oxide-dark':'/tinymce/skins/ui/oxide',  
	height: '14rem',
	branding: false,
	menubar: true, //顶部菜单栏显示
	image_dimensions: false, //去除宽高属性
	plugins: props.plugins,
	// toolbar: props.toolbar,
    content_style: "body {font-size:10pt;}",
	// paste_convert_word_fake_lists: false, // 插入word文档需要该属性
	paste_webkit_styles: "all",
	paste_merge_formats: true,
	nonbreaking_force_tab: false,
	paste_auto_cleanup_on_paste: false,
	file_picker_types: 'file',
	content_css: props.isDark ? '/tinymce/skins/content/dark/content.css':'/tinymce/skins/content/default/content.css',
	images_upload_handler: (blobInfo, success) => {
		return new Promise((resolve, reject) => {
			
		})
	}
})
const clickSubmitButton = () => {
	if(!props.clickButtonStatus){
		emits('getContent', htmlValue.value)
	}
}
onMounted(() => {
	tinymce.init({})
})
watch(
	() => props.isDark, (n, o) => {
		const instance = tinymce.get(init.selector)
		tempData = instance.getContent()
		instance?.destroy()
		switchChange.value = true
		nextTick(() => {
			if(n) {
				init.skin_url = '/tinymce/skins/ui/oxide-dark'
				init.content_css = '/tinymce/skins/content/dark/content.css'
			} else {
				init.skin_url = '/tinymce/skins/ui/oxide'
				init.content_css = '/tinymce/skins/content/default/content.css'
			}
			switchChange.value = false
			tinymce.get(init.selector)?.setContent(tempData)
		})
	}
)
</script>
<style lang="scss" scoped>
.editor-box
{
	width: 100%;
	min-height: 14rem;
	margin-top: 1rem;
	textarea
	{
		display: none;
	}
	.editor-button
	{
		width: 100%;
		height: 3rem;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
}
</style>