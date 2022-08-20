import { TrainTrip } from '../../util/commonTypes'
import TimetableRenderer from './TimetableRenderer'

export default function MultiTimetable({trainTrips, cutoffIndex}: {trainTrips: TrainTrip[], cutoffIndex: number}) {
    let rowData = []

    let rowIndex = 0
    for(let i = cutoffIndex; i >= 0; i--) {
        const trainTrip = trainTrips[i]
        const stops = trainTrip.stops ?? []
        
        if(stops.length === 0) continue

        rowData = [
            ...rowData,
            {type: 'tripChange', to: `${trainTrip.train_type} ${trainTrip.train_number} -> ${trainTrip.destination_station}`, time: trainTrip.stops[0].departure || trainTrip.stops[0].arrival, marudor: trainTrip.marudor, index: rowIndex++},
            ...stops.map(stop => ({ type: 'stop', stop, index: rowIndex++, time: stop.departure || stop.arrival })),
        ]
    }
    
    return <TimetableRenderer rows={rowData} />
}
