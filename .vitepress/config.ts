import { defineConfigWithTheme } from 'vitepress'
import { getPosts } from './theme/serverUtils'

async function config() {
  const posts = await getPosts()
  return defineConfigWithTheme({
    lang: 'zh-CN',
    title: '前端记记看',
    base: '/blog/',
    outDir: './build',
    description: '一个初级前端的记事本',
    // head: [],

    themeConfig: {
      outlineTitle: '🤣🤣🤣',
      logo: '/tea.svg',
      docsDir: '/',
      lastUpdated: true,

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
