import Head from 'next/head'
import Link from 'next/link'
import { APP_BASE } from '../../util/constants'
import { ErrorContainer, ExternalLinkContainer } from './CommonStyles'
import { FullScreenError } from './Error'
import Loader from './Loader'

export function ExternalLink({text, link}: {text: string, link: string}) {
    return (
        <Link href={link} passHref legacyBehavior>
            <ExternalLinkContainer target='_blank'>
                {text}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" /></svg>
            </ExternalLinkContainer>
        </Link>
    )
}

export function HtmlTitle({title}: {title: string}) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:image:src" content={APP_BASE + '/images/twittercard.png'} />
            <meta property="og:title" content={title} />
            <meta property="og:image" content={APP_BASE + '/images/twittercard.png'} />
            <meta name="keywords" content="regenbogen ice, wo ist der regenbogen ice, regenbogen ice fahrplan, regenbogen ice strecke, regenbogen ice nummer, regenbogen ice db, zug" />
        </Head>
    )
}


export function NoDataComponent({error, title}: {error: Error | null, title: string}) {
    if(error) {
        return (
            <>
                <HtmlTitle title={title} />
                <FullScreenError error={error} />
            </>
        )
    }

    return (
        <>
            <HtmlTitle title={title} />
            <ErrorContainer>
                <Loader />
            </ErrorContainer>
        </>
    )

}
