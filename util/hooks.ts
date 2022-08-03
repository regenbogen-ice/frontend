import useSWR from 'swr'
import fetchFromAPI from './dataFetcher'
import { AutoCompleteResponse, TrainType, TrainVehicle } from './commonTypes'
import { useEffect, useState } from 'react'

export function useTrainVehicleCurrent(tzn: string | number, trainType: TrainType) {
    const { data, error } = useSWR([[tzn, trainType], 'trainTripCurrent'], fetchFromAPI)

    return { data: data as (TrainVehicle | undefined), error }
}

export function useTrainVehicleHistory(tzn: string | number, trainType: TrainType) {
    const { data, error } = useSWR([[tzn, trainType], 'trainTripHistory'])

    return { data: data as TrainVehicle | undefined, error }
}

export function useAutoComplete(query: string) {
    const { data, error } = useSWR([[query], 'autocompelete'])

    return { data: data as AutoCompleteResponse | undefined, error }
}

export function useRerenderPeriodically(interval) {
    const [,setMillis] = useState(0)

    useEffect(() => {
        const id = setInterval(() => setMillis(performance.now()), interval)

        return () => clearInterval(id)
    }, [interval])
}
