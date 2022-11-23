import { TrainTrip } from '../../util/commonTypes'
import { RowRendererArgs } from './SingleRowRenderer'
import TimetableRenderer from './TimetableRenderer'

export default function MultiTimetable({trainTrips, cutoffIndex}: {trainTrips: TrainTrip[], cutoffIndex: number}) {
    let rowData: RowRendererArgs[] = []

    let rowIndex = 0
    for(let i = cutoffIndex; i >= 0; i--) {
        const trainTrip = trainTrips[i]
        const stops = trainTrip.stops ?? []
        
        //if(stops.length === 0) continue

        const tripTime = stops[0]?.departure || stops[0]?.arrival || ''

        rowData = [
            ...rowData,
            {
                type: 'tripChange',
                to: `${trainTrip.train_type} ${trainTrip.train_number}${trainTrip.destination_station ? ' -> ' + trainTrip.destination_station : ''}`,
                time: tripTime,
                link: trainTrip.bahn_expert,
                index: rowIndex++,
            },
            ...stops.map(stop => ({
                type: 'stop',
                stop, index: rowIndex++,
                time: stop.departure || stop.arrival!,
            })),
        ]

        if(!stops?.length) {
            rowData.push({
                type: 'noStops',
                index: rowIndex++,
                time: tripTime,
            })
        }
    }
    
    return <TimetableRenderer rows={rowData} />
}
