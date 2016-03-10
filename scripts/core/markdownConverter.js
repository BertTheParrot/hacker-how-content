import Markdown from 'markdown-it'
import lazyHeaders from 'markdown-it-lazy-headers'
import markdownEmoji from 'markdown-it-emoji' // This is important!

const markdown = Markdown().use(lazyHeaders).use(markdownEmoji)

export default function markdownToHtml(html) {
  return markdown.render(html)
}
