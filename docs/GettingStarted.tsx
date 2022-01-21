import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

const markdown = `

![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)

# 📋 Getting Started

This project came from the idea of having a simple but robust documentation template. 
This documentation supports everything you want. 
There are no limits. It was built on the Next.js so you can put you own components.


> No matter the circumstance you can always improve. You can always start improving with yourself. You can always start improving today.
> — Kent Beck, Extreme Programming Explained
`
export default function Template() {
  return (
    <ReactMarkdown
      children={markdown}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    />
  )
}

