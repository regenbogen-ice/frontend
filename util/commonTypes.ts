import { type } from "os"

export type TrainVehicle = {
    name: string | null,
    building_series: number | null,
    number: number,
    train_type: string,
    trips?: TrainTrip[],
    coach_sequences?: TrainCoachSeqence[]
}

export type TrainTrip = {
    group_index: number,
    train_number: number,
    train_type: string,
    origin_station: string | null,
    destination_station: string | null,
    initial_departure: string,
    trip_timestamp: string,
    vehicle_timestamp: string,
    marudor?: string
    stops?: TrainStop[]
}

export type TrainCoachSeqence = {
    timestamp: string,
    coaches?: TrainCoach[]
}

export type TrainCoach = {
    index: number,
    class: number,
    type: string,
    uic: string,
    category: string
}

export type TrainStop = {
    cancelled: boolean,
    station: string,
    scheduled_departure: string | null,
    departure: string | null,
    scheduled_arrival: string | null
    arrival: string | null,
}

export type AutoCompleteResponse = AutoCompleteSuggestion[]

export type AutoCompleteSuggestion = {
    guess: string,
    train_type: string
}

export type TrainType = 'ICE' | 'IC'
