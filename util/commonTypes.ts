export type TrainVehicleResponse = {
    train_vehicle: TrainVehicle,
}

export type TrainVehicle = {
    train_vehicle_name?: string,
    building_series?: string,
    train_vehicle_number: number,
    train_type: TrainType,
    trips?: TrainTrip[],
    coach_sequences?: TrainCoachSeqence[],
}

export type TrainTrip = {
    group_index: number,
    train_number: number,
    train_type: TrainType,
    origin_station: string | null,
    destination_station: string | null,
    initial_departure: string,
    bahn_expert?: string,
    stops?: TrainStop[],
    train_vehicles?: TrainVehicle[],
}

export type TrainCoachSeqence = {
    timestamp: string,
    coaches?: TrainCoach[],
}

export type TrainCoach = {
    index: number,
    class: number,
    type: string,
    uic: string,
    category: string,
}

type Time = {
    scheduled_departure: string,
    departure: string,
    scheduled_arrival: string | null,
    arrival: string | null,
} | {
    scheduled_departure: string | null,
    departure: string | null,
    scheduled_arrival: string,
    arrival: string,
}

export type TrainStop = {
    cancelled: boolean,
    station: string,
} & Time

export type AutoCompleteResponse = {
    autocomplete: AutoCompleteSuggestion[],
}

export type AutoCompleteSuggestion = {
    guess: string,
    train_type: TrainType,
    type: string,
}

export type TrainType = 'ICE' | 'IC'
