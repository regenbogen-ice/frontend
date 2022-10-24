import type { AppProps } from 'next/app'
import { createGlobalStyle, css, ThemeContext } from 'styled-components'
import { useThemeColor } from '../util/theme'
import '../util/tracking'

setTimeout(() => {
    if(typeof navigator !== 'undefined' 
        && navigator.serviceWorker
        && window.location.hostname !== 'localhost'
        && window.location.hostname !== '127.0.0.1') {
        navigator.serviceWorker.register('/sw.js')
    }
}, 1000)

const GlobalStyles: any = createGlobalStyle`
    :root {
        --theme-color: ${({backgroundColor}: {backgroundColor: string}) => backgroundColor};
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

        ${({transitionThemeColor}: any) => transitionThemeColor && css`
            transition: background-color .2s;
        `}
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
`

export default function App({ Component, pageProps }: AppProps) {
    const [themeColor, transitionThemeColor, changeThemeColor] = useThemeColor()

    return (
        <>
            <ThemeContext.Provider value={{ themeColor, changeThemeColor }}>
                <Component {...pageProps} />
            </ThemeContext.Provider>
            <GlobalStyles backgroundColor={themeColor} transitionThemeColor={transitionThemeColor} />
        </>
    )
}
