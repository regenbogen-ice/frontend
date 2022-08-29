import { AutoCompleteSuggestion } from '../../util/commonTypes'
//import UicID from '../misc/UicID'
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
                <SearchSuggestionEntryContainer onClick={() => navigateToSuggestion(suggestion)}>{suggestion.guess} {suggestion.train_type !== 'ICE' && `(${suggestion.train_type})`}</SearchSuggestionEntryContainer>
            )

        case 'train_trip':
            return (
                <SearchSuggestionEntryContainer onClick={() => navigateToSuggestion(suggestion)}>{suggestion.train_type} {suggestion.guess}</SearchSuggestionEntryContainer>
            )

        //case 'coach':
        //    return (
        //        <SearchSuggestionEntryContainer onClick={() => navigateToSuggestion(suggestion)}><UicID uic={suggestion.guess} /></SearchSuggestionEntryContainer>
        //    )

        default:
            return null
    }
}
