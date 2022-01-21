import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import Image from '../molecules/Image'
import { InfoAlert, WarningAlert } from '../../components'

interface Iprops {
  markdownText: string
  imagesProps?: object
  alertsProps?: object
}

export default function MarkdownRender({ markdownText, imagesProps, alertsProps }: Iprops) {
  const markdownElements = markdownText.split('![image]')
  let alertIndex = -1
  return <>
    {
      markdownElements.map((markdownElement, index) => {
        if (markdownElement.includes('![alert]')) {
          alertIndex++
          const splitedElement = markdownElement.split('![alert]')
          return <>
            <ReactMarkdown
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
              {splitedElement[0]}
            </ReactMarkdown>
            {alertsProps && alertsProps[alertIndex] ?
              (alertsProps[alertIndex].type === 'info' ?
                <InfoAlert message={alertsProps[alertIndex].message} /> :
                <WarningAlert message={alertsProps[alertIndex].message} />) :
              null
            }
            <ReactMarkdown
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
              {splitedElement[1]}
            </ReactMarkdown>
            {alertsProps && alertsProps[++alertIndex] ?
              (alertsProps[alertIndex].type === 'info' ?
                <InfoAlert message={alertsProps[alertIndex].message} /> :
                <WarningAlert message={alertsProps[alertIndex].message} />) :
              null
            }
            {imagesProps && imagesProps[index] && <Image
              src={imagesProps[index].src}
              alt={imagesProps[index].alt}
              width={imagesProps[index].width}
              height={imagesProps[index].height}
            />}
          </>
        }
        return <>
          <ReactMarkdown
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
            {markdownElement}
          </ReactMarkdown>
          {imagesProps && imagesProps[index] && <Image
            src={imagesProps[index].src}
            alt={imagesProps[index].alt}
            width={imagesProps[index].width}
            height={imagesProps[index].height}
          />}
        </>
      }
      )
    }
  </>
}