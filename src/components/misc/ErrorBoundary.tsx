import { Component, PropsWithChildren } from 'react'
import styled from 'styled-components'
import { Button } from '../layout/styles'
import { Error as ErrorView } from './Error'

type Props = PropsWithChildren
type State = {
    hasError: boolean,
    lastError?: Error,
}

const FullscreenErrorContainer = styled.div`
    display: flex;
    flex-direction: column;

    height: 100%;

    justify-content: center;
    align-items: center;

    gap: 25px;
`

export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {hasError: false}

        this.retry = this.retry.bind(this)
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, lastError: error }
    }

    retry() {
        window.location.reload()
    }

    render() {
        if (this.state.hasError) {
            return (
                <>
                    <FullscreenErrorContainer>
                        <h1>Oops</h1>
                        <ErrorView error={this.state.lastError} />
                        <Button onClick={this.retry}>Restart app</Button>
                    </FullscreenErrorContainer>
                </>
            )
        }

        return this.props.children
    }
}
