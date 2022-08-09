import styled, { keyframes } from 'styled-components'

const LoaderContainer = styled.h1`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;
`

const LoadingAnimation = keyframes`
    from {
        transform: scale(1);
    }

    to {
        transform: scale(2);
    }
`

const LoaderItem = styled.span`
    animation: .5s ${LoadingAnimation} infinite alternate;

    :nth-child(2) {
        animation-delay: .2s;
    }

    :nth-child(3) {
        animation-delay: .4s;
    }
`

export default function Loader() {
    return (
        <LoaderContainer>
            <LoaderItem>•</LoaderItem>
            <LoaderItem>•</LoaderItem>
            <LoaderItem>•</LoaderItem>
        </LoaderContainer>
    )
}
