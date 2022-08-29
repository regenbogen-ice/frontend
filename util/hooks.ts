import useSWR from 'swr'
import fetchFromAPI from './dataFetcher'
import { AutoCompleteSuggestion, TrainTrip, TrainType, TrainVehicle } from './commonTypes'
import { useEffect, useState } from 'react'

export function useTrainVehicleCurrent(tzn: string | number | null, trainType: TrainType) {
    const { data, error } = useSWR([[tzn, trainType], 'trainVehicleCurrent'], fetchFromAPI)

    return { data: data as (TrainVehicle | undefined), error }
}

export function useTrainVehicleHistory(tzn: string | number | null, trainType: TrainType) {
    const { data, error } = useSWR([[tzn, trainType], 'trainVehicleHistory'], fetchFromAPI)

    return { data: data as (TrainVehicle | undefined), error }
}

export function useAutoComplete(query: string | null) {
    const { data, error } = useSWR(query ? [[query], 'autocomplete'] : null, fetchFromAPI)

    return { data: data as (AutoCompleteSuggestion[] | undefined), error }
}

export function useTrainTrips(trainNumber: number, trainType: TrainType, initialDeparture: string | null) {
    const { data, error } = useSWR([[trainNumber, trainType, initialDeparture], 'trainTrips'], fetchFromAPI)

    return { data: data as (TrainTrip[] | undefined), error }
}

export function useRerenderPeriodically(interval: number) {
    const [,setMillis] = useState(0)

    useEffect(() => {
        const id = setInterval(() => setMillis(performance.now()), interval)

        return () => clearInterval(id)
    }, [interval])
}
