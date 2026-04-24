import DefaultTheme from 'vitepress/theme'
import Archives from './components/Archives.vue'
import Tags from './components/Tags.vue'
import MyLayout from './components/MyLayout.vue'
import './custom.css'
import type { Theme } from 'vitepress'

export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app }) {
    app.component('Archives', Archives)
    app.component('Tags', Tags)
  },
} satisfies Theme
