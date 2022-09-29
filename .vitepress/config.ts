import { defineConfigWithTheme } from "vitepress";
import { getPosts, getPostLength } from "./theme/serverUtils";

async function config() {
  return defineConfigWithTheme({
    lang: "zh-CN",
    title: "前端记记看",
    base: "/blog/",
    outDir: "./build",
    // description: 'Home of Clark Cui',
    // head: [],

    themeConfig: {
      logo: "/tea.svg",
      docsDir: "/",
      // docsBranch: "master",
      lastUpdated: false,
      posts: await getPosts(),
      pageSize: 5, //几个为一页
      postLength: await getPostLength(), //博客有几篇

      nav: [
        {
          text: "🏡Home",
          link: "/",
        },
        {
          text: "🔖Tags",
          link: "/tags",
        },
        {
          text: "📃Archives",
          link: "/archives",
        },
      ],

      // sidebar: {
      //   "./posts/": false,
      //   "/": false,
      // },
      // sidebar: false
    },
  });
}

export default config();
