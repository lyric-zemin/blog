import globby from 'globby'
import matter from 'gray-matter'
import fs from 'node:fs'

export async function getPosts() {
  const paths = await getPostMDFilePaths()
  const posts = paths.map((item) => {
    const content = fs.readFileSync(item, 'utf-8')
    const { data } = matter(content)
    data.date = _convertDate(data.date)
    return {
      frontMatter: data,
      regularPath: `/${item.replace('.md', '.html')}`,
    }
  })

  return posts.sort(_compareDate)
}

function _convertDate(date = new Date().toString()) {
  const json_date = new Date(date).toJSON()
  return json_date.split('T')[0]
}

function _compareDate(obj1, obj2) {
  return obj1.frontMatter.date < obj2.frontMatter.date ? 1 : -1
}

async function getPostMDFilePaths() {
  let paths = await globby(['**.md'], {
    ignore: ['node_modules', 'README.md'],
  })
  return paths.filter((item) => item.includes('posts/'))
}
