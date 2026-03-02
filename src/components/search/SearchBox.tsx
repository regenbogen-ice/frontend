import { useRouter } from 'next/router'
import { SyntheticEvent, useCallback, useState } from 'react'
import { AutoCompleteSuggestion } from '../../util/commonTypes'
import { useAutoComplete } from '../../util/hooks'
import { getCoachLink, getTrainTripLink, getTrainVehicleLink } from '../../util/trainDataUtil'
import SearchSuggestionList from './SearchSuggestionList'
import { SearchBarIcon, SearchContainer, SearchInput } from './styles'

export type NavigateToSuggestion = (suggestion: AutoCompleteSuggestion) => void

export default function SearchBox() {
    const [value, setValue] = useState('')
    const { data, error } = useAutoComplete(value || null)
    const router = useRouter()

    const navigateToSuggestion = useCallback((suggestion: AutoCompleteSuggestion) => {
        switch(suggestion.type) {
            case 'train_vehicle':
                router.push(getTrainVehicleLink(suggestion.train_type, suggestion.guess))
                break

            case 'coach':
                router.push(getCoachLink(suggestion.guess))
                break

            case 'train_trip':
                router.push(getTrainTripLink(suggestion.train_type, Number(suggestion.guess)))
                break
        }

        setValue('')
    }, [setValue, router])

    const formSubmit = useCallback((e: SyntheticEvent) => {
        e.preventDefault()

        if(data && data[0]) {
            navigateToSuggestion(data[0])
        }
    }, [data, navigateToSuggestion])

    const escapeListener = useCallback((e: SyntheticEvent<EventTarget, KeyboardEvent>) => {
        if(e.nativeEvent.code === 'Escape') {
            setValue('')
        }
    }, [setValue])

    return (
        <>
            <SearchContainer onSubmit={formSubmit} onKeyDown={escapeListener}>
                <SearchBarIcon height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></SearchBarIcon>
                <SearchInput type='text' placeholder='Suchen...' value={value} onChange={(e) => setValue(e.target.value)} />

                {data && !error && data.length > 0 && (
                    <SearchSuggestionList suggestions={data} navigateToSuggestion={navigateToSuggestion} />
                )}
            </SearchContainer>
        </>
    )
}
