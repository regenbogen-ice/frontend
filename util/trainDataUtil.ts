import { TrainTrip, TrainVehicle } from './commonTypes'
import { DateTime } from 'luxon'

export function findCurrentTrip(trainVehice: TrainVehicle) {
    const trips = trainVehice.trips ?? []

    for(let i = trips.length - 1; i >= 0; i--) {
        const trip = trips[i]

        if(isTripOver(trip, 3)) {
            continue
        }

        return trip
    }

    return (trips.length && trips[0]) || null
}

export function isTripOver(trip: TrainTrip, bufferMinutes = 0) {
    const arrivalTimeString = trip.stops[trip.stops.length - 1].arrival
    const arrivalTime = DateTime.fromISO(arrivalTimeString)

    return arrivalTime < DateTime.now().minus(1000 * 60 * bufferMinutes)
}

export function hasTripStarted(trip: TrainTrip) {
    const departureTimeString = trip.stops[0].departure
    const departureTime = DateTime.fromISO(departureTimeString)

    return departureTime < DateTime.now()
}

export function generateTripHeadline(trip: TrainTrip) {
    if(isTripOver(trip)) {
        const arrival = DateTime.fromISO(trip.stops[trip.stops.length - 1].arrival)
        const timeSinceArrival = arrival.toRelative({ locale: 'de' })

        return `Zuletzt unterwegs ${timeSinceArrival} als ${trip.train_type} ${trip.train_number}`
    }
    
    if(!hasTripStarted(trip)) {
        const departure = DateTime.fromISO(trip.stops[0].departure)
        const timeUntilDeparture = 'In ' + departure.toRelative({ locale: 'de' }).substring(3)

        return `${timeUntilDeparture} unterwegs als ${trip.train_type} ${trip.train_number}`
    }
    
    return `Unterwegs als ${trip.train_type} ${trip.train_number}`
}
