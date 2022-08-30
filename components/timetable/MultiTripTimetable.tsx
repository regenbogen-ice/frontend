import { TrainTrip } from '../../util/commonTypes'
import { getTrainTripLink } from '../../util/trainDataUtil'
import { RowRendererArgs } from './SingleRowRenderer'
import TimetableRenderer from './TimetableRenderer'

export default function MultiTimetable({trainTrips, cutoffIndex}: {trainTrips: TrainTrip[], cutoffIndex: number}) {
    let rowData: RowRendererArgs[] = []

    let rowIndex = 0
    for(let i = cutoffIndex; i >= 0; i--) {
        const trainTrip = trainTrips[i]
        const stops = trainTrip.stops ?? []
        
        if(stops.length === 0) continue

        rowData = [
            ...rowData,
            {
                type: 'tripChange',
                to: `${trainTrip.train_type} ${trainTrip.train_number} -> ${trainTrip.destination_station}`,
                time: stops[0].departure || stops[0].arrival!,
                //link: getTrainTripLink(trainTrip.train_type, trainTrip.train_number, trainTrip.initial_departure),
                link: trainTrip.bahn_expert,
                index: rowIndex++,
            },
            ...stops.map(stop => ({
                type: 'stop',
                stop, index: rowIndex++,
                time: stop.departure || stop.arrival!,
            })),
        ]
    }
    
    return <TimetableRenderer rows={rowData} />
}
