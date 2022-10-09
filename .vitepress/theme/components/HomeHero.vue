<template>
  <div ref="pic" class="pic"></div>
</template>

<script lang="ts" setup>
import { withBase } from 'vitepress'
import { ref, onMounted } from 'vue'
import lottie from 'lottie-web'

const pic = ref<HTMLDListElement>()
onMounted(() => {
  // storage lottie
  if (document.getElementById('svgContainer')) return

  // created insertNode and add style
  const insertNode = document.createElement('div')
  insertNode.id = 'svgContainer'
  insertNode.style.width = '300px'
  insertNode.style.margin = '0 auto'
  pic.value?.appendChild(insertNode)
  // created lottie
  lottie.loadAnimation({
    container: insertNode,
    renderer: 'svg',
    loop: true,
    // path: 'https://labs.nearpod.com/bodymovin/demo/al_boardman/articulation/mnemonics.json',
    path: withBase('/phonological.json'),
  })
})
</script>

<style scoped>
.pic {
  text-align: center;
}
</style>
