import { AutoCompleteSuggestion } from '../../util/commonTypes'
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

        default:
            return null
    }
}
