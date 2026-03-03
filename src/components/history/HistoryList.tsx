import { TrainTrip } from '../../util/commonTypes'
import HistoryEntry from './HistoryEntry'
import { HistoryListContainer } from './styles'

export default function HistoryList({days}: {days: [day: string, trips: TrainTrip[]][]}) {
    return (
        <HistoryListContainer>
            {days.map(([day, trips]: [string, TrainTrip[]]) => (
                <HistoryEntry key={day} day={day} trips={trips} />
            ))}
        </HistoryListContainer>
    )
}
