import { fetchAutoComplete, fetchTrainHistory, fetchTrainTrip, fetchTrainVehicle } from './graphql'

export class StatusError extends Error {
    constructor(title: string, description: string) {
        super(title + ' ' + description)

        this.title = title
        this.description = description
    }

    title?: string | null = null
    description: string | null = null
}

const fetchFromAPI = async (arg: any, method: string): Promise<any> => {
    let response: any | null = null

    if(!arg) throw new Error('missing arg')

    switch(method) {
        case 'trainVehicleCurrent':
            response = await fetchTrainVehicle(arg[1], arg[0].toString())
            break

        case 'trainVehicleHistory':
            response = await fetchTrainHistory(arg[1], arg[0].toString())
            break

        case 'autocomplete':
            response = await fetchAutoComplete(arg[0])
            break

        case 'trainTrips':
            response = await fetchTrainTrip(arg[1], arg[0], arg[2])
            break

        default:
            throw new Error('invalid method')
    }

    if(!response ||
        (Array.isArray(response) && response.length === 0)) {
        throw new StatusError('404', 'Nichts gefunden')
    } else if(typeof response.errors?.length === 'number' && response.errors.length > 0) {
        throw new StatusError(response.errors[0].message, `Error Code: ${response.errors[0].error_code}`)
    } else if(typeof response.error === 'string') {
        throw new StatusError(response.error, `Error Code: ${response.error_code}`)
    }

    return response
}

export default fetchFromAPI
