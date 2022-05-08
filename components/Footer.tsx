import styled from 'styled-components'

const FooterContainer = styled.div`
    padding: 1rem 2rem;
    display: flex;
    background-color: #FF007A;
    justify-content: flex-end;
    height: 4rem;
    margin-top: -6rem;
`

const Logo = styled.img`
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
    margin: 5px 0;
`

const AndSign = styled.span`
    font-size: 1.5rem;
    color: #fff;
`

const CreatorContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

export default function Footer() {
    return (
        <FooterContainer>
            <CreatorContainer>
                <a href="https://ppluss.de/" target="_blank">
                    <Logo src="/images/philippirl.webp" alt="PhilippIRL"></Logo>
                </a>
                <AndSign>&amp;</AndSign>
                <a href="https://adridoesthings.com/" target="_blank">
                    <Logo src="/images/adridoesthings.webp" alt="AdriDoesThings"></Logo>
                </a>
            </CreatorContainer>
        </FooterContainer>
    )
}
