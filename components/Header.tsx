import styled from 'styled-components'
import Link from 'next/link'

const HeaderBar = styled.header`
    padding: 1rem 2rem;
    display: flex;
    background-color: #FF007A;
    justify-content: flex-start;
    height: 2rem;
    position: relative;
    align-items: center;
    @media only screen and (max-width: 800px) {
        justify-content: center;
    }
`

const WebsiteTitle = styled.h1`
    color: #fff;
    display: flex;
    @media only screen and (max-width: 620px) {
        display: none;
    }
`

const TitleContainer = styled.a`
    text-decoration: none;
    color: inherit;
    display: flex;
    gap: 1rem;
    align-items: center;
`

const WebsiteLogo = styled.img`
    height: 2.5rem;
    width: 2.5rem;
    border-radius: .4rem;
`

export default function Header() {
    return (
        <HeaderBar>
            <Link passHref href='/'>
            	<TitleContainer>
                    <WebsiteLogo src="/images/icon-bg-400.png"></WebsiteLogo>
                    <WebsiteTitle>Wo ist der Regenbogen ICE?</WebsiteTitle>
                </TitleContainer>
            </Link>
        </HeaderBar>
    )
}
