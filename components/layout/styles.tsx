import styled from 'styled-components'

export const SectionWrapper = styled.div`
    margin: 50px 0;
    padding: 20px;
    width: calc(100% - 4rem);
    max-width: 450px;
`

export const SectionTitle = styled.h1`
    margin-bottom: .75em;
`

export const DetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: row;
    column-gap: 10vw;

    margin: auto;
    max-width: 3000px;
`

export const InfoTitle = styled.h2`
    color: var(--text-dark-color);
    font-size: 1rem;
    margin-bottom: 0.2rem;
`

export const InfoValue = styled.p`
    font-weight: bold;
    font-size: 1.5rem;
    margin-bottom: 25px;

    display: flex;
    flex-direction: column;
    gap: 6px;
`

export const InfoLink = styled.p`
    font-weight: bold;
    font-size: 1.1rem;
    margin-bottom: 25px;
`

export const HistoryContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;

    margin: auto;
    
    width: calc(100% - 2rem);
    max-width: calc(980px + 10vw);
    padding: 20px;
    box-sizing: border-box;

    margin-bottom: 50px;
`

export const Button = styled.button`
    background-color: var(--text-color);
    align-self: center;
    padding: 10px 50px;
    
    color: var(--theme-color);
    font-family: Inter, sans-serif;
    font-weight: bold;
    font-size: 16px;

    border-radius: 15px;
    cursor: pointer;
`

export const CoachEnumValue = styled(InfoValue)`
    word-break: break-all;
`
