<template>
  <!-- <ShareCard /> -->
  <div class="blogList">
    <a
      class="blog"
      v-for="post in posts"
      :key="post.regularPath"
      :href="withBase(post.regularPath)"
    >
      <div class="title">{{ post.frontMatter.title }}</div>
      <div class="date">{{ transDate(post.frontMatter.date) }}</div>
    </a>
  </div>
  <div class="pagination" v-if="pagesNum > 1">
    <div
      v-for="i in pagesNum"
      :key="i"
      class="link"
      :class="{ activeLink: pageCurrent === i }"
      @click="go(i)"
    >
      {{ i }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ShareCard from './ShareCard.vue'
import { useData, withBase } from 'vitepress'

interface post {
  regularPath: string
  frontMatter: { title: string; date: string }
}

const { theme } = useData()

// get posts
let postsAll = theme.value.posts || []
// get postLength
const postLength = theme.value.postLength
// get pageSize
const pageSize = theme.value.pageSize
//  pagesNum
let pagesNum =
  postLength % pageSize === 0
    ? postLength / pageSize
    : postLength / pageSize + 1
pagesNum = parseInt(pagesNum.toString())
//pageCurrent
const pageCurrent = ref(1)
// filter index post
postsAll = postsAll.filter((item: post) => {
  return item.regularPath.indexOf('index') < 0
})
// pagination
const allMap: Record<number, post[]> = {}
for (let i = 0; i < pagesNum; i++) {
  allMap[i] = []
}
let index = 0
for (let i = 0; i < postsAll.length; i++) {
  if (allMap[index].length > pageSize - 1) {
    index += 1
  }
  allMap[index].push(postsAll[i])
}
// set posts
const posts = ref<post[]>([])
posts.value = allMap[pageCurrent.value - 1]

// click pagination
const go = (i: number) => {
  pageCurrent.value = i
  posts.value = allMap[pageCurrent.value - 1]
}
// timestamp transform
const transDate = (date: string) => {
  const dateArray = date.split('-')
  let year = dateArray[0],
    month = ``,
    day = dateArray[2]
  switch (dateArray[1]) {
    case '1':
    case '01':
      month = `Jan`
      break
    case '2':
    case '02':
      month = `Feb`
      break
    case '3':
    case '03':
      month = `Mar`
      break
    case '4':
    case '04':
      month = `Apr`
      break
    case '5':
    case '05':
      month = `May`
      break
    case '6':
    case '06':
      month = `Jun`
      break
    case '7':
    case '07':
      month = `Jul`
      break
    case '8':
    case '08':
      month = `Aug`
      break
    case '9':
    case '09':
      month = `Sep`
      break
    case '10':
      month = `Oct`
      break
    case '11':
      month = `Nov`
      break
    case '12':
      month = `Dec`
      break
    default:
      month = `Month`
  }
  return `${month} ${day}, ${year}`
}
</script>

<style scoped>
.blog-title {
  text-align: center;
  font-weight: bold;
}
.blogList {
  /* padding: 30px 0; */
  /* padding-bottom: 120px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.blog {
  width: 85%;
  display: block;
  border-radius: 10px;
  padding: 0 20px;
  margin: 10px;
  background: var(--c-bg);
  max-width: 600px;
  box-shadow: 6px 6px var(--c-brand);
  border: 4px solid #282936;
  cursor: pointer;
}
.blog:hover {
  text-decoration: none;
  transform: translate(-2px, -2px);
  box-shadow: 10px 10px var(--c-brand);
}
.title {
  color: var(--c-brand-light);
  font-size: 1.2em;
  font-weight: bold;
}
.date {
  padding-bottom: 7px;
}
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 80px;
  width: 100%;
}
.link {
  width: 2rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  border: 1px solid #282936;
  cursor: pointer;
  border-right: none;
  transition: 0.2s;
  border-radius: 2px;
}
.link:last-child {
  border-right: 1px solid #282936;
}
.link:hover {
  transform: translate(-1px, -1px);
}
.activeLink {
  background-color: var(--c-brand);
  color: white;
}
</style>
