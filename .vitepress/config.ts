import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '前端记记看',
  base: '/blog/',
  outDir: './build',
  description: '一个初级前端的记事本',

  // 2023/4/26 修复快捷菜单不显示的问题
  // 不配置headers导致@mdit-vue/plugin-headers插件不启用
  markdown: { headers: true },

  themeConfig: {
    logo: '/logo.jpg',

    lastUpdated: { text: '最后更新时间' },

    nav: [
      {
        text: '🏡Home',
        link: '/',
      },
      {
        text: '🔖Tags',
        link: '/tags',
      },
      {
        text: '📃Archives',
        link: '/archives',
      },
    ],
  },
})
