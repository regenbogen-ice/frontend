import { DateTime } from 'luxon'
import { useMemo, useState } from 'react'
import { TrainTrip, TrainType } from '../../util/commonTypes'
import { useTrainVehicleHistory } from '../../util/hooks'
import HistoryList from '../history/HistoryList'
import { InlineError } from '../misc/Error'
import Loader from '../misc/Loader'
import { Button, HistoryContainer } from './styles'

export default function TrainHistoryView({tzn, trainType}: {tzn: string | number, trainType: TrainType}) {
    const { data, error } = useTrainVehicleHistory(tzn, trainType)
    
    const [reduceItems, setReduceItems] = useState(true)

    const days = useMemo(() => {
        if(!data || error) return null

        const days = {}

        data.trips.forEach(trip => {
            const date = DateTime.fromISO(trip.initial_departure)
            const dateString = date.toFormat('dd.MM.yyyy')
    
            days[dateString] = [
                trip,
                ...(days[dateString] || []),
            ]
        })

        return days
    }, [data, error])

    if(error || !data) {
        return (
            <HistoryContainer>
                {error ? (
                    <h2>
                        Historie kann nicht geladen werden.
                        {' '}
                        <InlineError error={error} />
                    </h2>
                ) : (
                    <Loader />
                )}
            </HistoryContainer>
        )
    }

    let entries: [string, TrainTrip[]][] = Object.entries(days)

    if(reduceItems) {
        entries = entries.slice(0,6)
    }

    return (
        <HistoryContainer>
            <h1>Historie</h1>

            <HistoryList days={entries} />
            
            {reduceItems ? (
                <Button onClick={() => setReduceItems(false)}>Mehr anzeigen</Button>
            ) : null}
        </HistoryContainer>
    )
}

