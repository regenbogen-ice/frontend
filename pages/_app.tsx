import type { AppProps } from 'next/app'
import Head from 'next/head'
import { createGlobalStyle } from 'styled-components'
import { init as initSentry } from '@sentry/react'
import { create as ackeeCreate } from 'ackee-tracker'

if(process.env.NEXT_PUBLIC_SENTRY_DSN
    && typeof window !== 'undefined') {
    initSentry({
        dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
        tracesSampleRate: 1.0,
        environment: process.env.NEXT_PUBLIC_ENV, 
    })
}

if(process.env.NEXT_PUBLIC_ACKEE_UUID
    && typeof window !== 'undefined') {
    ackeeCreate('https://ackee.adridoesthings.com', { detailed: true }).record(process.env.NEXT_PUBLIC_ACKEE_UUID)
}

setTimeout(() => {
    if(typeof navigator !== 'undefined' 
        && navigator.serviceWorker
        && window.location.hostname !== 'localhost'
        && window.location.hostname !== '127.0.0.1') {
        navigator.serviceWorker.register('/sw.js')
    }
}, 1000)

const GlobalStyles = createGlobalStyle`
    :root {
        --theme-color: #FF007A;
        --text-color: #fff;
        --reverse-text-color: #000;
        --text-dark-color: #ccc;
    }

    * {
        margin: 0;
        padding: 0;
        outline: 0;
        border: 0;
    }

    body {
        background-color: var(--theme-color);
        color: var(--text-color);
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
