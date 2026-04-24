import { ContentData, createContentLoader } from 'vitepress'

export default createContentLoader('posts/**/*.md', {
  transform(rawData) {
    return rawData
      .map((data) => ({
        ...data,
        frontmatter: {
          ...data.frontmatter,
          date: convertDate(data.frontmatter.date),
        },
      }))
      .sort(compareDate)
  },
})

function compareDate(obj1: ContentData, obj2: ContentData) {
  return obj1.frontmatter.date < obj2.frontmatter.date ? 1 : -1
}

function convertDate(date = new Date().toString()) {
  const json_date = new Date(date).toJSON()
  return json_date.split('T')[0]
}
