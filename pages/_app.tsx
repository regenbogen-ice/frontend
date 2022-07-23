import type { AppProps } from 'next/app'
import '../styles/globals.css'
import Head from 'next/head'
import { useEffect } from 'react'
import { create as ackeeCreate } from 'ackee-tracker'

setTimeout(() => {
    if (
        typeof navigator !== 'undefined' &&
        navigator.serviceWorker &&
        window.location.hostname !== 'localhost' &&
        window.location.hostname !== '127.0.0.1'
    ) {
        navigator.serviceWorker.register('/sw.js')
    }
}, 1000)

export default function App({ Component, pageProps }: AppProps): JSX.Element {
    useEffect(() => {
        if (process.env.NEXT_PUBLIC_ACKEE_UUID) {
            ackeeCreate('https://ackee.adridoesthings.com', {
                detailed: true,
            }).record(process.env.NEXT_PUBLIC_ACKEE_UUID)
        }
    }, [])

    return (
        <>
            <Head>
                <link
                    rel="icon"
                    type="image/png"
                    href="/images/icon-bg-32.png"
                />
                <link
                    rel="manifest"
                    href="/manifest.json"
                    crossOrigin="use-credentials"
                />
                <link rel="apple-touch-icon" href="/images/icon-bg-400.png" />
                <meta name="mobile-web-app-capable" content="yes" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap"
                    rel="stylesheet"
                />
                =
            </Head>
            <Component {...pageProps} />
        </>
    )
}
