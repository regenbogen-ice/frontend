import styled from 'styled-components'

export const SearchContainer = styled.form`
    background-color: var(--text-color);
    padding: 10px 20px;

    margin-top: 20px;
    border-radius: 20px;
    box-shadow: 0 0 0 2px rgba(23, 7, 13, 0.05);

    display: flex;
    gap: 5px;
    align-items: center;

    position: relative;
`

export const SearchInput = styled.input`
    font-size: 16px;
`

export const SearchBarIcon = styled.svg``

export const SearchSuggestionContainer = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    margin-top: 2px;
    box-sizing: border-box;
    border-radius: 5px;

    z-index: 5;

    background-color: var(--text-color);
    color: var(--reverse-text-color);

    max-height: 300px;
    overflow: hidden auto;

    display: flex;
    flex-direction: column;
`

export const SearchSuggestionEntryContainer = styled.div`
    text-align: left;

    padding: 7px 10px;
    width: 100%;

    cursor: pointer;
    transition: background-color .1s;

    :hover {
        background: var(--text-dark-color);
    }
`
