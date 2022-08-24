import Link from 'next/link'
import styled from 'styled-components'

const HeaderContainer = styled.header`
    width: 100vw;
    min-height: 30px;
    padding: 10px 15px;

    display: flex;
    align-items: center;
`

const HomeLinkAnchor = styled.a`
    color: var(--text-color);
    font-weight: bold;
    font-size: 22px;
    text-decoration: none;
`

export default function Header() {
    return (
        <HeaderContainer>
            <Link href='/' passHref>
                <HomeLinkAnchor>Wo ist der Regenbogen-ICE?</HomeLinkAnchor>
            </Link>
        </HeaderContainer>
    )
}
