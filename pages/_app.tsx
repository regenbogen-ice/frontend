import type { AppProps } from 'next/app'
import Head from 'next/head'
import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        border: 0;
    }

    body {
        background-color: #FF007A;
        color: #fff;
        font-family: 'Inter', 'Roboto', sans-serif;
    }

    @media only screen and (min-width: 800px) {
        html {
            font-size: 120%;
        }
    }

    html, body, #__next {
        overflow-x: hidden;
    }
`

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
                <link rel="icon" type="image/png" href="/images/icon-bg-32.png" />
                <link rel='manifest' href='/manifest.json' crossOrigin='use-credentials' />
                <link rel="apple-touch-icon" href="/images/icon-bg-400.png" />
                <meta name="mobile-web-app-capable" content="yes" />
            </Head>
            <Component {...pageProps} />
            <GlobalStyles />
        </>
    )
}
