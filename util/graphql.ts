import { GRAPHQL_URL } from './constants'

const TrainVehicleQuery = `
    query Query($trainType: String!, $query: String!) {
        train_vehicle(train_type: $trainType, q: $query) {
            train_type
            train_vehicle_name
            train_vehicle_number
            building_series
            trips(limit: 5) {
                destination_station
                origin_station
                initial_departure
                bahn_expert
                train_number
                train_type
                stops {
                    arrival
                    departure
                    cancelled
                    scheduled_arrival
                    scheduled_departure
                    station
                }
            }
        }
    }
`

const TrainHistoryQuery = `
    query Query($trainType: String!, $query: String!) {
        train_vehicle(train_type: $trainType, q: $query) {
            train_type
            train_vehicle_number
            building_series
            trips(limit: 499) {
                destination_station
                origin_station
                initial_departure
                train_number
                train_type
            }
        }
    }
`

const AutoCompleteQuery = `
    query Query($query: String!) {
        autocomplete(q: $query) {
            guess
            type
            train_type
        }
    }
`

async function fetchFromGraphQL(query: string, variables: { [key: string]: string }, key: string) {
    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables,
            operationName: 'Query',
        }),
    })

    const json = await response.json()

    return json.data[key]
}

export function fetchTrainVehicle(trainType: string, query: string) {
    return fetchFromGraphQL(TrainVehicleQuery, { trainType, query }, 'train_vehicle')
}

export function fetchTrainHistory(trainType: string, query: string) {
    return fetchFromGraphQL(TrainHistoryQuery, { trainType, query }, 'train_vehicle')
}

export function fetchAutoComplete(query: string) {
    return fetchFromGraphQL(AutoCompleteQuery, { query }, 'autocomplete')
}
