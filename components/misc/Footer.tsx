import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { InternalLink, UndecoratedInternalLink } from './CommonStyles'

const OuterFooterContainer = styled.div`
    margin-top: 70px;

    position: relative;
`

const FooterContainer = styled.footer`
    width: 100%;
    height: 70px;
    padding: 10px 20px;
    
    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: space-between;

    position: absolute;
    bottom: 0;
`

const FooterSection = styled.div`
    display: flex;
    gap: 10px;
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
        <InternalLink href={mailLink}>Kontakt</InternalLink>
    )
}

export default function Footer() {
    return (
        <OuterFooterContainer>
            <FooterContainer>
                <FooterSection>
                    <MailLink />
                </FooterSection>
                <FooterSection>
                    <UndecoratedInternalLink href='https://ppluss.de' target='_blank'>
                        <ProfilePicture src='/images/philippirl.webp' />
                    </UndecoratedInternalLink>
                    <UndecoratedInternalLink href='https://adridoesthings.com' target='_blank'>
                        <ProfilePicture src='/images/adridoesthings.webp' />
                    </UndecoratedInternalLink>
                </FooterSection>
            </FooterContainer>
        </OuterFooterContainer>
    )
}
