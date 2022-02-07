import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import Image from '../molecules/Image'
import { InfoAlert, WarningAlert } from '../../components'
import MarkdownHandler from '../../lib/MarkdownHandler'

interface Iprops {
  markdownText: string
  imagesProps?: object
  alertsProps?: object
}

export default function MarkdownRender({ markdownText, imagesProps, alertsProps }: Iprops) {
  const markdown = MarkdownHandler(markdownText)
  let alertIndex = -1, imageIndex = -1
  return <>
    {
      markdown.map((item: string, index: number) => {
        if (item === '![alert]' && alertsProps && alertsProps[++alertIndex]) {
          return (
            alertsProps[alertIndex].type === 'info' ?
              <InfoAlert 
              key={`InfoAlert-${index}`}
              message={alertsProps[alertIndex].message} /> :
              <WarningAlert 
              key={`WarnigngAlert-${index}`}
              message={alertsProps[alertIndex].message} />
          )
        } else if (item === '![image]' && imagesProps && imagesProps[++imageIndex]) {
          return (
            <Image
              key={`Image-${index}`}
              src={imagesProps[imageIndex].src}
              alt={imagesProps[imageIndex].alt}
              width={imagesProps[imageIndex].width}
              height={imagesProps[imageIndex].height}
            />
          )
        } else {
          return (
            <ReactMarkdown
              key={`ReactMardown-${index}`}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                },
              }}
            >
              {item}
            </ReactMarkdown>
          )
        }
      })
    }
  </>
}