import { fetchAutoComplete, fetchTrainHistory, fetchTrainVehicle } from './graphql'

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
        case 'trainTripCurrent':
            response = await fetchTrainVehicle(arg[1], arg[0].toString())
            break

        case 'trainTripHistory':
            response = await fetchTrainHistory(arg[1], arg[0].toString())
            break

        case 'autocomplete':
            response = await fetchAutoComplete(arg[0])
            break

        default:
            throw new Error('invalid method')
    }

    if(!response) {
        throw new StatusError('404', 'Nichts gefunden')
    }

    return response
}

export default fetchFromAPI
