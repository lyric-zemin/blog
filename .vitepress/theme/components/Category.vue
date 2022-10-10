<template>
  <div class="category" v-if="headers.length > 0">
    <ul>
      <li class="header" v-for="item in headers" :key="item.link">
        <a :href="item.link" class="header-h1">{{ item.title }}</a>
        <ul v-if="item.children.length">
          <li v-for="child in item.children" :key="child.link">
            <a :href="child.link" class="header-h2">{{ child.title }}</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useData } from 'vitepress'
const pageData = useData()
const headers = pageData.page.value.headers
</script>

<style scoped>
.category {
  width: 20rem;
  padding: 1em;
  background: var(--c-bg);
  box-shadow: 6px 6px var(--c-brand);
  border: 4px solid #282936;
  color: var(--c-brand-light);
}
.header a {
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.header-h2 {
  text-indent: 2em;
}
ul {
  list-style-type: none;
}
@media (min-width: 1400px) {
  .category {
    position: fixed;
    right: 20px;
  }
}
</style>
