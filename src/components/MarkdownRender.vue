<script setup lang="js">
import { onMounted,ref } from 'vue';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

const props = defineProps(['content']);
const md = new MarkdownIt({
    highlight:function(str,lang) {
        if(lang && hljs.getLanguage(lang)){
            return hljs.highlight(str,{language:lang}).value
        }
        return ''
    }
})

const htmlContent = ref('')

onMounted(() =>{
    htmlContent.value = md.render(props.content)
})
</script>

<template>
    <div class="markdown-body" v-html="htmlContent">

    </div>
</template>

<style scoped>
@import 'highlight.js/styles/github.css';
.markdown-body{
    /* 添加github风格样式 */
}
</style>