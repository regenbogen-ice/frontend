import styled from 'styled-components'
import { HTTPError } from '../../util/dataFetcher'
import Header from './Header'

const FullscreenErrorContainer = styled.div`
    display: flex;
    flex-direction: column;

    height: 100%;

    justify-content: center;
    align-items: center;

    margin-top: -50px;
`

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    
    gap: 20px;

    width: calc(100% - 50px);
    max-width: 600px;

    text-align: center;
`

const StatusCode = styled.h1`
    font-size: 48px;
`

const ErrorMessage = styled.h2`
    font-size: 32px;
`

export function FullScreenError({error}: {error?: Error}) {
    return (
        <>
            <Header />
            <FullscreenErrorContainer>
                <Error error={error} />
            </FullscreenErrorContainer>
        </>
    )
}

export function InlineError({error}: {error?: Error}) {
    if(error instanceof HTTPError) {
        return (
            <>
                {error.status}: {error.backendMessage}
            </>
        )
    }

    return (
        <>
            {error.toString()}
        </>
    )
}

export function Error({error}: {error?: Error}) {
    if(error instanceof HTTPError) {
        return (
            <ErrorContainer>
                <StatusCode>{error.status}</StatusCode>
                <ErrorMessage>{error.backendMessage}</ErrorMessage>
            </ErrorContainer>
        )
    }

    return (
        <ErrorContainer>
            <h2>{error.toString()}</h2>
        </ErrorContainer>
    )
}

