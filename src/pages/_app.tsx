import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeContext } from 'styled-components'
import ErrorBoundary from '../components/misc/ErrorBoundary'
import { GlobalStyles } from '../components/misc/GlobalStyles'
import { useThemeColor } from '../util/theme'

import '../util/tracking'
import '../util/registerServiceWorker'

export default function App({ Component, pageProps }: AppProps) {
    const [themeColor, transitionThemeColor, changeThemeColor] = useThemeColor()

    return (
        <>
            <GlobalStyles backgroundColor={themeColor} transitionThemeColor={transitionThemeColor} />
            <Head>
                <meta name='theme-color' content={themeColor} />
            </Head>

            <ThemeContext.Provider value={{ themeColor, changeThemeColor }}>
                <ErrorBoundary>
                    <Component {...pageProps} />
                </ErrorBoundary>
            </ThemeContext.Provider>
        </>
    )
}
