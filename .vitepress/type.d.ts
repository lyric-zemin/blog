export type Post = {
  url: string
  frontmatter: {
    date: string
    title: string
    tags?: string[]
    description?: string
  }
}
