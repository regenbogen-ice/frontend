import { TrainStop, TrainTrip } from '../../util/commonTypes'
import { DateTime } from 'luxon'
import TimetableRenderer from './TimetableRenderer'

export function ShortTimetable({trainTrip}: {trainTrip: TrainTrip}) {
    const allStops = trainTrip.stops ?? []
    const selectedStops = new Set<TrainStop>()

    selectedStops.add(allStops[0])
    for(let i = 0; i < allStops.length; i++) {
        const stop = allStops[i]

        if(DateTime.fromISO(stop.arrival || stop.departure) > DateTime.now()) {
            if(allStops[i - 1]) {
                if(i === allStops.length - 1) {
                    selectedStops.add(allStops[i - 2])
                }

                selectedStops.add(allStops[i - 1])
            }

            selectedStops.add(stop)

            break
        }
    }

    if(selectedStops.size < 3) {
        const middleNode = allStops[Math.floor(allStops.length / 2)]
        const departure = DateTime.fromISO(middleNode.departure)

        if(departure > DateTime.now()) {
            selectedStops.add(allStops[1])
            selectedStops.add(allStops[2])
        } else {
            selectedStops.add(allStops[allStops.length - 3])
            selectedStops.add(allStops[allStops.length - 2])
        }
    }

    selectedStops.add(allStops[allStops.length - 1])

    const rowData = Array.from(selectedStops).map(stop => ({ type: 'stop', stop, index: allStops.indexOf(stop), time: stop.departure || stop.arrival }))
    return <TimetableRenderer rows={rowData} />
}
