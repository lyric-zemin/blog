<template>
  <Layout>
    <!-- Home slot-->
    <template #home-hero-before><HomeHero /> </template>
    <template #home-features-before> <Page /></template>
  </Layout>
  <!-- copywright -->
  <!-- <CopyWright /> -->
</template>

<script lang="ts" setup>
import DefaultTheme from "vitepress/theme";
import HomeHero from "./HomeHero.vue";
import CopyWright from "./CopyWright.vue";
import Page from "./Page.vue";
import ToggleTheme from "./ToggleTheme.vue";

const { Layout } = DefaultTheme;
</script>
