import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { InternalLink, LinkIcon, UndecoratedInternalLink } from './CommonStyles'
import ThemeSwitcher from './ThemeSwitcher'

const FooterContainer = styled.footer`
    width: 100%;
    height: 70px;
    padding: 10px 20px;
    
    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: space-between;
`

const FooterSection = styled.div`
    display: flex;
    gap: 15px;

    align-items: center;
`

const ProfilePicture = styled.img`
    width: 50px;
    height: 50px;

    border-radius: 50%;
`

function MailLink() {
    const [mailLink, setMailLink] = useState('mailto:unconfigured@null.regenbogen-ice-mc.org')

    useEffect(() => {
        setMailLink(atob('bWFpbHRvOmNvbnRhY3RAcmVnZW5ib2dlbi1pY2UuZGU='))
    }, [])

    return (
        <InternalLink href={mailLink}>
            <LinkIcon viewBox="0 0 24 24">
                <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
            </LinkIcon>
        </InternalLink>
    )
}

export default function Footer() {
    return (
        <FooterContainer>
            <FooterSection>
                <ThemeSwitcher />
                <MailLink />
            </FooterSection>
            <FooterSection>
                <UndecoratedInternalLink href='https://ppluss.de' target='_blank'>
                    <ProfilePicture src='/images/philippirl.webp' loading='lazy' />
                </UndecoratedInternalLink>
                <UndecoratedInternalLink href='https://adridoesthings.com' target='_blank'>
                    <ProfilePicture src='/images/adridoesthings.webp' loading='lazy' />
                </UndecoratedInternalLink>
            </FooterSection>
        </FooterContainer>
    )
}
