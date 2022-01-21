import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import Head from 'next/head'
import React from 'react'
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core/styles'
import Fab from '@mui/material/Fab'
import EditIcon from '@mui/icons-material/Edit'
import { styled } from '@material-ui/styles'
import { Layout } from '../components'
import * as Docs from '../docs'
const wikiConfig = require('../wiki.config.json')
import Box from '@mui/material/Box'

const components = []
wikiConfig.menuElements.map(item => {
  item.children && item.children.map(item => {
    if (item.component !== null && item.component !== '') {
      components.push(item.component)
    } else {
      item.subItems && item.subItems.map(item => {
        if (item.component !== null && item.component !== '') {
          components.push(item.component)
        }
      })
    }
  })
})

let theme = createTheme()
theme = responsiveFontSizes(theme)

const FabBox = styled(Box)({
  position: 'absolute',
  top: '80px',
  right: '20px'
})

export default function Home() {
  const [selectedComponent, setSelectedComponent] = React.useState('GettingStarted')

  return (
    <>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Next Docs</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Layout
          setSelectedComponent={setSelectedComponent}
          menuElements={wikiConfig.menuElements}
          searchOptions={components}
        >
          <>
            {components.map((component, index) => {
              return selectedComponent === component && React.createElement(
                Docs[`${component}`],
                { key: `${component}-${index}` }
              )
            })}
          </>
        </Layout>
        <FabBox>
          <Fab
            color="primary"
            size='small'
            aria-label="edit"
            target='_blank'
            href={`https://github.com/NathanFirmo/next-docs/blob/main/docs/${selectedComponent}.tsx`}
          >
            <EditIcon />
          </Fab>
        </FabBox>
      </ThemeProvider>
    </>
  )
}