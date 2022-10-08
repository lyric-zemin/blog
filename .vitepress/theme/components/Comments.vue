<template>
  <div id="gitalk-container"></div>
</template>

<script lang="ts" setup>
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'
import { onMounted } from 'vue'

const gitalk = new Gitalk({
  clientID: '1a83110dc5ffad80f0f8',
  clientSecret: '4bde097930f61cdc8a6a6c4a7314b1c9f02ccca2',
  repo: 'blog',
  owner: 'lyric-zemin',
  admin: ['lyric-zemin'],
  id: decodeURI(window.location.pathname).substr(0, 50), // Ensure uniqueness and length less than 50
  language: 'zh-CN',
  distractionFreeMode: true, // Facebook-like distraction free mode
  // 原代理失效
  proxy: 'https://vercel.prohibitorum.top/github_access_token',
})
onMounted(() => {
  gitalk.render('gitalk-container')
})
</script>
