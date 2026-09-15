import type { AppProps } from 'next/app'
import Head from 'next/head'
import type { LayoutProps } from '@vercel/examples-ui/layout'
import { getLayout } from '@vercel/examples-ui'
import '@vercel/examples-ui/globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = getLayout<LayoutProps>(Component)
  const title = pageProps.dictionary?.title || 'IP location'
  const description = pageProps.dictionary?.subtitle

  return (
    <>
      <Head>
        <title>{title}</title>
        {description ? <meta name="description" content={description} /> : null}
      </Head>
      <Layout path="edge-functions/i18n">
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
