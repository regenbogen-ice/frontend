import type { AppProps } from 'next/app'
import { createGlobalStyle } from 'styled-components'
import '../util/tracking'

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
        height: 100%;
        overflow-x: clip;
    }

    #__next {
        display: flex;
        flex-direction: column;

        justify-content: space-between;
    }

    #__next > * {
        flex-shrink: 0;
        flex-grow: 0;
    }
`

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />
            <GlobalStyles />
        </>
    )
}
