export default function MarkdownHandler(markdown: Array<string> | string) {
  let element: string | null,
    indexOfImage: number,
    indexOfAlert: number,
    lastIndex: number,
    hasImageToHandle: boolean,
    hasAlertToHandle: boolean
  do {
    indexOfImage =
      typeof markdown === 'string'
        ? markdown.indexOf('![image]')
        : markdown[lastIndex].indexOf('![image]')
    indexOfAlert =
      typeof markdown === 'string'
        ? markdown.indexOf('![alert]')
        : markdown[lastIndex].indexOf('![alert]')

    if (indexOfImage === -1 && indexOfAlert > -1) element = element = '![alert]'
    else if (indexOfAlert === -1 && indexOfImage > -1) element = '![image]'
    else if (indexOfAlert === -1 && indexOfImage === -1) element = null
    else element = indexOfImage < indexOfAlert ? '![image]' : '![alert]'

    if (element === null) {
      return [markdown]
    }

    if (typeof markdown === 'string') markdown = markdown.split(element, 2)
    else {
      let elemetsToPush = markdown[lastIndex].split(element, 2)
      markdown.pop()
      elemetsToPush.forEach((item: string) => markdown.push(item))
    }

    lastIndex = markdown.length - 1
    markdown.splice(lastIndex, 0, element)
    markdown = markdown.map((item: string) => item.trim())
    markdown = markdown.filter((item: string) => item.length > 0)
    lastIndex = markdown.length - 1

    hasImageToHandle =
      markdown[lastIndex].includes('![image]') &&
      markdown[lastIndex] !== '![image]'
    hasAlertToHandle =
      markdown[lastIndex].includes('![alert]') &&
      markdown[lastIndex] !== '![alert]'
  } while (hasImageToHandle || hasAlertToHandle)
  return markdown
}

module.exports = MarkdownHandler
