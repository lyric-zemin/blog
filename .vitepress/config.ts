import { defineConfigWithTheme } from 'vitepress'
import { getPosts } from './theme/serverUtils'

async function config() {
  const posts = await getPosts()
  return defineConfigWithTheme({
    lang: 'zh-CN',
    title: '前端记记看',
    base: '/blog/',
    outDir: './build',
    // lastUpdated: true,
    description: '一个初级前端的记事本',
    // head: [],

    // 2023/4/26 修复快捷菜单不显示的问题
    // 不配置headers导致@mdit-vue/plugin-headers插件不启用
    markdown: { headers: true },

    themeConfig: {
      logo: '/logo.jpg',
      docsDir: '/',

      pageSize: 5, // 几个为一页
      posts: posts,
      postLength: posts.length, //博客有几篇

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
}

export default config()
