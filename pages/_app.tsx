import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import theme from '../lib/Theme'
import createEmotionCache from '../lib/CreateEmotionCache'
import { Provider } from 'next-auth/client'
import { useRouter } from 'next/router'
const wikiConfig = require('../wiki.config.json')
import { Layout } from '../components'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const components = []
wikiConfig.menuElements.map((item) => {
  item.children &&
    item.children.map((item) => {
      if (item.component !== null && item.component !== '') {
        components.push(item.component)
      } else {
        item.subItems &&
          item.subItems.map((item) => {
            if (item.component !== null && item.component !== '') {
              components.push(item.component)
            }
          })
      }
    })
})

export default function MyApp(props: MyAppProps) {
  const router = useRouter()
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (
    <Provider
      // Provider options are not required but can be useful in situations where
      // you have a short session maxAge time. Shown here with default values.
      options={{
        // Client Max Age controls how often the useSession in the client should
        // contact the server to sync the session state. Value in seconds.
        // e.g.
        // * 0  - Disabled (always use cache value)
        // * 60 - Sync session state with server if it's older than 60 seconds
        clientMaxAge: 0,
        // Keep Alive tells windows / tabs that are signed in to keep sending
        // a keep alive request (which extends the current session expiry) to
        // prevent sessions in open windows from expiring. Value in seconds.
        //
        // Note: If a session has expired when keep alive is triggered, all open
        // windows / tabs will be updated to reflect the user is signed out.
        keepAlive: 0,
      }}
      session={pageProps.session}
    >
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Prontoemprego</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>

        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <Layout
            setSelectedComponent={router.push}
            menuElements={wikiConfig.menuElements}
            searchOptions={components}
          >
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  )
}
