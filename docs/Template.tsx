import { MarkdownRender } from '../components'

const markdown = `

`

export default function Template() {

  return (
    <MarkdownRender 
      markdownText={markdown}
    />
  )
}
