import { SyntheticEvent, useCallback, useRef, useState } from 'react'
import styled from 'styled-components'
import { AutoCompleteSuggestion } from '../util/commonTypes'
import { useAutoComplete } from '../util/hooks'

const SearchContainer = styled.form`
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

const SearchInput = styled.input`
    font-size: 16px;
`

const SearchBarIcon = styled.svg``

const SearchSuggestionContainer = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    margin-top: 2px;
    box-sizing: border-box;
    border-radius: 5px;

    background-color: var(--text-color);
    color: var(--reverse-text-color);

    max-height: 300px;
    overflow: hidden auto;

    display: flex;
    flex-direction: column;
`

const SearchSuggestionEntryContainer = styled.div`
    text-align: left;

    padding: 7px 10px;
    width: 100%;

    cursor: pointer;
    transition: background-color .1s;

    :hover {
        background: var(--text-dark-color);
    }
`

type NavigateToSuggestion = any

export default function SearchView() {
    const [value, setValue] = useState('')

    const { data, error } = useAutoComplete(value || null)

    const navigateToSuggestion = useCallback((suggestion: AutoCompleteSuggestion) => {
        // todo

        setValue('')
    }, [setValue])

    const formSubmit = useCallback((e: SyntheticEvent) => {
        e.preventDefault()

        if(data[0]) {
            navigateToSuggestion(data[0])
        }
    }, [data, navigateToSuggestion])

    const escapeListener = useCallback((e: SyntheticEvent<EventTarget, KeyboardEvent>) => {
        if(e.nativeEvent.code === 'Escape') {
            setValue('')
        }
    }, [setValue])

    const inputRef = useRef()

    return (
        <>
            <SearchContainer onSubmit={formSubmit} onKeyDown={escapeListener}>
                <SearchBarIcon height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></SearchBarIcon>
                <SearchInput ref={inputRef} type='text' placeholder='Suchen...' value={value} onChange={(e) => setValue(e.target.value)} />

                {data && !error && data.length > 0 && (
                    <SearchSuggestionView suggestions={data} navigateToSuggestion={navigateToSuggestion} />
                )}
            </SearchContainer>
        </>
    )
}

function SearchSuggestionView({suggestions, navigateToSuggestion}: {suggestions: AutoCompleteSuggestion[], navigateToSuggestion: NavigateToSuggestion}) {
    return (
        <SearchSuggestionContainer>
            {suggestions.map((suggestion, index) => (
                <SearchSuggestionEntry suggestion={suggestion} key={index} navigateToSuggestion={navigateToSuggestion} />
            ))}
        </SearchSuggestionContainer>
    )
}

function SearchSuggestionEntry({suggestion, navigateToSuggestion}: {suggestion: AutoCompleteSuggestion, navigateToSuggestion: NavigateToSuggestion}) {
    switch(suggestion.type) {
        case 'train_vehicle':
            return (
                <SearchSuggestionEntryContainer onClick={() => navigateToSuggestion(suggestion)}>{suggestion.guess} {suggestion.train_type !== 'ICE' && `(${suggestion.train_type})`}</SearchSuggestionEntryContainer>
            )

        default:
            return null
    }
}
