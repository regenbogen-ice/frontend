import styled from 'styled-components'

export const HistoryListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
`

export const HistoryEntryContainer = styled.div`
    width: 100%;
    max-width: 300px;
    margin-bottom: 40px;
    
    display: flex;
    flex-direction: column;
`

export const HistoryEntryTitle = styled.h2`
    margin-bottom: 10px;
`

export const HistoryRow = styled.div`
    position: relative;
    margin-left: -.5em;

    display: flex;
    align-items: center;
    padding: 12px;
    padding-left: 0;
`

export const HistoryRowText = styled.span`
    font-weight: bold;
    margin-left: 2em;
`
