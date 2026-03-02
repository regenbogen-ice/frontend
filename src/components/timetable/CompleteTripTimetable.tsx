import { TrainTrip } from '../../util/commonTypes'
import TimetableRenderer from './TimetableRenderer'

export default function FullTimetable({trainTrip}: {trainTrip: TrainTrip}) {
    const stops = trainTrip.stops ?? []
    const rowData: {type: string, index: number, time: string}[] = stops.map(stop => ({ type: 'stop', stop, index: stops.indexOf(stop), time: stop.departure || stop.arrival! }))

    if(!stops?.length) {
        rowData.push({
            type: 'noStops',
            index: 0,
            time: '',
        })
    }

    return <TimetableRenderer rows={rowData} />
}
