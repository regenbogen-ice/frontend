import styled from 'styled-components'

export const HeaderContainer = styled.div`
    width: 100%;
    padding: 100px 20px;
    padding-bottom: 60px;

    box-sizing: border-box;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    gap: 15px;
`

export const ErrorContainer = styled.div`
    width: 100vw;
    height: 100vh;
    
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    padding: 20px;
    box-sizing: border-box;
`

export const ExternalLinkContainer = styled.a`
    display: inline-flex;
    align-items: center;

    color: var(--text-color);
    fill: var(--text-color);

    > svg {
        margin-left: 5px;
        height: 1.2rem;
    }
`

export const InternalLink = styled.a`
    color: var(--text-color);
`
