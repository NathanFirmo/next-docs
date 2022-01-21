import { MarkdownRender } from '../components'

const markdown = `
# Adding items to the menu

The information that feeds the side menu comes from the **wiki.config.json** file,
which is in the root of the project, so just change it to change the menu.

This file has the structure shown below. For purposes of comparison, the name
of the page group you are reading is '**About Documentation**', the name of the
tab is '**Add a tab to the menu**' and the component name is
'**AddMenuTab**'.

![alert]

~~~json
{
  "menuElements": [
    {
      "label": "GroupName",
      "children": [
        {
          "label": "Label",
          "component": "ComponentName",
          "subItems": []
        }
      ]
    }
  ]
}
~~~

## Adding a subtitle tab

To turn a tab into a subtitle, you set the component to **null**.

~~~json
{
  "menuElements": [
    {
      "label": "GroupName",
      "children": [
        {
          "label": "Label"
          "component": null,
          "subItems": [
            {
              "label": "Label",
              "component": "ComponentName"
            }
          ]
        }
      ]
    }
  ]
}
~~~
`
const message = `The 'component' property must be created with the same name
from the file corresponding to the page, but without the .tsx extension`
export default function Template() {

  return (
    <MarkdownRender 
      markdownText={markdown}
      alertsProps={[{
        type: 'info',
        message: message
      }]}
    />
  )
}
