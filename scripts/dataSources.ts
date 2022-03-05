import { API_BASE } from './constants'

export type TrainVehicleData = any
export type TrainTripData = any
export type AutoCompleteResult = string[]

export const fetchFromAPI = async (arg: string, method: string): Promise<any> => {
    let response: Response | null = null

    if(arg == null) throw new Error('missing arg')

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

    const json = await response.json()
    return json
}
