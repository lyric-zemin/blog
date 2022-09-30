<template>
  <Layout>
    <!-- Home slot-->
    <template #home-hero-before><HomeHero /> </template>
    <template #home-features-before> <Page /></template>
  </Layout>
  <!-- copyright -->
  <Copyright />
</template>

<script lang="ts" setup>
import DefaultTheme from 'vitepress/theme'
import HomeHero from './HomeHero.vue'
import Page from './Page.vue'
import Copyright from './Copyright.vue'

const { Layout } = DefaultTheme
</script>
