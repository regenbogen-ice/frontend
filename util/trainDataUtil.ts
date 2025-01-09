import { TrainTrip, TrainTripWithStops, TrainType, TrainVehicle } from './commonTypes'
import { DateTime } from 'luxon'
import { RAINBOW_NAME, RAINBOW_TZN } from './constants'

export function findCurrentTrip(trainVehicle: TrainVehicle) {
    const trips = trainVehicle.trips

    for(let i = trips.length - 1; i >= 0; i--) {
        const trip = trips[i]

        if(isTripOver(trip, 3)) {
            continue
        }

        return trip
    }

    return trips[0]
}

export function getTrainTripWithStops(trip: TrainTrip) {
    if(!trip?.stops?.length) return null

    return trip as TrainTripWithStops
}

export function getTrainTripsWithStops(trips: TrainTrip[]) {
    return trips.map(getTrainTripWithStops).filter(trip => trip !== null)
}

export function isTripOver(trip: TrainTrip, bufferMinutes = 0) {
    if(!trip.stops?.length) return true


    const arrivalTimeString = trip.stops[trip.stops.length - 1].arrival
    const arrivalTime = DateTime.fromISO(arrivalTimeString!)

    return arrivalTime < DateTime.now().minus(1000 * 60 * bufferMinutes)
}

export function hasTripStarted(trip: TrainTrip) {
    if(!trip.stops) return true

    const departureTimeString = trip.stops[0].departure
    const departureTime = DateTime.fromISO(departureTimeString!)

    return departureTime < DateTime.now()
}

export function generateTripHeadline(trip: TrainTrip, includeName = true) {
    const suffix = includeName ? ` als ${trip.train_type} ${trip.train_number}` : ''

    if(!trip.stops?.length) {
        let dateSentence = ''
        if(trip.initial_departure) {
            const trainDate = DateTime.fromISO(trip.initial_departure).toFormat('dd.MM.yyyy')
            dateSentence = ' am ' + trainDate
        }

        return `Zug zuletzt gefunden${dateSentence}${suffix}`
    }

    if(isTripOver(trip)) {
        const arrival = DateTime.fromISO(trip.stops[trip.stops.length - 1].arrival!)
        const timeSinceArrival = arrival.toRelative({ locale: 'de' })

        return `Zuletzt unterwegs ${timeSinceArrival}${suffix}`
    }
    
    if(!hasTripStarted(trip)) {
        const departure = DateTime.fromISO(trip.stops[0].departure!)
        const timeUntilDeparture = 'In ' + departure.toRelative({ locale: 'de' })!.substring(3)

        return `${timeUntilDeparture} unterwegs${suffix}`
    }
    
    return `Gerade unterwegs${suffix}`
}

export function getTrainTripLink(train_type: TrainType, train_number: number, initialDeparture?: string) {
    const initialDepartureParameter = initialDeparture ? `?initialDeparture=${encodeURIComponent(initialDeparture)}` : ''
    return `/trip/${encodeURIComponent(train_type)}/${encodeURIComponent(train_number)}${initialDepartureParameter}`
}

export function getTrainVehicleLink(train_type: TrainType, tzn: string) {
    if(train_type === 'ICE' && (tzn === RAINBOW_NAME || tzn === RAINBOW_TZN.toString())) {
        return '/'
    }

    return `/vehicle/${encodeURIComponent(train_type)}/${encodeURIComponent(tzn)}`
}

export function getCoachLink(uic: string) {
    return `/coach/${encodeURIComponent(uic)}`
}
