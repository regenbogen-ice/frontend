import { TrainTrip } from '../../util/commonTypes'
import TimetableRenderer from './TimetableRenderer'

export default function FullTimetable({trainTrip}: {trainTrip: TrainTrip}) {
    const stops = trainTrip.stops ?? []
    const rowData = stops.map(stop => ({ type: 'stop', stop, index: stops.indexOf(stop), time: stop.departure || stop.arrival! }))

    return <TimetableRenderer rows={rowData} />
}
