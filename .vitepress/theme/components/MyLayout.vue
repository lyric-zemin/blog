<template>
  <Layout>
    <!-- Home slot-->
    <template #home-hero-before><HomeHero /> </template>
    <template #home-features-before> <Page /></template>
    <!-- Page slot-->

    <template #doc-before>
      <!-- <Title v-if="isPost" /> -->
      <Category v-if="isPost" />
    </template>
    <template #doc-after>
      <!-- <Comments v-if="isPost" /> -->
    </template>
  </Layout>
  <!-- copyright -->
  <Copyright />
</template>

<script lang="ts" setup>
import DefaultTheme from 'vitepress/theme'
import HomeHero from './HomeHero.vue'
import Page from './Page.vue'
import Copyright from './Copyright.vue'
import Category from './Category.vue'
import Title from './Title.vue'
import Comments from './Comments.vue'
import { useData } from 'vitepress'
import { computed } from 'vue'

const { Layout } = DefaultTheme
const isPost = computed(() =>
  useData().page.value.relativePath.includes('posts')
)
</script>
