<template>
  <div style="padding-top: 10px">
    <div v-for="yearList in data" class="yearItem">
      <div class="year">
        {{ yearList[0].frontmatter.date.split('-')[0] }}
      </div>
      <a
        v-for="(article, index) in yearList"
        :key="index"
        :href="withBase(article.url)"
        class="article"
      >
        <div class="title">
          <div class="title-o"></div>
          {{ article.frontmatter.title }}
        </div>
        <div class="date">{{ article.frontmatter.date.slice(5) }}</div>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { withBase } from 'vitepress'
import { computed } from 'vue'
import { Post } from '../../type'
// @ts-ignore
import { data as posts } from '../posts.data'

const data = computed(() => useYearSort(posts))

function useYearSort(post: Post[]) {
  const data: Post[][] = []
  let year = '0'
  let num = -1
  for (let index = 0; index < post.length; index++) {
    const element = post[index]
    if (element.frontmatter.date) {
      const y = element.frontmatter.date.split('-')[0]
      if (y === year) {
        data[num].push(element)
      } else {
        num++
        data[num] = []
        data[num].push(element)
        year = y
      }
    }
  }
  return data
}
</script>

<style scoped>
.yearItem {
  border-bottom: 1px dashed #c7c7c7;
}

.yearItem:last-child {
  border: none;
}

.year {
  padding: 16px 0 8px 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.article {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 10px;
  color: #666;
  transition:
    border 0.3s ease,
    color 0.3s ease;
}

.article:hover {
  text-decoration: none;
  color: var(--c-brand);
}

.date {
  font-family: Georgia, sans-serif;
}
</style>
