import { AutoCompleteSuggestion } from '../../util/commonTypes'
import UicID from '../misc/UicID'
import { NavigateToSuggestion } from './SearchBox'
import { SearchSuggestionContainer, SearchSuggestionEntryContainer } from './styles'

export default function SearchSuggestionList({suggestions, navigateToSuggestion}: {suggestions: AutoCompleteSuggestion[], navigateToSuggestion: NavigateToSuggestion}) {
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
                <SearchSuggestionEntryContainer onClick={() => navigateToSuggestion(suggestion)}>
                    <svg viewBox="0 0 24 24">
                        <path d="M12,2C8,2 4,2.5 4,6V15.5A3.5,3.5 0 0,0 7.5,19L6,20.5V21H8.23L10.23,19H14L16,21H18V20.5L16.5,19A3.5,3.5 0 0,0 20,15.5V6C20,2.5 16.42,2 12,2M7.5,17A1.5,1.5 0 0,1 6,15.5A1.5,1.5 0 0,1 7.5,14A1.5,1.5 0 0,1 9,15.5A1.5,1.5 0 0,1 7.5,17M11,10H6V6H11V10M13,10V6H18V10H13M16.5,17A1.5,1.5 0 0,1 15,15.5A1.5,1.5 0 0,1 16.5,14A1.5,1.5 0 0,1 18,15.5A1.5,1.5 0 0,1 16.5,17Z" />
                    </svg>
                    {suggestion.guess} {suggestion.train_type !== 'ICE' && `(${suggestion.train_type})`}
                </SearchSuggestionEntryContainer>
            )

        case 'train_trip':
            return (
                <SearchSuggestionEntryContainer onClick={() => navigateToSuggestion(suggestion)}>
                    <svg viewBox="0 0 24 24">
                        <path d="M16.5 13H15V16.69L18.19 18.53L18.94 17.23L16.5 15.82V13M16 9C14.04 9 12.27 9.82 11 11.12V7H17L19 5L17 3H11V2L10 1L9 2V6H3L1 8L3 10H9V20C7.9 20 7 20.9 7 22H12.41C13.46 22.63 14.69 23 16 23C19.87 23 23 19.87 23 16S19.87 9 16 9M16 20.85C13.32 20.85 11.15 18.68 11.15 16S13.32 11.15 16 11.15 20.85 13.32 20.85 16 18.68 20.85 16 20.85Z" />
                    </svg>
                    {suggestion.train_type} {suggestion.guess}
                </SearchSuggestionEntryContainer>
            )

        case 'coach':
            return (
                <SearchSuggestionEntryContainer onClick={() => navigateToSuggestion(suggestion)}>
                    <svg viewBox="0 0 24 24">
                        <path d="M21 7H3C1.9 7 1 7.9 1 9V17H2C2 18.11 2.9 19 4 19S6 18.11 6 17H18C18 18.11 18.9 19 20 19S22 18.11 22 17H23V9C23 7.9 22.11 7 21 7M7 12H3V9H7V12M15 12H9V9H15V12M21 12H17V9H21V12Z" />
                    </svg>
                    <UicID uic={suggestion.guess} />
                </SearchSuggestionEntryContainer>
            )

        default:
            return null
    }
}
