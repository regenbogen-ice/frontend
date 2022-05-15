import { API_BASE } from './constants'

export type TrainVehicleData = {
    building_series: number,
    name: string,
    number: number,
    train_type: 'ICE' | 'IC',
    trips: TrainTripData[],
}

export type TrainTripData = {
    destination_station: string,
    group_index: number,
    initial_departure: string,
    marudor: string,
    origin_station: string,
    stops: TrainStopData[],
    train_number: number,
    train_type: string,
    trip_timestamp: string,
    vehice_timestamp: string,
}

export type TrainStopData = {
    arrival: string | null,
    cancelled: 0 | 1,
    departure: string | null,
    scheduled_arrival: string | null,
    scheduled_departure: string | null,
    station: string,
}

export type AutoCompleteResult = string[]

function fixAPIResponse(rawResponse: TrainVehicleData) {
    // sometimes the api returns no stops even if you explicitly request it
    // this is clearly a bug but the developer does not want to fix it
    // therefore these wrong results have to be filtered

    if(rawResponse.trips) {
        const fixedTripsArray = rawResponse.trips.filter(trip => {
            return trip.stops.length > 0
        })
        
        return {...rawResponse, trips: fixedTripsArray}   
    }
}

export const fetchFromAPI = async (arg: string, method: string): Promise<any> => {
    let response: Response | null = null

    if(!arg) throw new Error('missing arg')

    switch(method) {
        case 'trainTrip':
            response = await fetch(API_BASE + '/api/train_vehicle?q=' + encodeURIComponent(arg) + '&trip_limit=5&include_routes=true&include_marudor_link=true')
            break

        case 'autocomplete':
            response = await fetch(API_BASE + '/api/autocomplete/' + encodeURIComponent(arg))
            break

        case 'history':
            response = await fetch(API_BASE + '/api/train_vehicle?q=' + encodeURIComponent(arg) + '&trip_limit=500&include_routes=false')
            break

        default:
            throw new Error('invalid method')
    }

    if(!response.ok) throw new Error('HTTP ' + response.status)

    let json = await response.json()
    if(method === 'trainTrip') json = fixAPIResponse(json)
    return json
}
