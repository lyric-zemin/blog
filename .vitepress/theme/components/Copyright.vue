<template>
  <footer>
    Powered by
    <a href="https://github.com/lyric-zemin" target="_blank" title="作者">
      lyric
    </a>
    | Copyright © 2022-至今 | MIT License
  </footer>
</template>

<script lang="ts" setup></script>

<style scoped>
footer {
  text-align: center;
  position: absolute;
  width: 100%;
  bottom: 20px;
  padding: 0 20px;
  /* background: var(--c-bg); */
  color: var(--c-text);
}
a {
  color: var(--c-brand);
  font-weight: bold;
}
a:hover {
  text-decoration: none;
  color: var(--c-hover);
}
</style>
